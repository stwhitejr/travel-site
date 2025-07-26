import DateComponent, {transformDate} from '@/components/DateComponent';
import {PhotoMetadataWithTags} from '@/lib/photos';
import {lato} from '@/util/fonts';
import {useMemo} from 'react';

const mergeDatesWithinSpan = (
  photos: PhotoMetadataWithTags[],
  spanDays = 31
) => {
  const parsed = photos
    .filter((photo) => photo.date)
    .map((photo) => transformDate(photo.date!))
    .sort((a, b) => a.getTime() - b.getTime());

  const merged: Date[] = [];

  for (const date of parsed) {
    const last = merged[merged.length - 1];

    if (!last) {
      merged.push(date);
    } else {
      const diffInDays =
        (date.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
      if (diffInDays > spanDays) {
        merged.push(date);
      }
    }
  }

  return merged;
};

export default function LocationDates(props: {
  photos: PhotoMetadataWithTags[];
}) {
  const dates = useMemo(
    () => mergeDatesWithinSpan(props.photos),
    [props.photos]
  );
  return (
    <div className={`flex gap-2 ${lato.className} text-slate-100 text-xs`}>
      {dates.map((date) => (
        <DateComponent key={date.toString()} date={date} />
      ))}
    </div>
  );
}
