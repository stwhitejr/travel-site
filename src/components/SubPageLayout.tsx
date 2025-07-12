import {ReactNode} from 'react';
import Header from './Header';

export default function SubPageLayout({children}: {children: ReactNode}) {
  return (
    <div className="flex flex-col h-[100vh] overflow-y-hidden">
      <Header />
      <div className="flex-2 relative">{children}</div>
    </div>
  );
}
