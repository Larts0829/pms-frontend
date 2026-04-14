import { useState } from 'react'
import { Card, CardBody, CardHeader } from '../../components/common/Card'
import Button from '../../components/common/Button'

export default function UploadReportPage() {
  const [file, setFile] = useState(null)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setSuccess(false)
    setError('')
  }

  const handleUpload = (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please select a file to upload.')
      return
    }
    // Simulate upload
    setTimeout(() => {
      setSuccess(true)
      setError('')
    }, 1000)
  }

  return (
    <div className="max-w-xl mx-auto py-10">
      <Card className="shadow-lg">
        <CardHeader>
          <h2 className="text-xl font-bold text-dark-900">Upload Report</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-dark-700 font-medium mb-2">Select Report File</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.xlsx,.xls,.csv,.txt"
                onChange={handleFileChange}
                className="block w-full border border-dark-200 rounded px-3 py-2"
              />
            </div>
            {error && <div className="text-error text-sm">{error}</div>}
            {success && <div className="text-success text-sm">Report uploaded successfully!</div>}
            <Button type="submit" className="w-full">Upload</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
