import { Link } from "react-router";
import { Hotel, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#003580] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Hotel className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl">StayEase</span>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed">
              Your trusted partner for finding and booking the perfect accommodations worldwide.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2.5">
              <li><Link to="#" className="text-white/80 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="#" className="text-white/80 hover:text-white transition-colors text-sm">Careers</Link></li>
              <li><Link to="#" className="text-white/80 hover:text-white transition-colors text-sm">Press</Link></li>
              <li><Link to="#" className="text-white/80 hover:text-white transition-colors text-sm">Blog</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2.5">
              <li><Link to="#" className="text-white/80 hover:text-white transition-colors text-sm">Help Center</Link></li>
              <li><Link to="#" className="text-white/80 hover:text-white transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="#" className="text-white/80 hover:text-white transition-colors text-sm">Safety Resource</Link></li>
              <li><Link to="#" className="text-white/80 hover:text-white transition-colors text-sm">Cancellation Options</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2.5">
              <li><Link to="#" className="text-white/80 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="#" className="text-white/80 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
              <li><Link to="#" className="text-white/80 hover:text-white transition-colors text-sm">Cookie Policy</Link></li>
              <li><Link to="#" className="text-white/80 hover:text-white transition-colors text-sm">Accessibility</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-white/60 text-sm text-center">
            © {currentYear} StayEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
