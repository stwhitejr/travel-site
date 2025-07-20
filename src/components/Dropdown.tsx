import {anton, lato} from '@/util/fonts';
import {useMemo, useState} from 'react';

interface Option<T> {
  value: T;
  label: string;
}

export default function Dropdown<T extends number>({
  label,
  options,
  value,
  onValueChange,
}: {
  label: string;
  options: Array<Option<T>>;
  value?: T | null;
  onValueChange: (option: Option<T>) => void;
}) {
  const [filter, setFilter] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (option: Option<T>) => {
    onValueChange(option);
    setIsOpen(false);
    setFilter(null);
  };

  const filteredOptions = useMemo(() => {
    return filter
      ? options.filter((option) =>
          option.label.toLocaleLowerCase().includes(filter)
        )
      : options;
  }, [options, filter]);

  const optionValue = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [value, options]);

  return (
    <div className="relative">
      <label
        className={`${anton.className} top-[4px] lowercase left-[10px] absolute block mb-2 text-xs  text-slate-2 00`}
      >
        {label}
      </label>
      <input
        className={`border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 pt-5 ${lato.className}`}
        value={filter || optionValue?.label || ''}
        onClick={() => setIsOpen(!isOpen)}
        onChange={({target: {value}}) => setFilter(value)}
      />
      <div
        className={`z-10 absolute h-[200px] overflow-y-scroll ${
          isOpen ? 'block' : 'hidden'
        } bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdown-button"
        >
          {filteredOptions.map((option) => (
            <li key={option.value}>
              <button
                onClick={() => handleClick(option)}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
