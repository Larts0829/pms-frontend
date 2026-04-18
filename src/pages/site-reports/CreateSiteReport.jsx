import { useState } from 'react';
import Button from '../../components/common/Button';
import { FormInput, FormSelect, FormTextarea } from '../../components/forms/FormFields';
import { Modal, ModalBody, ModalFooter } from '../../components/common/Modal';
import { Calendar, FileText, AlertCircle } from 'lucide-react';

const reportTypes = [
  { value: 'daily_progress', label: 'Daily Progress Report' },
  { value: 'safety', label: 'Safety Inspection' },
  { value: 'inspection', label: 'Quality Inspection' },
  { value: 'incident', label: 'Incident Report' },
  { value: 'quality', label: 'Quality Assurance' },
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

  const getTypeDescription = (type) => {
    const descriptions = {
      daily_progress: 'Track daily site activities, work completed, and progress milestones',
      safety: 'Document safety inspections, hazards, and corrective actions',
      inspection: 'Record quality inspections and compliance checks',
      incident: 'Report incidents, accidents, or safety concerns with immediate actions',
      quality: 'Document quality assurance findings and recommendations',
    };
    return descriptions[type] || '';
  };

  return (
    <Modal 
      isOpen={true} 
      onClose={onClose} 
      title="Create New Site Report" 
      size="xl" 
      showCloseButton={true} 
      description="Document site activities, safety, and progress in a standardized format for corporate records."
    >
      <ModalBody>
        <form onSubmit={handleSubmit} className="space-y-0">
          {/* Header Info Section */}
          <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-dark-700">
                <p className="font-semibold mb-1">Documentation Guidelines:</p>
                <p>Provide accurate, detailed information. All site reports are permanently recorded for compliance and legal purposes.</p>
              </div>
            </div>
          </div>

          {/* Report Metadata Section */}
          <div className="mb-8 pb-6 border-b border-dark-200">
            <h3 className="text-sm font-semibold text-dark-900 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-yellow-500" />
              Report Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Report Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="e.g. Daily Progress - Phase 1 Excavation"
                hint="Create a descriptive, specific title for easy identification"
              />
              <FormSelect
                label="Report Type"
                name="type"
                value={form.type}
                onChange={handleChange}
                options={reportTypes}
                required
                placeholder="Select report type"
                hint="Choose the category that best fits this report"
              />
            </div>
            {form.type && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">Report Type Description:</span> {getTypeDescription(form.type)}
                </p>
              </div>
            )}
          </div>

          {/* Report Content Section */}
          <div className="mb-8 pb-6 border-b border-dark-200">
            <h3 className="text-sm font-semibold text-dark-900 mb-4">Report Summary</h3>
            <FormInput
              label="Executive Summary"
              name="summary"
              value={form.summary}
              onChange={handleChange}
              required
              placeholder="Brief overview of key points (2-3 sentences max)"
              hint="Summarize the main findings or progress for quick reference"
              className="mb-4"
            />
            <p className="text-xs text-dark-600 mb-2 font-semibold">Summary Progress:</p>
            <div className="w-full bg-dark-200 rounded-full h-2 mb-4">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: form.summary.length > 0 ? '50%' : '0%' }}
              />
            </div>
          </div>

          {/* Detailed Description Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-dark-900 mb-4">Detailed Documentation</h3>
            <FormTextarea
              label="Detailed Description"
              name="details"
              value={form.details}
              onChange={handleChange}
              required
              placeholder="Provide comprehensive documentation including:&#10;• Date, time, and weather conditions&#10;• Personnel involved and site supervision&#10;• Work completed and progress made&#10;• Material and equipment used&#10;• Issues encountered and resolutions&#10;• Photographs or attachments (if any)&#10;• Recommendations for next steps"
              hint="Be thorough and factual. This documentation is for compliance and record-keeping purposes."
              rows={8}
            />
            <p className="text-xs text-dark-600 mt-2">
              Character count: <span className={form.details.length > 500 ? 'text-green-600 font-semibold' : 'text-dark-500'}>{form.details.length}</span> / 500 minimum recommended
            </p>
          </div>

          {/* Hidden ModalFooter internal structure */}
        </form>

        {/* Custom Footer */}
        <div className="bg-dark-50 px-6 py-4 flex items-center justify-between border-t border-dark-200 mt-6 -mx-6 -mb-6">
          <div className="text-xs text-dark-600 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>This report will be timestamped and permanently recorded</span>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="min-w-[120px]"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="min-w-[160px]"
              disabled={submitting || !form.title || !form.type || !form.summary || !form.details}
              onClick={handleSubmit}
            >
              {submitting ? 'Creating Report...' : 'Create & Submit Report'}
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
