"use client";

import { Activity, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black py-12 text-white">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-primary font-medium mb-4"
            >
              <Activity className="w-5 h-5" />
              <span className="text-lg font-semibold text-primary">
                Dpin uptime
              </span>
            </Link>
            <p className="mb-6 max-w-md text-white">
              Real-time monitoring for all your critical services. Get notified
              immediately when something goes wrong.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white text-center md:text-left">
            © {new Date().getFullYear()} Dpin uptime. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/" className="text-sm text-white hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link href="/" className="text-sm text-white hover:text-gray-300">
              Terms of Service
            </Link>
            <Link href="/" className="text-sm text-white hover:text-gray-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
