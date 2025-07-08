import {getAllLocations} from '@/lib/location';
import {NextResponse} from 'next/server';

export async function GET() {
  const locations = await getAllLocations();
  return NextResponse.json(locations);
}
