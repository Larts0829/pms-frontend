import { useState } from 'react'
import { Card, CardBody, CardHeader } from '../../components/common/Card'
import Button from '../../components/common/Button'
import { Upload, FileText } from 'lucide-react'

export default function ReportTemplateEditor() {
  const [templates, setTemplates] = useState([
    {
      id: 'progress_report',
      name: 'Progress Report',
      description: 'Detailed progress updates for selected project or all projects',
      fields: ['Project', 'Date', 'Progress', 'Remarks'],
    },
    {
      id: 'financial_report',
      name: 'Financial Report',
      description: 'Budget vs. actual spending, cost breakdown, and projections',
      fields: ['Project', 'Date', 'Budget', 'Actual', 'Variance'],
    },
  ])
  const [editing, setEditing] = useState(null)
  const [newField, setNewField] = useState('')

  const handleEdit = (id) => setEditing(id)
  const handleFieldChange = (e) => setNewField(e.target.value)
  const handleAddField = (id) => {
    setTemplates(templates.map(t => t.id === id ? { ...t, fields: [...t.fields, newField] } : t))
    setNewField('')
  }
  const handleRemoveField = (id, idx) => {
    setTemplates(templates.map(t => t.id === id ? { ...t, fields: t.fields.filter((_, i) => i !== idx) } : t))
  }
  const handleNameChange = (id, value) => {
    setTemplates(templates.map(t => t.id === id ? { ...t, name: value } : t))
  }
  const handleDescChange = (id, value) => {
    setTemplates(templates.map(t => t.id === id ? { ...t, description: value } : t))
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-yellow-600" />
            <h2 className="text-xl font-bold text-dark-900">Report Template Editor</h2>
          </div>
        </CardHeader>
        <CardBody>
          {templates.map((template) => (
            <div key={template.id} className="mb-8 border-b pb-6 last:border-b-0 last:pb-0">
              <div className="flex gap-2 items-center mb-2">
                <input
                  className="font-bold text-lg border-b border-yellow-200 focus:border-yellow-500 outline-none bg-transparent flex-1"
                  value={template.name}
                  onChange={e => handleNameChange(template.id, e.target.value)}
                  disabled={editing !== template.id}
                />
                <Button size="sm" variant="outline" onClick={() => setEditing(template.id)}>
                  Edit
                </Button>
              </div>
              <textarea
                className="w-full border border-dark-200 rounded px-2 py-1 mb-2"
                value={template.description}
                onChange={e => handleDescChange(template.id, e.target.value)}
                disabled={editing !== template.id}
              />
              <div className="mb-2">
                <div className="font-medium mb-1">Fields:</div>
                <ul className="mb-2">
                  {template.fields.map((field, idx) => (
                    <li key={idx} className="flex items-center gap-2 mb-1">
                      <span className="bg-dark-50 px-2 py-0.5 rounded text-dark-700 text-sm">{field}</span>
                      {editing === template.id && (
                        <button type="button" className="text-error text-xs" onClick={() => handleRemoveField(template.id, idx)}>
                          Remove
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                {editing === template.id && (
                  <div className="flex gap-2">
                    <input
                      className="border border-dark-200 rounded px-2 py-1 flex-1"
                      placeholder="New field name"
                      value={newField}
                      onChange={handleFieldChange}
                    />
                    <Button size="sm" onClick={() => handleAddField(template.id)} disabled={!newField}>
                      Add Field
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  )
}
