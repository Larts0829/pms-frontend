import { useEffect, useState } from 'react'
import userService from '../../services/userService'
import { ROLE_LABELS } from '../../config/permissions'

export default function UserSelect({ value, onChange, role, label = 'Assign User', name = 'assignedUser', required }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    userService.getAll({ role }).then(res => {
      setUsers(res.data || [])
      setLoading(false)
    })
  }, [role])

  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-dark-700">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-dark-200 rounded px-3 py-2 text-dark-900 bg-white"
        required={required}
        disabled={loading}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {users.map(u => (
          <option key={u.id} value={u.id}>
            {u.firstName} {u.lastName} ({ROLE_LABELS?.[u.role] || u.role})
          </option>
        ))}
      </select>
    </div>
  )
}
