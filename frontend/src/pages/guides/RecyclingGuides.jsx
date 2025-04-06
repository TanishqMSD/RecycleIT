import React, {useEffect} from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RecyclingGuides = () => {

  const handleApiError = (error) => {
    console.error('API Error:', error);
    alert('The recycling centers API endpoint is currently unavailable. Please try again later.');
  };
  
  useEffect(() => {
    const fetchRecyclers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/nearby`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ latitude: 19.076, longitude: 72.8777 }),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log('Recyclers:', data);
      } catch (error) {
        handleApiError(error);
      }
    };
  
    fetchRecyclers();
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-4 sm:mb-6">E-Waste Recycling Guide</h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
          Learn everything you need to know about responsible e-waste disposal and recycling.
        </p>

        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 mb-6 sm:mb-8">
            <TabsTrigger className="px-2 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base" value="basics">Basics</TabsTrigger>
            <TabsTrigger className="px-2 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base" value="process">Recycling Process</TabsTrigger>
            <TabsTrigger className="px-2 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base" value="benefits">Benefits</TabsTrigger>
            <TabsTrigger className="px-2 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base" value="health">Health Impacts</TabsTrigger>
            <TabsTrigger className="px-2 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base" value="tips">Tips & Best Practices</TabsTrigger>
          </TabsList>

          <TabsContent value="basics">
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-green-700 mb-3 sm:mb-4">What is E-Waste?</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                Electronic waste, or e-waste, refers to discarded electronic devices and equipment. This includes
                computers, smartphones, tablets, TVs, and other electronic devices that have reached the end of their useful life.
              </p>
              <h3 className="text-lg sm:text-xl font-semibold text-green-700 mb-2 sm:mb-3">Common Types of E-Waste</h3>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2">
                <li>Computers and laptops</li>
                <li>Mobile phones and tablets</li>
                <li>Television sets and monitors</li>
                <li>Printers and scanners</li>
                <li>Gaming consoles</li>
                <li>Electronic accessories and cables</li>
              </ul>
              <h3 className="text-lg sm:text-xl font-semibold text-green-700 mb-2 sm:mb-3">Why Proper Disposal Matters</h3>
              <p className="text-sm sm:text-base text-gray-600">
                E-waste contains hazardous materials like lead, mercury, and cadmium that can harm the environment
                and human health if not disposed of properly. Proper recycling ensures these materials are handled safely
                and valuable resources are recovered.
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="process">
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-green-700 mb-3 sm:mb-4">The E-Waste Recycling Process</h2>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-green-700 mb-2 sm:mb-3">1. Collection</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    E-waste is collected from designated drop-off points, recycling centers, or through special collection events.
                    Some retailers and manufacturers also offer take-back programs.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-green-700 mb-2 sm:mb-3">2. Sorting and Dismantling</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Devices are sorted by type and manually dismantled to separate different components like circuit boards,
                    batteries, screens, and plastic casings.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-green-700 mb-2 sm:mb-3">3. Material Recovery</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Various processes are used to recover valuable materials:
                  </p>
                  <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 mt-2 space-y-1 sm:space-y-2">
                    <li>Metals are extracted through smelting and refining</li>
                    <li>Plastics are sorted and recycled</li>
                    <li>Glass is processed for reuse</li>
                    <li>Hazardous materials are safely disposed of</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="benefits">
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-green-700 mb-3 sm:mb-4">Benefits of E-Waste Recycling</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-green-700 mb-2 sm:mb-3">Environmental Benefits</h3>
                  <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1 sm:space-y-2">
                    <li>Reduces landfill waste</li>
                    <li>Prevents toxic materials from contaminating soil and water</li>
                    <li>Conserves natural resources</li>
                    <li>Reduces greenhouse gas emissions from manufacturing</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-green-700 mb-2 sm:mb-3">Economic Benefits</h3>
                  <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1 sm:space-y-2">
                    <li>Creates jobs in the recycling industry</li>
                    <li>Recovers valuable materials for reuse</li>
                    <li>Reduces manufacturing costs</li>
                    <li>Supports the circular economy</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="tips">
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-green-700 mb-3 sm:mb-4">Tips for Responsible E-Waste Recycling</h2>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-green-700 mb-2 sm:mb-3">Before Recycling</h3>
                  <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1 sm:space-y-2">
                    <li>Back up your data</li>
                    <li>Factory reset devices to remove personal information</li>
                    <li>Remove batteries (they may need separate recycling)</li>
                    <li>Keep accessories together with their devices</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-green-700 mb-2 sm:mb-3">Finding Recycling Options</h3>
                  <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1 sm:space-y-2">
                    <li>Check manufacturer take-back programs</li>
                    <li>Look for certified e-waste recyclers</li>
                    <li>Participate in community collection events</li>
                    <li>Use our recycler locator tool to find nearby facilities</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-green-700 mb-2 sm:mb-3">Best Practices</h3>
                  <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1 sm:space-y-2">
                    <li>Don't throw e-waste in regular trash</li>
                    <li>Keep devices in good condition to extend their life</li>
                    <li>Consider donating working devices</li>
                    <li>Store e-waste safely until proper disposal</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="health">
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-green-700 mb-3 sm:mb-4">Health Impacts of E-Waste</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="relative">
                  <svg className="w-full h-auto" viewBox="0 0 400 600">
                    <defs>
                      <motion.path
                        id="brain-path"
                        d="M200,100 C240,100 260,140 260,160 C260,180 240,200 200,200 C160,200 140,180 140,160 C140,140 160,100 200,100"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </defs>
                    
                    {/* Human Body Outline */}
                    <path
                      d="M200,50 C300,50 300,200 300,350 L250,550 L150,550 L100,350 C100,200 100,50 200,50"
                      fill="none"
                      stroke="#2F855A"
                      strokeWidth="2"
                    />
                    
                    {/* Brain - Mercury */}
                    <g transform="translate(0,-20)">
                      <circle cx="200" cy="120" r="40" fill="#4FD1C5" opacity="0.6" />
                      <text x="280" y="120" className="text-sm font-medium">Mercury</text>
                      <text x="280" y="140" className="text-xs">Brain & Nerve Damage</text>
                    </g>

                    {/* Lungs - Cadmium */}
                    <g transform="translate(0,80)">
                      <path
                        d="M160,200 C130,220 130,280 160,300 M240,200 C270,220 270,280 240,300"
                        fill="none"
                        stroke="#38B2AC"
                        strokeWidth="2"
                      />
                      <text x="280" y="250" className="text-sm font-medium">Cadmium</text>
                      <text x="280" y="270" className="text-xs">Lung Damage</text>
                    </g>

                    {/* Liver - Lead */}
                    <g transform="translate(0,180)">
                      <circle cx="200" cy="320" r="30" fill="#319795" opacity="0.6" />
                      <text x="280" y="320" className="text-sm font-medium">Lead</text>
                      <text x="280" y="340" className="text-xs">Liver Damage</text>
                    </g>

                    {/* DNA - Chromium */}
                    <g transform="translate(0,280)">
                      <path
                        d="M180,420 C220,400 180,440 220,420"
                        fill="none"
                        stroke="#2C7A7B"
                        strokeWidth="2"
                        strokeDasharray="4"
                      />
                      <text x="280" y="420" className="text-sm font-medium">Chromium</text>
                      <text x="280" y="440" className="text-xs">DNA Damage</text>
                    </g>

                    {/* Hormones - BFRs */}
                    <g transform="translate(0,380)">
                      <circle cx="200" cy="520" r="25" fill="#285E61" opacity="0.6" />
                      <text x="280" y="520" className="text-sm font-medium">BFRs</text>
                      <text x="280" y="540" className="text-xs">Hormonal Disorders</text>
                    </g>
                  </svg>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-green-700 mb-2">Understanding the Risks</h3>
                    <p className="text-sm text-gray-600">
                      E-waste contains various toxic materials that can severely impact human health when not properly handled.
                      These toxins can enter our bodies through air, water, and soil contamination.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-green-700 mb-2">Key Toxic Materials</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><span className="font-medium">Mercury:</span> Affects brain development and nervous system</li>
                      <li><span className="font-medium">Lead:</span> Causes damage to kidneys and nervous system</li>
                      <li><span className="font-medium">Cadmium:</span> Associated with lung damage and kidney disease</li>
                      <li><span className="font-medium">Chromium:</span> Can cause severe DNA damage and eye problems</li>
                      <li><span className="font-medium">BFRs:</span> Disrupts hormone systems and affects development</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-green-700 mb-2">Prevention Tips</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>Always use certified e-waste recycling facilities</li>
                      <li>Avoid burning or dismantling electronics yourself</li>
                      <li>Keep electronics away from water sources</li>
                      <li>Store old devices safely until proper disposal</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default RecyclingGuides;

