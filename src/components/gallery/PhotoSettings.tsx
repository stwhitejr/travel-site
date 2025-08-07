import {updatePhotoRating} from '@/app/actions/updatePhotoRating';
import {updatePhotoTags} from '@/app/actions/updatePhotoTags';
import {PhotoMetadataWithTags} from '@/lib/photos';
import {Tag} from '@/lib/tags';
import {CircleIcon, Star, StarHalf, TrashIcon} from 'lucide-react';
import {useRouter} from 'next/navigation';

const MAX_RATING = 6;

export default function PhotoSettings({
  allTags = [],
  ...props
}: PhotoMetadataWithTags & {allTags?: Tag[]}) {
  const existingTags = props.tags.map(({id}) => id);

  const router = useRouter();
  const rating = props.rating || 0;
  const ratingArray = Array.from(Array(rating).keys());
  const ratingLeftover = Array.from(Array(MAX_RATING - rating).keys());

  const handleClickRating = async (rating: number) => {
    await updatePhotoRating(props.id, rating);
    // Refresh server components so photo list updates
    router.refresh();
  };
  const handleClickTag = async (tag: Tag, exists: boolean) => {
    const tagIds = exists
      ? existingTags.filter((id) => id !== tag.id)
      : existingTags.concat(tag.id);

    await updatePhotoTags(props.id, tagIds);
    router.refresh();
  };

  return (
    <div className="gap-1">
      <div className="flex gap-1">
        <TrashIcon
          size={15}
          className="cursor-pointer"
          onClick={() => handleClickRating(-1)}
        />
        <CircleIcon
          size={15}
          className="cursor-pointer"
          onClick={() => handleClickRating(0)}
        />
        {ratingArray.map((rating) => (
          <Star
            size={15}
            key={rating}
            onClick={() => handleClickRating(rating + 1)}
            className="text-amber-200 cursor-pointer"
          />
        ))}
        {ratingLeftover.map((entry) => (
          <StarHalf
            size={15}
            className="cursor-pointer"
            key={entry}
            onClick={() => handleClickRating(entry + 1 + rating)}
          />
        ))}
      </div>
      <div className="pt-2 flex text-xs gap-2 flex-wrap">
        {allTags.map((tag) => {
          const existing = existingTags.includes(tag.id);
          return (
            <div
              key={tag.id}
              className={`${
                existing ? 'bg-amber-600 ' : 'bg-slate-600 '
              }text-white rounded-2xl p-2 text-center cursor-pointer $`}
              onClick={() => handleClickTag(tag, existing)}
            >
              {tag.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
