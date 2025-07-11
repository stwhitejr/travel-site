import SubPageLayout from '@/app/components/SubPageLayout';
import {ReactNode} from 'react';

export default function LocationLayout(props: {children: ReactNode}) {
  return <SubPageLayout {...props} />;
}
