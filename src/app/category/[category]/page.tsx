import Gallery from '@/components/gallery/Gallery';
import {getPhotosByTag} from '@/lib/photos';
import {getAllTags} from '@/lib/tags';
import SubHeader from '@/components/SubHeader';

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
    <div className="flex flex-col h-full">
      <div>
        <SubHeader backHref="/category" currentTitle={tagName} />
      </div>
      <div className="px-5 flex-1 h-full">
        <Gallery photos={data || []} />
      </div>
    </div>
  );
}
