import Header from '@/components/Header';
import {ReactNode} from 'react';

export default function CategoryLayout(props: {children: ReactNode}) {
  return (
    <div className="flex flex-col h-full md:overflow-y-hidden">
      <Header />
      <div className="flex-2 md:h-full relative md:overflow-y-auto">
        {props.children}
      </div>
    </div>
  );
}
