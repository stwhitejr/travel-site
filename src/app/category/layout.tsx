import SubPageLayout from '@/components/SubPageLayout';
import {ReactNode} from 'react';

export default function CategoryLayout(props: {children: ReactNode}) {
  return <SubPageLayout {...props} />;
}
