import Link from 'next/link';

function Logo() {
  return (
    <Link href="/">
      <a className="inline-flex justify-center items-center">
        <span className="font-bold">Polar Samples</span>
      </a>
    </Link>
  );
}

export function Header() {
  return (
    <header className="p-8 flex justify-center">
      <Logo />
    </header>
  );
}
