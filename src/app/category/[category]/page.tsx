import Gallery from '@/app/gallery/Gallery';
import {getPhotosByTag} from '@/lib/photos';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{category: string}>;
}) {
  const {category} = await params;
  const {data} = await getPhotosByTag(parseInt(category, 10));

  return (
    <div>
      <div>category {category}</div>
      <div>
        <Gallery photos={data || []} />
      </div>
    </div>
  );
}
