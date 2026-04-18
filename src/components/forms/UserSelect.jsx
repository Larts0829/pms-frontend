import { useEffect, useState } from 'react'
import userService from '../../services/userService'
import { ROLE_LABELS } from '../../config/permissions'

export default function UserSelect({ value, onChange, role, label = 'Assign User', name = 'assignedUser', required }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    userService.getAll({ role })
      .then(res => {
        // Safely handle response - ensure data is always an array
        const userData = res?.data || res || []
        const safeUsers = Array.isArray(userData) ? userData : []
        setUsers(safeUsers)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching users:', err)
        setError(err.message)
        setUsers([])
        setLoading(false)
      })
  }, [role])

  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-dark-700">{label}</label>
      {error && <p className="text-xs text-red-500 mb-2">Error loading users</p>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-dark-200 rounded px-3 py-2 text-dark-900 bg-white"
        required={required}
        disabled={loading || (users.length === 0 && !error)}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {Array.isArray(users) && users.map(u => (
          <option key={u.id} value={u.id}>
            {u.firstName} {u.lastName} ({ROLE_LABELS?.[u.role] || u.role})
          </option>
        ))}
      </select>
    </div>
  )
}
