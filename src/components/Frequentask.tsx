import { useState } from "react";
import { ChevronDown, ChevronUp, Menu } from "lucide-react";

const faqs = [
  {
    question: "Do I need to have prior Product Management and Project Management experience to enroll in the program?",
    answer: "No, the program is designed to be inclusive of all levels of experience. All topics will be covered from the basics, making it suitable for individuals from any field of work."
  },
  {
    question: "What is the minimum system configuration required?",
    answer: "A modern computer with at least 8GB RAM and a stable internet connection is recommended."
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeSidebar, setActiveSidebar] = useState("Eligibility");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleFAQ = (index:any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const sidebarItems = ["Eligibility", "How To Use?", "Terms & Conditions"];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Menu Toggle */}
        <div className="md:hidden mb-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-between w-full p-3 bg-blue-50 rounded-lg"
          >
            <span className="font-medium">Navigation</span>
            <Menu size={20} />
          </button>
          
          {mobileMenuOpen && (
            <div className="mt-2 bg-white rounded-lg shadow-md overflow-hidden">
              {sidebarItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveSidebar(item);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left p-3 border-b ${
                    activeSidebar === item 
                      ? "bg-blue-50 text-blue-600 font-medium" 
                      : "hover:bg-gray-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Navigation */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-4">Navigation</h3>
            <div className="space-y-2">
              {sidebarItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSidebar(item)}
                  className={`w-full text-left p-3 rounded-md ${
                    activeSidebar === item 
                      ? "bg-blue-100 text-blue-600 font-medium" 
                      : "hover:bg-blue-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-4 text-left text-lg font-medium flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span>{faq.question}</span>
                    <span className="text-blue-600 ml-2">
                      {openIndex === index ? 
                        <ChevronUp size={20} /> : 
                        <ChevronDown size={20} />
                      }
                    </span>
                  </button>
                  
                  {openIndex === index && (
                    <div 
                      id={`faq-answer-${index}`}
                      className="p-4 bg-white text-gray-700 animate-fadeIn"
                    >
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}