import Gallery from '@/app/gallery/Gallery';
import {getPhotosByTag} from '@/lib/photos';
import {getAllTags} from '@/lib/tags';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{category: string}>;
}) {
  const {category} = await params;
  const {data} = await getPhotosByTag(parseInt(category, 10));
  const tagsResponse = await getAllTags();

  return (
    <div>
      <div>category {tagsResponse.data[category]}</div>
      <div>
        {/* @ts-expect-error ??? */}
        <Gallery photos={data || []} />
      </div>
    </div>
  );
}
