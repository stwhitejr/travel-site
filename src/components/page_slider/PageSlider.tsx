'use client';

import {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Swiper, SwiperRef, SwiperSlide} from 'swiper/react';
import {EffectCreative, Keyboard} from 'swiper/modules';
import 'swiper/css';

interface PageSliderContextValue {
  ref?: SwiperRef | null;
  disableSwiper?: () => void;
  enableSwiper?: () => void;
}
export const PageSliderContext = createContext<PageSliderContextValue>({});

export const usePageSliderContext = () => useContext(PageSliderContext);

const SLIDE_TRANSITION_TIME = 2000;

export interface CurrentPageComponentProps {
  id: string | number;
  withinView: boolean;
  onChangePage: (dir: 'previous' | 'next') => void;
  slideDirection: 'previous' | 'next';
}

export interface PageSliderProps {
  id: string | number;
  previousId: string | number;
  nextId: string | number;
  onSlideFullyTransitioned: (id: string | number) => void;
  PreviousPageComponent: FC<{id: string | number}>;
  NextPageComponent: FC<{id: string | number}>;
  CurrentPageComponent: FC<CurrentPageComponentProps>;
}

export default function PageSlider({
  PreviousPageComponent,
  NextPageComponent,
  CurrentPageComponent,
  ...props
}: PageSliderProps) {
  const slideDirection = useRef<'previous' | 'next'>('previous');
  const swiperRef = useRef<SwiperRef>(null);
  const [currentId, setCurrentId] = useState(props.id);
  const [upstreamIsAboutToUpdate, setUpstreamIsAboutToUpdate] = useState(false);

  const disableSwiper = () => {
    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      swiper.allowTouchMove = false;
      swiper.keyboard.disable();
      swiper.mousewheel?.disable?.();
    }
  };

  const enableSwiper = () => {
    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      swiper.allowTouchMove = true;
      swiper.keyboard.enable();
      swiper.mousewheel?.enable?.();
    }
  };

  // Reset swiper to index 2 when search param changes
  useEffect(() => {
    swiperRef.current?.swiper.slideTo(2, 0, false);
    setUpstreamIsAboutToUpdate(false);
  }, [props.id]);

  // Go to the empty slides 0 or 4 right before we slide to the main slide
  // This gives us the transition of the previous slides actually moving off the screen
  useEffect(() => {
    if (upstreamIsAboutToUpdate) {
      swiperRef.current?.swiper.slideTo(
        slideDirection.current === 'previous' ? 0 : 4
      );
    }
  }, [upstreamIsAboutToUpdate]);

  // Hit callback when selected page is fully in view
  useEffect(() => {
    if (currentId !== props.id) {
      disableSwiper();

      const timer1 = setTimeout(() => {
        setUpstreamIsAboutToUpdate(true);
      }, 1990);

      const timer2 = setTimeout(() => {
        enableSwiper();
        props.onSlideFullyTransitioned(currentId);
      }, SLIDE_TRANSITION_TIME);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId]);

  const swiperIndex = swiperRef.current?.swiper.activeIndex || 2;

  return (
    <PageSliderContext.Provider
      value={{ref: swiperRef.current, disableSwiper, enableSwiper}}
    >
      <Swiper
        ref={swiperRef}
        initialSlide={2}
        className={`w-full h-full  overflow-y-hidden`}
        modules={[Keyboard, EffectCreative]}
        keyboard={{enabled: true}}
        effect="creative"
        speed={500}
        creativeEffect={{
          prev: {
            translate: ['-50%', 0, 0],
            opacity: 0,
            scale: 0.9,
          },
          next: {
            translate: ['50%', 0, 0],
            opacity: 0,
            scale: 0.9,
          },
        }}
        onSlideChange={(swiper) => {
          if (swiper.activeIndex === 1) {
            slideDirection.current = 'previous';
            setCurrentId(props.previousId);
          } else if (swiper.activeIndex === 3) {
            slideDirection.current = 'next';
            setCurrentId(props.nextId);
          }
        }}
      >
        <SwiperSlide></SwiperSlide>
        <SwiperSlide key={`${props.previousId}_0`}>
          {swiperIndex === 1 && <PreviousPageComponent id={props.previousId} />}
        </SwiperSlide>
        <SwiperSlide>
          {(swiperIndex === 2 || upstreamIsAboutToUpdate) && (
            <CurrentPageComponent
              key={currentId}
              id={currentId}
              withinView={currentId === props.id}
              slideDirection={slideDirection.current}
              onChangePage={(dir) => {
                slideDirection.current = dir;
                swiperRef.current?.swiper.slideTo(
                  dir === 'previous' ? 1 : 3,
                  0,
                  false
                );
              }}
            />
          )}
        </SwiperSlide>
        <SwiperSlide key={`${props.nextId}_2`}>
          {swiperIndex === 3 && <NextPageComponent id={props.nextId} />}
        </SwiperSlide>
        <SwiperSlide></SwiperSlide>
      </Swiper>
    </PageSliderContext.Provider>
  );
}
