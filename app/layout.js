import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HrLine from "../components/HrLine";
import TabButton from "../components/TabButtons";
import { WebsiteProvider } from "@/context/WebsiteContext";
import { VideoProvider } from "@/context/VideoContext";
import { LandingProvider } from "@/context/LandingContext";
import { BrochureProvider } from "@/context/BrochuresContext";
import { LogoProvider } from "@/context/LogoContext";
import { TheatreAdProvider } from "@/context/TheatreAdContext";
import { ClientProvider } from "@/context/ClientContext";
import { CreativeProvider } from "@/context/CreativeContext";
import { AnimationProvider } from "@/context/AnimationContext";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SpiderWorks Showcase",
  description: "A showcase of our best work",
};

export default function RootLayout({ children }) {
  return (
    <AnimationProvider>
    <ClientProvider>
      <WebsiteProvider>
        <VideoProvider>
          <LandingProvider>
            <BrochureProvider>
              <LogoProvider>
                <TheatreAdProvider>
                  <CreativeProvider>
                  <html lang="en" className="h-full">
                    <body
                      className={`min-h-screen flex flex-col justify-between ${geistSans.variable} ${geistMono.variable}`}
                    >
                      <div>
                        <Navbar />
                        <HrLine />
                        <TabButton />
                            {children}
                      </div>
                          <Footer />
                          <Toaster position="bottom-right"/>
                    </body>
                    </html>
                    </CreativeProvider>
                </TheatreAdProvider>
              </LogoProvider>
            </BrochureProvider>
          </LandingProvider>
        </VideoProvider>
      </WebsiteProvider>
      </ClientProvider>
      </AnimationProvider>
  );
}
