import { useEffect, useState, useCallback } from "react";

export function useTypewriter(text: string, speed: number = 40, loop: boolean = false) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  const typeText = useCallback(() => {
    if (!isDeleting && index < text.length) {
      // Typing
      setDisplayedText(text.slice(0, index + 1));
      setIndex(prev => prev + 1);
    } else if (isDeleting && index > 0) {
      // Deleting
      setDisplayedText(text.slice(0, index - 1));
      setIndex(prev => prev - 1);
    } else if (index === text.length && loop) {
      // Start deleting after a pause
      setTimeout(() => setIsDeleting(true), 1000);
    } else if (index === 0 && loop) {
      // Start typing again after a pause
      setIsDeleting(false);
    }
  }, [index, isDeleting, text, loop]);

  useEffect(() => {
    const typingSpeed = isDeleting ? speed / 2 : speed;
    
    const timeout = setTimeout(typeText, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typeText, isDeleting, speed]);

  return displayedText;
}