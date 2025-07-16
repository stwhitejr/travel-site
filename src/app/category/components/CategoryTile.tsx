'use client';

import Image from 'next/image';
import {getResourceUrl} from '@/components/gallery/util';
import {anton} from '@/util/fonts';
import {HeroTag} from '@/lib/tags';

export default function CategoryTile(props: HeroTag) {
  if (!props.file_name || !props.tag_name) {
    return null;
  }
  const imageUrl = getResourceUrl(props.file_name);
  return (
    <div
      className={`relative w-full h-64 overflow-hidden rounded-lg group  ${anton.className}`}
    >
      <Image
        src={imageUrl}
        alt={props.tag_name}
        fill
        className="object-cover group-hover:scale-105 transition-transform -opacity duration-300 opacity-100 md:opacity-70 group-hover:opacity-100"
        priority
        {...(props.blur ? {blurDataURL: props.blur, placeholder: 'blur'} : {})}
      />
      <div className="absolute inset-0 flex items-center justify-center text-white text-4xl  opacity-80 group-hover:opacity-100 group-hover:drop-shadow-lg">
        {props.tag_name}
      </div>
    </div>
  );
}
