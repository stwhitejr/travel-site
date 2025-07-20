import {ReactNode} from 'react';

export default function AdminButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg  bg-amber-600 hover:bg-amber-700 cursor-pointer ml-2 p-2"
    >
      {children}
    </button>
  );
}
