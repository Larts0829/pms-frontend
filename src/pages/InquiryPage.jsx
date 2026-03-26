import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { CalendarCheck2 } from 'lucide-react'
import wcdLogo from '../images/wcd_logo.png'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  projectType: 'Building Construction',
  location: '',
  preferredDate: '',
  budgetRange: '',
  notes: '',
}

function InquiryPage() {
  const [formData, setFormData] = useState(initialForm)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    toast.success('Your appointment request has been sent. Our team will contact you soon.')
    setFormData(initialForm)
  }

  return (
    <div className="min-h-screen bg-dark-50 reveal">
      <header className="border-b border-dark-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={wcdLogo} alt="Westwood" className="h-8 w-8 object-contain" />
            <span className="text-lg font-bold text-dark-900">WORKS</span>
          </Link>
          <Link to="/" className="text-sm font-medium text-dark-600 hover:text-yellow-600 transition-colors">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-dark-200 rounded-2xl shadow-sm overflow-hidden reveal-up reveal-delay-1">
          <div className="p-8 border-b border-dark-200 bg-yellow-50">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-yellow-500 flex items-center justify-center flex-shrink-0">
                <CalendarCheck2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-dark-900">Project Inquiry and Appointment</h1>
                <p className="text-dark-600 mt-2">
                  Share your project details and preferred schedule. We will confirm your appointment through email or phone.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group md:col-span-2">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="form-input"
                placeholder="Your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="09XX XXX XXXX"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="projectType" className="form-label">Project Type</label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="form-select"
              >
                <option>Building Construction</option>
                <option>Interior Design</option>
                <option>Renovation</option>
                <option>Fit-Out</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location" className="form-label">Project Location</label>
              <input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-input"
                placeholder="City / Site Address"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="preferredDate" className="form-label">Preferred Appointment Date</label>
              <input
                id="preferredDate"
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="budgetRange" className="form-label">Estimated Budget</label>
              <input
                id="budgetRange"
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g. PHP 2M - 4M"
              />
            </div>

            <div className="form-group md:col-span-2">
              <label htmlFor="notes" className="form-label">Project Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="form-textarea"
                rows={5}
                placeholder="Tell us about your goals, timeline, and requirements."
              />
            </div>

            <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between border-t border-dark-200 pt-6">
              <p className="text-sm text-dark-600">Our team usually responds within one business day.</p>
              <button type="submit" className="btn-primary px-8">
                Submit Inquiry
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default InquiryPage

