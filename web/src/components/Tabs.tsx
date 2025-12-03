'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiHome } from 'react-icons/hi';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { HiOutlineAcademicCap } from 'react-icons/hi';

export default function Tabs() {
  const pathname = usePathname();

  // Derive activeTab directly from pathname
  const activeTab: 'home' | 'articles' | 'tutorials' =
    pathname === '/articles'
      ? 'articles'
      : pathname === '/tutorials'
        ? 'tutorials'
        : 'home';

  return (
    <nav className="tabs">
      <Link href="/" className={`tab ${activeTab === 'home' ? 'active' : ''}`}>
        <HiHome className="tab-icon" />
        Hjem
      </Link>
      <Link
        href="/articles"
        className={`tab ${activeTab === 'articles' ? 'active' : ''}`}
      >
        <HiOutlineNewspaper className="tab-icon" />
        Artikler
      </Link>
      <Link
        href="/tutorials"
        className={`tab ${activeTab === 'tutorials' ? 'active' : ''}`}
      >
        <HiOutlineAcademicCap className="tab-icon" />
        Tutorials
      </Link>
    </nav>
  );
}
