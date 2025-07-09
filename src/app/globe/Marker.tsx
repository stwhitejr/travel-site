import {MarkerComponentProps} from './Globe';

const Marker = (props: MarkerComponentProps) => {
  const isSelected = props.selectedMarker === props.id;
  return (
    <div
      className={`${isSelected ? 'bg-red-500' : 'bg-red-400'} hover:bg-red-500`}
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        border: '2px solid white',
        boxShadow: '0 0 5px rgba(0,0,0,0.5)',
        cursor: 'pointer',
      }}
    />
  );
};

export default Marker;
