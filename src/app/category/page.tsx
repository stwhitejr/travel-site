import {getTagsWithHero} from '@/lib/tags';
import Link from 'next/link';
import CategoryTile from './CategoryTile';

export default async function CategoriesPage() {
  const {data} = await getTagsWithHero();

  console.log(data);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-5">
        {data?.map((photo) =>
          photo.file_name ? (
            <Link key={photo.id} href={`/category/${photo.tag_id}`}>
              <CategoryTile {...photo} />
            </Link>
          ) : null
        )}
      </div>
    </div>
  );
}
