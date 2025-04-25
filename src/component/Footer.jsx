import React from 'react';
// Import icons from react-icons (choose the ones you need)
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Define link sections (makes it easier to manage)
  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const resourceLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'API Documentation', href: '/docs' },
    { name: 'System Status', href: '/status' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebookF, href: 'https://facebook.com' }, // Replace with your actual links
    { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: FaLinkedinIn, href: 'https://linkedin.com' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 pt-12 pb-8"> {/* Darker bg, more top padding */}
      <div className="container mx-auto px-4">
        {/* Top Section: Logo & Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"> {/* Grid for columns */}

          {/* Column 1: Logo & Description */}
          <div className="md:col-span-1"> {/* Takes 1 column on medium screens */}
            {/* Replace with your actual logo */}
            <a href="/" className="inline-block mb-4 text-2xl font-bold text-white">
              WhatsOps
            </a>
            <p className="text-sm">
              A brief description of your company or tagline goes here. Making things awesome.
            </p>
          </div>

          {/* Column 2: Company Links */}
          <div>
            <h6 className="font-semibold text-gray-200 mb-4 uppercase">Company</h6>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition-colors duration-200 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources Links */}
          <div>
            <h6 className="font-semibold text-gray-200 mb-4 uppercase">Resources</h6>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition-colors duration-200 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal Links */}
          <div>
            <h6 className="font-semibold text-gray-200 mb-4 uppercase">Legal</h6>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition-colors duration-200 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Section: Copyright & Social Links */}
        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-center sm:text-left mb-4 sm:mb-0">
            © {currentYear} Your Company Name. All Rights Reserved.
          </p>

          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank" // Open social links in a new tab
                rel="noopener noreferrer" // Security best practice for target="_blank"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label={social.name} // Accessibility
              >
                <social.icon className="w-5 h-5" /> {/* Render the icon component */}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;