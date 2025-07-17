import {iconsByTagName} from '@/app/location/components/LocationIcons';
import {anton} from '@/util/fonts';
import {PlayCircleIcon} from 'lucide-react';

export default function CategoryTitleDisplay({
  categoryName,
  isAutoPlaying,
  onClick,
}: {
  categoryName: {name: string; description?: string};
  onClick: () => void;
  isAutoPlaying: boolean;
}) {
  const Icon = iconsByTagName[categoryName.name];
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer w-full h-full bg-[#354754] rounded flex items-center justify-center gap-1 text-center text-3xl px-2 overflow-hidden ${anton.className} text-amber-50 opacity-90 relative group`}
    >
      {isAutoPlaying ? (
        <>
          <div>Stop Auto Play</div>
          <PlayCircleIcon size={200} className="absolute right-1 opacity-30" />
        </>
      ) : (
        <>
          <div className="pr-10 text-amber-50 group-hover:hidden">
            {categoryName.description || categoryName.name}
          </div>
          {Icon && (
            <Icon
              size={200}
              className="absolute right-1 opacity-30 group-hover:hidden"
            />
          )}
          <div className="hidden group-hover:block">Auto Play</div>
          <PlayCircleIcon
            size={200}
            className="absolute right-1 opacity-30 hidden group-hover:block"
          />
        </>
      )}
    </div>
  );
}
