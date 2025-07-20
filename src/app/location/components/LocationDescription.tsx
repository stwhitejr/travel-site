import TextInput from '@/components/TextInput';

export default function LocationDescription(props: {
  isEditing: boolean;
  address: string;
  description: string | null;
  onChange: (arg: string) => void;
}) {
  if (!props.isEditing) {
    return props.description || props.address;
  }
  return (
    <TextInput
      label="description"
      value={props.description || ''}
      onChange={({target: {value}}) => props.onChange(value)}
    />
  );
}
