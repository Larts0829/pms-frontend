import { useState } from 'react';
import { User, Mail, Phone, Building, MapPin, Calendar, DollarSign, FileText, CheckCircle } from 'lucide-react';

const steps = [
  'Personal Info',
  'Project Details',
  'Schedule & Budget',
  'Notes & Review',
];

const projectTypes = [
  { label: 'Office', icon: <Building className="h-5 w-5 mr-2" /> },
  { label: 'Retail', icon: <Building className="h-5 w-5 mr-2" /> },
  { label: 'Residential', icon: <Building className="h-5 w-5 mr-2" /> },
  { label: 'Other', icon: <Building className="h-5 w-5 mr-2" /> },
];

const budgetOptions = [
  '₱1M–2M',
  '₱2M–5M',
  '₱5M–10M',
  '₱10M+',
];


export default function ProjectInquiryStepper({ onSuccess }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    location: '',
    date: '',
    budget: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProjectType = (type) => {
    setForm({ ...form, projectType: type });
  };

  const handleBudget = (budget) => {
    setForm({ ...form, budget });
  };

  // Validation for each step
  const isStepValid = () => {
    if (step === 0) {
      return form.name.trim() && form.email.trim() && form.phone.trim();
    }
    if (step === 1) {
      return form.projectType.trim() && form.location.trim();
    }
    if (step === 2) {
      return form.date.trim() && form.budget.trim();
    }
    return true;
  };

  const handleNext = () => {
    if (!isStepValid()) return;
    if (step < steps.length - 1) setStep(step + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      if (onSuccess) setTimeout(onSuccess, 3000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <CheckCircle className="h-16 w-16 text-green-500 mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold mb-2 text-dark-900">Consultation Scheduled!</h2>
        <p className="text-lg text-dark-900 mb-4 text-center">Thank you for your inquiry. Our team will contact you soon.</p>
        <div className="flex items-center gap-2 mt-4">
          <span className="animate-spin inline-block h-6 w-6 border-4 border-yellow-400 border-t-transparent rounded-full"></span>
          <span className="text-dark-900 font-medium">Redirecting to landing page...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">
      {/* Progress Bar & Steps */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          {steps.map((label, idx) => (
            <div key={label} className={`flex-1 flex flex-col items-center ${idx <= step ? 'text-yellow-500' : 'text-gray-300'}`}>
              <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${idx <= step ? 'border-yellow-500 bg-yellow-100' : 'border-gray-300 bg-white'}`}>
                {idx + 1}
              </div>
              <span className="text-xs mt-1 whitespace-nowrap text-dark-900">{label}</span>
            </div>
          ))}
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full">
          <div className="h-2 bg-yellow-400 rounded-full transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
      </div>
      {/* Step Content */}
      <div className="transition-all duration-500">
        {step === 0 && (
          <div className="space-y-6">
            <div className="relative">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition text-lg bg-white shadow-sm text-dark-900"
                required
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
            </div>
            <div className="relative">
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                type="email"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition text-lg bg-white shadow-sm text-dark-900"
                required
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
            </div>
            <div className="relative">
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition text-lg bg-white shadow-sm text-dark-900"
                required
              />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-6">
            <div className="mb-2">
              <div className="mb-2 font-semibold text-dark-900">Project Type</div>
              <div className="flex gap-3 flex-wrap">
                {projectTypes.map((type) => (
                  <button
                    type="button"
                    key={type.label}
                    className={`flex items-center px-4 py-3 rounded-xl border transition shadow-sm text-lg font-bold text-dark-900 ${form.projectType === type.label ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 bg-white hover:border-yellow-400'}`}
                    onClick={() => handleProjectType(type.label)}
                  >
                    {type.icon}
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Project Location"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition text-lg bg-white shadow-sm text-dark-900"
                required
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-6">
            <div className="mb-2">
              <div className="mb-2 font-semibold text-dark-900">Preferred Schedule</div>
              <div className="relative">
                <input
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  type="date"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition text-lg bg-white shadow-sm text-dark-900"
                  required
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
              </div>
            </div>
            <div className="mb-2">
              <div className="mb-2 font-semibold text-dark-900">Estimated Budget</div>
              <div className="flex gap-3 flex-wrap">
                {budgetOptions.map((budget) => (
                  <button
                    type="button"
                    key={budget}
                    className={`px-4 py-2 rounded-xl border transition shadow-sm text-lg font-bold text-dark-900 ${form.budget === budget ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 bg-white hover:border-yellow-400'}`}
                    onClick={() => handleBudget(budget)}
                  >
                    <DollarSign className="inline-block h-5 w-5 mr-2 text-yellow-500" />
                    {budget}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-6">
            <div className="relative">
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Additional Notes (optional)"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition text-lg bg-white shadow-sm min-h-[100px] text-dark-900"
              />
              <FileText className="absolute left-3 top-4 text-yellow-500" />
            </div>
            {/* Review Section */}
            <div className="bg-gray-50 rounded-xl p-4 shadow-inner">
              <div className="font-semibold mb-2 text-dark-900">Review</div>
              <div className="text-sm text-dark-900">
                <div><span className="font-medium">Name:</span> {form.name}</div>
                <div><span className="font-medium">Email:</span> {form.email}</div>
                <div><span className="font-medium">Phone:</span> {form.phone}</div>
                <div><span className="font-medium">Project Type:</span> {form.projectType}</div>
                <div><span className="font-medium">Location:</span> {form.location}</div>
                <div><span className="font-medium">Schedule:</span> {form.date}</div>
                <div><span className="font-medium">Budget:</span> {form.budget}</div>
                <div><span className="font-medium">Notes:</span> {form.notes || '—'}</div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 gap-4">
        <button
          className="px-6 py-2 rounded-xl bg-gray-100 text-gray-600 font-semibold shadow-sm disabled:opacity-50"
          onClick={handleBack}
          disabled={step === 0 || loading}
          type="button"
        >
          Back
        </button>
        <button
          className={`px-6 py-2 rounded-xl bg-yellow-500 text-white font-bold shadow hover:bg-yellow-600 transition w-full ml-4 flex items-center justify-center ${(!isStepValid() || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleNext}
          disabled={!isStepValid() || loading}
          type="button"
        >
          {loading ? (
            <span className="flex items-center"><svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Scheduling...</span>
          ) : (
            step === steps.length - 1 ? 'Schedule My Consultation' : 'Next'
          )}
        </button>
      </div>
    </div>
  );
}
