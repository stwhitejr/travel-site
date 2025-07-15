import {ReactNode} from 'react';
import Header from './Header';

export default function SubPageLayout({children}: {children: ReactNode}) {
  return (
    <div className="flex flex-col h-[100vh] md:overflow-y-hidden">
      <Header />
      <div className="flex-2 h-full relative md:overflow-y-hidden">
        {children}
      </div>
    </div>
  );
}
