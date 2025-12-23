import { useState, useEffect } from 'react';

export default function Typewriter({ segments, typingSpeed = 50 }) {
    const [displayedText, setDisplayedText] = useState([]);
    const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (currentSegmentIndex >= segments.length) {
            setIsFinished(true);
            return;
        }

        const timeout = setTimeout(() => {
            const currentSegment = segments[currentSegmentIndex];

            // If we've finished the current segment
            if (currentCharIndex >= currentSegment.text.length) {
                setCurrentSegmentIndex(prev => prev + 1);
                setCurrentCharIndex(0);
                return;
            }

            // Add the next character
            setDisplayedText(prev => {
                const newText = [...prev];
                if (!newText[currentSegmentIndex]) {
                    newText[currentSegmentIndex] = "";
                }
                newText[currentSegmentIndex] += currentSegment.text[currentCharIndex];
                return newText;
            });

            setCurrentCharIndex(prev => prev + 1);

        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [currentSegmentIndex, currentCharIndex, segments, typingSpeed]);

    return (
        <span className="inline-block">
            {segments.map((segment, i) => (
                <span key={i} className={segment.className}>
                    {displayedText[i] || ""}
                </span>
            ))}
            {!isFinished && (
                <span className="inline-block w-1 h-[1em] bg-primary-500 ml-1 align-middle animate-blink"></span>
            )}
        </span>
    );
}
