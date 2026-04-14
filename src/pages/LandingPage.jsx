import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Building2 } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import wcdLogo from '../images/wcd_logo.png'
import img1 from '../images/portfolio-images/img1.jpg'
import img1_2 from '../images/portfolio-images/img1-2.jpg'
import img1_3 from '../images/portfolio-images/img1-3.jpg'
import img2 from '../images/portfolio-images/img2.jpg'
import img2_1 from '../images/portfolio-images/img2-1.jpg'
import img2_4 from '../images/portfolio-images/img2-4.jpg'
import img3 from '../images/portfolio-images/img3.jpg'
import img3_2 from '../images/portfolio-images/img3-2.jpg'
import img3_3 from '../images/portfolio-images/img3-3.jpg'
import img3_4 from '../images/portfolio-images/img3-4.jpg'
import img4 from '../images/portfolio-images/img4.jpg'

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
    { title: 'Food Channel - Modern Restaurant', category: 'Commercial Fit-Out', image: img1 },
    { title: 'Food Channel - Dining Area', category: 'Commercial Fit-Out', image: img1_2 },
    { title: 'Food Channel - Alternate View', category: 'Commercial Fit-Out', image: img1_3 },
    { title: 'Contemporary Learning Space', category: 'Institutional Interior', image: img2 },
    { title: 'Learning Space - Angle 2', category: 'Institutional Interior', image: img2_1 },
    { title: 'Learning Space - Angle 3', category: 'Institutional Interior', image: img2_4 },
    { title: 'Executive Office Suite', category: 'Corporate Office', image: img3 },
    { title: 'Office Suite - Meeting Area', category: 'Corporate Office', image: img3_2 },
    { title: 'Office Suite - Lounge', category: 'Corporate Office', image: img3_3 },
    { title: 'Office Suite - Reception', category: 'Corporate Office', image: img3_4 },
    { title: 'Resort Poolside', category: 'Leisure & Hospitality', image: img4 },
  ]

  // Carousel state and fake loading
  const [carouselIdx, setCarouselIdx] = useState(0)
  const [carouselLoading, setCarouselLoading] = useState(true)
  const carouselTimeout = useRef(null)

  useEffect(() => {
    setCarouselLoading(true)
    // Simulate API delay for realism
    const timer = setTimeout(() => setCarouselLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (carouselLoading) return
    carouselTimeout.current = setTimeout(() => {
      setCarouselIdx((prev) => (prev + 1) % portfolioItems.length)
    }, 4000)
    return () => clearTimeout(carouselTimeout.current)
  }, [carouselIdx, carouselLoading, portfolioItems.length])

  const goToSlide = (idx) => {
    setCarouselIdx(idx)
    clearTimeout(carouselTimeout.current)
  }
  const prevSlide = () => goToSlide((carouselIdx - 1 + portfolioItems.length) % portfolioItems.length)
  const nextSlide = () => goToSlide((carouselIdx + 1) % portfolioItems.length)

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
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-dark-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <img src={wcdLogo} alt="Westwood" className="h-8 w-8 object-contain" />
              <span className="text-xl font-bold text-dark-900">WORKS</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-dark-600 hover:text-yellow-600 font-medium text-sm" onClick={e => {e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'});}}>About</a>
              <a href="#services" className="text-dark-600 hover:text-yellow-600 font-medium text-sm" onClick={e => {e.preventDefault(); document.getElementById('services')?.scrollIntoView({behavior: 'smooth'});}}>Services</a>
              <a href="#portfolio" className="text-dark-600 hover:text-yellow-600 font-medium text-sm" onClick={e => {e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({behavior: 'smooth'});}}>Portfolio</a>
              <a href="#clients" className="text-dark-600 hover:text-yellow-600 font-medium text-sm" onClick={e => {e.preventDefault(); document.getElementById('clients')?.scrollIntoView({behavior: 'smooth'});}}>Clients</a>
              <Link to="/inquire" className="text-dark-600 hover:text-yellow-600 font-medium text-sm">Inquire</Link>
              <Link to="/login" className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition font-medium">Sign In</Link>
            </div>
          </div>
        </div>
      </nav>


      {/* Hero Section - Modern, Animated, Professional */}
      <section className="bg-yellow-50 pt-24 pb-24 px-4 sm:px-6 lg:px-8 border-b border-dark-200">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 animate-fadein-slidein">
          <div className="flex-1 flex flex-col items-start">
            <div className="mb-6 inline-flex items-center gap-4 rounded-2xl border border-yellow-200 bg-white/90 px-6 py-5 shadow-sm ring-1 ring-yellow-100">
              <img src={wcdLogo} alt="WORKS logo" className="h-24 w-24 object-contain" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-yellow-700">Westwood</p>
                <p className="text-base font-semibold text-dark-700">WORKS Project Management System</p>
              </div>
            </div>
            <h1 className="text-6xl font-extrabold text-dark-900 mb-6 leading-tight tracking-tight" style={{letterSpacing: '-0.03em'}}>WORKS</h1>
            <p className="text-2xl text-dark-700 mb-10 max-w-xl font-medium">
              The modern platform for managing, tracking, and delivering construction projects connecting engineering, operations, and clients in one place.
            </p>
            <a href="#portfolio" className="inline-flex items-center justify-center px-10 py-4 bg-yellow-500 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-yellow-600 transition-all duration-200 focus:ring-4 focus:ring-yellow-200 scroll-smooth">
              View Projects <ArrowRight className="ml-3 h-6 w-6" />
            </a>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1400&q=80"
              alt="Westwood construction project"
              className="aspect-video rounded-3xl object-cover border border-dark-200 shadow-xl w-full max-w-2xl animate-fadein"
              style={{minHeight: 340}}
            />
            <div className="mt-8 grid grid-cols-2 gap-6 w-full max-w-xl">
              <div className="rounded-xl border border-dark-200 p-6 bg-white/80 shadow">
                <p className="text-3xl font-bold text-dark-900">2018</p>
                <p className="text-base text-dark-600">Company Founded</p>
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

      {/* Portfolio Section - 3D Carousel with 3 Columns */}
      <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-dark-900 mb-4 tracking-tight">Project Portfolio</h2>
            <p className="text-xl text-dark-600">A showcase of our recent commercial, institutional, and leisure projects</p>
          </div>
          <div className="relative flex flex-col items-center">
            <div className="w-full max-w-4xl h-[420px] flex items-center justify-center relative">
              {carouselLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 animate-fadein">
                  <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  {/* Left (previous) image */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 transition-all duration-700"
                    style={{width: '320px', height: '260px', transform: 'translateY(-50%) scale(0.8) rotateY(20deg)', opacity: 0.7, filter: 'blur(1px)', left: '2%'}}>
                    <img
                      src={portfolioItems[(carouselIdx - 1 + portfolioItems.length) % portfolioItems.length].image}
                      alt={portfolioItems[(carouselIdx - 1 + portfolioItems.length) % portfolioItems.length].title}
                      className="w-full h-full object-cover rounded-2xl border border-dark-100 shadow-md"
                    />
                  </div>
                  {/* Center (active) image */}
                  <div className="relative z-20 mx-8 transition-all duration-700" style={{width: '420px', height: '340px'}}>
                    <img
                      src={portfolioItems[carouselIdx].image}
                      alt={portfolioItems[carouselIdx].title}
                      className="w-full h-full object-cover rounded-3xl border-2 border-yellow-400 shadow-2xl animate-carousel-fade"
                      style={{minHeight: 340}}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-dark-900/70 to-transparent rounded-b-3xl">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold uppercase tracking-wider text-yellow-400 drop-shadow">{portfolioItems[carouselIdx].category}</span>
                        <span className="text-2xl font-bold text-white drop-shadow-lg">{portfolioItems[carouselIdx].title}</span>
                      </div>
                    </div>
                  </div>
                  {/* Right (next) image */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 transition-all duration-700"
                    style={{width: '320px', height: '260px', transform: 'translateY(-50%) scale(0.8) rotateY(-20deg)', opacity: 0.7, filter: 'blur(1px)', right: '2%'}}>
                    <img
                      src={portfolioItems[(carouselIdx + 1) % portfolioItems.length].image}
                      alt={portfolioItems[(carouselIdx + 1) % portfolioItems.length].title}
                      className="w-full h-full object-cover rounded-2xl border border-dark-100 shadow-md"
                    />
                  </div>
                  {/* Carousel Arrows */}
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-yellow-100 text-yellow-700 rounded-full p-2 shadow transition-all duration-200 z-30"
                    onClick={prevSlide}
                    aria-label="Previous project"
                    disabled={carouselLoading}
                    style={{pointerEvents: carouselLoading ? 'none' : 'auto'}}>
                    <ArrowLeft className="h-7 w-7" />
                  </button>
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-yellow-100 text-yellow-700 rounded-full p-2 shadow transition-all duration-200 z-30"
                    onClick={nextSlide}
                    aria-label="Next project"
                    disabled={carouselLoading}
                    style={{pointerEvents: carouselLoading ? 'none' : 'auto'}}>
                    <ArrowRight className="h-7 w-7" />
                  </button>
                </>
              )}
            </div>
            {/* Dots Indicator */}
            <div className="flex gap-3 mt-8">
              {portfolioItems.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-200 ${carouselIdx === idx ? 'bg-yellow-500 border-yellow-500 scale-125 shadow' : 'bg-white border-dark-200 hover:border-yellow-400'}`}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to project ${idx + 1}`}
                  disabled={carouselLoading}
                  style={{pointerEvents: carouselLoading ? 'none' : 'auto'}}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
/* Animations */
<style jsx>{`
  /* Animations */
  .animate-fadein-slidein {
    /* 3D Carousel Animations */
    .animate-carousel-fade {
      animation: carousel-fade 0.7s cubic-bezier(.4,0,.2,1);
    }
    @keyframes carousel-fade {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    animation: fadein-slidein 1.2s cubic-bezier(.4,0,.2,1);
  }
  @keyframes fadein-slidein {
    0% { opacity: 0; transform: translateY(40px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-fadein {
    animation: fadein 1.2s cubic-bezier(.4,0,.2,1);
  }
  @keyframes fadein {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  .animate-carousel-fade {
    animation: carousel-fade 0.7s cubic-bezier(.4,0,.2,1);
  }
  @keyframes carousel-fade {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`}</style>

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
              <p className="text-dark-600 text-sm">&copy; 2026 All rights reserved.</p>
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
