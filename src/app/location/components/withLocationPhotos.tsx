import useLocationByIdQuery from '../hooks/useLocationByIdQuery';
import {FC, ReactNode, Suspense} from 'react';
import {PhotoMetadataWithTags} from '@/lib/photos';

interface WithLocationPhotosProps {
  id: number;
  [key: string]: unknown;
}
const withLocationPhotos = (
  Component: FC<WithLocationPhotosProps & {photos: PhotoMetadataWithTags[]}>,
  fallback?: ReactNode
): FC<WithLocationPhotosProps> => {
  const WithLocationPhotos = (props: WithLocationPhotosProps) => {
    const {data} = useLocationByIdQuery({id: props.id});
    return <Component {...props} photos={data.photos} />;
  };
  const SuspensefulWithLocationPhotos = (props: WithLocationPhotosProps) => {
    return (
      <Suspense fallback={fallback}>
        <WithLocationPhotos {...props} />
      </Suspense>
    );
  };

  return SuspensefulWithLocationPhotos;
};

export default withLocationPhotos;
