import { useState, useEffect } from "react";
import HeroSvg from '@/assets/Hero.svg';
import { Button } from './ui/button';
import { ArrowRight, Gift, Users } from "lucide-react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation on component mount
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full flex items-center justify-center px-4 sm:px-6 py-12">
      <div className={`w-full max-w-6xl transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="relative overflow-hidden flex flex-col md:flex-row rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg">
          {/* Background pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-400 rounded-full translate-x-24 translate-y-24"></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full">
            {/* Content Section */}
            <div className="w-full md:w-1/2 p-6 md:p-6 flex flex-col">
              <div className="space-y-6">
                {/* Heading */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                  <span className="block">Let's Learn</span>
                  <span className="block text-blue-600">&amp; Earn</span>
                </h1>
                
                {/* Subheading */}
                <div className="mt-4 space-y-1">
                  <p className="text-lg md:text-xl text-gray-600">Get a Chance to win</p>
                  <p className="text-lg md:text-xl font-semibold">
                    up-to <span className="text-blue-600 font-bold">Rs 15,000</span>
                  </p>
                </div>
                
                {/* Features */}
                <div className="pt-4 flex flex-col gap-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users size={16} className="text-blue-600" />
                    </div>
                    <p className="ml-3 text-sm md:text-base text-gray-600">Refer friends and expand your network</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Gift size={16} className="text-blue-600" />
                    </div>
                    <p className="ml-3 text-sm md:text-base text-gray-600">Earn rewards for every successful referral</p>
                  </div>
                </div>
                
                {/* CTA */}
                <div className="pt-6">
                  <Button className="text-base bg-blue-600 hover:bg-blue-700 px-6 py-5 h-auto shadow-md hover:shadow-lg transition-all duration-200 group">
                    Refer Now
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <p className="mt-3 text-xs text-gray-500">*Terms and conditions apply</p>
                </div>
              </div>
            </div>
            
            {/* Image Section - responsive adjustments */}
            <div className="w-full md:w-1/2 md:ml-auto top-4 relative md:static flex justify-center md:justify-end">
              <div className="relative md:absolute -z-10 md:right-0 md:top-0 md:bottom-0 md:h-full">
                <img 
                  src={HeroSvg} 
                  alt="Learn and earn illustration" 
                  className="object-contain h-64 sm:h-80 md:h-full w-full max-w-sm md:max-w-none md:translate-y-0 mt-4 md:mt-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}   