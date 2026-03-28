import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Image as ImageIcon, 
  Video, 
  Wand2, 
  Download, 
  Loader2, 
  Sparkles, 
  ChevronRight, 
  LogIn, 
  Monitor, 
  Smartphone, 
  Cpu
} from 'lucide-react';
import { generateUPSCImage, generateUPSCVideo } from '../lib/gemini';
import { cn } from '../lib/utils';
import { Button } from './ui/Button';

export default function CreativeStudio() {
  const [activeTab, setActiveTab] = React.useState<'image' | 'video'>('image');
  const [prompt, setPrompt] = React.useState('');
  const [size, setSize] = React.useState<"1K" | "2K" | "4K">("1K");
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = React.useState<string | null>(null);
  const [hasKey, setHasKey] = React.useState(false);

  React.useEffect(() => {
    const checkKey = async () => {
      if ((window as any).aistudio?.hasSelectedApiKey) {
        const selected = await (window as any).aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if ((window as any).aistudio?.openSelectKey) {
      await (window as any).aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setResult(null);
    try {
      const img = await generateUPSCImage(prompt, size);
      setResult(img);
    } catch (error: any) {
      console.error(error);
      if (error.message?.includes('Requested entity was not found') || error.message?.includes('403')) {
        setHasKey(false);
        alert('API Key error. Please reconnect your API key.');
      } else {
        alert('Failed to generate image.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!prompt.trim() && !uploadedImage) return;
    setIsLoading(true);
    setResult(null);
    try {
      const video = await generateUPSCVideo(prompt, uploadedImage || undefined);
      setResult(video);
    } catch (error: any) {
      console.error(error);
      if (error.message?.includes('Requested entity was not found') || error.message?.includes('403')) {
        setHasKey(false);
        alert('API Key error. Please reconnect your API key.');
      } else {
        alert('Failed to generate video.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="studio" className="py-28 relative overflow-hidden bg-zinc-950">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-5">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-600/10 border border-amber-600/20 text-amber-500 text-[11px] font-black uppercase tracking-widest"
          >
            <Cpu className="w-3.5 h-3.5" /> Neural Creation Engine
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black text-white tracking-tight leading-none"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Visualize Your <span className="gradient-text-animated">Success</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Harness the power of Gemini 2.0 to generate motivational posters or dynamic study videos that keep your focus sharp and energy high.
          </motion.p>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-[48px] overflow-hidden shadow-2xl backdrop-blur-xl">
          {/* Tab Sidebar/Header */}
          <div className="flex border-b border-zinc-800/80 p-2 bg-zinc-900/60 backdrop-blur-md">
            <button
              onClick={() => { setActiveTab('image'); setResult(null); }}
              className={cn(
                "flex-1 py-4 font-black text-xs uppercase tracking-[0.2em] rounded-[24px] flex items-center justify-center gap-2.5 transition-all duration-300", 
                activeTab === 'image' 
                  ? "bg-amber-600 text-white shadow-xl shadow-amber-900/30" 
                  : "text-zinc-500 hover:text-white hover:bg-zinc-800"
              )}
            >
              <ImageIcon className="w-4 h-4" /> Image Studio
            </button>
            <button
              onClick={() => { setActiveTab('video'); setResult(null); }}
              className={cn(
                "flex-1 py-4 font-black text-xs uppercase tracking-[0.2em] rounded-[24px] flex items-center justify-center gap-2.5 transition-all duration-300", 
                activeTab === 'video' 
                  ? "bg-amber-600 text-white shadow-xl shadow-amber-900/30" 
                  : "text-zinc-500 hover:text-white hover:bg-zinc-800"
              )}
            >
              <Video className="w-4 h-4" /> Motion Studio
            </button>
          </div>

          <div className="p-8 lg:p-16 grid lg:grid-cols-2 gap-16">
            <div className="space-y-10">
              {/* Input Area */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-zinc-500 font-black uppercase tracking-widest text-[10px]">
                    <Sparkles className="w-3 h-3 text-amber-500" /> Creation Prompt
                  </span>
                  {!hasKey && (
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      onClick={handleSelectKey}
                      className="text-[10px] font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1.5 border border-amber-500/30 px-3 py-1.5 rounded-xl bg-amber-500/5 transition-all"
                    >
                      <LogIn className="w-3.5 h-3.5" /> Connect Key
                    </motion.button>
                  )}
                </div>
                <div className="relative group">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={activeTab === 'image' ? "A hyper-realistic cinematic portrait of an IAS officer at their desk, warm lighting, deep focus, 8k..." : "A cinematic drone shot of a student standing on a cliff overlooking the Himalayas, morning mist, epic scale..."}
                    className="w-full h-44 bg-zinc-950/50 border border-zinc-800 rounded-[32px] p-6 text-white text-base placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/40 resize-none transition-all duration-300 group-hover:border-zinc-700"
                  />
                  <div className="absolute bottom-4 right-6 text-[10px] font-bold text-zinc-700 uppercase tracking-widest">
                    {prompt.length} / 500
                  </div>
                </div>
              </div>

              {/* Options Area */}
              {activeTab === 'image' ? (
                <div className="space-y-4">
                  <span className="flex items-center gap-2 text-zinc-500 font-black uppercase tracking-widest text-[10px]">
                    <Monitor className="w-3 h-3 text-amber-500" /> Output Quality
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    {(["1K", "2K", "4K"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={cn(
                          "py-4 rounded-2xl border-2 font-black text-sm tracking-widest transition-all duration-300", 
                          size === s 
                            ? "bg-amber-600/10 border-amber-600 text-amber-500" 
                            : "bg-zinc-950/40 border-zinc-800 text-zinc-600 hover:text-zinc-400 hover:border-zinc-700"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <span className="flex items-center gap-2 text-zinc-500 font-black uppercase tracking-widest text-[10px]">
                    <Smartphone className="w-3 h-3 text-amber-500" /> Animate from Photo
                  </span>
                  <div className="relative group">
                    <input type="file" onChange={handleImageUpload} className="hidden" id="image-upload" accept="image/*" />
                    <label
                      htmlFor="image-upload"
                      className="w-full h-44 border-2 border-dashed border-zinc-800 rounded-[32px] flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-amber-500/50 transition-all bg-zinc-950/40 group-hover:bg-zinc-950"
                    >
                      {uploadedImage ? (
                        <div className="relative w-full h-full p-4">
                          <img src={uploadedImage} alt="Uploaded" className="h-full w-full object-contain rounded-2xl" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-[32px]">
                            <span className="text-white text-xs font-bold uppercase tracking-widest">Change Photo</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-zinc-600" />
                          </div>
                          <div className="text-center">
                            <span className="text-zinc-500 text-xs font-black uppercase tracking-widest block">Upload Base Image</span>
                            <span className="text-zinc-700 text-[10px] mt-1 block">JPG, PNG up to 10MB</span>
                          </div>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              )}

              {/* Action */}
              <Button
                variant="primary"
                onClick={activeTab === 'image' ? handleGenerateImage : handleGenerateVideo}
                disabled={isLoading || (!prompt.trim() && !uploadedImage) || !hasKey}
                className="w-full py-5 text-base font-black uppercase tracking-[0.2em] rounded-[24px] shadow-2xl shadow-amber-900/40"
              >
                {!hasKey ? (
                  <>Connect API Key to Create</>
                ) : isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> 
                    {activeTab === 'image' ? 'Crafting Image...' : 'Synthesizing Motion...'}
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" /> 
                    Start Machine {activeTab === 'image' ? 'Painting' : 'Magic'}
                  </>
                )}
              </Button>
            </div>

            {/* Result Area */}
            <div className="relative min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 to-transparent rounded-[40px] blur-3xl pointer-events-none" />
              <div className="relative h-full aspect-video lg:aspect-square bg-zinc-950 rounded-[40px] border border-zinc-800/80 overflow-hidden flex items-center justify-center shadow-inner group">
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                      className="w-full h-full relative"
                    >
                      {activeTab === 'image' ? (
                        <img src={result} alt="AI Result" className="w-full h-full object-cover" />
                      ) : (
                        <video src={result} controls autoPlay className="w-full h-full object-cover" />
                      )}
                      
                      {/* Floating Download Button */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-6 right-6"
                      >
                        <a 
                          href={result} 
                          download={`ravindra-ias-${activeTab}.png`} 
                          className="flex items-center gap-2 p-4 bg-zinc-900/90 backdrop-blur-md rounded-2xl text-white hover:text-amber-400 border border-zinc-800 shadow-2xl transition-all"
                        >
                          <Download className="w-5 h-5" />
                          <span className="text-xs font-black uppercase tracking-widest">Download HQ</span>
                        </a>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center p-10 space-y-6"
                    >
                      {!hasKey ? (
                        <div className="space-y-6 max-w-xs mx-auto">
                          <div className="w-20 h-20 bg-amber-600/10 rounded-3xl flex items-center justify-center mx-auto border border-amber-600/30">
                            <LogIn className="w-10 h-10 text-amber-500" />
                          </div>
                          <div>
                            <h4 className="text-xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>Key Required</h4>
                            <p className="text-zinc-500 text-sm mt-2 leading-relaxed">Please connect your Google Gemini API key to access this premium tool.</p>
                          </div>
                          <Button variant="outline" onClick={handleSelectKey} className="w-full">
                            Connect Provider
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="relative inline-block">
                             <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center mx-auto border border-zinc-800 animate-pulse-glow">
                              <Sparkles className="w-10 h-10 text-zinc-800" />
                            </div>
                            <motion.div 
                              animate={{ rotate: 360 }}
                              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                              className="absolute -inset-4 border border-dashed border-zinc-800/50 rounded-full"
                            />
                          </div>
                          <div>
                            <h4 className="text-xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>Neural Canvas</h4>
                            <p className="text-zinc-500 text-sm mt-2">Specify your vision on the left and start the synthesis engine.</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
