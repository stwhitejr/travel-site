import Gallery from '@/components/gallery/Gallery';
import {getPhotosByTag} from '@/lib/photos';
// import {getAllTags} from '@/lib/tags';
import SubHeader from '@/components/SubHeader';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{category: string}>;
}) {
  const {category} = await params;
  const {data} = await getPhotosByTag(parseInt(category, 10));
  // const tagsResponse = await getAllTags();
  // const tagName = tagsResponse.data[category];

  return (
    <div className="flex flex-col h-full md:overflow-y-hidden">
      <div>
        <SubHeader backHref="/category" />
      </div>
      <div className="m-2 flex-1 h-full md:overflow-y-auto">
        <Gallery photos={data || []} />
      </div>
    </div>
  );
}
