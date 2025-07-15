'use client';

import {anton, lato, playwrite} from '@/util/fonts';
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
          ? 'bg-slate-800 text-amber-100'
          : 'hover:bg-slate-800 hover:text-amber-100 text-slate-100'
      }  rounded-sm  `}
    >
      {props.children}
    </div>
  );

  return isActive ? content : <Link href={props.href}>{content}</Link>;
};

const Logo = () => {
  return (
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
        <Link className="text-2xl" href="/">
          Freewheelin
        </Link>
        <div
          className={`${lato.className} mt-[-2px] opacity-70 text-xs tracking-wider`}
        >
          because i can
        </div>
      </div>
    </div>
  );
};

export default function Header() {
  return (
    <Suspense>
      <div className="py-4 px-5 flex justify-between items-center  text-black">
        <Logo />
        <div className="flex gap-2">
          <HeaderLink href="/location">Locations</HeaderLink>
          <HeaderLink href="/category">Categories</HeaderLink>
        </div>
      </div>
    </Suspense>
  );
}
