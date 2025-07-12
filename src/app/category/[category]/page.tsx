import Gallery from '@/components/gallery/Gallery';
import {getPhotosByTag} from '@/lib/photos';
import {getAllTags} from '@/lib/tags';
import CategoryHeader from './CategoryHeader';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{category: string}>;
}) {
  const {category} = await params;
  const {data} = await getPhotosByTag(parseInt(category, 10));
  const tagsResponse = await getAllTags();
  const tagName = tagsResponse.data[category];

  return (
    <div>
      <div>
        <CategoryHeader categoryName={tagName} />
      </div>
      <div className="px-5">
        <Gallery photos={data || []} />
      </div>
    </div>
  );
}
