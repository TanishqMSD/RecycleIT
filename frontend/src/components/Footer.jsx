import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-green-50 pt-16 pb-6 relative overflow-hidden">
      <motion.div 
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-green-200 opacity-20 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-green-800">Renew</span>
                <span className="text-emerald-500">IT</span>
              </h3>
              <p className="text-gray-600">
                Transforming e-waste management through awareness, education, and technology.
                Join us in creating a sustainable future for our planet.
              </p>
            </motion.div>

            <div className="flex space-x-4">
              <Link to="/recyclers" className="text-gray-600 hover:text-green-800 transition-colors">Find Recyclers</Link>
              <Link to="/guides" className="text-gray-600 hover:text-green-800 transition-colors">Recycling Guides</Link>
              <Link to="/about" className="text-gray-600 hover:text-green-800 transition-colors">About Us</Link>
            </div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold text-green-800 mb-4">Join Our Green Movement</h4>
              <div className="flex flex-col gap-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email for eco-tips" 
                  className="border-green-200 focus-visible:ring-green-800" 
                />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="w-full bg-gradient-to-r from-green-800 to-emerald-600 hover:from-green-700 hover:to-emerald-500 group">
                    <span>Join the Movement</span>
                    <motion.span
                      className="ml-2"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      ♻️
                    </motion.span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        <Separator className="my-8 bg-green-100" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p 
            className="text-gray-600 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            &copy; {new Date().getFullYear()} RenewIT. Making e-waste recycling fun!
          </motion.p>
          <motion.div 
            className="flex gap-6 mt-4 md:mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/privacy" className="text-gray-600 hover:text-green-800 text-sm transition-colors">Privacy</Link>
            <Link to="/terms" className="text-gray-600 hover:text-green-800 text-sm transition-colors">Terms</Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;