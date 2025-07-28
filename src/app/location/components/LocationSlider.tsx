'use client';

import {Tag} from '@/lib/tags';
import {Suspense, useCallback, useMemo} from 'react';
import useRelativeLocations from '../hooks/useRelativeLocations';
import LocationEntry from './LocationEntry';
import {useRouter, useSearchParams} from 'next/navigation';
import 'swiper/css';
import Loading from '@/app/loading';
import LocationSliderIntro from './LocationSliderIntro';
import PageSlider, {
  CurrentPageComponentProps,
} from '@/components/page_slider/PageSlider';

export default function LocationSlider(props: {id: string; allTags: Tag[]}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const parsedId = parseInt(props.id, 10);

  const {previous, next} = useRelativeLocations(parsedId);

  const PreviousPageComponent = useMemo(() => {
    const PreviousPage = () => <LocationSliderIntro {...previous} />;
    return PreviousPage;
  }, [previous]);

  const NextPageComponent = useMemo(() => {
    const NextPage = () => <LocationSliderIntro {...next} />;
    return NextPage;
  }, [next]);

  const CurrentPageComponent = useMemo(() => {
    const CurrentPage = (_props: CurrentPageComponentProps) => (
      <Suspense fallback={<Loading />}>
        <LocationEntry {..._props} allTags={props.allTags} />
      </Suspense>
    );
    return CurrentPage;
  }, [props.allTags]);

  const onSlideFullyTransitioned = useCallback((id: string | number) => {
    const locationId = typeof id === 'string' ? parseInt(id, 10) : id;
    const params = new URLSearchParams(searchParams.toString());
    params.set('id', locationId.toString());
    router.replace(`?${params.toString()}`, {scroll: false});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageSlider
      PreviousPageComponent={PreviousPageComponent}
      NextPageComponent={NextPageComponent}
      CurrentPageComponent={CurrentPageComponent}
      id={parsedId}
      nextId={next.id}
      previousId={previous.id}
      onSlideFullyTransitioned={onSlideFullyTransitioned}
    />
  );
}
