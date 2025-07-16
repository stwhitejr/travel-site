'use client';

import {anton, noto, playwrite} from '@/util/fonts';
import Link from 'next/link';
import {ReactNode, Suspense} from 'react';
import {usePathname, useSearchParams} from 'next/navigation';
import Image from 'next/image';

const HeaderLink = (props: {href: string; children: ReactNode}) => {
  const searchParams = useSearchParams();
  const entityId = searchParams.get('id');
  const pathname = usePathname();

  const isActive = !entityId && pathname === props.href;
  const content = (
    <div
      className={`${anton.className}  uppercase  tracking-wider p-1 px-4  ${
        isActive
          ? 'bg-[#354754] text-amber-100'
          : 'hover:bg-[#354754] hover:text-amber-50 text-slate-100'
      }  rounded-sm  `}
    >
      {props.children}
    </div>
  );

  return isActive ? content : <Link href={props.href}>{content}</Link>;
};

const Logo = () => {
  return (
    <Link className="text-2xl" href="/">
      <div
        className={`${playwrite.className} flex gap-3 items-end  text-white  relative`}
      >
        <Image
          src="/logo.png"
          width={80}
          height={50}
          alt="Freewheelin"
          className=""
        />
        <div>
          <div className="text-2xl">Freewheelin</div>
          <div
            className={`${noto.className} mt-[-2px] opacity-50 text-xs lowercase text-center text-amber-100`}
          >
            the journey
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function Header() {
  return (
    <Suspense>
      <div className="py-4 px-5 flex flex-col md:flex-row gap-3 justify-between items-center  text-black">
        <Logo />
        <div className="flex gap-2">
          <HeaderLink href="/location">Locations</HeaderLink>
          <HeaderLink href="/category">Categories</HeaderLink>
        </div>
      </div>
    </Suspense>
  );
}
