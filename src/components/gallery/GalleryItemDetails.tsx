import {PhotoMetadataWithTags} from '@/lib/photos';
import DateComponent from '../DateComponent';
import {MouseEvent, ReactNode} from 'react';
import useLocationById from '@/app/location/hooks/useLocationByIdQuery';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {anton, lato} from '@/util/fonts';
import {XIcon} from 'lucide-react';

const Detail = (props: {children: ReactNode; label: ReactNode}) => (
  <div>
    <div
      className={`${anton.className} text-slate-300 uppercase tracking-wide`}
    >
      {props.label}
    </div>
    <div>{props.children}</div>
  </div>
);

export default function GalleryItemDetails({
  children,
  onClose,
  ...props
}: PhotoMetadataWithTags & {
  children?: ReactNode;
  onClose?: ((e: MouseEvent<HTMLButtonElement>) => void) | null;
}) {
  const pathname = usePathname();

  const isLocationPage = pathname === '/location';

  const {data: locationData} = useLocationById({id: props.location_id});
  return (
    <div className="p-2 flex gap-2 items-start justify-between">
      <div
        className={`flex-wrap items-start flex flex-col gap-5 text-sm ${lato.className}`}
      >
        <DateComponent date={props.date} />
        <Detail label="Camera">{props.camera || 'Canon EOS R5'}</Detail>
        {locationData && !isLocationPage && (
          <Detail label="Location">
            <Link
              href={`/location?id=${locationData.id}`}
              className="text-amber-100 hover:underline"
            >
              {locationData.title}
            </Link>
          </Detail>
        )}
        {children}
      </div>
      {onClose && (
        <button onClick={onClose} className="cursor-pointer">
          <XIcon />
        </button>
      )}
    </div>
  );
}
