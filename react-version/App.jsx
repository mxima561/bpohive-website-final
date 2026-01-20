import React, { useEffect, useState } from 'react';

// Tailwind CSS Configuration (add to tailwind.config.js)
/*
module.exports = {
  theme: {
    extend: {
      colors: {
        'belkins-orange': '#FF5C35',
        'belkins-dark': '#1A1A1A',
        'belkins-gray': '#6B7280',
        'belkins-light': '#F9FAFB',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
    }
  }
}
*/

// ============================================
// NAVBAR COMPONENT
// ============================================
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesDropdownItems = {
    leadGeneration: [
      { title: 'Appointment setting', desc: 'Secure meetings with decision-makers', icon: '📅' },
      { title: 'Cold email outreach', desc: 'Run email campaigns that convert', icon: '📧' },
      { title: 'Cold calling', desc: 'Book 30% more appointments', icon: '📞' },
      { title: 'LinkedIn lead generation', desc: 'Expand your reach on LinkedIn', icon: '💼' },
    ],
    otherServices: ['Account-based marketing', 'Deliverability consulting', 'HubSpot CRM consultancy', 'Outsourced SDR'],
    companySize: ['Enterprise', 'SMB', 'Startup'],
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 transition-shadow ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <span className="text-2xl font-bold text-belkins-dark">belk</span>
            <span className="text-2xl font-bold text-belkins-orange">i</span>
            <span className="text-2xl font-bold text-belkins-dark">ns</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center text-belkins-dark hover:text-belkins-orange transition-colors">
                Services & solutions
                <ChevronDownIcon className="ml-1 w-4 h-4" />
              </button>
              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 mt-2 w-[700px] bg-white rounded-xl shadow-2xl p-6 border border-gray-100 animate-fadeIn">
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Lead Generation</p>
                      <div className="space-y-3">
                        {servicesDropdownItems.leadGeneration.map((item, i) => (
                          <a key={i} href="#" className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-sm">
                              {item.icon}
                            </div>
                            <div>
                              <p className="font-medium text-belkins-dark text-sm">{item.title}</p>
                              <p className="text-xs text-gray-500">{item.desc}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Other Services</p>
                      <div className="space-y-2">
                        {servicesDropdownItems.otherServices.map((item, i) => (
                          <a key={i} href="#" className="block p-2 text-sm text-belkins-dark hover:text-belkins-orange transition-colors">{item}</a>
                        ))}
                      </div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 mt-6">By Company Size</p>
                      <div className="space-y-2">
                        {servicesDropdownItems.companySize.map((item, i) => (
                          <a key={i} href="#" className="block p-2 text-sm text-belkins-dark hover:text-belkins-orange transition-colors">{item}</a>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-belkins-dark mb-2">Our approach</h4>
                      <p className="text-sm text-gray-500 mb-4">Find out about Belkins' lead generation process that sets us apart</p>
                      <a href="#" className="inline-flex items-center text-belkins-orange text-sm font-medium hover:underline">
                        Learn more <ArrowRightIcon className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <NavLink href="#">Industries</NavLink>
            <NavLink href="#">Case studies</NavLink>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center text-belkins-dark hover:text-belkins-orange transition-colors">
                About
                <ChevronDownIcon className="ml-1 w-4 h-4" />
              </button>
              {activeDropdown === 'about' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl p-4 border border-gray-100 animate-fadeIn">
                  {['About us', 'Our team', 'Careers', 'Blog'].map((item, i) => (
                    <a key={i} href="#" className="block p-2 text-sm text-belkins-dark hover:text-belkins-orange transition-colors rounded-lg hover:bg-gray-50">{item}</a>
                  ))}
                </div>
              )}
            </div>

            <NavLink href="#">Pricing</NavLink>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="primary">Book a call</Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-slideDown">
          <div className="px-4 py-4 space-y-3">
            {['Services & solutions', 'Industries', 'Case studies', 'About', 'Pricing'].map((item, i) => (
              <a key={i} href="#" className="block py-2 text-belkins-dark">{item}</a>
            ))}
            <Button variant="primary" className="w-full mt-4">Book a call</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

// ============================================
// HERO SECTION COMPONENT
// ============================================
const HeroSection = () => {
  const clientLogos = ['EBANX', 'Berkeley', 'ORDWAY', 'CitrusAd', 'GE', 'CITCON', 'CEMTREX', 'born&bred'];

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-belkins-light">
      {/* Background decorations */}
      <div className="absolute w-80 h-80 -top-20 -left-20 bg-gradient-to-br from-belkins-orange to-orange-300 rounded-full blur-3xl opacity-60 animate-float" />
      <div className="absolute w-64 h-64 top-40 -right-20 bg-gradient-to-br from-belkins-orange to-orange-300 rounded-full blur-3xl opacity-60 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-gray-200/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <p className="animate-fadeInUp text-belkins-orange font-semibold tracking-wider uppercase mb-4">
            B2B LEAD GENERATION AGENCY
          </p>
          <h1 className="animate-fadeInUp text-5xl md:text-7xl font-bold text-belkins-dark mb-6 leading-tight" style={{ animationDelay: '0.1s' }}>
            Double your sales<br />pipeline value
          </h1>
          <p className="animate-fadeInUp text-xl text-belkins-gray mb-8 max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
            We deliver 100–400+ qualified appointments in a year through tailored omnichannel strategies.
          </p>
          <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <Button variant="primary" size="lg">Get a quote</Button>
          </div>
        </div>
      </div>

      {/* Client logos */}
      <div className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-belkins-gray mb-8">Sales and marketing leaders at top B2B companies trust Belkins</p>
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee space-x-12 items-center">
            {[...clientLogos, ...clientLogos].map((logo, i) => (
              <div key={i} className="h-8 px-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all text-gray-600 font-semibold">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SERVICES SECTION COMPONENT
// ============================================
const ServicesSection = () => {
  const services = [
    'Sales development', 'Outsourced SDRs', 'Lead generation', 'Sales enablement',
    'Lead nurturing', 'Lead gen training', 'Demand generation', 'HubSpot CRM consulting',
    'Deliverability consulting', 'Account-based marketing'
  ];

  const omnichannelFeatures = [
    ['Cold email outreach', 'Cold and intent calling', 'Voicemails'],
    ['SMS / WhatsApp', 'LinkedIn lead generation', 'Paid advertising']
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimateWrapper className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-belkins-dark mb-4">
            Client acquisition plan<br />done for you
          </h2>
          <p className="text-xl text-belkins-gray max-w-3xl mx-auto">
            Transcending industry fluctuations, our growth solutions will continuously increase your pipeline up to 45% at just a fourth of the in-house cost.
          </p>
        </ScrollAnimateWrapper>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Omnichannel card */}
          <ScrollAnimateWrapper className="bg-belkins-light rounded-2xl p-8">
            <div className="relative mb-6 h-64 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center">
              <span className="text-6xl">👩‍💼</span>
              <div className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center animate-float">
                📧
              </div>
              <div className="absolute top-8 right-8 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                📞
              </div>
            </div>
            <h3 className="text-2xl font-bold text-belkins-dark mb-4">Omnichannel appointment setting</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {omnichannelFeatures.map((col, colIndex) => (
                <ul key={colIndex} className="space-y-2">
                  {col.map((item, i) => (
                    <li key={i} className="flex items-center text-belkins-gray">
                      <span className="w-1.5 h-1.5 bg-belkins-orange rounded-full mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
            <a href="#" className="inline-flex items-center text-belkins-orange font-medium hover:underline group">
              <span className="w-10 h-10 border-2 border-belkins-orange rounded-full flex items-center justify-center mr-3 group-hover:bg-belkins-orange group-hover:text-white transition-all">
                <ArrowRightIcon className="w-5 h-5" />
              </span>
            </a>
          </ScrollAnimateWrapper>

          {/* Service cards */}
          <ScrollAnimateWrapper>
            <p className="text-belkins-gray mb-6">Meet our all-inclusive B2B lead generation services performed by world-class sales experts:</p>
            <div className="grid grid-cols-2 gap-4">
              {services.map((service, i) => (
                <ServiceCard key={i} title={service} />
              ))}
            </div>
          </ScrollAnimateWrapper>
        </div>
      </div>
    </section>
  );
};

// ============================================
// CHALLENGES SECTION COMPONENT
// ============================================
const ChallengesSection = () => {
  const challenges = [
    { icon: '📈', title: 'Revenue stagnation', desc: 'Your revenue boost is lagging 2–3 times behind projections, and you\'re struggling to find enough qualified opportunities to close B2B deals.' },
    { icon: '⏱️', title: 'Slow deal closure', desc: 'Meeting sales quotas takes an unacceptably long time frame of 6–12 months. Your goal is to boost lead quality to drive sales-ready prospects.' },
    { icon: '🔄', title: 'Disconnected sales and marketing', desc: 'Without shared goals and clear processes, marketing pushes leads that sales can\'t close, while sales feedback gets lost.' },
    { icon: '⚠️', title: 'Internal constraints and bottlenecks', desc: 'Overburdened with routine, your team struggles to optimize processes and innovate go-to-market strategies, resulting in missed sales KPIs.' },
    { icon: '🎯', title: 'Inconsistent lead quality', desc: 'Despite investing in lead gen and experimenting with new tools, you\'re struggling to convert leads into qualified appointments.' },
    { icon: '😞', title: 'Frustrating experience with a past vendor', desc: 'Previous B2B sales agencies have left you disappointed and skeptical about the potential of lead generation outsourcing.' },
  ];

  return (
    <section className="py-20 bg-belkins-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimateWrapper className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-belkins-dark mb-4">
            Challenges you can entrust to us
          </h2>
          <p className="text-xl text-belkins-gray max-w-3xl mx-auto">
            1,000+ of our clients had pipeline generation issues that seemed intractable, but we proved otherwise. Faced any of these?
          </p>
        </ScrollAnimateWrapper>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge, i) => (
            <ScrollAnimateWrapper key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <ChallengeCard {...challenge} />
            </ScrollAnimateWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// STATS SECTION COMPONENT
// ============================================
const StatsSection = () => (
  <section className="py-20 bg-white">
    <ScrollAnimateWrapper className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-belkins-dark mb-6">
        Our clients close <span className="text-belkins-orange">25%</span> more<br />deals with their dream accounts
      </h2>
      <Button variant="primary" size="lg">Book a call</Button>
    </ScrollAnimateWrapper>
  </section>
);

// ============================================
// PIPELINE SECTION COMPONENT
// ============================================
const PipelineSection = () => {
  const journeySteps = [
    { title: 'Omnichannel engagement', desc: 'We develop a comprehensive plan that combines email, LinkedIn, and cold calling to reach your prospects at the right time and in the right place.', active: true },
    { title: 'Activation', active: false },
    { title: 'Conversion', active: false },
  ];

  const funnelSteps = [
    { label: 'Leads', text: 'Up to 18,000* prospects within your client profile', highlight: true },
    { label: 'MQLs', text: 'Up to 9,000* marketing-qualified leads' },
    { label: 'SQLs', text: '200* sales-qualified meetings with decision-makers' },
    { label: 'Opportunities', text: '10-30* closed deals' },
  ];

  return (
    <section className="py-20 bg-belkins-dark rounded-3xl mx-4 lg:mx-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimateWrapper className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How your pipeline will look with Belkins
          </h2>
          <p className="text-xl text-gray-400">
            Focus on scaling your business while we deliver you sales-ready B2B leads.
          </p>
        </ScrollAnimateWrapper>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollAnimateWrapper>
            <p className="text-gray-400 mb-6">We take care of the entire user journey</p>
            <div className="space-y-4">
              {journeySteps.map((step, i) => (
                <JourneyStep key={i} {...step} />
              ))}
            </div>
            <p className="text-gray-400 mt-8 mb-4">Your part in the process</p>
            <JourneyStep title="Deal closure" active={false} />
          </ScrollAnimateWrapper>

          <ScrollAnimateWrapper>
            <p className="text-gray-500 text-sm text-right mb-4">* Average yearly outcomes.<br />The results depend on multiple factors.</p>
            <div className="space-y-4">
              {funnelSteps.map((step, i) => (
                <FunnelStep key={i} {...step} index={i} />
              ))}
            </div>
          </ScrollAnimateWrapper>
        </div>
      </div>
    </section>
  );
};

// ============================================
// WHAT SETS US APART SECTION COMPONENT
// ============================================
const WhatSetsUsApartSection = () => {
  const features = [
    { title: 'Tailored omnichannel strategies', desc: 'Unlike other agencies\' cookie-cutter approaches, we craft personalized go-to-market plans that align perfectly with your unique business objectives and integrate both outbound and inbound efforts.' },
    { title: 'World-class talent', desc: 'We carefully select teams to work on your project and to act as an extension of your own. Rest assured, you\'ll get dedicated specialists with narrow industry knowledge, relevant certifications, and dozens of successful cases.' },
    { title: 'The first results within a month', desc: 'We set up and launch your campaign in the first 14 days. Within the next 30 days, you\'ll start seeing the first appointments in your calendar.' },
    { title: 'B2B-focused expertise', desc: 'Our deep understanding of the B2B landscape empowers us to use the right cutting-edge tools and deliver targeted, result-oriented outbound solutions that last even if we part ways.' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <ScrollAnimateWrapper className="lg:sticky lg:top-32">
            <h2 className="text-4xl md:text-5xl font-bold text-belkins-dark mb-6">
              What sets us apart
            </h2>
            <p className="text-xl text-belkins-gray mb-8">
              Since 2017, Belkins has been the top outbound lead generation agency for B2B companies across 50+ industries. Here's why:
            </p>
            <Button variant="primary">Get a quote</Button>
          </ScrollAnimateWrapper>

          <div className="space-y-6">
            {features.map((feature, i) => (
              <ScrollAnimateWrapper key={i}>
                <FeatureCard {...feature} />
              </ScrollAnimateWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// PLACEHOLDER SECTIONS
// ============================================
const PlaceholderSection = ({ title, subtitle }) => (
  <section className="py-20 bg-belkins-light">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-belkins-dark mb-4">{title}</h2>
      <p className="text-belkins-gray mb-8">{subtitle}</p>
      <div className="bg-white rounded-2xl p-12 border-2 border-dashed border-gray-300">
        <p className="text-gray-400 text-lg">[ {title} - Placeholder ]</p>
      </div>
    </div>
  </section>
);

// ============================================
// FOOTER COMPONENT
// ============================================
const Footer = () => {
  const footerLinks = {
    'Meet the team': ['Account manager', 'Content writer', 'Lead research specialist', 'SDR specialist', 'Email specialist'],
    'Industries': ['Manufacturing', 'Finance', 'Agencies', 'Information technology', 'Media production', 'SaaS', 'Healthcare', 'Construction'],
    'Other services': ['Demand generation', 'Lead nurturing', 'Lead generation training', 'Sales development', 'Sales enablement'],
  };

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo and contact */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center mb-6">
              <span className="text-2xl font-bold text-belkins-dark">belk</span>
              <span className="text-2xl font-bold text-belkins-orange">i</span>
              <span className="text-2xl font-bold text-belkins-dark">ns</span>
            </a>
            <p className="text-belkins-gray mb-2">+1 302-803-5506</p>
            <p className="text-belkins-gray mb-2">sales@belkins.io</p>
            <p className="text-belkins-gray mb-6">press@belkins.io</p>
            <div className="flex space-x-4 mb-6">
              {['linkedin', 'youtube', 'twitter'].map((social, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-belkins-orange hover:text-white transition-colors">
                  {social[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Footer link columns */}
          {Object.entries(footerLinks).map(([title, links], i) => (
            <div key={i}>
              <h4 className="font-semibold text-belkins-dark mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-belkins-gray hover:text-belkins-orange transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-semibold text-belkins-dark mb-4">Work with us</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-belkins-gray hover:text-belkins-orange transition-colors inline-flex items-center">Careers <span className="ml-2 bg-belkins-orange text-white text-xs px-2 py-0.5 rounded-full">7</span></a></li>
              <li><a href="#" className="text-belkins-gray hover:text-belkins-orange transition-colors">Contact us</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-belkins-gray text-sm mb-4 md:mb-0">© 2026 Belkins Inc. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {['Terms of Use', 'Accessibility Statement', 'Cookie Policy', 'Privacy policy'].map((link, i) => (
              <a key={i} href="#" className="text-belkins-gray hover:text-belkins-orange transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// REUSABLE COMPONENTS
// ============================================
const Button = ({ children, variant = 'primary', size = 'md', className = '' }) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full transition-all';
  const variants = {
    primary: 'bg-belkins-orange text-white hover:bg-orange-600 hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-white text-belkins-dark border border-gray-200 hover:border-belkins-orange',
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };
  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
};

const NavLink = ({ href, children }) => (
  <a href={href} className="relative text-belkins-dark hover:text-belkins-orange transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-belkins-orange after:transition-all hover:after:w-full">
    {children}
  </a>
);

const ServiceCard = ({ title }) => (
  <a href="#" className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-belkins-orange hover:shadow-lg hover:-translate-y-1 transition-all">
    <div className="flex items-center justify-between">
      <span className="font-medium text-belkins-dark">{title}</span>
      <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
    </div>
  </a>
);

const ChallengeCard = ({ icon, title, desc }) => (
  <div className="bg-white rounded-2xl p-6 border border-transparent hover:border-belkins-orange hover:shadow-lg transition-all">
    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 text-2xl">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-belkins-dark mb-2">{title}</h3>
    <p className="text-belkins-gray">{desc}</p>
  </div>
);

const FeatureCard = ({ title, desc }) => (
  <div className="bg-belkins-dark rounded-2xl p-6 text-white">
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{desc}</p>
  </div>
);

const JourneyStep = ({ title, desc, active }) => (
  <div className={`border rounded-xl p-5 cursor-pointer transition-colors ${active ? 'bg-gray-800/50 border-belkins-orange' : 'bg-gray-800/30 border-gray-700 hover:border-belkins-orange'}`}>
    <div className="flex items-center justify-between">
      <span className="font-medium text-white">{title}</span>
      <ChevronRightIcon className={`w-5 h-5 ${active ? 'text-belkins-orange' : 'text-gray-500'}`} />
    </div>
    {desc && <p className="text-gray-400 text-sm mt-2">{desc}</p>}
  </div>
);

const FunnelStep = ({ label, text, highlight, index }) => (
  <div className="transition-all hover:scale-[1.02]">
    <div className="text-center mb-2">
      <span className="inline-block bg-gray-700 text-white text-xs px-3 py-1 rounded-full">{label}</span>
    </div>
    <div
      className={`rounded-xl p-6 text-center ${highlight ? 'bg-belkins-orange' : 'bg-gray-800'}`}
      style={{ marginLeft: `${index * 2}rem`, marginRight: `${index * 2}rem` }}
    >
      <p className="text-white font-bold">{text}</p>
    </div>
  </div>
);

const ScrollAnimateWrapper = ({ children, className = '', style = {} }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

// Icons
const ChevronDownIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronRightIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const ArrowRightIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const MenuIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

// ============================================
// MAIN APP COMPONENT
// ============================================
const App = () => {
  return (
    <div className="font-inter">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ChallengesSection />
      <StatsSection />
      <PipelineSection />
      <WhatSetsUsApartSection />
      <PlaceholderSection title="What our clients say" subtitle="Reviews and testimonials section placeholder" />
      <PlaceholderSection title="How companies succeed with us" subtitle="Case studies section placeholder" />
      <Footer />
    </div>
  );
};

export default App;
