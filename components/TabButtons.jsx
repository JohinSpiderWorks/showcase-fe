"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { id: "creatives", label: "Creatives", path: "/" },
  { id: "clients", label: "Clients", path: "/clients" },
  { id: "animations", label: "Animations", path: "/animations" },
  { id: "videos", label: "Videos", path: "/videos" },
  { id: "websites", label: "Websites", path: "/websites" },
  { id: "keywords", label: "Keywords", path: "/keywords" },
  { id: "channels", label: "Channels", path: "/channels" },
  { id: "landing-pages", label: "Landing Pages", path: "/landing-pages" },
  { id: "brochures", label: "Brochures", path: "/brochures" },
  { id: "logos", label: "Logos", path: "/logos" },
  { id: "theatre-ads", label: "Theatre Ads", path: "/theatre-ads" },
];

// Dropdown mappings - these will display conditionally based on current path
const dropdownMappings = {
  "/websites": "websites",
  "/landing-pages": "landing-pages",
  "/clients": "clients",
  "/videos": "videos",
  "/brochures": "brochures",
  "/logos": "logos",
  "/theatre-ads": "theatre-ads",
  "/": "creatives",
  "/animations":"animations"
};

const TabButton = ({ tab, isActive }) => (
  <Link
    href={tab.path}
    className="p-2 md:px-4 md:py-4 md:text-xl text-base font-extrabold relative"
  >
    <span className={isActive ? "text-black" : "text-gray-400"}>
      {tab.label}
    </span>
    {isActive && (
      <motion.div
        layoutId="activeTab"
        className="absolute bottom-0 left-1 right-1"
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 40,
        }}
      >
        <div className="bg-primary h-1 w-full rounded-lg" />
      </motion.div>
    )}
  </Link>
);

export default function Navbar() {
  const pathname = usePathname();
  const currentTab = tabs.find((tab) => tab.path === pathname) || tabs[0];

  // Dynamic import for dropdowns - will only load when needed
  const [ActiveDropdown, setActiveDropdown] = useState(null);

  React.useEffect(() => {
    const loadDropdown = async () => {
      const dropdownType = dropdownMappings[pathname];

      if (!dropdownType) {
        setActiveDropdown(null);
        return;
      }

      try {
        // Dynamic import based on current path
        switch (dropdownType) {
          case "websites":
            const WebsitesDropdown = (
              await import("./dropdown/DropdownWebsites")
            ).default;
            setActiveDropdown(<WebsitesDropdown />);
            break;
          case "landing-pages":
            const LandingPagesDropdown = (
              await import("./dropdown/DropdownLandingPages")
            ).default;
            setActiveDropdown(<LandingPagesDropdown />);
            break;
          case "clients":
            const ClientsDropdown = (await import("./dropdown/DropdownClients"))
              .default;
            setActiveDropdown(<ClientsDropdown />);
            break;
          case "videos":
            const VideosDropdown = (await import("./dropdown/DropdownVideos"))
              .default;
            setActiveDropdown(<VideosDropdown />);
            break;
          case "brochures":
            const BrochuresDropdown = (
              await import("./dropdown/DropdownBrochures")
            ).default;
            setActiveDropdown(<BrochuresDropdown />);
            break;
          case "logos":
            const LogoDropdown = (await import("./dropdown/DropdownLogo"))
              .default;
            setActiveDropdown(<LogoDropdown />);
            break;
          case "theatre-ads":
            const TheatreAdsDropdown = (
              await import("./dropdown/DropdownTheatreAds")
            ).default;
            setActiveDropdown(<TheatreAdsDropdown />);
            break;
          
            case "creatives":
              const CreativesDropdown = (await import("./dropdown/DropdownCreatives"))
                .default;
              setActiveDropdown(<CreativesDropdown />);
            break;
          
            case "animations":
              const AnimationsDropdown = (await import("./dropdown/DropdownAnimations"))
                .default;
              setActiveDropdown(<AnimationsDropdown />);
            break;
          
          default:
            setActiveDropdown(null);
        }
      } catch (error) {
        console.error("Failed to load dropdown component:", error);
        setActiveDropdown(null);
      }
    };

    loadDropdown();
  }, [pathname]);

  return (
    <nav className="mx-auto">
      <div className="w-full flex flex-col items-center">
        <div className="lg:flex">
          <div className="rotating-border md:mx-2">
            <motion.div
              className="flex flex-wrap bg-white m-[2px] border border-primary rounded-xl py-4 px-3"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              {tabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  tab={tab}
                  isActive={pathname === tab.path}
                />
              ))}
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {ActiveDropdown && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                {ActiveDropdown}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
