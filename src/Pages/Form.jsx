import { useState } from "react";
import { Check, ChevronDown, User, Mail, Phone, Briefcase, FileText, Linkedin, Send } from "lucide-react";

export default function ReferralForm() {
  const [formData, setFormData] = useState({
    referrer: {
      fullName: "",
      email: "",
      phone: ""
    },
    referee: {
      fullName: "",
      email: "",
      phone: "",
      jobRole: "",
      program: ""
    },
    additional: {
      linkedin: "",
      message: ""
    },
    consent: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const programOptions = [
    "Data Science & AI",
    "Product Management",
    "Business Analytics",
    "Digital Transformation",
    "Business Management",
    "Project Management",
    "Strategy & Leadership"
  ];

  const jobRoleOptions = [
    "Software Engineer",
    "Data Analyst",
    "Product Manager",
    "Business Analyst",
    "Student",
    "Project Manager",
    "Marketing Professional",
    "Other"
  ];

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    
    // Clear error when field is edited
    if (errors[`${section}.${field}`]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[`${section}.${field}`];
        return newErrors;
      });
    }
  };

  const handleConsentChange = (checked) => {
    setFormData(prev => ({
      ...prev,
      consent: checked
    }));
    
    if (errors.consent) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.consent;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required field validation
    if (!formData.referrer.fullName) newErrors["referrer.fullName"] = "Full name is required";
    if (!formData.referrer.email) newErrors["referrer.email"] = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.referrer.email)) newErrors["referrer.email"] = "Email is invalid";
    if (!formData.referrer.phone) newErrors["referrer.phone"] = "Phone number is required";
    
    if (!formData.referee.fullName) newErrors["referee.fullName"] = "Full name is required";
    if (!formData.referee.email) newErrors["referee.email"] = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.referee.email)) newErrors["referee.email"] = "Email is invalid";
    if (!formData.referee.phone) newErrors["referee.phone"] = "Phone number is required";
    if (!formData.referee.jobRole) newErrors["referee.jobRole"] = "Job role is required";
    if (!formData.referee.program) newErrors["referee.program"] = "Program selection is required";
    
    // LinkedIn validation (optional but must be valid if provided)
    if (formData.additional.linkedin && !/^https?:\/\/(www\.)?linkedin\.com\/.*/.test(formData.additional.linkedin)) {
      newErrors["additional.linkedin"] = "Please enter a valid LinkedIn URL";
    }
    
    if (!formData.consent) newErrors.consent = "You must agree to the terms and conditions";
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after success message display
      setTimeout(() => {
        setFormData({
          referrer: { fullName: "", email: "", phone: "" },
          referee: { fullName: "", email: "", phone: "", jobRole: "", program: "" },
          additional: { linkedin: "", message: "" },
          consent: false
        });
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  const InputField = ({ section, field, label, type = "text", placeholder, icon, options = [] }) => {
    const id = `${section}-${field}`;
    const errorKey = `${section}.${field}`;
    const value = formData[section][field];
    
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              {icon}
            </div>
          )}
          
          {type === "select" ? (
            <div className="relative">
              <select
                id={id}
                value={value}
                onChange={(e) => handleChange(section, field, e.target.value)}
                className={`block w-full rounded-md border ${errors[errorKey] ? 'border-red-500' : 'border-gray-300'} 
                  py-2 pl-10 pr-10 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              >
                <option value="" disabled>Select an option</option>
                {options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                <ChevronDown size={16} />
              </div>
            </div>
          ) : type === "textarea" ? (
            <textarea
              id={id}
              value={value}
              onChange={(e) => handleChange(section, field, e.target.value)}
              placeholder={placeholder}
              rows={4}
              className={`block w-full rounded-md border ${errors[errorKey] ? 'border-red-500' : 'border-gray-300'} 
                py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
          ) : (
            <input
              id={id}
              type={type}
              value={value}
              onChange={(e) => handleChange(section, field, e.target.value)}
              placeholder={placeholder}
              className={`block w-full rounded-md border ${errors[errorKey] ? 'border-red-500' : 'border-gray-300'} 
                py-2 ${icon ? 'pl-10' : 'px-3'} text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
          )}
        </div>
        {errors[errorKey] && (
          <p className="mt-1 text-sm text-red-600">{errors[errorKey]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4">
          <h1 className="text-xl font-bold text-white">Referral Form</h1>
          <p className="text-blue-100 mt-1">Refer a friend and help them advance their career</p>
        </div>
        
        {isSuccess ? (
          <div className="p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">Referral Submitted Successfully!</h2>
            <p className="text-gray-600">
              Thank you for your referral. We will get in touch with your friend soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* 1. Referrer Details */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                1. Referrer Details <span className="text-gray-500 text-sm">(Person who is referring)</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InputField 
                  section="referrer" 
                  field="fullName" 
                  label="Full Name" 
                  placeholder="Enter your full name" 
                  icon={<User size={16} />} 
                />
                <InputField 
                  section="referrer" 
                  field="email" 
                  label="Email Address" 
                  type="email" 
                  placeholder="Enter your email" 
                  icon={<Mail size={16} />} 
                />
                <InputField 
                  section="referrer" 
                  field="phone" 
                  label="Phone Number" 
                  type="tel" 
                  placeholder="Enter your phone number" 
                  icon={<Phone size={16} />} 
                />
              </div>
            </div>
            
            {/* 2. Referee Details */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                2. Referee Details <span className="text-gray-500 text-sm">(Person being referred)</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InputField 
                  section="referee" 
                  field="fullName" 
                  label="Full Name" 
                  placeholder="Enter their full name" 
                  icon={<User size={16} />} 
                />
                <InputField 
                  section="referee" 
                  field="email" 
                  label="Email Address" 
                  type="email" 
                  placeholder="Enter their email" 
                  icon={<Mail size={16} />} 
                />
                <InputField 
                  section="referee" 
                  field="phone" 
                  label="Phone Number" 
                  type="tel" 
                  placeholder="Enter their phone number" 
                  icon={<Phone size={16} />} 
                />
                <InputField 
                  section="referee" 
                  field="jobRole" 
                  label="Current Job Role / Profession" 
                  type="select" 
                  icon={<Briefcase size={16} />} 
                  options={jobRoleOptions} 
                />
                <div className="md:col-span-2">
                  <InputField 
                    section="referee" 
                    field="program" 
                    label="Interested Program" 
                    type="select" 
                    icon={<FileText size={16} />} 
                    options={programOptions} 
                  />
                </div>
              </div>
            </div>
            
            {/* 3. Additional Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                3. Additional Information <span className="text-gray-500 text-sm">(Optional)</span>
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <InputField 
                  section="additional" 
                  field="linkedin" 
                  label="LinkedIn Profile (Optional)" 
                  type="url" 
                  placeholder="https://linkedin.com/in/username" 
                  icon={<Linkedin size={16} />} 
                />
                <InputField 
                  section="additional" 
                  field="message" 
                  label="Any Message (Optional)" 
                  type="textarea" 
                  placeholder="Enter any additional information about your referral..." 
                />
                
                {/* Consent Checkbox */}
                <div className="mt-1">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => handleConsentChange(e.target.checked)}
                        className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${errors.consent ? 'border-red-500' : ''}`}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="consent" className="font-medium text-gray-700">
                        I agree to the terms and conditions
                      </label>
                      <p className="text-gray-500">
                        By submitting this form, you confirm that you have the referee's permission to share their details.
                      </p>
                      {errors.consent && (
                        <p className="mt-1 text-sm text-red-600">{errors.consent}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 4. Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center py-2 px-6 rounded-md shadow-sm text-white font-medium
                  ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    Submit Referral
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}