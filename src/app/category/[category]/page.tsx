import {getPhotosByTag} from '@/lib/photos';
import {getAllTags} from '@/lib/tags';
import SubHeader from '@/components/SubHeader';
import CategoryRelativeNavigation from '../components/CategoryRelativeNavigation';
import Category from '../components/Category';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{category: string}>;
}) {
  const {category} = await params;
  const {data} = await getPhotosByTag(parseInt(category, 10));
  const tagsResponse = await getAllTags();

  const getCategoryName = (): {name: string; description?: string} => {
    const match = (tagsResponse.data || []).find((tag) => tag.id == category);
    return match || {name: category};
  };

  return (
    <div className="flex flex-col h-full md:overflow-y-hidden">
      <div>
        <SubHeader>
          <CategoryRelativeNavigation
            tags={tagsResponse.data || []}
            id={parseInt(category, 10)}
          />
        </SubHeader>
      </div>
      <Category photos={data || []} categoryName={getCategoryName()} />
    </div>
  );
}
