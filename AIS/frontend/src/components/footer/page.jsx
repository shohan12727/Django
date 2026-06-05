import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold tracking-wider text-white flex items-center gap-2">
              <span>💻</span>
              Laptop<span className="text-blue-500">Shop</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your ultimate destination for high-performance laptops. Whether for gaming, professional work, or daily tasks, we have the perfect machine for you.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-400 transition duration-200">Home</Link>
              </li>
              <li>
                <Link href="/laptops" className="hover:text-blue-400 transition duration-200">Browse Laptops</Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-blue-400 transition duration-200">View Cart</Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-blue-400 transition duration-200">Checkout</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Top Categories / Brands */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Shop Brands</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/laptops?brand=apple" className="hover:text-blue-400 transition duration-200">Apple MacBooks</Link>
              </li>
              <li>
                <Link href="/laptops?brand=asus" className="hover:text-blue-400 transition duration-200">ASUS ROG / ZenBook</Link>
              </li>
              <li>
                <Link href="/laptops?brand=hp" className="hover:text-blue-400 transition duration-200">HP Pavilion / Spectre</Link>
              </li>
              <li>
                <Link href="/laptops?brand=dell" className="hover:text-blue-400 transition duration-200">Dell XPS / Inspiron</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span>📍</span> 123 Tech Avenue, Silicon Valley
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span> +1 (555) 019-2834
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span> support@laptopshop.com
              </li>
              <li className="mt-4 pt-2 border-t border-gray-800 text-xs">
                <span>⏰</span> Mon - Sat: 9:00 AM - 8:00 PM
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {currentYear} LaptopShop. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}