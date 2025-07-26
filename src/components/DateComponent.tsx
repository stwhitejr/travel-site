import {PhotoMetadataWithTags} from '@/lib/photos';

export const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: '2-digit',
});

export const transformDate = (
  dateObject: NonNullable<PhotoMetadataWithTags['date']>
) => new Date(`${dateObject.month}/${dateObject.day}/${dateObject.year}`);

export default function DateComponent({
  date,
}: {
  date: PhotoMetadataWithTags['date'] | Date;
}) {
  if (!date) {
    return null;
  }

  const humanReadableDate = dateFormatter.format(
    date instanceof Date ? date : transformDate(date)
  );
  return (
    <div className="bg-[#354754] py-1 px-3 rounded-xl whitespace-nowrap">
      {humanReadableDate}
    </div>
  );
}
