import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Logo from '@/assets/Link.svg'
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export function Appbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 10);
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    return (
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md py-3 mt-0' 
          : 'bg-transparent py-6 mt-12'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and Courses Button */}
            <div className='flex items-center gap-4'>
              <div className="h-10 w-auto">
                <img src={Logo} alt="logo" className='object-contain h-full' />
              </div>
              <Button className='bg-blue-600 hover:bg-blue-700 rounded-xl text-sm hidden sm:flex'>
                Courses
              </Button>
            </div>
  
            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center gap-2 lg:gap-4'>
              <Button variant="ghost" className='hover:bg-blue-50 font-medium text-gray-700 hover:text-blue-600'>
                Refer & Earn
              </Button>
              <Button variant="ghost" className='hover:bg-blue-50 font-medium text-gray-700 hover:text-blue-600'>
                Resources
              </Button>
              <Button variant="ghost" className='hover:bg-blue-50 font-medium text-gray-700 hover:text-blue-600'>
                About Us
              </Button>
              <Button className='bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl'>
                <Link to={'/auth'}>Login</Link>
              </Button>
              <Button className='bg-blue-600 hover:bg-blue-700 rounded-xl'>
                Try for Free
              </Button>
            </div>
  
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-700" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
  
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 bg-white rounded-xl shadow-lg animate-in slide-in-from-top-10 duration-300">
              <div className="flex flex-col gap-2 px-4">
                <Button className='bg-blue-600 hover:bg-blue-700 rounded-xl text-sm w-full justify-start mb-2'>
                  Courses
                </Button>
                <Button variant="ghost" className='w-full justify-start hover:bg-blue-50 font-medium text-gray-700 hover:text-blue-600'>
                  Refer & Earn
                </Button>
                <Button variant="ghost" className='w-full justify-start hover:bg-blue-50 font-medium text-gray-700 hover:text-blue-600'>
                  Resources
                </Button>
                <Button variant="ghost" className='w-full justify-start hover:bg-blue-50 font-medium text-gray-700 hover:text-blue-600'>
                  About Us
                </Button>
                <div className="flex gap-2 mt-2 pt-2 border-t border-gray-100">
                  <Button className='bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl flex-1'>
                    Login
                  </Button>
                  <Button className='bg-blue-600 hover:bg-blue-700 rounded-xl flex-1'>
                    Try for Free
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }