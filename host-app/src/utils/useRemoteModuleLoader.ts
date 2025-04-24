
import { useEffect, useState } from 'react';

export const useRemoteModuleLoader = (url: string, moduleLoader: () => Promise<any>, interval = 5000) => {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const load = async () => {
      try {
        const res = await fetch(url, { method: 'HEAD' });
        if (res.ok) {
          const mod = await moduleLoader();
          setComponent(() => mod.default);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      }
    };

    load(); // initial
    timer = setInterval(load, interval);

    return () => clearInterval(timer);
  }, [url]);

  return { Component, error };
};
