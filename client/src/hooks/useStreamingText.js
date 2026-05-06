import { useEffect, useRef, useState } from 'react';

function buildStreamingChunks(text) {
  if (!text) return [];
  const tokens = text.split(/(\s+)/);
  const chunks = [];
  let current = '';

  for (const token of tokens) {
    current += token;
    chunks.push(current);
  }

  return chunks;
}

export default function useStreamingText(fullText, options = {}) {
  const { speed = 35, startDelay = 500 } = options;
  const [text, setText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const chunksRef = useRef([]);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!fullText) {
      setText('');
      setIsStreaming(false);
      setIsComplete(false);
      chunksRef.current = [];
      return;
    }

    setText('');
    setIsStreaming(false);
    setIsComplete(false);
    chunksRef.current = buildStreamingChunks(fullText);

    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    timeoutRef.current = window.setTimeout(() => {
      let index = 0;
      setIsStreaming(true);

      intervalRef.current = window.setInterval(() => {
        if (index >= chunksRef.current.length) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsStreaming(false);
          setIsComplete(true);
          return;
        }

        setText(chunksRef.current[index]);
        index += 1;
      }, speed);
    }, startDelay);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [fullText, speed, startDelay]);

  return { text, isStreaming, isComplete };
}
