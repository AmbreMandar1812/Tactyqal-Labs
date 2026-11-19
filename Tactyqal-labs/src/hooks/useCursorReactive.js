import { useEffect } from 'react';

export function useCursorReactive() {
  useEffect(() => {
    const root = document.documentElement;
    const cursorDot = document.getElementById('cursorDot');
    
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let isMoving = false;
    let animId = null;

    let mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isReducedMotion = mediaQuery.matches;

    const onMotionChange = (e) => {
      isReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', onMotionChange);

    function renderLoop() {
      if (isReducedMotion) return;

      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      root.style.setProperty('--mouse-x', `${currentX.toFixed(1)}px`);
      root.style.setProperty('--mouse-y', `${currentY.toFixed(1)}px`);

      if (cursorDot) {
        cursorDot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      const parallaxNodes = document.querySelectorAll('[data-parallax-depth]');
      const normX = (currentX / window.innerWidth) - 0.5;
      const normY = (currentY / window.innerHeight) - 0.5;

      parallaxNodes.forEach((node) => {
        const depth = parseFloat(node.getAttribute('data-parallax-depth') || '20');
        const moveX = (normX * depth).toFixed(2);
        const moveY = (normY * depth).toFixed(2);
        node.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });

      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        animId = requestAnimationFrame(renderLoop);
      } else {
        isMoving = false;
      }
    }

    const onPointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        animId = requestAnimationFrame(renderLoop);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // Attach card 3D tilt and spotlight to any card dynamically
    const cleanups = [];
    const attachCardListeners = () => {
      const cards = document.querySelectorAll('.interactive-spotlight-card');
      cards.forEach((card) => {
        const handleMove = (e) => {
          if (isReducedMotion) return;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--card-x', `${x}px`);
          card.style.setProperty('--card-y', `${y}px`);

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const tiltX = (((y - centerY) / centerY) * -3.5).toFixed(2);
          const tiltY = (((x - centerX) / centerX) * 3.5).toFixed(2);
          card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-2px)`;
        };

        const handleLeave = () => {
          card.style.transform = '';
        };

        card.addEventListener('pointermove', handleMove, { passive: true });
        card.addEventListener('pointerleave', handleLeave);

        cleanups.push(() => {
          card.removeEventListener('pointermove', handleMove);
          card.removeEventListener('pointerleave', handleLeave);
        });
      });
    };

    // Delay attaching to ensure DOM nodes from React components are mounted
    const timer = setTimeout(attachCardListeners, 100);

    return () => {
      clearTimeout(timer);
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      mediaQuery.removeEventListener('change', onMotionChange);
      cleanups.forEach((fn) => fn());
    };
  }, []);
}
