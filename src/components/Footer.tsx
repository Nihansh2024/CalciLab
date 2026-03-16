'use client';

import { motion } from 'framer-motion';
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  Mail,
  MapPin,
  Phone,
  Heart,
} from 'lucide-react';

const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/calcilab',
    icon: Twitter,
    color: 'hover:text-sky-500',
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/calcilab',
    icon: Facebook,
    color: 'hover:text-blue-600',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/calcilab',
    icon: Instagram,
    color: 'hover:text-pink-500',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/calcilab',
    icon: Linkedin,
    color: 'hover:text-blue-700',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@calcilab',
    icon: Youtube,
    color: 'hover:text-red-500',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/calcilab',
    icon: Github,
    color: 'hover:text-gray-900 dark:hover:text-white',
  },
];

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Calculators', href: '#calculators' },
  { name: 'API', href: '#api' },
];

const supportLinks = [
  { name: 'Help Center', href: '#help' },
  { name: 'Contact Us', href: '#contact' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Community', href: '#community' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '#privacy' },
  { name: 'Terms of Service', href: '#terms' },
  { name: 'Cookie Policy', href: '#cookies' },
  { name: 'Refund Policy', href: '#refund' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-lg">C</span>
              </div>
              <span className="font-black text-2xl">
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Calci</span>
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Lab</span>
              </span>
            </motion.div>
            <p className="text-slate-400 mb-6 max-w-md">
              Your all-in-one calculator hub with 124+ free online calculators for health, finance, math, and everyday tools. Fast, accurate, and easy to use.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-pink-400" />
                <a href="mailto:support@calcilab.com" className="hover:text-white transition-colors">
                  support@calcilab.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-purple-400" />
                <a href="tel:+1-800-CALCILAB" className="hover:text-white transition-colors">
                  +1-800-CALCILAB
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span>San Francisco, CA 94102</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-700"
        >
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <span className="text-sm text-slate-400">Follow us:</span>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 transition-all ${social.color} hover:bg-slate-700`}
                  title={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <p className="text-sm text-slate-400 flex items-center gap-1">
            © {currentYear} CalciLab. Made with <Heart className="h-4 w-4 text-pink-500 fill-pink-500" /> All rights reserved.
          </p>
        </motion.div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 rounded-xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 border border-slate-700"
        >
          <p className="text-center text-sm text-slate-300">
            🚀 <span className="font-semibold">Pro Tip:</span> Upgrade to Pro for unlimited calculations and advanced features!{' '}
            <a href="#pricing" className="text-pink-400 hover:text-pink-300 font-medium underline">
              View Plans →
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
