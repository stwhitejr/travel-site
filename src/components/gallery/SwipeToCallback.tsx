'use client';

import {motion, useAnimation} from 'framer-motion';
import {useEffect, useRef} from 'react';

export default function SwipeToCallback({
  callback,
  children,
  className = '',
  axis = 'y',
}: {
  callback: (dir: 'up/left' | 'down/right') => void;
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
  }, []);

  return (
    <motion.div
      initial={{opacity: 1, y: '100%'}}
      drag={axis}
      dragDirectionLock
      dragMomentum={false}
      onDragEnd={async (event, info) => {
        const movement = axis === 'y' ? info.offset.y : info.offset.x;
        const velocity = axis === 'y' ? info.velocity.y : info.velocity.x;
        const goingUpOrLeft = movement < -100;
        const goingDownOrRight = movement > 100;
        const shouldCallback =
          goingUpOrLeft || goingDownOrRight || velocity > 500; // Framer uses px/s

        if (shouldCallback && !hasCalledBack.current) {
          hasCalledBack.current = true;

          const windowSpace =
            axis === 'y' ? window.innerHeight : window.innerWidth;
          const target = goingUpOrLeft ? -windowSpace : windowSpace;

          // @ts-expect-error dynamic key
          await controls.start({
            [axis]: target,
            transition: {type: 'spring', stiffness: 300, damping: 30},
          });

          callback(goingUpOrLeft ? 'up/left' : 'down/right');
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
