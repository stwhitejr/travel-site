import {anton, lato} from '@/util/fonts';
import {InputHTMLAttributes} from 'react';

export default function TextInput({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {label: string}) {
  return (
    <div className={`relative`}>
      <label
        htmlFor={props.id}
        className={`${anton.className} top-[4px] lowercase left-[10px] absolute block mb-2 text-xs  text-slate-2 00`}
      >
        {label}
      </label>
      <input
        className={` border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 pt-5 ${lato.className}`}
        {...props}
      />
    </div>
  );
}
