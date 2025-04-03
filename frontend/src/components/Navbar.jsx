import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
  const [isAdminView, setIsAdminView] = useState(true);
  const location = useLocation();
  
  const isAdminAuthenticated = sessionStorage.getItem('isAdminAuthenticated') === 'true';

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
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] p-6">
              <nav className="flex flex-col gap-6">
                <Link to="/" className="block py-3 text-lg font-semibold hover:text-green-800 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span>Home</span>
                  </div>
                </Link>
                <Link to="/campaigns" className="block py-3 text-lg font-semibold hover:text-green-800 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span>Campaigns</span>
                  </div>
                </Link>
                <Link to="/game" className="block py-3 text-lg font-semibold hover:text-green-800 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span>Games & Quiz</span>
                  </div>
                </Link>
                <Link to="/scan" className="block py-3 text-lg font-semibold hover:text-green-800 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span>AI Scanner</span>
                  </div>
                </Link>
                <Link to="/recyclers" className="block py-3 text-lg font-semibold hover:text-green-800 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span>Recycler Locator</span>
                  </div>
                </Link>
                <Link to="/guides" className="block py-3 text-lg font-semibold hover:text-green-800 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span>Recycling Guides</span>
                  </div>
                </Link>
                <Link to="/contact" className="block py-3 text-lg font-semibold hover:text-green-800 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span>Contact</span>
                  </div>
                </Link>
                <Link to="/about" className="block py-3 text-lg font-semibold hover:text-green-800 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span>About</span>
                  </div>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

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
          <NavigationMenu className="relative">
            <NavigationMenuList className="flex-wrap gap-2">
              {isAdminAuthenticated && (
                <div className="flex items-center mr-4 space-x-2">
                  <Switch
                    id="admin-mode"
                    checked={isAdminView}
                    onCheckedChange={setIsAdminView}
                  />
                  <Label htmlFor="admin-mode" className="text-sm font-medium">
                    {isAdminView ? 'Admin View' : 'User View'}
                  </Label>
                </div>
              )}
              
              {(!isAdminAuthenticated || (isAdminAuthenticated && !isAdminView)) && (
                <>
                  <NavigationMenuItem>
                    <Link to="/">
                      <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${location.pathname === '/' ? 'bg-green-50 text-green-800' : ''}`}>
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Games & Quiz</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link to="/quiz" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-green-50 hover:text-green-800 focus:bg-green-50 focus:text-green-800">
                              <div className="text-sm font-medium leading-none">Knowledge Quiz</div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                                Test your knowledge about e-waste and recycling
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link to="/game/sorting" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-green-50 hover:text-green-800 focus:bg-green-50 focus:text-green-800">
                              <div className="text-sm font-medium leading-none">Sorting Game</div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                                Learn to sort e-waste in an interactive 3D environment
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link to="/campaigns">
                      <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${location.pathname === '/campaigns' ? 'bg-green-50 text-green-800' : ''}`}>
                        Campaigns
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-full min-w-[200px] gap-3 p-4 md:w-[400px] md:grid-cols-1 lg:w-[600px] lg:grid-cols-2">
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
                            <Link to="/recyclers" className="block select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-green-50 hover:text-green-800 focus:bg-green-50 focus:text-green-800">
                              <div className="text-base font-medium leading-none">Recycler Locator</div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-500 mt-2">
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

                  <NavigationMenuItem>
                    <Link to="/about">
                      <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${location.pathname === '/about' ? 'bg-green-50 text-green-800' : ''}`}>
                        About
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  
                </>
              )}

              {isAdminAuthenticated && isAdminView && (
                <>
                  <NavigationMenuItem>
                    <Link to="/admin-dashboard">
                      <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${location.pathname.startsWith('/admin-dashboard') ? 'bg-green-50 text-green-800' : ''}`}>
                        Dashboard
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <Link to="/admin/blogs">
                      <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${location.pathname.startsWith('/admin/blogs') ? 'bg-green-50 text-green-800' : ''}`}>
                        Blogs
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/admin/campaigns">
                      <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${location.pathname.startsWith('/admin/campaigns') ? 'bg-green-50 text-green-800' : ''}`}>
                        Campaigns
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/admin/email">
                      <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${location.pathname.startsWith('/admin/email') ? 'bg-green-50 text-green-800' : ''}`}>
                        Send Email
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
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
                <Link to="/recyclers" className={`p-2 rounded-md ${location.pathname === '/recyclers' ? 'bg-green-50 text-green-800' : ''}`}>
                  Recycler Locator
                </Link>
                <Link to="/guides" className={`p-2 rounded-md ${location.pathname === '/guides' ? 'bg-green-50 text-green-800' : ''}`}>
                  Recycling Guides
                </Link>
                
                
                <Link to="/quiz" className={`p-2 rounded-md ${location.pathname === '/quiz' ? 'bg-green-50 text-green-800' : ''}`}>
                  Knowledge Quiz
                </Link>
                <Link to="/game/sorting" className={`p-2 rounded-md ${location.pathname === '/game/sorting' ? 'bg-green-50 text-green-800' : ''}`}>
                  Sorting Game
                </Link>
                <Link to="/contact" className={`p-2 rounded-md ${location.pathname === '/contact' ? 'bg-green-50 text-green-800' : ''}`}>
                  Contact
                </Link>

              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;