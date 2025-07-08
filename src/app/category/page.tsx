import {getTagsWithHero} from '@/lib/tags';
import Image from 'next/image';
import {getImageUrl} from '../gallery/util';
import Link from 'next/link';

export default async function CategoriesPage() {
  const {data} = await getTagsWithHero();

  return (
    <div>
      {data?.map((photo) =>
        photo.file_name ? (
          <Link key={photo.id} href={`/category/${photo.tag_id}`}>
            <Image
              src={getImageUrl(photo.file_name)}
              width={200}
              height={200}
              alt={photo.tag_name || ''}
            />
          </Link>
        ) : null
      )}
    </div>
  );
}
