import Link from 'next/link';
import Image from 'next/image';
import { blogTitle } from '../utils/global-data';

export default function Header({ name }) {

  return (
    <header
      className="pt-20 pb-12"
    >
      {/* <Link href="/">
        <Image
          style={{
            borderRadius: '50%',
            opacity: 0.7,
          }}
          src="/images/gyst_logo.jpeg"
          width={120}
          height={120}
          alt={`Logo for ${blogTitle}`}
        />
      </Link> */}
    </header>
  );
}
