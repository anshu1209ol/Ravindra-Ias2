import http from "node:http";
import net from "node:net";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Default dev port; override with env: `PORT=8080 npm run dev` */
const PREFERRED_PORT = Number(process.env.PORT) || 5173;

/** Bind to first free port in [preferred, preferred + 29] */
async function getAvailablePort(preferred: number): Promise<number> {
  for (let p = preferred; p < preferred + 30; p++) {
    const free = await new Promise<boolean>((resolve) => {
      const srv = net.createServer();
      srv.once("error", () => resolve(false));
      srv.listen(p, "0.0.0.0", () => {
        srv.close(() => resolve(true));
      });
    });
    if (free) return p;
  }
  throw new Error(`No free TCP port found starting at ${preferred}`);
}

async function startServer() {
  const app = express();

  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.post("/api/enroll", (req, res) => {
    const { name, email, phone, course } = req.body;
    console.log("New Enrollment:", { name, email, phone, course });
    res.json({ success: true, message: "Enrollment received" });
  });

  app.post("/api/newsletter", (req, res) => {
    const { email } = req.body;
    console.log("Newsletter Subscription:", email);
    res.json({ success: true, message: "Subscribed successfully" });
  });

  const httpServer = http.createServer(app);

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        // Same HTTP server as Express → HMR WS on this port only (no extra :24678)
        hmr: { server: httpServer },
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const port = await getAvailablePort(PREFERRED_PORT);
  if (port !== PREFERRED_PORT) {
    console.warn(
      `Port ${PREFERRED_PORT} was busy; using http://localhost:${port} instead`
    );
  }

  httpServer.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
