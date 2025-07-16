import {iconsByTagName} from '@/app/location/components/LocationIcons';
import {anton} from '@/util/fonts';

export default function CategoryTitleDisplay({
  categoryName,
}: {
  categoryName: string;
}) {
  const Icon = iconsByTagName[categoryName];
  return (
    <div
      className={`w-full h-full bg-[#354754] rounded flex items-center justify-center gap-1 text-3xl px-2 overflow-hidden ${anton.className} text-amber-50 opacity-90`}
    >
      {categoryName}
      {Icon && <Icon size={100} />}
    </div>
  );
}
