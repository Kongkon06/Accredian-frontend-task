import { useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ChevronRight, GraduationCap, Search, Info, Users } from "lucide-react";
import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSetRecoilState } from "recoil";
import { formoverlay } from "@/Atoms/Atom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const programs = [
    { name: "Professional Certificate Program in Product Management", referrer: "₹7,000", referee: "₹9,000", category: "Product Management" },
    { name: "PG Certificate Program in Strategic Product Management", referrer: "₹9,000", referee: "₹11,000", category: "Product Management" },
    { name: "Executive Program in Data Driven Product Management", referrer: "₹10,000", referee: "₹10,000", category: "Data Science" },
    { name: "Executive Program in Product Management and Digital Transformation", referrer: "₹10,000", referee: "₹10,000", category: "Digital Transformation" },
    { name: "Executive Program in Product Management", referrer: "₹10,000", referee: "₹10,000", category: "Product Management" },
    { name: "Advanced Certification in Product Management", referrer: "₹10,000", referee: "₹10,000", category: "Product Management" },
    { name: "Executive Program in Product Management and Project Management", referrer: "₹10,000", referee: "₹10,000", category: "Business Management" },
];

const categories = [
    "All Programs",
    "Product Management",
    "Strategy & Leadership",
    "Business Management",
    "Fintech",
    "Senior Management",
    "Data Science",
    "Digital Transformation",
    "Business Analytics",
];

export default function ReferralBenefits() {
    const [selectedCategory, setSelectedCategory] = useState("All Programs");
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const setOpen = useSetRecoilState(formoverlay);
    const categoriesRef = useRef<HTMLDivElement | null>(null);
    const tableBodyRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const handleClick = () => {
        const token = Cookies.get("authToken");
        if (!token) {
            navigate("/account/auth"); // Redirect to sign-in page if no token
        } else {
            setOpen(true); // Open the dialog if token is present
        }
    };
      

    // Filter programs based on selected category and search term
    const filteredPrograms = programs.filter((program) => {
        const matchesCategory = selectedCategory === "All Programs" || program.category === selectedCategory;
        const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      });

    useEffect(() => {
        const syncHeight = () => {
          if (categoriesRef.current && tableBodyRef.current) {
            // Calculate height excluding search box (approximately 70px)
            const categoriesHeight = categoriesRef.current.clientHeight - 70;
            tableBodyRef.current.style.maxHeight = `${categoriesHeight}px`;
          }
        };
    
        syncHeight();
        window.addEventListener('resize', syncHeight);
        
        return () => {
          window.removeEventListener('resize', syncHeight);
        };
      }, [categories, selectedCategory]);

    return (
        <div className="bg-white rounded-xl">
            <div className="p-8">
                <h2 className="text-center text-3xl font-bold mb-8">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Referral Benefits
                    </span>
                </h2>

                <Tabs defaultValue="benefits" className="mb-8 max-w-6xl mx-auto">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="benefits">Benefit Structure</TabsTrigger>
                        <TabsTrigger value="eligibility">Eligibility & Terms</TabsTrigger>
                    </TabsList>
                    <TabsContent value="benefits" className="p-4">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-blue-600" />
                                <span className="font-medium">Total Referrals Made: <span className="text-blue-600">24</span></span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium">Enrolled Students Only</span>
                                <Switch checked={isEnrolled} onCheckedChange={setIsEnrolled} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-sm border border-blue-100">
                                <h3 className="font-semibold text-lg mb-2 text-blue-700">For Referrer</h3>
                                <p className="text-gray-600 mb-4">You'll receive these benefits when someone joins using your link:</p>
                                <div className="text-3xl font-bold text-blue-600 mb-2">₹7,000 - ₹10,000</div>
                                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Course Credits</Badge>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-sm border border-purple-100">
                                <h3 className="font-semibold text-lg mb-2 text-purple-700">For Referee</h3>
                                <p className="text-gray-600 mb-4">Your friend will receive these benefits when they join:</p>
                                <div className="text-3xl font-bold text-purple-600 mb-2">₹9,000 - ₹11,000</div>
                                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Welcome Bonus</Badge>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 shadow-sm border border-green-100">
                                <h3 className="font-semibold text-lg mb-2 text-green-700">Total Earnings</h3>
                                <p className="text-gray-600 mb-4">Your current earnings from all referrals:</p>
                                <div className="text-3xl font-bold text-green-600 mb-2">₹54,000</div>
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Redeemable</Badge>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="eligibility" className="p-4">
                        <div className="space-y-4 text-gray-700">
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <h3 className="font-semibold text-lg mb-2 text-blue-700">Who Can Refer?</h3>
                                <p>Any current or past student can refer friends to our programs. You'll need to be signed in to your account to access your unique referral link.</p>
                            </div>

                            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                                <h3 className="font-semibold text-lg mb-2 text-purple-700">When Are Credits Applied?</h3>
                                <p>Referral bonuses are applied once your friend completes enrollment and makes their first payment. Credits will appear in your account within 48 hours.</p>
                            </div>

                            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                                <h3 className="font-semibold text-lg mb-2 text-amber-700">Credit Validity</h3>
                                <p>All earned credits are valid for 12 months from the date they're issued. Credits can be applied to any program or course offered on our platform.</p>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
                    {/* Sidebar */}
                    <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
                        {/* Sidebar */}
                        <div
                            ref={categoriesRef}
                            className="w-full md:w-64 bg-gray-50 rounded-lg p-4 border border-gray-200 self-start"
                        >
                            <div className="mb-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search programs..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                {categories.map((category, index) => (
                                    <button
                                        key={index}
                                        className={`flex justify-between w-full p-2 text-left rounded-lg transition-all ${selectedCategory === category
                                                ? "bg-blue-600 text-white font-medium"
                                                : "hover:bg-gray-200 text-gray-700"
                                            }`}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category}
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Table Container */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                                {/* Fixed Header */}
                                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                                    <table className="w-full">
                                        <thead>
                                            <tr>
                                                <th className="p-4 text-left">Programs</th>
                                                <th className="p-4 text-left">
                                                    <div className="flex items-center gap-1">
                                                        Referrer Bonus
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger>
                                                                    <Info className="h-4 w-4" />
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    Amount you'll receive when someone joins using your link
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </div>
                                                </th>
                                                <th className="p-4 text-left">
                                                    <div className="flex items-center gap-1">
                                                        Referee Bonus
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger>
                                                                    <Info className="h-4 w-4" />
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    Amount your friend will receive when they join
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>

                                {/* Scrollable Body */}
                                <div
                                    ref={tableBodyRef}
                                    className="overflow-y-auto"
                                    style={{
                                        maxHeight: "300px",
                                        overflowY: "auto",
                                        scrollbarWidth: "none", // For Firefox
                                        msOverflowStyle: "none", // For IE & Edge
                                      }}
                                       // Initial height, will be updated by useEffect
                                >
                                    <table className="w-full">
                                        <tbody>
                                            {filteredPrograms.length > 0 ? (
                                                filteredPrograms.map((program, index) => (
                                                    <tr
                                                        key={index}
                                                        className="border-b hover:bg-blue-50 transition-colors"
                                                    >
                                                        <td className="p-4">
                                                            <div className="flex items-center gap-2">
                                                                <GraduationCap className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                                                <div>
                                                                    <div>{program.name}</div>
                                                                    <div className="text-xs text-gray-500">{program.category}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 font-medium text-green-600">{program.referrer}</td>
                                                        <td className="p-4 font-medium text-purple-600">{program.referee}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={3} className="p-8 text-center text-gray-500">
                                                        No programs found matching your search criteria.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Refer Now Button */}
                </div>
                <div className="flex justify-center mt-6">
                        <Button onClick={handleClick} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-2 rounded-lg text-lg font-medium">
                            Refer Now
                        </Button>
                    </div>
            </div>
        </div>
  );
}