import TextInput from '@/components/TextInput';

export default function LocationTitle(props: {
  isEditing: boolean;
  title: string;
  onChange: (arg: string) => void;
}) {
  if (!props.isEditing) {
    return props.title;
  }
  return (
    <TextInput
      label="Title"
      value={props.title}
      onChange={({target: {value}}) => props.onChange(value)}
    />
  );
}
