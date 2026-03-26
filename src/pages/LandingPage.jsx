import { Link } from 'react-router-dom'
import { ArrowRight, Building2 } from 'lucide-react'
import wcdLogo from '../images/wcd_logo.png'

function LandingPage() {
  const services = [
    'Civil and General Commercial Works',
    'Architectural Works',
    'Project Management',
    'Finishing Works',
    'Custom Fit-Out Works and Designs',
    'Trucking and Hauling',
    'Auxiliary Installations',
    'Consultancy',
  ]

  const portfolioItems = [
    {
      title: 'Interior Design and Fit-Out',
      category: 'Feature Project',
      image:
        'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1400&q=80',
    },
    {
      title: 'Institutional Building Works',
      category: 'Feature Project',
      image:
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=80',
    },
    {
      title: 'Commercial Renovation Delivery',
      category: 'Feature Project',
      image:
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80',
    },
  ]

  const previousClients = [
    {
      name: 'LGV Residential House',
      image:
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'The Eyebrowdery',
      image:
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'Kenko Spa',
      image:
        'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'Motech Car Doctor',
      image:
        'https://images.unsplash.com/photo-1613215279703-13fe7ad89d8a?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'Brains Infinite Innovations',
      image:
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'Krispy Kreme',
      image:
        'https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1200&q=80',
    },
  ]

  return (
    <div className="bg-white reveal">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-dark-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <img src={wcdLogo} alt="Westwood" className="h-8 w-8 object-contain" />
              <span className="text-xl font-bold text-dark-900">WORKS</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-dark-600 hover:text-yellow-600 font-medium text-sm">About</a>
              <a href="#services" className="text-dark-600 hover:text-yellow-600 font-medium text-sm">Services</a>
              <a href="#portfolio" className="text-dark-600 hover:text-yellow-600 font-medium text-sm">Portfolio</a>
              <a href="#clients" className="text-dark-600 hover:text-yellow-600 font-medium text-sm">Clients</a>
              <Link to="/inquire" className="text-dark-600 hover:text-yellow-600 font-medium text-sm">Inquire</Link>
              <Link to="/login" className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition font-medium">Sign In</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* About Section */}
      <section id="about" className="bg-yellow-50 pt-20 pb-20 px-4 sm:px-6 lg:px-8 border-b border-dark-200 reveal-up">
        <div className="max-w-7xl mx-auto">
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-hidden rounded-3xl border border-yellow-200/80 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 p-8 lg:p-10">
            <div className="pointer-events-none absolute inset-0 opacity-10">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=80"
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="pointer-events-none absolute -right-16 top-6 h-64 w-64 rounded-full bg-yellow-300/25 blur-3xl"></div>
            <div className="pointer-events-none absolute -left-10 bottom-2 h-56 w-56 rounded-full bg-yellow-400/20 blur-3xl"></div>
            <div>
              <p className="text-yellow-700 font-semibold uppercase tracking-wider mb-3">About Us</p>
              <div className="mb-5 inline-flex items-center gap-4 rounded-2xl border border-yellow-200 bg-white/90 px-5 py-4 shadow-sm ring-1 ring-yellow-100">
                <img src={wcdLogo} alt="WORKS logo" className="h-16 w-16 object-contain md:h-20 md:w-20" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-yellow-700">Westwood</p>
                  <p className="text-sm font-semibold text-dark-700">Operations & Resource Knowledge System</p>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-900 mb-6 leading-tight">
                WORKS
              </h1>
              <p className="text-xl text-dark-600 mb-8">
                Westwood Operations &amp; Resource Knowledge System
              </p>
              <p className="text-lg text-dark-700 mb-8 leading-8">
                Formed in 2018, Westwood Development Corporation (WDC) engages in residential, commercial,
                industrial, and institutional building structures. WDC is on the road for excellence in a diverse
                range of markets because of the extensive experience in the industry driven by the broadness and
                depth of our team, by which all take pride in doing the best job for our clients at the best value possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/inquire" className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition shadow-sm">
                  Book a Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a href="#clients" className="inline-flex items-center justify-center px-8 py-4 border-2 border-yellow-500 text-yellow-700 rounded-lg font-bold hover:bg-yellow-100 transition">View Clients</a>
              </div>
            </div>
            <div className="relative bg-white rounded-2xl p-6 border border-dark-200 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1400&q=80"
                alt="Westwood construction project"
                className="aspect-video rounded-xl object-cover"
              />
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-dark-200 p-4">
                  <p className="text-2xl font-bold text-dark-900">2018</p>
                  <p className="text-sm text-dark-600">Company Founded</p>
                </div>
                <div className="rounded-lg border border-dark-200 p-4">
                  <p className="text-2xl font-bold text-dark-900">ASEAN</p>
                  <p className="text-sm text-dark-600">Growth Vision</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-dark-200 reveal-up reveal-delay-1">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            <div className="rounded-2xl bg-white border border-dark-200 p-10">
              <h2 className="text-4xl font-bold text-dark-900 mb-3">Services We Offer</h2>
              <p className="text-dark-600 mb-8">(Residential, Commercial, Industrial)</p>

              <ul className="space-y-3 text-lg text-dark-700">
                {services.map((service) => (
                  <li key={service} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-yellow-500"></span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl overflow-hidden border border-dark-200">
              <img
                src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1400&q=80"
                alt="Interior design showcase"
                className="h-full min-h-[420px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-50 reveal-up reveal-delay-1">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 mb-4">Project Portfolio</h2>
            <p className="text-xl text-dark-600">A snapshot of building, interior, and renovation work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioItems.map((item) => (
              <article
                key={item.title}
                className="group card-lift rounded-xl overflow-hidden border border-dark-200 bg-white shadow-sm hover:shadow-lg"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-64 w-full object-cover media-zoom"
                  />
                </div>
                <div className="p-6 transition-colors duration-300 group-hover:bg-yellow-50">
                  <p className="text-xs tracking-wide uppercase font-semibold text-yellow-700 mb-2">{item.category}</p>
                  <h3 className="text-xl font-bold text-dark-900 group-hover:text-yellow-700">{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mission And Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-dark-200 reveal-up reveal-delay-2">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-2xl p-8 bg-white border border-dark-200">
              <h3 className="text-5xl font-bold text-dark-900 mb-6">Mission</h3>
              <p className="text-xl font-semibold text-dark-800 mb-4">Westwood Development Corporation aims to:</p>
              <ul className="space-y-4 text-dark-700 text-lg leading-8">
                <li>
                  Expand firmly towards providing cutting-edge and budget-friendly construction needs in line with the current leaders in the industry.
                </li>
                <li>
                  Promote green tech building to help reduce the impact of climate change.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl p-8 bg-white border border-dark-200">
              <h3 className="text-5xl font-bold text-dark-900 mb-6">Vision</h3>
              <p className="text-xl font-semibold text-dark-800 mb-4">Westwood Development Corporation aims to:</p>
              <ul className="space-y-4 text-dark-700 text-lg leading-8">
                <li>
                  One of the leading companies to spearhead green technology in the country.
                </li>
                <li>
                  One of the known and best brands within ASEAN region that involves green technology.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Previous Clients */}
      <section id="clients" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-dark-200 reveal-up reveal-delay-2">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
            <h2 className="text-5xl font-bold text-dark-900">Previous Clients</h2>
            <p className="text-2xl leading-10 text-dark-700">
              WDC is leaning towards the advancement of technology in the industry. We passionately look forward to extensively expanding our venture towards green technology and the entirety of it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previousClients.map((client) => (
              <article
                key={client.name}
                className="group card-lift relative h-64 overflow-hidden rounded-xl border border-dark-200"
              >
                <img
                  src={client.image}
                  alt={client.name}
                  className="h-full w-full object-cover media-zoom"
                />
                <div className="absolute inset-0 bg-dark-900/55 transition-colors duration-300 group-hover:bg-dark-900/40"></div>
                <div className="absolute inset-0 p-6 flex items-end">
                  <h3 className="text-4xl font-bold text-white leading-tight">{client.name}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-dark-200 reveal-up reveal-delay-3">
        <div className="max-w-4xl mx-auto text-center">
          <Building2 className="h-12 w-12 text-yellow-500 mx-auto mb-5" />
          <h2 className="text-4xl font-bold text-dark-900 mb-4">Built for Reliable Project Delivery</h2>
          <p className="text-xl text-dark-600 mb-8">Professional workflows, field coordination, and reporting in one system.</p>
          <Link to="/inquire" className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition">
            Book an Appointment <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-50 text-dark-900 py-12 px-4 sm:px-6 lg:px-8 border-t border-dark-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={wcdLogo} alt="Westwood" className="h-6 w-6 object-contain" />
                <span className="font-bold">WORKS</span>
              </div>
              <p className="text-dark-600 text-sm">Westwood Operations &amp; Resource Knowledge System</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Westwood Development Corp.</h4>
              <p className="text-dark-600 text-sm leading-7">
                Suite 1004 Atlanta Center,
                <br />
                Annapolis St., San Juan City,
                <br />
                Metro Manila, Philippines
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact Number</h4>
              <p className="text-dark-600 text-sm leading-7">
                (02) 835 90648
                <br />
                (63) 961 495 8696
                <br />
                (63) 905 102 4246
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Social Media</h4>
              <p className="text-dark-600 text-sm leading-7">
                Powered by BRAINS INFINITE INNOVATIONS INC.
                <br />
                hello@brains.asia
              </p>
            </div>
          </div>
          <div className="border-t border-dark-200 pt-8">
            <div className="flex justify-between items-center">
              <p className="text-dark-600 text-sm">&copy; 2022 All rights reserved.</p>
              <div className="flex gap-4 text-sm text-dark-600">
                <a href="#" className="hover:text-yellow-600">Privacy</a>
                <a href="#" className="hover:text-yellow-600">Terms of Use</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
