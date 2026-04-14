import { useState } from 'react'
import Button from '../../components/common/Button'
import clientService from '../../services/clientService'
import { useNavigate } from 'react-router-dom'
import UserSelect from '../../components/forms/UserSelect'

const SERVICE_OPTIONS = [
  'Interior Fit-Out',
  'Renovation',
  'Design & Build',
  'Project Management',
  'Consultation',
  'Other',
]

export default function AddClientPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    service: '',
    notes: '',
    engineer: '',
    manager: '',
  })
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await clientService.create(form)
      setSaving(false)
      setSuccess(true)
      navigate('/clients')
    } catch (err) {
      setSaving(false)
      alert('Failed to add client. Please try again.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-0 rounded-2xl shadow-lg">
      <div className="bg-gradient-to-r from-yellow-100 via-white to-yellow-50 rounded-t-2xl px-8 py-6 border-b border-dark-100">
        <h2 className="text-2xl font-extrabold text-dark-900 mb-1">Add New Client</h2>
        <p className="text-dark-600">Fill out the form to add a new client and assign a project manager or engineer.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8 px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1 text-dark-700">Client Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-dark-200 rounded-lg px-3 py-2 text-dark-900 bg-white focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-dark-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-dark-200 rounded-lg px-3 py-2 text-dark-900 bg-white focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-dark-700">Contact Number</label>
              <input
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                className="w-full border border-dark-200 rounded-lg px-3 py-2 text-dark-900 bg-white focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-dark-700">Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border border-dark-200 rounded-lg px-3 py-2 text-dark-900 bg-white focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1 text-dark-700">Service Needed</label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full border border-dark-200 rounded-lg px-3 py-2 text-dark-900 bg-white focus:ring-2 focus:ring-yellow-400"
                required
              >
                <option value="">Select a service</option>
                {SERVICE_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <UserSelect
              label="Assign Engineer"
              role="project_engineer"
              value={form.engineer}
              onChange={handleChange}
              name="engineer"
              required
            />
            <UserSelect
              label="Assign Manager"
              role="operations_staff"
              value={form.manager}
              onChange={handleChange}
              name="manager"
              required
            />
            <div>
              <label className="block text-sm font-semibold mb-1 text-dark-700">Additional Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className="w-full border border-dark-200 rounded-lg px-3 py-2 text-dark-900 bg-white focus:ring-2 focus:ring-yellow-400"
                rows={3}
              />
            </div>
          </div>
        </div>
        <div className="pt-6">
          <Button type="submit" className="w-full text-lg py-3 font-semibold" disabled={saving}>
            {saving ? 'Saving...' : 'Add Client'}
          </Button>
          {success && <div className="text-green-600 text-sm mt-2">Client added successfully!</div>}
        </div>
      </form>
    </div>
  )
}
