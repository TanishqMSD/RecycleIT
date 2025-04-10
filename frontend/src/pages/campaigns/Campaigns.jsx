import React from 'react';

const Campaigns = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Active Campaigns</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample Campaign Cards */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src="https://placehold.co/600x400" 
            alt="Campaign 1" 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">E-Waste Collection Drive</h3>
            <p className="text-gray-600 mb-4">Join our monthly e-waste collection drive to responsibly dispose of your electronic waste.</p>
            <div className="flex justify-between items-center">
              <span className="text-green-600 font-medium">Ongoing</span>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                Join Now
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src="https://placehold.co/600x400" 
            alt="Campaign 2" 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">School Awareness Program</h3>
            <p className="text-gray-600 mb-4">Educational initiative to spread awareness about e-waste management in schools.</p>
            <div className="flex justify-between items-center">
              <span className="text-green-600 font-medium">Starting Soon</span>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src="https://placehold.co/600x400" 
            alt="Campaign 3" 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Corporate Partnership</h3>
            <p className="text-gray-600 mb-4">Partner with us to implement sustainable e-waste management practices in your organization.</p>
            <div className="flex justify-between items-center">
              <span className="text-green-600 font-medium">Open</span>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                Partner Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;