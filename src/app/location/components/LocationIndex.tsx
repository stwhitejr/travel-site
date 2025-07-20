import TextInput from '@/components/TextInput';
import {Location} from '@/lib/location';

export default function LocationIndex({
  sort_index,
  onChange,
}: Pick<Location, 'sort_index'> & {
  onChange: (value: number) => void;
}) {
  return (
    <TextInput
      label="Index"
      type="number"
      value={sort_index || 0}
      onChange={({target: {value}}) => onChange(parseInt(value, 10))}
    />
  );
}
