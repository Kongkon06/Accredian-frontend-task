import { useState, useEffect } from "react";
import HeroSvg from '@/assets/Hero.svg';
import { Gift, Users } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "./ui/checkbox";
import { useRecoilState } from "recoil";
import { formoverlay } from "@/Atoms/Atom";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    name: z.string().min(1, "Friend's name is required"),
    email: z.string().email("Invalid email address"),
    course: z.string().min(1, "Course selection is required"),
    terms: z.boolean().refine(val => val === true, {
        message: "You must agree to the terms and conditions",
    }),
});

type FormData = z.infer<typeof formSchema>;

export default function Hero() {
    const [isVisible, setIsVisible] = useState(false);
    const [open, setOpen] = useRecoilState(formoverlay);
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            course: "",
            terms: false,
        },
    });
    const onSubmit = async (data: FormData) => {
        const token = Cookies.get("authToken"); // Get the token from cookies
        const requestData = {
            ...data, // Spread the form data
            token: token, // Add the token inside the body
        };
        const res = await axios.post(`${BACKEND_URL}/refferal`, requestData);
        console.log(res.data);
    };
    const handleReferClick = () => {
        const token = Cookies.get("authToken");
        if (!token) {
            navigate("/account/auth"); // Redirect to sign-in page if no token
        } else {
            setOpen(true); // Open the dialog if token is present
        }
    };
    useEffect(() => {

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
                                    <Dialog open={open} onOpenChange={(isOpen) => {
                                        if (Cookies.get("authToken")) {
                                            setOpen(isOpen); // Only allow open change if the token exists
                                        }
                                    }}>
                                        <DialogTrigger asChild>
                                            <Button
                                                size="lg"
                                                className="text-lg bg-blue-600 hover:bg-blue-600"
                                                onClick={handleReferClick} // Ensure logic runs on click
                                            >
                                                Refer Now
                                            </Button>
                                        </DialogTrigger>
                                        {open && (
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Refer a Friend</DialogTitle>
                                                    <DialogDescription>Fill in the details below to refer your friend and earn rewards.</DialogDescription>
                                                </DialogHeader>
                                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="friendName">Friend's Name</Label>
                                                        <Input {...register("name")} id="friendName" placeholder="Enter friend's name" required />
                                                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="friendEmail">Friend's Email</Label>
                                                        <Input {...register("email")} id="friendEmail" type="email" placeholder="Enter friend's email" required />
                                                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="course">Select Course</Label>
                                                        <Select onValueChange={(value) => setValue("course", value)} required>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a course" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="web-development">Web Development</SelectItem>
                                                                <SelectItem value="data-science">Data Science</SelectItem>
                                                                <SelectItem value="mobile-dev">Mobile Development</SelectItem>
                                                                <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.course && <p className="text-red-500 text-sm">{errors.course.message}</p>}
                                                    </div>

                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox id="terms" onCheckedChange={(checked: boolean) => setValue("terms", checked)} />
                                                        <Label htmlFor="terms" className="text-sm">
                                                            I agree to the terms and conditions
                                                        </Label>
                                                    </div>
                                                    {errors.terms && <p className="text-red-500 text-sm">{errors.terms.message}</p>}

                                                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-400">
                                                        Submit Referral
                                                    </Button>
                                                </form>
                                            </DialogContent>
                                        )}
                                    </Dialog>
                                    <p className="mt-3 text-xs text-gray-500">*Terms and conditions apply</p>
                                </div>
                            </div>
                        </div>

                        {/* Image Section - responsive adjustments */}
                        <div className="w-full h-full md:w-1/2 md:ml-auto  relative md:static flex justify-center md:justify-end">
                            <div className="relative md:absolute -z-10 md:right-0 md:top-0 md:bottom-0 md:h-full">
                                <img
                                    src={HeroSvg}
                                    alt="Learn and earn illustration"
                                    className="object-contain relative top-0 h-64 sm:h-80 md:h-full w-full max-w-sm md:max-w-none md:translate-y-0 mt-4 md:mt-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}   