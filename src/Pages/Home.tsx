import ReferralModal from "@/components/Referral"
import { SVG } from "@/components/SVG"
import ReferralBenefits from "@/components/test"

export function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Refer Friends & <span className="text-primary">Earn Rewards</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Share the gift of learning with your friends and earn exciting rewards. Get up to $50 in course credits for
          every successful referral.
        </p>
        <ReferralModal />
      </section>

      {/* How it Works Section */}
      <section>
        <SVG/>
      </section>
        {/* Table*/}
        <section>
            <ReferralBenefits/>
        </section>
      {/* Rewards Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Rewards You'll Love</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <h3 className="mb-4 text-2xl font-semibold">For You</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  $50 course credits per referral
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  No limit on referrals
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Special bonus rewards
                </li>
              </ul>
            </div>
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <h3 className="mb-4 text-2xl font-semibold">For Your Friend</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  $25 welcome bonus
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Access to premium courses
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  24/7 learning support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

