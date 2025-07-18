import Link from 'next/link';
import {getResourceUrl} from '@/components/gallery/util';
import {ReactNode} from 'react';
import {Image as ImageIcon, MapPin} from 'lucide-react';
import {anton, lato} from '@/util/fonts';
import Image from 'next/image';

const PageLink = (props: {href: string; children: ReactNode}) => {
  return (
    <Link href={props.href}>
      <div className="p-4 px-8 uppercase bg-gray-700 opacity-80 hover:opacity-100 rounded-sm m-2 ">
        {props.children}
      </div>
    </Link>
  );
};

export default function Home() {
  return (
    <div>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover hidden sm:block"
      >
        <source
          src={getResourceUrl('landscape_web_compr', {
            ext: 'mp4',
            isVideo: true,
          })}
          type="video/mp4"
        />
      </video>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover block sm:hidden"
      >
        <source
          src={getResourceUrl('portrait_web', {ext: 'webm', isVideo: true})}
          type="video/webm"
        />
        <source
          src={getResourceUrl('portrait_web_compr', {
            ext: 'mp4',
            isVideo: true,
          })}
          type="video/mp4"
        />
      </video>
      <div
        className={`w-[50vw] absolute top-1/2 translate-x-1/2 -translate-y-1/2 ${anton.className}`}
      >
        <Image
          src="/logo.png"
          width={100}
          height={50}
          alt="Freewheelin’"
          className="m-auto mb-2 opacity-80"
        />
        <div
          className={`mb-2 uppercase text-white text-5xl sm:text-4xl text-center drop-shadow-lg tracking-widest ${lato.className} `}
        >
          Explore
        </div>
        <div className="flex justify-center">
          <PageLink href="/location">
            <MapPin className="m-auto mb-2" />
            <div>Locations</div>
          </PageLink>
          <PageLink href="/category">
            <ImageIcon className="m-auto mb-2" />
            <div>Categories</div>
          </PageLink>
        </div>
      </div>
    </div>
  );
}
