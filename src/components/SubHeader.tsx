'use client';

import {lato} from '@/util/fonts';
import {ChevronLeftIcon, ChevronRightIcon} from 'lucide-react';
import {ReactNode} from 'react';

export const SubHeaderLink = ({
  children,
  onClick,
  dir = 'left',
}: {
  onClick: () => void;
  children: ReactNode;
  dir?: 'left' | 'right';
}) => {
  const IconComponent = dir === 'left' ? ChevronLeftIcon : ChevronRightIcon;
  const icon = <IconComponent className="inline w-3" />;
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer flex items-center gap-2 hover:underline text-[#dfe3eb] hover:text-white`}
    >
      {dir === 'left' && icon} {children} {dir === 'right' && icon}
    </button>
  );
};

export default function SubHeader({children}: {children?: ReactNode}) {
  return (
    <div
      className={`flex p-2 items-center justify-between bg-[#141518] ${lato.className}`}
    >
      {children}
    </div>
  );
}
