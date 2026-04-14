import { useState } from 'react';
import Button from '../../components/common/Button';
import { FormInput, FormSelect, FormTextarea } from '../../components/forms/FormFields';
import { Modal, ModalBody, ModalFooter } from '../../components/common/Modal';

const reportTypes = [
  { value: 'daily_progress', label: 'Daily Progress' },
  { value: 'safety', label: 'Safety' },
  { value: 'inspection', label: 'Inspection' },
  { value: 'incident', label: 'Incident' },
  { value: 'quality', label: 'Quality' },
];

export default function CreateSiteReport({ onClose }) {
  const [form, setForm] = useState({
    title: '',
    type: '',
    summary: '',
    details: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      if (onClose) onClose();
    }, 1200);
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Create New Site Report" size="md" showCloseButton={true} description="Document site activities, safety, and progress in a standardized format for corporate records.">
      <ModalBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Report Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="e.g. Daily Progress Report, Safety Inspection, Incident Log"
            hint="Provide a clear, descriptive title for this report."
          />
          <FormSelect
            label="Report Type"
            name="type"
            value={form.type}
            onChange={handleChange}
            options={reportTypes}
            required
            placeholder="Select report type"
            hint="Choose the category that best fits this report."
          />
          <FormInput
            label="Summary"
            name="summary"
            value={form.summary}
            onChange={handleChange}
            required
            placeholder="Brief summary of the report"
            hint="Summarize the main points or findings."
          />
          <FormTextarea
            label="Detailed Description"
            name="details"
            value={form.details}
            onChange={handleChange}
            required
            placeholder="Provide a detailed, factual account of site activities, issues, or observations. Include dates, times, personnel, and any corrective actions."
            hint="Include all relevant details for proper documentation and compliance."
            rows={5}
          />
          <ModalFooter>
            <Button type="button" variant="outline" onClick={onClose} className="min-w-[120px]">Cancel</Button>
            <Button type="submit" className="min-w-[140px]" disabled={submitting}>
              {submitting ? 'Creating...' : 'Create Report'}
            </Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
}
