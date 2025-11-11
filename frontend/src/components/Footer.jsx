import React from "react";

function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5 bg-[#0c0c0c]/60 backdrop-blur">
      <div className="app-container py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
        <div className="flex items-center gap-3">
          <img src="/images/logoel.png" alt="Explore Lanka" className="h-8 opacity-90" />
          <span className="hidden md:inline">Explore Lanka</span>
        </div>
        <p className="text-center md:text-right">
          © {new Date().getFullYear()} explorelanka.com — All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
