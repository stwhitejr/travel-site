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
import {Keyboard} from 'swiper/modules';
import 'swiper/css';

interface PageSliderContextValue {
  ref?: SwiperRef | null;
  disableSwiper?: () => void;
  enableSwiper?: () => void;
}
export const PageSliderContext = createContext<PageSliderContextValue>({});

export const usePageSliderContext = () => useContext(PageSliderContext);

const SLIDE_TRANSITION_TIME = 1000;

export interface CurrentPageComponentProps {
  id: string | number;
  withinView: boolean;
  onChangePage: (dir: 'previous' | 'next') => void;
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
  const swiperRef = useRef<SwiperRef>(null);
  const [currentId, setCurrentId] = useState(props.id);

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

  // Reset swiper to index 1 when search param changes
  useEffect(() => {
    swiperRef.current?.swiper.slideTo(1, 0, false);
  }, [props.id]);

  // Hit callback when selected page is fully in view
  useEffect(() => {
    if (currentId !== props.id) {
      disableSwiper();

      const timer = setTimeout(() => {
        enableSwiper();
        props.onSlideFullyTransitioned(currentId);
      }, SLIDE_TRANSITION_TIME);

      return () => {
        clearTimeout(timer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId]);

  return (
    <PageSliderContext.Provider
      value={{ref: swiperRef.current, disableSwiper, enableSwiper}}
    >
      <Swiper
        ref={swiperRef}
        initialSlide={1}
        className={`w-full h-full overflow-y-hidden`}
        modules={[Keyboard]}
        keyboard={{enabled: true}}
        onSlideChange={(swiper) => {
          if (swiper.activeIndex === 0) {
            setCurrentId(props.previousId);
          } else if (swiper.activeIndex === 2) {
            setCurrentId(props.nextId);
          }
        }}
      >
        <SwiperSlide key={`${props.previousId}_0`}>
          {/* TODO: unsure why this shows on initial mount regardless of initialSlide */}
          {currentId === props.previousId && (
            <PreviousPageComponent id={props.previousId} />
          )}
        </SwiperSlide>
        <SwiperSlide key={`${currentId}_1`}>
          <CurrentPageComponent
            id={currentId}
            withinView={currentId === props.id}
            onChangePage={(dir) => {
              swiperRef.current?.swiper.slideTo(
                dir === 'previous' ? 0 : 2,
                0,
                false
              );
            }}
          />
        </SwiperSlide>
        <SwiperSlide key={`${props.nextId}_2`}>
          <NextPageComponent id={props.nextId} />
        </SwiperSlide>
      </Swiper>
    </PageSliderContext.Provider>
  );
}
