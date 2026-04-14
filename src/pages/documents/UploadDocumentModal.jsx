import React, { useState } from 'react';
import Modal from '../../components/common/Modal';
import { FormInput, FormSelect } from '../../components/forms/FormFields';
import Button from '../../components/common/Button';

export default function UploadDocumentModal({ isOpen, onClose, onUpload }) {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [project, setProject] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add upload logic
    if (onUpload) onUpload({ file, category, project });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Document">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          type="file"
          label="Select File"
          onChange={e => setFile(e.target.files[0])}
          required
        />
        <FormSelect
          label="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          options={[
            { value: '', label: 'Select Category' },
            { value: 'design', label: 'Design' },
            { value: 'financial', label: 'Financial' },
            { value: 'permits', label: 'Permits' },
            { value: 'contracts', label: 'Contracts' },
            { value: 'photos', label: 'Photos' },
            { value: 'specifications', label: 'Specifications' },
          ]}
          required
        />
        <FormInput
          label="Project"
          value={project}
          onChange={e => setProject(e.target.value)}
          placeholder="Enter project name or ID"
          required
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary">Upload</Button>
        </div>
      </form>
    </Modal>
  );
}
