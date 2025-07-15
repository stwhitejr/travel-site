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
      className={`relative w-full h-64 overflow-hidden rounded-lg shadow-md group ${anton.className}`}
    >
      <Image
        src={imageUrl}
        alt={props.tag_name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        priority
      />
      <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:opacity-0" />
      <div className="absolute inset-0 flex items-center justify-center text-white tracking-wide text-3xl font-bold opacity-80 group-hover:opacity-100 group-hover:drop-shadow-lg">
        {props.tag_name}
      </div>
    </div>
  );
}
