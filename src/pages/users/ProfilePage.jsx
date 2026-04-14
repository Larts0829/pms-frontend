import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/common/Button'
import { ROLE_LABELS } from '../../config/permissions'

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    contact: user?.contact || '',
    profilePic: user?.profilePic || '',
    password: '',
    confirmPassword: '',
  })
  const [preview, setPreview] = useState(form.profilePic)
  const [saving, setSaving] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  function handleFile(e) {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = ev => {
        setPreview(ev.target.result)
        setForm(f => ({ ...f, profilePic: ev.target.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    // Simulate API call
    setTimeout(() => {
      updateUser(form)
      setSaving(false)
      alert('Profile updated!')
    }, 1000)
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
      <div className="flex flex-col md:flex-row md:items-center md:gap-8 mb-8">
        <div className="flex flex-col items-center gap-2 md:gap-4">
          <img
            src={preview || '/default-profile.png'}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-2 border-yellow-400 shadow"
          />
          <label htmlFor="profilePic" className="cursor-pointer text-yellow-700 text-xs hover:underline">
            Change Photo
            <input
              type="file"
              id="profilePic"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
          </label>
        </div>
        <div className="flex-1 mt-4 md:mt-0">
          <h2 className="text-2xl font-bold text-dark-900 mb-1">{form.firstName} {form.lastName}</h2>
          <div className="text-dark-600 text-sm mb-1">{form.email}</div>
          <div className="text-dark-500 text-xs font-semibold">Role: <span className="capitalize">{ROLE_LABELS?.[user?.role] || user?.role}</span></div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-dark-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-full border border-dark-200 rounded px-3 py-2 text-dark-900 bg-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-dark-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="w-full border border-dark-200 rounded px-3 py-2 text-dark-900 bg-white"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-dark-700">Contact Number</label>
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              className="w-full border border-dark-200 rounded px-3 py-2 text-dark-900 bg-white"
              placeholder="e.g. 0917xxxxxxx"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-dark-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              className="w-full border border-dark-200 rounded px-3 py-2 text-dark-500 bg-gray-50"
              disabled
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-dark-700">New Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-dark-200 rounded px-3 py-2 text-dark-900 bg-white"
              placeholder="Leave blank to keep current"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-dark-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border border-dark-200 rounded px-3 py-2 text-dark-900 bg-white"
              placeholder="Repeat new password"
            />
          </div>
        </div>
        <div className="pt-4">
          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  )
}
