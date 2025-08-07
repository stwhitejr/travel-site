import {iconsByTagName} from '@/app/location/components/LocationIcons';
import {anton} from '@/util/fonts';

export default function CategoryTitleDisplay({
  categoryName,
}: {
  categoryName: {name: string; description?: string};
}) {
  const Icon = iconsByTagName[categoryName.name];
  return (
    <div
      className={`w-full h-ful min-h-[100px] bg-[#354754] rounded flex items-center justify-center gap-1 text-center text-2xl md:text-3xl px-2 overflow-hidden ${anton.className} text-amber-50 opacity-90 relative group`}
    >
      <div className="pr-10 text-amber-50">
        {categoryName.description || categoryName.name}
      </div>
      {Icon && <Icon size={200} className="absolute right-1 opacity-30" />}
    </div>
  );
}
