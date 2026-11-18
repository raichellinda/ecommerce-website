import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 text-sm">
          <span className="text-gray-400">
            © {new Date().getFullYear()} BookStore. All rights reserved.
          </span>
          <span className="text-gray-600 hidden sm:inline">•</span>
          <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <span className="text-gray-600 hidden sm:inline">•</span>
          <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
            Terms & Conditions
          </Link>
          <span className="text-gray-600 hidden sm:inline">•</span>
          <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}