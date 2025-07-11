import SubPageLayout from '@/app/components/SubPageLayout';
import {ReactNode} from 'react';

export default function CategoryLayout(props: {children: ReactNode}) {
  return <SubPageLayout {...props} />;
}
