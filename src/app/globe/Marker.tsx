import {MapPin} from 'lucide-react';
import {MarkerComponentProps} from './Globe';

const Marker = (props: MarkerComponentProps) => {
  const isSelected = props.selectedMarker === props.id;
  return (
    <MapPin
      className={`rounded-xl p-1 cursor-pointer width-[20px] height-[20px] ${
        isSelected ? 'bg-red-500 ' : 'bg-red-400 opacity-80 hover:opacity-100'
      } hover:bg-red-500 `}
    />
  );
};

export default Marker;
