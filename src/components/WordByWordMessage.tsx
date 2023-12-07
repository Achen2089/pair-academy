// WordByWordMessage.tsx
import React, { useState, useEffect } from 'react';

type WordByWordMessageProps = {
  htmlContent: string;
  delay: number;
};

const WordByWordMessage: React.FC<WordByWordMessageProps> = ({ htmlContent, delay }) => {
  const [displayedText, setDisplayedText] = useState<string>('');

  useEffect(() => {
    setDisplayedText('');
    const words = htmlContent.split(' ');
    const timeouts: NodeJS.Timeout[] = [];

    words.forEach((word, index) => {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + word + ' ');
      }, delay * index);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [htmlContent, delay]);

  return <span dangerouslySetInnerHTML={{ __html: displayedText }} />;
};

export default WordByWordMessage;
