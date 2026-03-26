// App Constants

// Project Status
export const PROJECT_STATUS = {
  PLANNING: 'planning',
  IN_PROGRESS: 'in_progress',
  ON_HOLD: 'on_hold',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

export const PROJECT_STATUS_LABELS = {
  [PROJECT_STATUS.PLANNING]: 'Planning',
  [PROJECT_STATUS.IN_PROGRESS]: 'In Progress',
  [PROJECT_STATUS.ON_HOLD]: 'On Hold',
  [PROJECT_STATUS.COMPLETED]: 'Completed',
  [PROJECT_STATUS.CANCELLED]: 'Cancelled',
}

export const PROJECT_STATUS_COLORS = {
  [PROJECT_STATUS.PLANNING]: 'info',
  [PROJECT_STATUS.IN_PROGRESS]: 'warning',
  [PROJECT_STATUS.ON_HOLD]: 'neutral',
  [PROJECT_STATUS.COMPLETED]: 'success',
  [PROJECT_STATUS.CANCELLED]: 'error',
}

// Project Types
export const PROJECT_TYPES = {
  RESIDENTIAL: 'residential',
  COMMERCIAL: 'commercial',
  INDUSTRIAL: 'industrial',
  INFRASTRUCTURE: 'infrastructure',
  MIXED_USE: 'mixed_use',
}

export const PROJECT_TYPE_LABELS = {
  [PROJECT_TYPES.RESIDENTIAL]: 'Residential',
  [PROJECT_TYPES.COMMERCIAL]: 'Commercial',
  [PROJECT_TYPES.INDUSTRIAL]: 'Industrial',
  [PROJECT_TYPES.INFRASTRUCTURE]: 'Infrastructure',
  [PROJECT_TYPES.MIXED_USE]: 'Mixed Use',
}

// Milestone Status
export const MILESTONE_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  DELAYED: 'delayed',
}

export const MILESTONE_STATUS_LABELS = {
  [MILESTONE_STATUS.PENDING]: 'Pending',
  [MILESTONE_STATUS.IN_PROGRESS]: 'In Progress',
  [MILESTONE_STATUS.COMPLETED]: 'Completed',
  [MILESTONE_STATUS.DELAYED]: 'Delayed',
}

export const MILESTONE_STATUS_COLORS = {
  [MILESTONE_STATUS.PENDING]: 'neutral',
  [MILESTONE_STATUS.IN_PROGRESS]: 'warning',
  [MILESTONE_STATUS.COMPLETED]: 'success',
  [MILESTONE_STATUS.DELAYED]: 'error',
}

// Document Categories
export const DOCUMENT_CATEGORIES = {
  CONTRACTS: 'contracts',
  ENGINEERING_PLANS: 'engineering_plans',
  PERMITS: 'permits',
  SITE_PHOTOS: 'site_photos',
  REPORTS: 'reports',
  OTHER: 'other',
}

export const DOCUMENT_CATEGORY_LABELS = {
  [DOCUMENT_CATEGORIES.CONTRACTS]: 'Contracts',
  [DOCUMENT_CATEGORIES.ENGINEERING_PLANS]: 'Engineering Plans',
  [DOCUMENT_CATEGORIES.PERMITS]: 'Permits',
  [DOCUMENT_CATEGORIES.SITE_PHOTOS]: 'Site Photos',
  [DOCUMENT_CATEGORIES.REPORTS]: 'Reports',
  [DOCUMENT_CATEGORIES.OTHER]: 'Other',
}

// Client Types
export const CLIENT_TYPES = {
  INDIVIDUAL: 'individual',
  CORPORATION: 'corporation',
  GOVERNMENT: 'government',
}

export const CLIENT_TYPE_LABELS = {
  [CLIENT_TYPES.INDIVIDUAL]: 'Individual',
  [CLIENT_TYPES.CORPORATION]: 'Corporation',
  [CLIENT_TYPES.GOVERNMENT]: 'Government',
}

// User Status
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
}

export const USER_STATUS_LABELS = {
  [USER_STATUS.ACTIVE]: 'Active',
  [USER_STATUS.INACTIVE]: 'Inactive',
}

// Weather Conditions (for site reports)
export const WEATHER_CONDITIONS = {
  CLEAR: 'clear',
  CLOUDY: 'cloudy',
  RAINY: 'rainy',
  STORMY: 'stormy',
  WINDY: 'windy',
}

export const WEATHER_LABELS = {
  [WEATHER_CONDITIONS.CLEAR]: 'Clear',
  [WEATHER_CONDITIONS.CLOUDY]: 'Cloudy',
  [WEATHER_CONDITIONS.RAINY]: 'Rainy',
  [WEATHER_CONDITIONS.STORMY]: 'Stormy',
  [WEATHER_CONDITIONS.WINDY]: 'Windy',
}

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  DATETIME: 'MMM dd, yyyy HH:mm',
  TIME: 'HH:mm',
}

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMIT_OPTIONS: [10, 25, 50, 100],
}

