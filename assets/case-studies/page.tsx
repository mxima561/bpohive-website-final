import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

const caseStudies = [
  {
    id: 1,
    title: "Publicly Listed Fintech",
    subtitle: "Location Acquisition Program",
    duration: "18 months",
    metrics: [
      { label: "Locations Closed", value: "~400" },
      { label: "Engagement Growth", value: "~400%" },
      { label: "First 90 Days", value: "5x expansion" },
    ],
    challenge: "Client needed a repeatable location pipeline that could move prospects from initial identification to closed locations without slipping follow-ups or policy requirements.",
    solution: "Designed a structured outreach and follow-up cadence, executed client policies consistently, created reporting for pipeline health, and operated with weekly performance reviews.",
    result: "Delivered a scalable playbook the client could continue using for ongoing expansion.",
    valueEstimate: "~$16.0M",
  },
  {
    id: 2,
    title: "Top Real Estate Recruiting Platform",
    subtitle: "Agent Switching Outreach Engine",
    duration: "~24 months",
    metrics: [
      { label: "Team Size", value: "7-8 agents" },
      { label: "Output/Agent", value: "70-80 appts/mo" },
      { label: "Show Rate", value: "60-70%" },
    ],
    challenge: "Maintain high daily activity without sacrificing qualification quality. Create a predictable appointment engine leadership could scale with clear reporting.",
    solution: "Built the team end-to-end: recruiting, onboarding, training, QA, and performance management. Implemented daily operating systems with call targets and coaching loops.",
    result: "Estimated 11,760 to 15,360 booked appointments over the engagement period.",
    valueEstimate: "$672K-$768K",
  },
  {
    id: 3,
    title: "New Jersey Flooring Company",
    subtitle: "Built and Managed a Sales Team",
    duration: "~16 months",
    metrics: [
      { label: "Avg. Revenue", value: "$200K/month" },
      { label: "Total Revenue", value: "~$3.2M" },
      { label: "Team Performance", value: "Consistent" },
    ],
    challenge: "Build a sales team quickly while keeping performance accountable. Ensure consistent follow-up so leads did not leak from the pipeline.",
    solution: "Recruited and onboarded sales talent, delivered training, coaching, and performance management. Implemented follow-up discipline and supported reporting.",
    result: "Sales team averaged approximately $200,000 per month in revenue with improved operational clarity.",
    valueEstimate: "~$3.2M",
  },
  {
    id: 4,
    title: "AI SaaS Company",
    subtitle: "Shown Demos to Conversions",
    duration: "~18 months",
    metrics: [
      { label: "Shown Demos", value: "180 total" },
      { label: "Conversion Rate", value: "~20%" },
      { label: "New Clients", value: "36" },
    ],
    challenge: "Generate consistent demo volume—and ensure demos were attended. Maintain weekly visibility on pipeline health, show rates, and conversion performance.",
    solution: "Built an outreach and follow-up system optimized for shown demos. Ran weekly meetings and reporting to monitor show rates and conversion-to-customer.",
    result: "Average output of 10 shown demos per month with 20% conversion to new customers.",
    valueEstimate: "~$864K",
  },
]

const totalStats = [
  { label: "Total Value Generated", value: "$20.7M+" },
  { label: "Appointments Booked", value: "20,000+" },
  { label: "Programs Delivered", value: "4" },
  { label: "Total Delivery Duration", value: "76+ months" },
]

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <div className="bg-[#20292f] text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Case Studies</h1>
          <p className="text-xl text-white/70 max-w-2xl">
            Real results from real partnerships. See how we've helped businesses scale their sales and operations.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Summary Stats */}
        <div className="mb-20">
          <h2 className="text-sm font-semibold text-[#4ea6f8] uppercase tracking-wider mb-6">Combined Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {totalStats.map((stat, index) => (
              <div key={index} className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-[#20292f] mb-1">{stat.value}</div>
                <div className="text-sm text-[#20292f]/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Case Studies */}
        <div className="space-y-20">
          {caseStudies.map((study, index) => (
            <article key={study.id} className="relative">
              {/* Number indicator */}
              <div className="absolute -left-4 md:-left-16 top-0 text-8xl font-bold text-[#20292f]/5 select-none hidden md:block">
                {String(index + 1).padStart(2, '0')}
              </div>
              
              <div className="relative">
                {/* Header */}
                <div className="mb-8">
                  <span className="text-xs font-semibold text-[#4ea6f8] uppercase tracking-wider">
                    {study.duration}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#20292f] mt-2">
                    {study.title}
                  </h3>
                  <p className="text-lg text-[#20292f]/60 mt-1">{study.subtitle}</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-[#20292f]/10">
                  {study.metrics.map((metric, i) => (
                    <div key={i}>
                      <div className="text-2xl md:text-3xl font-bold text-[#20292f]">{metric.value}</div>
                      <div className="text-xs text-[#20292f]/50 uppercase tracking-wide mt-1">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className="space-y-6 text-[#20292f]/80">
                  <div>
                    <h4 className="text-xs font-semibold text-[#20292f] uppercase tracking-wider mb-2">Challenge</h4>
                    <p>{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#20292f] uppercase tracking-wider mb-2">Solution</h4>
                    <p>{study.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#20292f] uppercase tracking-wider mb-2">Result</h4>
                    <p>{study.result}</p>
                  </div>
                </div>

                {/* Value Badge */}
                <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-[#4ea6f8]/10 rounded-full">
                  <span className="text-sm text-[#20292f]/60">Estimated Value:</span>
                  <span className="text-sm font-bold text-[#4ea6f8]">{study.valueEstimate}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="bg-white border border-[#20292f]/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-[#20292f] mb-4">
              Ready to become our next success story?
            </h3>
            <p className="text-[#20292f]/60 mb-8 max-w-xl mx-auto">
              Let's discuss how we can help you achieve similar results for your business.
            </p>
            <Link 
              href="https://www.jotform.com/build/233154560347050"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#4ea6f8] hover:bg-[#3d95e7] text-white font-medium rounded-lg transition-colors"
            >
              Book a Discovery Call
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-12 text-center text-xs text-[#20292f]/40">
          Client names are anonymized for confidentiality. Metrics are based on client delivery records and management reporting.
        </p>
      </div>
    </main>
  )
}
