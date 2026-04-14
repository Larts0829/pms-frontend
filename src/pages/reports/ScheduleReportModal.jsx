import { useState } from 'react'
import { Card, CardBody, CardHeader } from '../../components/common/Card'
import Button from '../../components/common/Button'
import { Calendar, Clock, Repeat, CheckCircle } from 'lucide-react'

const frequencies = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
]

export default function ScheduleReportModal({ onClose }) {
  const [reportType, setReportType] = useState('Progress Report')
  const [frequency, setFrequency] = useState('weekly')
  const [time, setTime] = useState('08:00')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      onClose && onClose()
    }, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
        <button className="absolute top-2 right-2 text-dark-400 hover:text-dark-900" onClick={onClose}>&times;</button>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Repeat className="h-5 w-5 text-yellow-600" />
            <h2 className="text-lg font-bold text-dark-900">Set Up Report Schedule</h2>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-dark-700 font-medium mb-1">Report Type</label>
              <select className="w-full border border-dark-200 rounded px-3 py-2" value={reportType} onChange={e => setReportType(e.target.value)}>
                <option>Progress Report</option>
                <option>Financial Report</option>
                <option>Site Report</option>
              </select>
            </div>
            <div>
              <label className="block text-dark-700 font-medium mb-1">Frequency</label>
              <select className="w-full border border-dark-200 rounded px-3 py-2" value={frequency} onChange={e => setFrequency(e.target.value)}>
                {frequencies.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-dark-700 font-medium mb-1">Time</label>
              <div className="relative">
                <input
                  type="time"
                  className="w-full border border-dark-200 rounded px-3 py-2 text-lg text-dark-900 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  style={{ minHeight: 44, fontWeight: 500, letterSpacing: 1 }}
                  required
                />
                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-500 pointer-events-none" />
              </div>
            </div>
            {success && <div className="text-success flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Schedule saved!</div>}
            <Button type="submit" className="w-full">Save Schedule</Button>
          </form>
        </CardBody>
      </div>
    </div>
  )
}
