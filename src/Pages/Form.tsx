import { useState } from "react";
import { CheckCircle, X } from "lucide-react";

// Define interfaces for our state objects
interface Referrer {
  fullName: string;
  email: string;
  phone: string;
  referralCode: string;
  userId: string;
}

interface Referee {
  fullName: string;
  email: string;
  phone: string;
  referralCode: string;
}

interface AdditionalInfo {
  dateOfReferral: string;
  signUpStatus: string;
  referralSource: string;
  promoCode: string;
}

interface FormErrors {
  referrerName?: string;
  referrerEmail?: string;
  refereeName?: string;
  refereeEmail?: string;
  [key: string]: string | undefined;
}

interface ReferralPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReferralPopup({ isOpen, onClose }: ReferralPopupProps) {
  // If the popup is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-2xl mx-auto bg-white shadow-xl rounded-lg border border-gray-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
        <ReferralFormContent onClose={onClose} />
      </div>
    </div>
  );
}

function ReferralFormContent({ onClose }: { onClose: () => void }) {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const [referrer, setReferrer] = useState<Referrer>({
    fullName: "",
    email: "",
    phone: "",
    referralCode: generateReferralCode(),
    userId: ""
  });

  const [referee, setReferee] = useState<Referee>({
    fullName: "",
    email: "",
    phone: "",
    referralCode: referrer.referralCode
  });

  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo>({
    dateOfReferral: new Date().toISOString().split("T")[0],
    signUpStatus: "Pending",
    referralSource: "",
    promoCode: ""
  });

  function generateReferralCode(): string {
    return "REF-" + Math.random().toString(36).substr(2, 8).toUpperCase();
  }

  function validateForm(): boolean {
    const newErrors: FormErrors = {};
    
    if (!referrer.fullName.trim()) newErrors.referrerName = "Name is required";
    if (!referrer.email.trim()) {
      newErrors.referrerEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(referrer.email)) {
      newErrors.referrerEmail = "Email is invalid";
    }
    
    if (!referee.fullName.trim()) newErrors.refereeName = "Name is required";
    if (!referee.email.trim()) {
      newErrors.refereeEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(referee.email)) {
      newErrors.refereeEmail = "Email is invalid";
    }
    
    if (referee.email === referrer.email) {
      newErrors.refereeEmail = "Referee email must be different from referrer";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    
    if (validateForm()) {
      console.log({ referrer, referee, additionalInfo });
      setFormSubmitted(true);
    }
  }
  
  function handleReset() {
    setFormSubmitted(false);
    setReferrer({
      ...referrer,
      fullName: "",
      email: "",
      phone: "",
      referralCode: generateReferralCode()
    });
    setReferee({
      fullName: "",
      email: "",
      phone: "",
      referralCode: ""
    });
    setAdditionalInfo({
      dateOfReferral: new Date().toISOString().split("T")[0],
      signUpStatus: "Pending",
      referralSource: "",
      promoCode: ""
    });
    setErrors({});
  }

  return (
    <div className="p-6">
      {formSubmitted ? (
        <div className="text-center py-10">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Referral Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">Your referral has been submitted and is being processed.</p>
          <p className="text-sm text-gray-500 mb-4">Referral Code: <span className="font-mono font-bold">{referrer.referralCode}</span></p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={handleReset}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              type="button"
            >
              Submit Another Referral
            </button>
            <button 
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="border-b pb-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Referral Program</h2>
            <p className="text-gray-600 mt-1">Invite friends and earn rewards when they join!</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Referrer Details */}
            <fieldset className="border p-5 rounded-lg border-gray-300">
              <legend className="font-semibold px-2 text-blue-600">Your Information</legend>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your full name" 
                    required 
                    className={`w-full px-4 py-2 border ${errors.referrerName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                    value={referrer.fullName} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReferrer({ ...referrer, fullName: e.target.value })} 
                  />
                  {errors.referrerName && <p className="text-red-500 text-xs mt-1">{errors.referrerName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    required 
                    className={`w-full px-4 py-2 border ${errors.referrerEmail ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                    value={referrer.email} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReferrer({ ...referrer, email: e.target.value })} 
                  />
                  {errors.referrerEmail && <p className="text-red-500 text-xs mt-1">{errors.referrerEmail}</p>}
                </div>
              </div>
            </fieldset>
                    
            {/* Referee Details */}
            <fieldset className="border p-5 rounded-lg border-gray-300">
              <legend className="font-semibold px-2 text-blue-600">Friend's Information</legend>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your friend's full name" 
                    required 
                    className={`w-full px-4 py-2 border ${errors.refereeName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                    value={referee.fullName} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReferee({ ...referee, fullName: e.target.value })} 
                  />
                  {errors.refereeName && <p className="text-red-500 text-xs mt-1">{errors.refereeName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="Enter your friend's email" 
                    required 
                    className={`w-full px-4 py-2 border ${errors.refereeEmail ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                    value={referee.email} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReferee({ ...referee, email: e.target.value })} 
                  />
                  {errors.refereeEmail && <p className="text-red-500 text-xs mt-1">{errors.refereeEmail}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-gray-500">(Optional)</span></label>
                  <input 
                    type="tel" 
                    placeholder="Enter your friend's phone number" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    value={referee.phone} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReferee({ ...referee, phone: e.target.value })} 
                  />
                </div>
              </div>
            </fieldset>
        
            {/* Additional Information */}
            <fieldset className="border p-5 rounded-lg border-gray-300">
              <legend className="font-semibold px-2 text-blue-600">Additional Information</legend>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Referral</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed" 
                    value={additionalInfo.dateOfReferral} 
                    readOnly 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">How did you share this referral?</label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    value={additionalInfo.referralSource} 
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAdditionalInfo({ ...additionalInfo, referralSource: e.target.value })}
                  >
                    <option value="">Select Referral Source</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Email">Email</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="In Person">In Person</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Promo Code <span className="text-gray-500">(If applicable)</span></label>
                  <input 
                    type="text" 
                    placeholder="Enter promo code" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    value={additionalInfo.promoCode} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAdditionalInfo({ ...additionalInfo, promoCode: e.target.value })} 
                  />
                </div>
              </div>
            </fieldset>
        
            <div className="pt-2 flex space-x-4">
              <button 
                type="submit" 
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-300 font-medium"
              >
                Submit Referral
              </button>
              <button 
                type="button" 
                onClick={onClose}
                className="bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors focus:ring-4 focus:ring-gray-200 font-medium"
              >
                Cancel
              </button>
            </div>
            <p className="text-center text-xs text-gray-500 mt-3">
              By submitting this form, you confirm that you have the consent of the referee to share their information.
            </p>
          </form>
        </>
      )}
    </div>
  );
}

// Example of how to use this component in your app
export function App() {
  const [isReferralPopupOpen, setIsReferralPopupOpen] = useState(false);
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your App</h1>
      <button 
        onClick={() => setIsReferralPopupOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Refer a Friend
      </button>
      
      <ReferralPopup 
        isOpen={isReferralPopupOpen} 
        onClose={() => setIsReferralPopupOpen(false)} 
      />
    </div>
  );
}