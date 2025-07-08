import Gallery from '@/app/gallery/Gallery';
import {getPhotosByTag} from '@/lib/photos';

export default async function CategoryPage({
  params,
}: {
  params: {category: string};
}) {
  const {category} = await params;
  const {data} = await getPhotosByTag(category);

  return (
    <div>
      <div>category {category}</div>
      <div>
        <Gallery photos={data} />
      </div>
    </div>
  );
}
