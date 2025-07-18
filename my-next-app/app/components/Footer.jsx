export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-8 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Company Info */}
        <div>
          <h4 className="text-lg font-semibold mb-2">BuiltByRotich</h4>
          <p className="text-gray-400">
            Your trusted source for quality products and a smooth shopping experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-gray-300">
            <li><a href="/shop" className="hover:underline">Shop</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/faq" className="hover:underline">FAQs</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
          <p className="text-gray-400">Email: support@builtbyrotich.com</p>
          <p className="text-gray-400">Phone: +254 712 345678</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} BuiltByRotich. All rights reserved.
      </div>
    </footer>
  );
}
