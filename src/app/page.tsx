import Link from 'next/link';
import {getResourceUrl} from '@/components/gallery/util';
import {ReactNode} from 'react';
import {Image as ImageIcon, MapPin} from 'lucide-react';
import {anton} from '@/util/fonts';

const PageLink = (props: {href: string; children: ReactNode}) => {
  return (
    <Link href={props.href}>
      <div className="p-4 px-8 bg-emerald-700 rounded-sm m-2 hover:bg-emerald-900">
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
        <source src={getResourceUrl('landscape_web', 'mp4')} type="video/mp4" />
      </video>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover block sm:hidden"
      >
        <source src={getResourceUrl('portrait_web', 'mp4')} type="video/mp4" />
      </video>
      <div
        className={`w-[50vw] absolute top-1/2 translate-x-1/2 -translate-y-1/2 ${anton.className}`}
      >
        <div className="mb-4 text-white text-5xl sm:text-7xl text-center drop-shadow-lg">
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
