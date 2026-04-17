import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-dark-card border-t border-slate-200 dark:border-dark-border py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="flex space-x-6 mb-4">
          <a href="#" className="text-slate-500 hover:text-primary-500 transition">
            <FaGithub className="w-6 h-6" />
          </a>
          <a href="#" className="text-slate-500 hover:text-primary-500 transition">
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a href="mailto:hello@example.com" className="text-slate-500 hover:text-primary-500 transition">
            <Mail className="w-6 h-6" />
          </a>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">
          &copy; {new Date().getFullYear()} Ankit Tiwari. All rights reserved.
        </p>
        <Link to="/admin" className="text-xs text-slate-400 hover:text-primary-500">Admin Login</Link>
      </div>
    </footer>
  );
}
