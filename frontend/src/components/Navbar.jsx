import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 mb-6 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <span className="text-2xl font-bold">
              <span className="text-green-800">Renew</span>
              <span className="text-emerald-500">IT</span>
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${location.pathname === '/' ? 'bg-green-50 text-green-800' : ''}`}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/quiz">
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${location.pathname === '/quiz' ? 'bg-green-50 text-green-800' : ''} flex items-center gap-2`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Quiz & Game
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/about">
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${location.pathname === '/about' ? 'bg-green-50 text-green-800' : ''}`}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link to="/scan" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-green-50 to-green-100 p-6 no-underline outline-none focus:shadow-md">
                          <div className="mb-2 mt-4 text-lg font-medium text-green-800">
                            AI Device Scanner
                          </div>
                          <p className="text-sm leading-tight text-gray-600">
                            Scan your electronic devices to get recycling recommendations
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/recyclers" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-green-50 hover:text-green-800 focus:bg-green-50 focus:text-green-800">
                          <div className="text-sm font-medium leading-none">Recycler Locator</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                            Find certified e-waste recyclers near you
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/guides" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-green-50 hover:text-green-800 focus:bg-green-50 focus:text-green-800">
                          <div className="text-sm font-medium leading-none">Recycling Guides</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                            Learn about proper disposal methods
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/scan" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-green-50 hover:text-green-800 focus:bg-green-50 focus:text-green-800">
                          <div className="text-sm font-medium leading-none">AI Device Scanner</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                            Scan your electronic devices to get recycling recommendations
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/contact">
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${location.pathname === '/contact' ? 'bg-green-50 text-green-800' : ''}`}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Login/Signup Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="border-green-800 text-green-800 hover:bg-green-50">
            <Link to="/login">Login</Link>
          </Button>
          <Button className="bg-green-800 hover:bg-green-700 text-white">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="h-10 w-10 p-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                <Link to="/" className={`p-2 rounded-md ${location.pathname === '/' ? 'bg-green-50 text-green-800' : ''}`}>
                  Home
                </Link>
                <Link to="/about" className={`p-2 rounded-md ${location.pathname === '/about' ? 'bg-green-50 text-green-800' : ''}`}>
                  About
                </Link>
                <Link to="/scan" className={`p-2 rounded-md ${location.pathname === '/scan' ? 'bg-green-50 text-green-800' : ''}`}>
                  AI Scanner
                </Link>
                <Link to="/recycler-locator" className={`p-2 rounded-md ${location.pathname === '/recyclers' ? 'bg-green-50 text-green-800' : ''}`}>
                  Recycler Locator
                </Link>
                <Link to="/guides" className={`p-2 rounded-md ${location.pathname === '/guides' ? 'bg-green-50 text-green-800' : ''}`}>
                  Recycling Guides
                </Link>
                <Link to="/quiz" className={`p-2 rounded-md ${location.pathname === '/quiz' ? 'bg-green-50 text-green-800' : ''} flex items-center gap-2`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Quiz & Game
                </Link>
                <Link to="/contact" className={`p-2 rounded-md ${location.pathname === '/contact' ? 'bg-green-50 text-green-800' : ''}`}>
                  Contact
                </Link>
                <div className="pt-4 border-t border-gray-200">
                  <Button variant="outline" className="w-full mb-2 border-green-800 text-green-800 hover:bg-green-50">
                    <Link to="/login" className="w-full">Login</Link>
                  </Button>
                  <Button className="w-full bg-green-800 hover:bg-green-700 text-white">
                    <Link to="/signup" className="w-full">Sign Up</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;