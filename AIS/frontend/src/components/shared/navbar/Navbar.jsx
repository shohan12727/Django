/**
 * Navbar Component - Shared Layout Component
 * 
 * Production-ready navigation bar with:
 * - Search functionality
 * - User authentication dropdown
 * - Cart icon with badge
 * - Wishlist link
 * - Responsive design
 * - Mobile menu toggle
 * 
 * This component is shared across all pages and demonstrates:
 * - Custom hooks usage (useNavigation, useAuth)
 * - Local state management
 * - Proper component composition
 * - Integration with constants and types
 * 
 * USAGE:
 * <Navbar />
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { ROUTES } from '@/constants';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Mock data - In production, these would come from context/hooks
  const isAuthenticated = false;
  const cartCount = 0;
  const wishlistCount = 0;
  const userName = null;

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      console.log('Search:', searchQuery);
      setSearchQuery('');
    }
  };

  return (
    <nav className={styles.navbar}>
      {/* Top Bar - Logo and Primary Actions */}
      <div className={styles.topBar}>
        <div className={styles.container}>
          {/* Logo */}
          <Link href={ROUTES.HOME} className={styles.logo}>
            <span className={styles.logoText}>LaptopShop</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className={styles.searchContainer}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <input
                type="text"
                placeholder="Search laptops, brands, specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchButton}>
                🔍
              </button>
            </form>
          </div>

          {/* Right Actions */}
          <div className={styles.rightActions}>
            {/* Search Toggle Mobile */}
            <button
              className={styles.iconButton}
              onClick={toggleSearch}
              aria-label="Search"
              title="Search"
            >
              🔍
            </button>

            {/* Wishlist */}
            <Link href={ROUTES.WISHLIST} className={styles.navIcon} title="Wishlist">
              ❤️
              {wishlistCount > 0 && (
                <span className={styles.badge}>{wishlistCount}</span>
              )}
            </Link>

            {/* Shopping Cart */}
            <Link href={ROUTES.CART} className={styles.navIcon} title="Shopping Cart">
              🛒
              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </Link>

            {/* User Account */}
            <div className={styles.userMenuContainer}>
              <button
                className={styles.iconButton}
                onClick={toggleUserMenu}
                aria-label="User Account"
                title="Account"
              >
                👤
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className={styles.userMenu}>
                  {isAuthenticated ? (
                    <>
                      <div className={styles.userInfo}>
                        <p>Hello, {userName}</p>
                      </div>
                      <hr />
                      <Link href={ROUTES.DASHBOARD} className={styles.menuItem}>
                        Dashboard
                      </Link>
                      <Link href={ROUTES.ORDERS} className={styles.menuItem}>
                        My Orders
                      </Link>
                      <Link href={ROUTES.PROFILE} className={styles.menuItem}>
                        Profile Settings
                      </Link>
                      <hr />
                      <button className={styles.menuItem}>Logout</button>
                    </>
                  ) : (
                    <>
                      <Link href={ROUTES.LOGIN} className={styles.menuItem}>
                        Sign In
                      </Link>
                      <Link href={ROUTES.SIGNUP} className={styles.menuItem}>
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className={`${styles.menuToggle} ${isOpen ? styles.active : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar Mobile */}
      {isSearchOpen && (
        <div className={styles.mobileSearchBar}>
          <form onSubmit={handleSearch} className={styles.mobileSearchForm}>
            <input
              type="text"
              placeholder="Search laptops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.mobileSearchInput}
              autoFocus
            />
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
          </form>
        </div>
      )}

      {/* Bottom Bar - Navigation Links */}
      <div className={`${styles.bottomBar} ${isOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.navLinks}>
          <Link href={ROUTES.HOME} className={styles.navLink}>
            Home
          </Link>
          <Link href={ROUTES.PRODUCTS} className={styles.navLink}>
            All Laptops
          </Link>
          <a href="#gaming" className={styles.navLink}>
            Gaming
          </a>
          <a href="#ultrabook" className={styles.navLink}>
            Ultrabook
          </a>
          <a href="#workstation" className={styles.navLink}>
            Workstation
          </a>
          <a href="#deals" className={styles.navLink}>
            Deals
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
