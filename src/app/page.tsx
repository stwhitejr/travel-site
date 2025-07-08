import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href="/location">Locations</Link>
      <Link href="/category">Categories</Link>
    </div>
  );
}
