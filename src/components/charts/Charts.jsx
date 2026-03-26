import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const COLORS = {
  gold: '#d4a012',
  blue: '#3b82f6',
  green: '#22c55e',
  red: '#ef4444',
  purple: '#8b5cf6',
  orange: '#f97316',
}

const CHART_COLORS = [COLORS.gold, COLORS.blue, COLORS.green, COLORS.purple, COLORS.orange]

/**
 * Custom Tooltip Component
 */
function CustomTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null

  return (
    <div className="bg-dark-800 border border-dark-700 rounded-lg px-3 py-2 shadow-lg">
      {label && <p className="text-dark-400 text-sm mb-1">{label}</p>}
      {payload.map((entry, index) => (
        <p key={index} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: {formatter ? formatter(entry.value) : entry.value}
        </p>
      ))}
    </div>
  )
}

/**
 * Progress Area Chart
 * Shows project progress over time
 */
export function ProgressAreaChart({ data, height = 300 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
        <XAxis 
          dataKey="name" 
          stroke="#666" 
          fontSize={12}
          tickLine={false}
        />
        <YAxis 
          stroke="#666" 
          fontSize={12}
          tickLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip content={<CustomTooltip formatter={(v) => `${v}%`} />} />
        <Area
          type="monotone"
          dataKey="progress"
          stroke={COLORS.gold}
          strokeWidth={2}
          fill={COLORS.gold}
          fillOpacity={0.2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

/**
 * Budget Bar Chart
 * Shows budget vs. spent comparison
 */
export function BudgetBarChart({ data, height = 300 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
        <XAxis 
          dataKey="name" 
          stroke="#666" 
          fontSize={12}
          tickLine={false}
        />
        <YAxis 
          stroke="#666" 
          fontSize={12}
          tickLine={false}
          tickFormatter={(value) => `₱${(value / 1000000).toFixed(0)}M`}
        />
        <Tooltip content={<CustomTooltip formatter={(v) => `₱${v.toLocaleString()}`} />} />
        <Legend />
        <Bar dataKey="budget" name="Budget" fill={COLORS.blue} radius={[4, 4, 0, 0]} />
        <Bar dataKey="spent" name="Spent" fill={COLORS.gold} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

/**
 * Project Status Pie Chart
 */
export function ProjectStatusPieChart({ data, height = 250 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          formatter={(value) => <span className="text-dark-300 text-sm">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

/**
 * Multi-line Progress Chart
 * Track multiple projects' progress
 */
export function MultiProjectLineChart({ data, projects, height = 300 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
        <XAxis 
          dataKey="date" 
          stroke="#666" 
          fontSize={12}
          tickLine={false}
        />
        <YAxis 
          stroke="#666" 
          fontSize={12}
          tickLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip content={<CustomTooltip formatter={(v) => `${v}%`} />} />
        <Legend />
        {projects.map((project, index) => (
          <Line
            key={project.key}
            type="monotone"
            dataKey={project.key}
            name={project.name}
            stroke={CHART_COLORS[index % CHART_COLORS.length]}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

/**
 * Monthly Activity Bar Chart
 */
export function MonthlyActivityChart({ data, height = 300 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
        <XAxis 
          dataKey="month" 
          stroke="#666" 
          fontSize={12}
          tickLine={false}
        />
        <YAxis 
          stroke="#666" 
          fontSize={12}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="reports" name="Reports" fill={COLORS.blue} radius={[4, 4, 0, 0]} />
        <Bar dataKey="updates" name="Updates" fill={COLORS.gold} radius={[4, 4, 0, 0]} />
        <Bar dataKey="documents" name="Documents" fill={COLORS.green} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default {
  ProgressAreaChart,
  BudgetBarChart,
  ProjectStatusPieChart,
  MultiProjectLineChart,
  MonthlyActivityChart,
}

