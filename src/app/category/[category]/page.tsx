import {getPhotosByTag} from '@/lib/photos';
import {getTagsWithHero} from '@/lib/tags';
import CategorySlider from '../components/CategorySlider';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{category: string}>;
}) {
  const {category} = await params;
  const categoryId = parseInt(category, 10);
  const {data} = await getPhotosByTag(categoryId);
  const tagsResponse = await getTagsWithHero();

  const getCategoryName = (): {name: string; description?: string} => {
    const match = (tagsResponse.data || []).find(
      (tag) => tag.tag_id == category
    );
    return match
      ? {name: match.tag_name, description: match.tag_description}
      : {name: category};
  };

  return (
    <CategorySlider
      id={categoryId}
      photos={data || []}
      categoryName={getCategoryName()}
      tags={tagsResponse.data || []}
    />
  );
}
