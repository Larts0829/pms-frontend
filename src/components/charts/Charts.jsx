// Modern Line Chart for Budget/Spent Trend
import React from 'react';
import { LineChart as ReLineChart, Line as ReLine } from 'recharts';
export function ModernLineChart({ data, height = 320 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReLineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" stroke="#666" fontSize={13} tickLine={false} />
        <YAxis stroke="#666" fontSize={13} tickLine={false} tickFormatter={v => `₱${(v/1000000).toFixed(0)}M`} />
        <Tooltip content={<CustomTooltip formatter={v => `₱${v.toLocaleString()}`} />} />
        <Legend />
        <ReLine type="monotone" dataKey="Budget" stroke={COLORS.blue} strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
        <ReLine type="monotone" dataKey="Spent" stroke={COLORS.gold} strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
      </ReLineChart>
    </ResponsiveContainer>
  );
}

// Modern Circular Progress (animated, color-coded)
export function ModernCircularProgress({ value, size = 120, colorIdx = 0 }) {
  const colors = [COLORS.blue, COLORS.gold, COLORS.green, COLORS.purple, COLORS.orange];
  const stroke = colors[colorIdx % colors.length];
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(100, value));
  const offset = circumference - (progress / 100) * circumference;
  return (
    <svg width={size} height={size} className="block">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth={14}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={stroke}
        strokeWidth={14}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.4,2,.6,1)' }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize={size * 0.22}
        fontWeight="bold"
        fill={stroke}
      >
        {progress}%
      </text>
    </svg>
  );
}
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from 'recharts';
/**
 * Stunning Grouped Bar Chart
 * Modern grouped bar with rounded bars and shadow
 */
export function StunningGroupedBar({ data, height = 320 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }} barGap={8}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" stroke="#666" fontSize={13} tickLine={false} />
        <YAxis stroke="#666" fontSize={13} tickLine={false} tickFormatter={v => `₱${(v/1000000).toFixed(0)}M`} />
        <Tooltip content={<CustomTooltip formatter={v => `₱${v.toLocaleString()}`} />} />
        <Legend />
        <Bar dataKey="Budget" fill={COLORS.blue} radius={[8, 8, 0, 0]} barSize={28} />
        <Bar dataKey="Spent" fill={COLORS.gold} radius={[8, 8, 0, 0]} barSize={28} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/**
 * Stunning Radial Utilization Chart
 * Shows utilization per project as a radial progress bar
 */
export function StunningRadialUtilization({ data, height = 320 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="40%"
        outerRadius="90%"
        barSize={24}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
        <RadialBar
          minAngle={15}
          background
          clockWise
          dataKey="Utilized"
          cornerRadius={16}
          label={{ position: 'insideStart', fill: '#222', fontWeight: 700, fontSize: 16, formatter: v => `${v}%` }}
        />
        <Legend iconSize={18} layout="vertical" verticalAlign="middle" align="right" />
        <Tooltip content={<CustomTooltip formatter={v => `${v}% Utilized`} />} />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}
/**
 * Project Utilization Bar (Horizontal Stacked Bar)
 * Shows utilized vs remaining budget per project
 */
export function ProjectUtilizationBar({ data, height = 300 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
        <XAxis 
          type="number"
          stroke="#666"
          fontSize={12}
          tickLine={false}
          tickFormatter={(value) => `₱${(value / 1000000).toFixed(0)}M`}
        />
        <YAxis 
          type="category"
          dataKey="name"
          stroke="#666"
          fontSize={13}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip formatter={(v) => `₱${v.toLocaleString()}`} />} />
        <Legend />
        <Bar dataKey="Utilized" stackId="a" name="Utilized" fill={COLORS.gold} radius={[0, 8, 8, 0]} />
        <Bar dataKey="Remaining" stackId="a" name="Remaining" fill={COLORS.green} radius={[8, 0, 0, 8]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
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

