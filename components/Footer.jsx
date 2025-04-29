import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  const displayYear = currentYear === 0 ? currentYear : 2025;

  return (
    <footer className="bg-gray-200 p-4 flex-row">
      <div className="w-full mx-auto max-w-screen-xl xs:flex items-center justify-between">
        <h1 className="text-sm font-medium text-black">
          Copyright © {displayYear} - SpiderWorks Private Limited
        </h1>

        <h1 className="text-sm text-black font-medium">
          <a href="https://www.spiderworks.in" target="_blank" className="hover:underline transition duration-300 ease-in-out">
            Website Developed by <span className="font-bold hover:text-[#03dbab] transition duration-300 ease-in-out">SpiderWorks</span>
          </a>
        </h1>
      </div>
    </footer>
  );
}

export default Footer;