'use client';

import {lato} from '@/util/fonts';
import {ChevronRight} from 'lucide-react';
import Link from 'next/link';
import {ReactNode} from 'react';

export default function SubHeader({
  backHref,
  currentTitle,
  relativeNavigation,
}: {
  backHref: string;
  currentTitle: string;
  relativeNavigation?: ReactNode;
}) {
  return (
    <div
      className={`flex px-5 py-2 items-center justify-between bg-[#141518] text-[#b6b8bc] ${lato.className}`}
    >
      <div className="flex items-center">
        <div className="hover:underline text-sm">
          <Link href={backHref}>Back to all</Link>
        </div>
        <ChevronRight strokeWidth={1} />
        <div className="font-bold text-sm">{currentTitle}</div>
      </div>
      <div>{relativeNavigation}</div>
    </div>
  );
}
