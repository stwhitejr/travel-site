import {getLocationById} from '@/lib/location';
import {NextResponse} from 'next/server';

export async function GET(_: Request, {params}: {params: {id: string}}) {
  const location = await getLocationById(params.id);
  if (!location) return NextResponse.json({error: 'Not found'}, {status: 404});
  return NextResponse.json(location);
}
