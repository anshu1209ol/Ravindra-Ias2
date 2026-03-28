import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useScrollToSection() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (sectionId: string, options?: { courseId?: string }) => {
      const params = new URLSearchParams(location.pathname === '/' ? location.search : '');
      if (options?.courseId) params.set('course', options.courseId);
      const search = params.toString();

      navigate(
        {
          pathname: '/',
          hash: sectionId,
          ...(search ? { search: `?${search}` } : {}),
        },
        { replace: location.pathname === '/' }
      );
    },
    [location.pathname, location.search, navigate]
  );
}
