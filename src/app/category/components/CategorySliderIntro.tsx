import {getResourceUrl} from '@/components/gallery/util';
import {anton} from '@/util/fonts';
import {useInView} from 'react-intersection-observer';
import Image from 'next/image';
import {HeroTag} from '@/lib/tags';

export default function CategorySliderIntro(props: HeroTag) {
  const {ref, inView} = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`relative h-full w-full md:overflow-hidden ${anton.className}`}
    >
      <Image
        src={getResourceUrl(props.file_name!)}
        alt={props.tag_description!}
        fill
        className={`object-cover ${inView ? 'cinematic-pan' : ''}`}
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center text-white text-4xl text-shadow-lg/30 text-center p-5">
        {props.tag_description}
      </div>
    </div>
  );
}
