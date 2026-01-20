"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    quote:
      "Always great to work with Amr. He knows how to find talent that helps and gets the job done. Highly recommended.",
    author: "Upwork Client",
    role: "Sep 2023",
    company: "Upwork",
    rating: 5,
  },
  {
    quote:
      "Amr is a great contact to have and work with. He delivers as requested every time and we will continue to work with BPO Hive as a trusted vendor.",
    author: "Upwork Client",
    role: "Jul - Sep 2023",
    company: "Upwork",
    rating: 5,
  },
  {
    quote:
      "BPOHive and Abdullah has been exceptional in keeping me informed and maintaining open communication, which I value greatly.",
    author: "Upwork Client",
    role: "Mar - May 2023",
    company: "Upwork",
    rating: 5,
  },
  {
    quote: "Great team, great communication, would highly recommend!",
    author: "Upwork Client",
    role: "Feb - May 2023",
    company: "Upwork",
    rating: 5,
  },
  {
    quote:
      "Hesham is a real expert in spreadsheet formulas and data! Always comes through on the complex tasks. Highly recommend!",
    author: "Upwork Client",
    role: "Mar - Apr 2023",
    company: "Upwork",
    rating: 5,
  },
  {
    quote:
      "BPOHive has an outstanding service and have provided our team with consistent support. They have demonstrated commitment to delivering results that consistently meet and exceed our expectations.",
    author: "Upwork Client",
    role: "Aug 2022 - Jan 2023",
    company: "Upwork",
    rating: 5,
  },
  {
    quote: "Talented and high-quality staffing is provided. They communicate well and manage tasks efficiently.",
    author: "Anonymous COO",
    role: "Real Estate Company",
    company: "Canada",
    rating: 5,
  },
  {
    quote: "They've been very responsive when we've needed anything. Their system is easy to set up and use.",
    author: "Michael Ford",
    role: "CEO, Greenlit Brands",
    company: "Melbourne, Australia",
    rating: 5,
  },
  {
    quote: "Their project management was organized and reliable. They are proactive, responsive, and adapt quickly.",
    author: "Shawn Samuel",
    role: "CEO, Chemical Safety International",
    company: "Melbourne, Australia",
    rating: 5,
  },
  {
    quote: "They don't just focus on volume, but on delivering well-qualified, high-intent appointments.",
    author: "Summer Henderson",
    role: "Owner, Solar With Summer",
    company: "Central USA",
    rating: 4,
  },
  {
    quote:
      "Their ability to scale services to match our growth without compromising quality has been crucial. Achieved 99.8% accuracy in order processing.",
    author: "James Palmer",
    role: "CEO, 29Metals",
    company: "Melbourne, Australia",
    rating: 5,
  },
  {
    quote: "I was impressed with their ability to scale with us as we grow. The team has delivered work on time.",
    author: "Sarah Wessel",
    role: "VP Sales, Bitcoin Depot",
    company: "Atlanta, Georgia",
    rating: 5,
  },
  {
    quote:
      "All the personnel we have worked with are knowledgeable and incredibly friendly. Courteous, timely, and professional.",
    author: "Charles Rattray",
    role: "CEO, Southerly Ten",
    company: "Melbourne, Australia",
    rating: 5,
  },
  {
    quote: "The person I work with from their team is the best! They're smart, driven, and resourceful.",
    author: "Anonymous Owner",
    role: "Consulting Company",
    company: "Morristown, NJ",
    rating: 5,
  },
  {
    quote: "They treat our customers as their own and go above and beyond. Reduced operational costs by 25%.",
    author: "Anonymous CEO",
    role: "Bitstamp",
    company: "Luxembourg",
    rating: 5,
  },
  {
    quote:
      "I really appreciated their insights. Thanks to them, we hired five full-time talents on time and within budget.",
    author: "Chris Frazier",
    role: "Co-Founder, FBDC",
    company: "Rancho Mirage, CA",
    rating: 5,
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const testimonialsPerPage = 3
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage)
  
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }
  
  const goToNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }
  
  const currentTestimonials = testimonials.slice(
    currentIndex * testimonialsPerPage,
    currentIndex * testimonialsPerPage + testimonialsPerPage
  )

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with navigation buttons */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div className="text-center md:text-left max-w-2xl mb-6 md:mb-0">
            <div className="text-sm font-medium text-accent mb-3">Testimonials</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-balance text-secondary">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground text-lg">Real reviews from our satisfied clients worldwide.</p>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex items-center gap-3 justify-center md:justify-end">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-[#4ea6f8] transition-all duration-200"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5 text-[#20292f]" />
            </button>
            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-[#4ea6f8] transition-all duration-200"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5 text-[#20292f]" />
            </button>
          </div>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentTestimonials.map((testimonial, index) => (
            <Card key={index} className="border-border/50 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating ? "fill-accent text-accent" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                </div>
                <blockquote className="text-foreground mb-6 text-sm leading-relaxed">"{testimonial.quote}"</blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center overflow-hidden">
                    <Image
                      src={testimonial.company === "Upwork"
                        ? "/review-avatars/upwork-icon.svg"
                        : "/review-avatars/non-upwork-review-logo.webp"
                      }
                      alt={testimonial.company === "Upwork" ? "Upwork" : "Client"}
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-secondary">{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Page indicator dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex ? "bg-[#4ea6f8] w-6" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
