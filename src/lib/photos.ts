import {getServerClient} from '@/util/supabase/server';
import {Database} from './database.types';
import {Tag} from './tags';

export type PhotoMetadata =
  Database['public']['Tables']['photo_metadata']['Row'];

export type PhotoMetadataWithTags = PhotoMetadata & {
  tags: Array<Partial<Omit<Tag, 'id'>> & {id: number}>;
};

export const getPhotosByTag = async (tagId: number) => {
  const supabase = await getServerClient();
  const allPhotoTagsResult = await supabase.from('photo_tags').select('*');

  const allPhotoTags = allPhotoTagsResult.data?.reduce(
    (acc, {tag_id, photo_id}) => {
      if (acc[photo_id]) {
        acc[photo_id].push({id: tag_id});
      } else {
        acc[photo_id] = [{id: tag_id}];
      }

      return acc;
    },
    {}
  );

  const hydratedPhotoMetadataResult = await supabase
    .from('photo_tags')
    .select(
      `
        photo:photo_metadata (
          *
        )
      `
    )
    .eq('tag_id', tagId);

  // @ts-expect-error not sure why supabase doesn't get this right
  const photos = (hydratedPhotoMetadataResult.data || []) as {
    photo: PhotoMetadata;
  }[];
  const data = photos.map((result) => ({
    ...result.photo,
    tags: allPhotoTags[result.photo.id] || [],
  }));

  return {
    ...hydratedPhotoMetadataResult,
    data,
  };
};

export const getPhotoTags = async (photoId: number) => {
  const supabase = await getServerClient();
  const result = await supabase
    .from('photo_tags')
    .select(
      `
        tags (
          *
        )
      `
    )
    .eq('photo_id', photoId);
  const data = (result.data || []).map(
    // @ts-expect-error not sure why supabase is getting the typing wrong
    (result) => result.photo as PhotoMetadata
  );

  return {
    ...result,
    data,
  };
};
