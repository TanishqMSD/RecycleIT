import React, { useEffect, useState, Suspense } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import Lottie from 'react-lottie';
import CountUp from 'react-countup';
import Tilt from 'react-parallax-tilt';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Placeholder for Lottie animations
const defaultLottieOptions = {
  loop: true,
  autoplay: true,
  animationData: null, // Will be replaced with actual animation data
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const Home = () => {
  const controls = useAnimation();
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [processRef, processInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [testimonialRef, testimonialInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (heroInView) controls.start("visible");
  }, [controls, heroInView]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 mt-4 md:mt-6 px-6 md:px-8"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
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
          <motion.div 
            className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-emerald-300 opacity-20 blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -10, 0]
            }}
            transition={{ 
              duration: 18,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2
            }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between relative z-10">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            variants={fadeIn}
          >
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200 transition-colors">Sustainable Future</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-emerald-500">
                Recycle<span className="text-emerald-500">IT</span>
              </span>
              <br />
              <span className="text-gray-800">E-Waste Management</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
              Transforming electronic waste into a sustainable future through awareness, education, and innovative technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-green-800 to-emerald-600 hover:from-green-700 hover:to-emerald-500 shadow-lg hover:shadow-xl transition-all">
                <Link to="/recyclers">Find Recyclers</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-green-800 text-green-800 hover:bg-green-50 transition-all">
                <Link to="/scan">Scan Your Device</Link>
              </Button>
            </div>
            
            <div className="flex items-center mt-8 space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-green-${i*100} flex items-center justify-center text-white text-xs font-bold`}>
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">Join <span className="font-bold text-green-800">5,000+</span> people already recycling</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 h-[300px] md:h-[500px] flex items-center justify-center"
            variants={fadeIn}
          >
            <div className="relative w-full h-full">
              {/* Placeholder for a Lottie animation or 3D model */}
              <div className="w-full h-full bg-contain bg-center bg-no-repeat" 
                   style={{ backgroundImage: "url('https://assets9.lottiefiles.com/packages/lf20_qmfs6c3i.json')" }}>
                {/* Replace with actual Lottie component when you have the animation */}
                {/* <Lottie options={{...defaultLottieOptions, animationData: recyclingAnimation}} /> */}
              </div>
              
              {/* Floating elements */}
              <motion.div 
                className="absolute top-10 right-10 bg-white p-3 rounded-lg shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-10 left-10 bg-white p-3 rounded-lg shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        ref={statsRef}
        initial="hidden"
        animate={statsInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20 px-6 md:px-8 bg-white"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <Badge className="mb-2 bg-green-100 text-green-800">The Impact</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">E-Waste by the Numbers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Electronic waste is one of the fastest-growing waste streams globally, with severe implications for both the environment and human health.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-md p-8 transition-all hover:shadow-xl hover:-translate-y-2 border border-green-100">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
                <CountUp end={50} suffix="M" duration={2.5} /> Tons
              </h3>
              <p className="text-gray-600 text-center">Of e-waste generated globally each year</p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-md p-8 transition-all hover:shadow-xl hover:-translate-y-2 border border-green-100">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
                <CountUp end={17.4} suffix="%" decimals={1} duration={2.5} />
              </h3>
              <p className="text-gray-600 text-center">Global e-waste recycling rate</p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-md p-8 transition-all hover:shadow-xl hover:-translate-y-2 border border-green-100">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
                $<CountUp end={62.5} suffix="B" duration={2.5} />
              </h3>
              <p className="text-gray-600 text-center">Value of raw materials in global e-waste</p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-md p-8 transition-all hover:shadow-xl hover:-translate-y-2 border border-green-100">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
                <CountUp end={24} suffix="M" duration={2.5} /> Tons
              </h3>
              <p className="text-gray-600 text-center">CO₂ emissions reduced by proper recycling</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        ref={processRef}
        initial="hidden"
        animate={processInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20 px-6 md:px-8 bg-gradient-to-b from-white to-green-50"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <Badge className="mb-2 bg-green-100 text-green-800">Our Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How RecycleIT Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to responsibly manage your electronic waste through a simple three-step process.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-green-800 to-emerald-500 transform -translate-y-1/2 z-0"></div>
            
            <motion.div 
              variants={fadeIn}
              className="relative z-10"
            >
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.1} glareColor="lightgreen" glarePosition="all">
                <div className="bg-white rounded-xl shadow-md p-8 transition-all hover:shadow-xl border border-green-100 h-full">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-green-800 to-emerald-500 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-center text-gray-800 mb-3">Scan Your Device</h3>
                  <p className="text-gray-600 text-center">
                    Use our AI-powered tool to scan and analyze your electronic device to determine its recyclability.
                  </p>
                </div>
              </Tilt>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="relative z-10"
            >
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.1} glareColor="lightgreen" glarePosition="all">
                <div className="bg-white rounded-xl shadow-md p-8 transition-all hover:shadow-xl border border-green-100 h-full">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-green-800 to-emerald-500 flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-center text-gray-800 mb-3">Get Device Info</h3>
                  <p className="text-gray-600 text-center">
                    Receive detailed information about your device's recycling options and environmental impact.
                  </p>
                </div>
              </Tilt>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="relative z-10"
            >
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.1} glareColor="lightgreen" glarePosition="all">
                <div className="bg-white rounded-xl shadow-md p-8 transition-all hover:shadow-xl border border-green-100 h-full">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-green-800 to-emerald-500 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-center text-gray-800 mb-3">Recycle Responsibly</h3>
                  <p className="text-gray-600 text-center">
                    Find nearby certified recyclers and dispose of your e-waste properly and responsibly.
                  </p>
                </div>
              </Tilt>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20 px-6 md:px-8 bg-gradient-to-b from-green-50 to-white"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <Badge className="mb-2 bg-green-100 text-green-800">What We Offer</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Explore Our Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              RenewIT provides a comprehensive suite of tools and resources to help you manage electronic waste effectively.
            </p>
          </motion.div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="all">All Features</TabsTrigger>
              <TabsTrigger value="scan">AI Scanner</TabsTrigger>
              <TabsTrigger value="locate">Recycler Locator</TabsTrigger>
              <TabsTrigger value="learn">Education</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <motion.div variants={fadeIn}>
                  <Card className="h-full transition-all hover:shadow-lg border-green-100">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <CardTitle className="text-center text-gray-800">AI Device Scanner</CardTitle>
                      <CardDescription className="text-center">
                        Scan your electronics to determine recyclability
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-600">Get disposal recommendations based on AI analysis of your device</p>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button asChild variant="outline" className="text-green-800 border-green-800 hover:bg-green-50">
                        <Link to="/scan">Try Scanner</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <Card className="h-full transition-all hover:shadow-lg border-green-100">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <CardTitle className="text-center text-gray-800">Recycler Locator</CardTitle>
                      <CardDescription className="text-center">
                        Find certified e-waste recyclers near you
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-600">Locate the nearest e-waste collection centers in your area</p>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button asChild variant="outline" className="text-green-800 border-green-800 hover:bg-green-50">
                        <Link to="/recyclers">Find Recyclers</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <Card className="h-full transition-all hover:shadow-lg border-green-100">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <CardTitle className="text-center text-gray-800">E-Waste Quiz</CardTitle>
                      <CardDescription className="text-center">
                        Test your knowledge about e-waste
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-600">Challenge yourself with our interactive quiz on sustainable practices</p>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button asChild variant="outline" className="text-green-800 border-green-800 hover:bg-green-50">
                        <Link to="/quiz">Take Quiz</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <Card className="h-full transition-all hover:shadow-lg border-green-100">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <CardTitle className="text-center text-gray-800">Recycling Guides</CardTitle>
                      <CardDescription className="text-center">
                        Learn about proper disposal methods
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-600">Comprehensive guides for different types of electronic devices</p>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button asChild variant="outline" className="text-green-800 border-green-800 hover:bg-green-50">
                        <Link to="/guides">View Guides</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>
            
            <TabsContent value="scan">
              {/* Scan tab content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={fadeIn} className="flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">AI-Powered Device Scanner</h3>
                  <p className="text-gray-600 mb-6">
                    Our advanced AI technology can identify and analyze your electronic devices through your camera. Simply scan your device to get:
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Detailed recycling instructions</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Environmental impact assessment</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Nearest recycling locations</span>
                    </li>
                  </ul>
                  <Button asChild className="w-fit bg-gradient-to-r from-green-800 to-emerald-600 hover:from-green-700 hover:to-emerald-500">
                    <Link to="/scan">Try Scanner Now</Link>
                  </Button>
                </motion.div>
                <motion.div variants={fadeIn} className="relative h-[400px] flex items-center justify-center bg-green-50 rounded-xl overflow-hidden">
                  {/* Placeholder for scanner animation */}
                  <div className="w-full h-full bg-contain bg-center bg-no-repeat" 
                       style={{ backgroundImage: "url('https://assets5.lottiefiles.com/packages/lf20_rqcjx9.json')" }}>
                    {/* Replace with actual Lottie component when you have the animation */}
                  </div>
                  
                  {/* Scanning effect overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/20 to-transparent"
                    animate={{ 
                      top: ['-100%', '100%'],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.div>
              </div>
            </TabsContent>
            
            <TabsContent value="locate">
              {/* Locate tab content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={fadeIn} className="relative h-[400px] flex items-center justify-center bg-green-50 rounded-xl overflow-hidden order-2 md:order-1">
                  {/* Placeholder for map animation */}
                  <div className="w-full h-full bg-contain bg-center bg-no-repeat" 
                       style={{ backgroundImage: "url('https://assets3.lottiefiles.com/packages/lf20_UgZWvP.json')" }}>
                    {/* Replace with actual Lottie component when you have the animation */}
                  </div>
                  
                  {/* Map pins */}
                  <motion.div 
                    className="absolute top-1/4 left-1/4 w-6 h-6 bg-green-600 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-t-green-600 border-l-transparent border-r-transparent" />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute top-2/3 right-1/3 w-6 h-6 bg-emerald-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-t-emerald-500 border-l-transparent border-r-transparent" />
                  </motion.div>
                </motion.div>
                
                <motion.div variants={fadeIn} className="flex flex-col justify-center order-1 md:order-2">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Find Certified Recyclers</h3>
                  <p className="text-gray-600 mb-6">
                    Our recycler locator helps you find the nearest certified e-waste collection centers and drop-off points in your area.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Verified and certified recycling centers</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Filter by accepted device types</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Directions and contact information</span>
                    </li>
                  </ul>
                  <Button asChild className="w-fit bg-gradient-to-r from-green-800 to-emerald-600 hover:from-green-700 hover:to-emerald-500">
                    <Link to="/recyclers">Find Recyclers Near You</Link>
                  </Button>
                </motion.div>
              </div>
            </TabsContent>
            
            <TabsContent value="learn">
              {/* Learn tab content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={fadeIn} className="flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Educational Resources</h3>
                  <p className="text-gray-600 mb-6">
                    Expand your knowledge about e-waste management and sustainable practices through our comprehensive educational resources.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Interactive e-waste quiz</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Device-specific recycling guides</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Environmental impact statistics</span>
                    </li>
                  </ul>
                  <div className="flex gap-4">
                    <Button asChild variant="outline" className="text-green-800 border-green-800 hover:bg-green-50">
                      <Link to="/guides">View Guides</Link>
                    </Button>
                    <Button asChild variant="outline" className="text-green-800 border-green-800 hover:bg-green-50">
                      <Link to="/quiz">Take Quiz</Link>
                    </Button>
                  </div>
                </motion.div>
                <motion.div variants={fadeIn} className="grid grid-cols-2 gap-4">
                  {/* Educational resources cards */}
                  {/* Add more educational resource cards here */}
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.section>
      
      <motion.section 
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20 px-6 md:px-8 bg-gradient-to-b from-white to-green-50"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <Badge className="mb-2 bg-green-100 text-green-800">Get Started</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ready to Make a Difference?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of others in making responsible e-waste disposal decisions. Start your journey today.
            </p>
          </motion.div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-green-800 to-emerald-600 hover:from-green-700 hover:to-emerald-500 shadow-lg hover:shadow-xl transition-all">
              <Link to="/scan">Scan Your Device</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-green-800 text-green-800 hover:bg-green-50 transition-all">
              <Link to="/recyclers">Find Recyclers</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default Home;
          
          