import {ReactNode} from 'react';
import Header from './Header';

export default function SubPageLayout({children}: {children: ReactNode}) {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
}
