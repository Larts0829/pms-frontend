import { useRef, useState } from 'react'
import { Card, CardBody, CardHeader } from '../../components/common/Card'
import Button from '../../components/common/Button'
import { Upload, FileText, CheckCircle, X } from 'lucide-react'

export default function UploadDocumentPage() {
  const [file, setFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const inputRef = useRef()

  const handleFileChange = (e) => {
    const f = e.target.files[0]
    setFile(f)
    setSuccess(false)
    setError('')
    setProgress(0)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
      setSuccess(false)
      setError('')
      setProgress(0)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleUpload = (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please select a file to upload.')
      return
    }
    setError('')
    setProgress(0)
    // Simulate upload progress
    let prog = 0
    const interval = setInterval(() => {
      prog += 20
      setProgress(prog)
      if (prog >= 100) {
        clearInterval(interval)
        setSuccess(true)
      }
    }, 200)
  }

  const handleRemove = () => {
    setFile(null)
    setSuccess(false)
    setError('')
    setProgress(0)
  }

  return (
    <div className="max-w-xl mx-auto py-10">
      <Card className="shadow-lg">
        <CardHeader>
          <h2 className="text-xl font-bold text-dark-900">Upload Document</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleUpload} className="space-y-6">
            <div
              className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${dragActive ? 'border-yellow-500 bg-yellow-50' : 'border-dark-200 bg-dark-50'}`}
              onClick={() => inputRef.current.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="h-10 w-10 text-yellow-600 mb-2" />
              <p className="text-dark-700 mb-2">Drag & drop your file here, or <span className="text-yellow-700 underline">browse</span></p>
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.doc,.docx,.xlsx,.xls,.csv,.txt,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="hidden"
              />
              {file && (
                <div className="mt-4 w-full flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-dark-600" />
                    <span className="text-dark-900 font-medium">{file.name}</span>
                    <button type="button" className="ml-2 text-error" onClick={handleRemove}><X className="h-4 w-4" /></button>
                  </div>
                  <div className="w-full bg-dark-100 rounded-full h-2 overflow-hidden mb-2">
                    <div className="bg-yellow-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  {progress > 0 && progress < 100 && <span className="text-xs text-dark-600">Uploading... {progress}%</span>}
                  {success && <span className="text-success flex items-center gap-1 text-sm"><CheckCircle className="h-4 w-4" /> Uploaded!</span>}
                </div>
              )}
            </div>
            {error && <div className="text-error text-sm">{error}</div>}
            <Button type="submit" className="w-full">Upload</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

import { useRef, useState } from 'react'
import { Card, CardBody, CardHeader } from '../../components/common/Card'
import Button from '../../components/common/Button'
import { Upload, FileText, CheckCircle, X } from 'lucide-react'

export default function UploadDocumentPage() {
  const [file, setFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const inputRef = useRef()

  const handleFileChange = (e) => {
    const f = e.target.files[0]
    setFile(f)
    setSuccess(false)
    setError('')
    setProgress(0)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
      setSuccess(false)
      setError('')
      setProgress(0)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleUpload = (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please select a file to upload.')
      return
    }
    setError('')
    setProgress(0)
    // Simulate upload progress
    let prog = 0
    const interval = setInterval(() => {
      prog += 20
      setProgress(prog)
      if (prog >= 100) {
        clearInterval(interval)
        setSuccess(true)
      }
    }, 200)
  }

  const handleRemove = () => {
    setFile(null)
    setSuccess(false)
    setError('')
    setProgress(0)
  }

  return (
    <div className="max-w-xl mx-auto py-10">
      <Card className="shadow-lg">
        <CardHeader>
          <h2 className="text-xl font-bold text-dark-900">Upload Document</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleUpload} className="space-y-6">
            <div
              className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${dragActive ? 'border-yellow-500 bg-yellow-50' : 'border-dark-200 bg-dark-50'}`}
              onClick={() => inputRef.current.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="h-10 w-10 text-yellow-600 mb-2" />
              <p className="text-dark-700 mb-2">Drag & drop your file here, or <span className="text-yellow-700 underline">browse</span></p>
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.doc,.docx,.xlsx,.xls,.csv,.txt,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="hidden"
              />
              {file && (
                <div className="mt-4 w-full flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-dark-600" />
                    <span className="text-dark-900 font-medium">{file.name}</span>
                    <button type="button" className="ml-2 text-error" onClick={handleRemove}><X className="h-4 w-4" /></button>
                  </div>
                  <div className="w-full bg-dark-100 rounded-full h-2 overflow-hidden mb-2">
                    <div className="bg-yellow-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  {progress > 0 && progress < 100 && <span className="text-xs text-dark-600">Uploading... {progress}%</span>}
                  {success && <span className="text-success flex items-center gap-1 text-sm"><CheckCircle className="h-4 w-4" /> Uploaded!</span>}
                </div>
              )}
            </div>
            {error && <div className="text-error text-sm">{error}</div>}
            <Button type="submit" className="w-full">Upload</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
