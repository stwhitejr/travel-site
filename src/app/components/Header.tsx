'use client';

import {anton} from '@/util/fonts';
import Link from 'next/link';
import {ReactNode} from 'react';
import {usePathname} from 'next/navigation';

const HeaderLink = (props: {href: string; children: ReactNode}) => {
  const pathname = usePathname();

  const isActive = pathname === props.href;
  const content = (
    <div
      className={`p-1 px-4 ${
        isActive ? 'font-bold' : 'bg-emerald-700 hover:bg-emerald-900'
      }  rounded-sm m-1 `}
    >
      {props.children}
    </div>
  );

  return isActive ? content : <Link href={props.href}>{content}</Link>;
};

const Logo = () => {
  return (
    <div className={`${anton.className}`}>
      <Link href="/">Freewheelin</Link>
    </div>
  );
};

export default function Header() {
  return (
    <div className="p-2 px-5 flex justify-between items-center">
      <Logo />
      <div className="flex">
        <HeaderLink href="/location">Locations</HeaderLink>
        <HeaderLink href="/category">Categories</HeaderLink>
      </div>
    </div>
  );
}
