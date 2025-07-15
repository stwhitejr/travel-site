'use client';

import {lato} from '@/util/fonts';
import {ChevronLeft} from 'lucide-react';
import Link from 'next/link';
import {ReactNode} from 'react';

export default function SubHeader({
  backHref,
  relativeNavigation,
}: {
  backHref: string;
  relativeNavigation?: ReactNode;
}) {
  return (
    <div
      className={`flex px-5 py-2 items-center justify-between bg-[#141518] text-[#b6b8bc] ${lato.className}`}
    >
      <div className="flex items-center justify-center">
        <ChevronLeft className="inline w-3" strokeWidth={1} />
        <Link className="hover:underline text-sm" href={backHref}>
          Back to all
        </Link>
      </div>
      <div>{relativeNavigation}</div>
    </div>
  );
}
