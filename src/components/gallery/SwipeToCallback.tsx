'use client';

import {useSpring, animated} from '@react-spring/web';
import {useDrag} from '@use-gesture/react';

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
  // @ts-expect-error dynamic key should be safe
  const [{[axis]: axisValue}, api] = useSpring(() => ({[axis]: 0}));

  const bind = useDrag(
    ({down, movement: [mx, my], velocity: [vx, vy], direction: [dx, dy]}) => {
      const movement = axis === 'y' ? my : mx;
      const velocity = axis === 'y' ? vy : vx;
      const direction = axis === 'y' ? dy : dx;
      if (down) {
        api.start({[axis]: movement, immediate: true});
      } else {
        const goingUpOrLeft = movement < -100;
        const goingDownOrRight = movement > 100;
        const shouldCallback =
          goingUpOrLeft ||
          goingDownOrRight ||
          (velocity > 0.5 && direction > 0);
        if (shouldCallback) {
          const windowSpace =
            axis === 'y' ? window.innerHeight : window.innerWidth;
          api.start({
            [axis]: goingUpOrLeft ? -windowSpace : windowSpace,
            config: {tension: 200, friction: 30},
            onResolve: () => callback(goingUpOrLeft ? 'up/left' : 'down/right'),
          });
        } else {
          api.start({[axis]: 0, config: {tension: 300, friction: 30}});
        }
      }
    },
    {axis, pointer: {touch: true}}
  );

  return (
    <animated.div {...bind()} style={{[axis]: axisValue}} className={className}>
      {children}
    </animated.div>
  );
}
