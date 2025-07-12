import SubPageLayout from '@/components/SubPageLayout';
import HydrateClient from '@/components/query/HydrateClient';
import getQueryClient from '@/components/query/util';
import {queryAllLocations} from '@/lib/location';
import {getServerClient} from '@/util/supabase/server';
import {dehydrate} from '@tanstack/react-query';
import {ReactNode} from 'react';

const getLocations = async () => {
  const supabase = await getServerClient();
  const result = await queryAllLocations(supabase);
  return result.data || [];
};

export default async function LocationLayout(props: {children: ReactNode}) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['locations'],
    queryFn: getLocations,
  });

  // Get the data during server render and hydrate query so we can access in client components
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateClient state={dehydratedState}>
      <SubPageLayout {...props} />
    </HydrateClient>
  );
}
