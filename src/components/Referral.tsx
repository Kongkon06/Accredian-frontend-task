import type React from "react"

import { useState } from "react"
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
import { Checkbox } from "@/components/ui/checkbox"

export default function ReferralModal() {
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="text-lg">
          Refer Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Refer a Friend</DialogTitle>
          <DialogDescription>Fill in the details below to refer your friend and earn rewards.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="referrerName">Your Name</Label>
            <Input id="referrerName" placeholder="Enter your name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="referrerEmail">Your Email</Label>
            <Input id="referrerEmail" type="email" placeholder="Enter your email" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="friendName">Friend's Name</Label>
            <Input id="friendName" placeholder="Enter friend's name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="friendEmail">Friend's Email</Label>
            <Input id="friendEmail" type="email" placeholder="Enter friend's email" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">Select Course</Label>
            <Select required>
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
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" required />
            <Label htmlFor="terms" className="text-sm">
              I agree to the terms and conditions
            </Label>
          </div>

          <Button type="submit" className="w-full">
            Submit Referral
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

