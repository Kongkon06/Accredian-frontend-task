import { AuthTabs } from "@/components/AuthTabs"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import Logo from "@/assets/Link.svg"

export function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center">
            <Button className="bg-transparent hover:bg-transparent h-20 shadow-none">
                <Link to={'/'}>
                <img src={Logo} alt="Logo" className="object-cover h-full w-full" />
                </Link>
            </Button>
          <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your account or create a new one
          </p>
        </div>
        
        <AuthTabs />
        
        <div className="mt-6">
          <p className="text-center text-xs text-gray-500">
            By continuing, you agree to our{" "}
            <Link to="/terms" className="font-medium text-blue-600 hover:text-blue-500">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}