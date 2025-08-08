'use client';

import {motion, useAnimation} from 'framer-motion';
import {useEffect, useRef} from 'react';

type Dir = 'up/left' | 'down/right';

export default function SwipeToCallback({
  callback,
  children,
  className = '',
  axis = 'y',
}: {
  callback: (dir: Dir) => void;
  children: React.ReactNode;
  axis?: 'y' | 'x';
  className?: string;
}) {
  const controls = useAnimation();
  const hasCalledBack = useRef(false);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: {type: 'spring', stiffness: 300, damping: 60},
    });
  }, [controls]);

  return (
    <motion.div
      initial={{opacity: 1, y: '100%'}}
      drag={axis}
      dragDirectionLock
      dragMomentum={false}
      dragElastic={0.2}
      onDragStart={() => {
        hasCalledBack.current = false;
      }}
      onDragEnd={async (_evt, info) => {
        const dx = info.offset.x;
        const dy = info.offset.y;
        const vy = info.velocity.y;

        // --- Tunables ---
        const MIN_Y_DIST = 180; // require a bigger vertical throw
        const MIN_Y_VEL = 800; // px/s vertical velocity
        const DOMINANCE = 1.8; // |dy| must be >= DOMINANCE * |dx|
        const MAX_X_WOBBLE = 140; // if horizontal sway exceeds this, ignore
        // -----------------

        // Only consider if it's clearly vertical
        const isMostlyVertical = Math.abs(dy) >= DOMINANCE * Math.abs(dx);
        const xTooLarge = Math.abs(dx) > MAX_X_WOBBLE;

        const passesDistance = Math.abs(dy) > MIN_Y_DIST;
        const passesVelocity = Math.abs(vy) > MIN_Y_VEL;

        const shouldCallback =
          isMostlyVertical && !xTooLarge && (passesDistance || passesVelocity);

        if (shouldCallback && !hasCalledBack.current) {
          hasCalledBack.current = true;

          const goingUp = dy < 0;
          const windowSpace =
            axis === 'y' ? window.innerHeight : window.innerWidth;
          const target = goingUp ? -windowSpace : windowSpace;

          // @ts-expect-error dynamic key
          await controls.start({
            [axis]: target,
            transition: {type: 'spring', stiffness: 300, damping: 30},
          });

          callback(goingUp ? 'up/left' : 'down/right');
        } else {
          // @ts-expect-error dynamic key
          controls.start({
            [axis]: 0,
            transition: {type: 'spring', stiffness: 300, damping: 30},
          });
        }
      }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}
