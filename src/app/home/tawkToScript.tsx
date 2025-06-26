import { useEffect } from "react";

export const TawkToScript = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = 'https://embed.tawk.to/66d5489cea492f34bc0c9ca9/1i6oi78ps';
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return null;
};
