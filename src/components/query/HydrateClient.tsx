'use client';

import {DehydratedState, HydrationBoundary} from '@tanstack/react-query';
import {ReactNode} from 'react';

export default function HydrateClient({
  state,
  children,
}: {
  state: DehydratedState;
  children: ReactNode;
}) {
  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}
