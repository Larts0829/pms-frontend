import { useState } from 'react'
import { 
  Building2,
  Bell,
  Shield,
  Database,
  Palette,
  Mail,
  Globe,
  Save,
  Loader2,
} from 'lucide-react'
import { Card, CardBody, CardHeader } from '../../components/common/Card'
import Button from '../../components/common/Button'
import { FormInput, FormSelect, FormTextarea, FormSwitch } from '../../components/forms/FormFields'

const settingsSections = [
  { id: 'company', label: 'Company', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'integrations', label: 'Integrations', icon: Database },
  { id: 'appearance', label: 'Appearance', icon: Palette },
]

/**
 * Settings Page Component (Admin Only)
 */
function SettingsPage() {
  const [activeSection, setActiveSection] = useState('company')
  const [isSaving, setIsSaving] = useState(false)

  // Company settings
  const [companySettings, setCompanySettings] = useState({
    name: 'Westwood Development Corporation',
    email: 'info@westwooddev.com',
    phone: '+63 2 8888 1234',
    address: '123 Business District, Makati City, Metro Manila',
    website: 'https://westwooddev.com',
    taxId: '123-456-789-000',
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    progressAlerts: true,
    budgetAlerts: true,
    reportReminders: true,
    dailyDigest: false,
    weeklyReport: true,
  })

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeout: '30',
    requireMfa: false,
    passwordExpiry: '90',
    minPasswordLength: '8',
    allowRememberMe: true,
  })

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert('Settings saved successfully!')
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'company':
        return (
          <Card>
            <CardHeader 
              title="Company Information" 
              subtitle="Manage your organization's basic information"
            />
            <CardBody className="space-y-4">
              <FormInput
                label="Company Name"
                value={companySettings.name}
                onChange={(e) => setCompanySettings({ ...companySettings, name: e.target.value })}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Email"
                  type="email"
                  value={companySettings.email}
                  onChange={(e) => setCompanySettings({ ...companySettings, email: e.target.value })}
                />
                <FormInput
                  label="Phone"
                  value={companySettings.phone}
                  onChange={(e) => setCompanySettings({ ...companySettings, phone: e.target.value })}
                />
              </div>
              <FormTextarea
                label="Address"
                value={companySettings.address}
                onChange={(e) => setCompanySettings({ ...companySettings, address: e.target.value })}
                rows={2}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Website"
                  value={companySettings.website}
                  onChange={(e) => setCompanySettings({ ...companySettings, website: e.target.value })}
                />
                <FormInput
                  label="Tax ID"
                  value={companySettings.taxId}
                  onChange={(e) => setCompanySettings({ ...companySettings, taxId: e.target.value })}
                />
              </div>
            </CardBody>
          </Card>
        )

      case 'notifications':
        return (
          <Card>
            <CardHeader 
              title="Notification Preferences" 
              subtitle="Configure how and when you receive notifications"
            />
            <CardBody className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-dark-700">Email Notifications</h4>
                <div className="space-y-3">
                  <FormSwitch
                    label="Enable email notifications"
                    description="Receive notifications via email"
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
                  />
                  <FormSwitch
                    label="Progress alerts"
                    description="Get notified when project progress is updated"
                    checked={notificationSettings.progressAlerts}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, progressAlerts: e.target.checked })}
                  />
                  <FormSwitch
                    label="Budget alerts"
                    description="Get notified when budget thresholds are exceeded"
                    checked={notificationSettings.budgetAlerts}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, budgetAlerts: e.target.checked })}
                  />
                  <FormSwitch
                    label="Report reminders"
                    description="Receive reminders to submit daily reports"
                    checked={notificationSettings.reportReminders}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, reportReminders: e.target.checked })}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-dark-200 space-y-4">
                <h4 className="text-sm font-medium text-dark-700">Digest & Reports</h4>
                <div className="space-y-3">
                  <FormSwitch
                    label="Daily digest"
                    description="Receive a daily summary of all project activities"
                    checked={notificationSettings.dailyDigest}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, dailyDigest: e.target.checked })}
                  />
                  <FormSwitch
                    label="Weekly report"
                    description="Receive a weekly progress report every Monday"
                    checked={notificationSettings.weeklyReport}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, weeklyReport: e.target.checked })}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        )

      case 'security':
        return (
          <Card>
            <CardHeader 
              title="Security Settings" 
              subtitle="Configure security policies for your organization"
            />
            <CardBody className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-dark-700">Session Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormSelect
                    label="Session Timeout (minutes)"
                    options={[
                      { value: '15', label: '15 minutes' },
                      { value: '30', label: '30 minutes' },
                      { value: '60', label: '1 hour' },
                      { value: '120', label: '2 hours' },
                    ]}
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                  />
                </div>
                <FormSwitch
                  label="Allow 'Remember Me' option"
                  description="Users can choose to stay logged in"
                  checked={securitySettings.allowRememberMe}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, allowRememberMe: e.target.checked })}
                />
              </div>

              <div className="pt-4 border-t border-dark-200 space-y-4">
                <h4 className="text-sm font-medium text-dark-700">Password Policy</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormSelect
                    label="Minimum Password Length"
                    options={[
                      { value: '6', label: '6 characters' },
                      { value: '8', label: '8 characters' },
                      { value: '10', label: '10 characters' },
                      { value: '12', label: '12 characters' },
                    ]}
                    value={securitySettings.minPasswordLength}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, minPasswordLength: e.target.value })}
                  />
                  <FormSelect
                    label="Password Expiry (days)"
                    options={[
                      { value: '30', label: '30 days' },
                      { value: '60', label: '60 days' },
                      { value: '90', label: '90 days' },
                      { value: 'never', label: 'Never' },
                    ]}
                    value={securitySettings.passwordExpiry}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, passwordExpiry: e.target.value })}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-dark-200 space-y-4">
                <h4 className="text-sm font-medium text-dark-700">Two-Factor Authentication</h4>
                <FormSwitch
                  label="Require MFA for all users"
                  description="Enforce multi-factor authentication for added security"
                  checked={securitySettings.requireMfa}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, requireMfa: e.target.checked })}
                />
              </div>
            </CardBody>
          </Card>
        )

      case 'integrations':
        return (
          <Card>
            <CardHeader 
              title="Integrations" 
              subtitle="Connect with external services and APIs"
            />
            <CardBody>
              <div className="space-y-4">
                {/* Email Service */}
                <div className="p-4 bg-dark-50 rounded-lg border border-dark-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Mail className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-dark-900">Email Service (SMTP)</p>
                        <p className="text-sm text-dark-600">Configure outgoing email settings</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-sm">
                      Connected
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>

                {/* Cloud Storage */}
                <div className="p-4 bg-dark-50 rounded-lg border border-dark-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <Database className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-dark-900">Cloud Storage</p>
                        <p className="text-sm text-dark-600">AWS S3 or similar for document storage</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-dark-200 text-dark-700 rounded text-sm">
                      Not Connected
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Set Up
                  </Button>
                </div>

                {/* Webhook */}
                <div className="p-4 bg-dark-50 rounded-lg border border-dark-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-500/10 rounded-lg">
                        <Globe className="h-5 w-5 text-orange-400" />
                      </div>
                      <div>
                        <p className="font-medium text-dark-900">Webhooks</p>
                        <p className="text-sm text-dark-600">Send events to external services</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-dark-200 text-dark-700 rounded text-sm">
                      Not Configured
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        )

      case 'appearance':
        return (
          <Card>
            <CardHeader 
              title="Appearance" 
              subtitle="Customize the look and feel of your dashboard"
            />
            <CardBody className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-dark-700">Theme</h4>
                <div className="grid grid-cols-3 gap-4">
                  {['light', 'system', 'standard'].map((theme) => (
                    <button
                      key={theme}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        theme === 'light'
                          ? 'border-yellow-500 bg-yellow-500/5'
                          : 'border-dark-300 hover:border-dark-400'
                      }`}
                    >
                      <div className={`h-16 rounded-lg mb-2 ${
                        theme === 'light' ? 'bg-gray-100' :
                        theme === 'system' ? 'bg-gray-200' : 'bg-gray-300'
                      }`} />
                      <p className="text-sm font-medium text-dark-900 capitalize">{theme}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-dark-200 space-y-4">
                <h4 className="text-sm font-medium text-dark-700">Accent Color</h4>
                <div className="flex gap-3">
                  {['#d4a012', '#3b82f6', '#10b981', '#f43f5e', '#8b5cf6'].map((color) => (
                    <button
                      key={color}
                      className={`h-10 w-10 rounded-full border-4 transition-all ${
                        color === '#d4a012' ? 'border-white scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-dark-200 space-y-4">
                <h4 className="text-sm font-medium text-dark-700">Dashboard Layout</h4>
                <FormSelect
                  label="Default Dashboard View"
                  options={[
                    { value: 'overview', label: 'Overview (Default)' },
                    { value: 'projects', label: 'Projects Focus' },
                    { value: 'reports', label: 'Reports Focus' },
                  ]}
                />
              </div>
            </CardBody>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark-900">Settings</h1>
          <p className="text-dark-600 mt-1">
            Manage system configuration and preferences
          </p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          leftIcon={isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardBody className="p-0">
              {settingsSections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full px-4 py-3 flex items-center gap-3 transition-colors ${
                      activeSection === section.id
                        ? 'bg-yellow-500/10 text-yellow-500 border-l-2 border-yellow-500'
                        : 'text-dark-700 hover:bg-dark-50 hover:text-dark-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                )
              })}
            </CardBody>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {renderSection()}
        </div>
      </div>
    </div>
  )
}

export default SettingsPage

