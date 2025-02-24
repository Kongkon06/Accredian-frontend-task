import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [expandedSections, setExpandedSections] = useState({
    programs: false,
    links: false
  });

  const toggleSection = (section: "programs" | "links") => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const programs = [
    "Data Science & AI",
    "Product Management",
    "Business Analytics",
    "Digital Transformation",
    "Business Management",
    "Project Management",
    "Strategy & Leadership",
    "Senior Management",
    "Fintech",
  ];

  const links = [
    "Career",
    "Blog",
    "Admission Policy",
    "Referral Policy",
    "Privacy Policy",
    "Terms Of Service",
    "Master FAQs",
  ];

  const contacts = [
    { 
      type: "email", 
      label: "Data Science Queries", 
      value: "admissions@accredian.com", 
      icon: <Mail size={16} className="mr-2 flex-shrink-0" />,
      href: "mailto:admissions@accredian.com"
    },
    { 
      type: "email", 
      label: "Product Management Queries", 
      value: "pm@accredian.com", 
      icon: <Mail size={16} className="mr-2 flex-shrink-0" />,
      href: "mailto:pm@accredian.com"
    },
    { 
      type: "phone", 
      label: "Data Science Admission", 
      value: "+91 9075669232 (9 AM - 7 PM)", 
      icon: <Phone size={16} className="mr-2 flex-shrink-0" />,
      href: "tel:+919075669232"
    },
    { 
      type: "phone", 
      label: "Product Management Admission", 
      value: "+91 9629811095", 
      icon: <Phone size={16} className="mr-2 flex-shrink-0" />,
      href: "tel:+919629811095"
    },
    { 
      type: "phone", 
      label: "Enrolled Student Helpline", 
      value: "+91 7999232077", 
      icon: <Phone size={16} className="mr-2 flex-shrink-0" />,
      href: "tel:+917999232077"
    },
    { 
      type: "address", 
      label: "Office Address", 
      value: "4th Floor, 2504, Phase IV, Udyog Vihar, Sector 18, Gurugram, Haryana 122015", 
      icon: <MapPin size={16} className="mr-2 flex-shrink-0" />,
      href: "https://maps.google.com/?q=Udyog+Vihar+Phase+IV+Sector+18+Gurugram+Haryana"
    },
  ];

  const social = [
    { name: "LinkedIn", icon: <Linkedin size={22} />, href: "#" },
    { name: "Facebook", icon: <Facebook size={22} />, href: "#" },
    { name: "Twitter", icon: <Twitter size={22} />, href: "#" },
    { name: "Instagram", icon: <Instagram size={22} />, href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Logo and description section */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">Accredian</h2>
              <p className="text-gray-400 mt-2 max-w-md">Empowering professionals with industry-relevant education and skills for the digital age.</p>
            </div>
            <div className="flex space-x-4">
              {social.map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
                  aria-label={`Follow us on ${item.name}`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="h-px bg-gray-700 w-full" />
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Programs Section - with mobile toggle */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Programs</h3>
              <button 
                className="md:hidden"
                onClick={() => toggleSection('programs')}
                aria-expanded={expandedSections.programs}
                aria-controls="programs-list"
              >
                {expandedSections.programs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
            <div id="programs-list" className={`space-y-2 ${!expandedSections.programs && 'hidden md:block'}`}>
              {programs.map((program, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="block py-1 text-gray-300 hover:text-white transition-colors"
                >
                  {program}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {contacts.map((contact, index) => (
                <a 
                  key={index}
                  href={contact.href}
                  className="flex items-start text-gray-300 hover:text-white transition-colors"
                >
                  {contact.icon}
                  <div>
                    <p className="text-sm text-gray-400">{contact.label}</p>
                    <p>{contact.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Links Section - with mobile toggle */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <button 
                className="md:hidden"
                onClick={() => toggleSection('links')}
                aria-expanded={expandedSections.links}
                aria-controls="links-list"
              >
                {expandedSections.links ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
            <div id="links-list" className={`space-y-2 ${!expandedSections.links && 'hidden md:block'}`}>
              {links.map((link, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="flex items-center py-1 text-gray-300 hover:text-white transition-colors"
                >
                  <ExternalLink size={14} className="mr-2" />
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2024 Accredian, A Brand of Fullstack Education Pvt. Ltd. All Rights Reserved</p>
          <div className="mt-3 md:mt-0 flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}