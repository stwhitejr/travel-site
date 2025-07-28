'use client';

import {Suspense, useCallback, useMemo} from 'react';
import {useRouter} from 'next/navigation';
import 'swiper/css';
import Loading from '@/app/loading';
import CategorySliderIntro from './CategorySliderIntro';
import PageSlider, {
  CurrentPageComponentProps,
} from '@/components/page_slider/PageSlider';
import Category, {CategoryProps} from './Category';
import {useRelativeCategories} from './CategoryRelativeNavigation';

export default function CategorySlider(props: CategoryProps) {
  const router = useRouter();
  const {previous, next} = useRelativeCategories({
    id: props.id,
    tags: props.tags || [],
  });

  const PreviousPageComponent = useMemo(() => {
    const PreviousPage = () => <CategorySliderIntro {...previous} />;
    return PreviousPage;
  }, [previous]);

  const NextPageComponent = useMemo(() => {
    const NextPage = () => <CategorySliderIntro {...next} />;
    return NextPage;
  }, [next]);

  const CurrentPageComponent = useMemo(() => {
    const CurrentPage = (_props: CurrentPageComponentProps) => (
      <Suspense fallback={<Loading />}>
        <Category {...props} {..._props} />
      </Suspense>
    );
    return CurrentPage;
  }, [props]);

  const onSlideFullyTransitioned = useCallback((id: string | number) => {
    const newId = typeof id === 'string' ? parseInt(id, 10) : id;
    // TODO: could we have this page render earlier so we don't see a loader? can we use this slider intro as the fallback?
    router.push(`/category/${newId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageSlider
      PreviousPageComponent={PreviousPageComponent}
      NextPageComponent={NextPageComponent}
      CurrentPageComponent={CurrentPageComponent}
      id={props.id}
      nextId={next.tag_id!}
      previousId={previous.tag_id!}
      onSlideFullyTransitioned={onSlideFullyTransitioned}
    />
  );
}
