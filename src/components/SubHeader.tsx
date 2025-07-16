'use client';

import {lato} from '@/util/fonts';
import {ChevronLeftIcon, ChevronRightIcon} from 'lucide-react';
import Link from 'next/link';
import {ReactNode} from 'react';

export const SubHeaderLink = ({
  href,
  children,
  dir = 'left',
}: {
  href: string;
  children: ReactNode;
  dir?: 'left' | 'right';
}) => {
  const IconComponent = dir === 'left' ? ChevronLeftIcon : ChevronRightIcon;
  const icon = <IconComponent className="inline w-3" />;
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 hover:underline text-[#dfe3eb] hover:text-white`}
    >
      {dir === 'left' && icon} {children} {dir === 'right' && icon}
    </Link>
  );
};

export default function SubHeader({children}: {children?: ReactNode}) {
  return (
    <div
      className={`flex px-5 py-2 items-center justify-between bg-[#141518] ${lato.className}`}
    >
      {children}
    </div>
  );
}
