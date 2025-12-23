import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const ringRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    // Physics State
    const mousePos = useRef({ x: -100, y: -100 });
    const dotPos = useRef({ x: -100, y: -100 });
    const ringPos = useRef({ x: -100, y: -100 });

    const magneticTargetRef = useRef(null);
    const idleTimer = useRef(0);
    const idlePhase = useRef(0);

    // Configuration
    const LERP_DOT = 0.4;
    const LERP_RING = 0.08;
    const MAGNETIC_STRENGTH = 0.2;
    const IDLE_TIMEOUT = 100;

    useEffect(() => {
        const onMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            idleTimer.current = 0; // Reset idle timer on move

            const target = e.target.closest('a, button, input, textarea, [role="button"], .interactive, .cursor-target');

            if (target) {
                const rect = target.getBoundingClientRect();
                magneticTargetRef.current = {
                    left: rect.left,
                    top: rect.top,
                    width: rect.width,
                    height: rect.height,
                    centerX: rect.left + rect.width / 2,
                    centerY: rect.top + rect.height / 2
                };
                setIsHovering(true);
            } else {
                setIsHovering(false);
                magneticTargetRef.current = null;
            }
        };

        window.addEventListener('mousemove', onMouseMove);

        let animationFrameId;

        const animate = () => {
            // 1. Calculate Target Coordinates
            let targetX = mousePos.current.x;
            let targetY = mousePos.current.y;

            if (isHovering && magneticTargetRef.current) {
                const { centerX, centerY } = magneticTargetRef.current;
                // Magnetic Pull: Weighted average of mouse and element center
                targetX = (targetX * (1 - MAGNETIC_STRENGTH)) + (centerX * MAGNETIC_STRENGTH);
                targetY = (targetY * (1 - MAGNETIC_STRENGTH)) + (centerY * MAGNETIC_STRENGTH);
            }

            // 2. Linear Interpolation (Lerp)
            dotPos.current.x += (targetX - dotPos.current.x) * LERP_DOT;
            dotPos.current.y += (targetY - dotPos.current.y) * LERP_DOT;

            ringPos.current.x += (targetX - ringPos.current.x) * LERP_RING;
            ringPos.current.y += (targetY - ringPos.current.y) * LERP_RING;

            // 3. Idle Drifting (Antigravity Bob)
            idleTimer.current++;
            if (idleTimer.current > IDLE_TIMEOUT) {
                idlePhase.current += 0.02;
                // Perlin-like drifting
                const driftX = Math.sin(idlePhase.current) * 5;
                const driftY = Math.cos(idlePhase.current * 0.8) * 5;

                ringPos.current.x += driftX * 0.05;
                ringPos.current.y += driftY * 0.05;
            }

            // 4. Apply Transforms
            if (cursorRef.current && ringRef.current) {
                cursorRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
                ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isHovering]);

    return (
        <>
            {/* Center Dot */}
            <div
                ref={cursorRef}
                className={`fixed pointer-events-none z-[9999] w-2 h-2 bg-primary-500 rounded-full transition-opacity duration-300 ${isHovering ? 'opacity-50 scale-150' : 'opacity-100'}`}
                style={{ top: 0, left: 0, willChange: 'transform' }}
            />
            {/* Outer Ring */}
            <div
                ref={ringRef}
                className={`fixed pointer-events-none z-[9998] border border-primary-500/50 rounded-full transition-all duration-300 ease-out flex items-center justify-center ${isHovering ? 'w-16 h-16 bg-primary-500/10 border-primary-500 opacity-80' : 'w-10 h-10 opacity-40'}`}
                style={{ top: 0, left: 0, willChange: 'transform' }}
            >
                {/* Optional: Inner pulse for loading/interactive state */}
                {isHovering && <div className="w-full h-full rounded-full animate-ping opacity-20 bg-primary-400"></div>}
            </div>
        </>
    );
}
