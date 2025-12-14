'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsHouseHeart } from 'react-icons/bs';
import {
  HiOutlineNewspaper,
  HiOutlineAcademicCap,
  HiOutlineSparkles,
  HiOutlineDocumentText,
} from 'react-icons/hi';

type TabType = 'home' | 'articles' | 'tutorials' | 'products' | 'pages';

export default function Tabs() {
  const pathname = usePathname();

  const getActiveTab = (): TabType => {
    if (pathname === '/articles' || pathname.startsWith('/articles/'))
      return 'articles';
    if (pathname === '/tutorials' || pathname.startsWith('/tutorials/'))
      return 'tutorials';
    if (pathname === '/products') return 'products';
    if (pathname === '/pages' || pathname.startsWith('/pages/')) return 'pages';
    return 'home';
  };

  const activeTab = getActiveTab();

  return (
    <header className="top-menu">
      <div className="top-menu-inner">
        <Link href="/" className="top-menu-logo">
          BeautyHub
        </Link>
        <nav className="top-menu-nav">
          <Link
            href="/"
            className={`top-menu-link ${activeTab === 'home' ? 'active' : ''}`}
          >
            <BsHouseHeart className="top-menu-icon" />
            <span>Hjem</span>
          </Link>
          <Link
            href="/articles"
            className={`top-menu-link ${activeTab === 'articles' ? 'active' : ''}`}
          >
            <HiOutlineNewspaper className="top-menu-icon" />
            <span>Artikler</span>
          </Link>
          <Link
            href="/tutorials"
            className={`top-menu-link ${activeTab === 'tutorials' ? 'active' : ''}`}
          >
            <HiOutlineAcademicCap className="top-menu-icon" />
            <span>Tutorials</span>
          </Link>
          <Link
            href="/products"
            className={`top-menu-link ${activeTab === 'products' ? 'active' : ''}`}
          >
            <HiOutlineSparkles className="top-menu-icon" />
            <span>Produkter</span>
          </Link>
          <Link
            href="/pages"
            className={`top-menu-link ${activeTab === 'pages' ? 'active' : ''}`}
          >
            <HiOutlineDocumentText className="top-menu-icon" />
            <span>Temasider</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
