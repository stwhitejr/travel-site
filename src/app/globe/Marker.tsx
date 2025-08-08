import {MapPin} from 'lucide-react';
import {MarkerComponentProps} from './Globe';

const Marker = (props: MarkerComponentProps) => {
  const isSelected = props.selectedMarker === props.id;
  return (
    <div
      className={`rounded-2xl p-1 cursor-pointer ${
        isSelected ? 'bg-red-500 ' : 'bg-red-400 opacity-70 hover:opacity-100'
      } hover:bg-red-500 `}
    >
      <MapPin size={20} id={`MapPin-${props.id}`} />
    </div>
  );
};

export default Marker;
