'use client';

import {ChevronRight} from 'lucide-react';
import Link from 'next/link';

export default function CategoryHeader({categoryName}: {categoryName: string}) {
  return (
    <div className="flex px-5 pb-4 items-center">
      <div className="hover:underline text-sm">
        <Link href="/category">Back to all categories</Link>
      </div>
      <ChevronRight />
      <div className="font-bold">{categoryName}</div>
    </div>
  );
}
