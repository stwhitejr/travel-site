import {LoaderPinwheel} from 'lucide-react';
import {ComponentProps} from 'react';

export default function LoadingIcon({
  className = '',
}: Pick<ComponentProps<typeof LoaderPinwheel>, 'className'>) {
  return (
    <LoaderPinwheel
      size={50}
      className={`font-5xl animate-spin m-auto ${className}`}
    />
  );
}
