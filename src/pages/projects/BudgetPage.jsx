
import { useState } from 'react';
import { Card, CardBody, CardHeader } from '../../components/common/Card';
import { BudgetBarChart, ProjectUtilizationBar, StunningGroupedBar, StunningRadialUtilization, ModernLineChart, ModernCircularProgress } from '../../components/charts/Charts';
import { useEffect } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import BudgetTransactions from './BudgetTransactions';
import Modal from '../../components/common/Modal';


// Mock data for demonstration
const mockBudgets = [
  { id: 1, project: 'Westwood Tower Phase 1', budget: 1000000, spent: 650000, trend: [50000, 120000, 200000, 400000, 650000] },
  { id: 2, project: 'Metro Square Commercial', budget: 2000000, spent: 1200000, trend: [100000, 300000, 600000, 900000, 1200000] },
  { id: 3, project: 'Greenfield Residences', budget: 1500000, spent: 900000, trend: [20000, 200000, 400000, 700000, 900000] },
];

const mockTransactions = {
  1: [
    { date: '2026-04-01', type: 'Expense', description: 'Cement Purchase', amount: -50000 },
    { date: '2026-04-03', type: 'Income', description: 'Budget Allocation', amount: 200000 },
    { date: '2026-04-10', type: 'Expense', description: 'Steel Bars', amount: -120000 },
  ],
  2: [
    { date: '2026-04-02', type: 'Expense', description: 'Tiles', amount: -30000 },
    { date: '2026-04-05', type: 'Income', description: 'Budget Allocation', amount: 500000 },
  ],
  3: [
    { date: '2026-04-04', type: 'Expense', description: 'Paint', amount: -20000 },
    { date: '2026-04-06', type: 'Income', description: 'Budget Allocation', amount: 300000 },
  ],
};


const analytics = [
  {
    label: 'Total Budget',
    value: mockBudgets.reduce((a, b) => a + b.budget, 0),
    trend: mockBudgets.map(b => b.budget),
    percent: 4.2, // mock percent change
    up: true,
    color: 'blue',
  },
  {
    label: 'Total Spent',
    value: mockBudgets.reduce((a, b) => a + b.spent, 0),
    trend: mockBudgets.map(b => b.spent),
    percent: -2.1,
    up: false,
    color: 'yellow',
  },
  {
    label: 'Total Remaining',
    value: mockBudgets.reduce((a, b) => a + (b.budget - b.spent), 0),
    trend: mockBudgets.map(b => b.budget - b.spent),
    percent: 1.7,
    up: true,
    color: 'green',
  },
];

// For horizontal utilization bar
const utilizationData = mockBudgets.map(b => ({
  name: b.project,
  Utilized: b.spent,
  Remaining: b.budget - b.spent,
}));


function formatCurrency(value) {
  return value.toLocaleString('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 });
}

// Premium Summary Card
function SummaryCard({ label, value, trend, percent, up, color }) {
  const colorMap = {
    blue: {
      bg: 'from-blue-100 to-blue-300',
      border: 'border-blue-500',
      text: 'text-blue-900',
      accent: 'text-blue-700',
      shadow: 'shadow-blue-200',
    },
    yellow: {
      bg: 'from-yellow-100 to-yellow-300',
      border: 'border-yellow-500',
      text: 'text-yellow-900',
      accent: 'text-yellow-700',
      shadow: 'shadow-yellow-200',
    },
    green: {
      bg: 'from-green-100 to-green-300',
      border: 'border-green-500',
      text: 'text-green-900',
      accent: 'text-green-700',
      shadow: 'shadow-green-200',
    },
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <div
      className={`rounded-2xl bg-gradient-to-tr ${c.bg} border-t-4 ${c.border} p-6 flex flex-col items-start shadow-xl ${c.shadow} transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl cursor-pointer group`}
      style={{ minHeight: 160 }}
    >
      <span className={`${c.accent} text-sm mb-1 font-semibold tracking-wide`}>{label}</span>
      <span className={`text-4xl font-extrabold ${c.text} drop-shadow mb-2`}>{formatCurrency(value)}</span>
      <div className="flex items-center gap-2 mt-auto">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${up ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {up ? (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
          ) : (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          )}
          {Math.abs(percent)}%
        </span>
        <div className="w-20 h-6">
          <Sparklines data={trend} width={80} height={24} margin={4}>
            <SparklinesLine color={c.text.replace('text-', '')} style={{ strokeWidth: 3, fill: 'none' }} />
          </Sparklines>
        </div>
      </div>
    </div>
  );
}


  function BudgetPage() {

  const [budgets] = useState(mockBudgets);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('Monthly');
  const [projectFilter, setProjectFilter] = useState('All');

  // Modal for per-project analytics
  const handleProjectClick = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  // Filtered data logic (mocked for now)
  const filteredBudgets =
    projectFilter === 'All' ? budgets : budgets.filter(b => b.project === projectFilter);

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-8">

      {/* Premium Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {analytics.map((a, idx) => (
          <SummaryCard key={a.label} {...a} />
        ))}
      </div>

      {/* Main Analytics Chart with Filters */}
      <Card className="bg-gradient-to-br from-blue-50 to-white border-0 shadow-xl mb-8">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
            <span className="text-xl font-bold text-dark-900">Budget vs Spent vs Remaining</span>
            <div className="flex gap-2 items-center">
              <select
                className="rounded-lg border border-dark-200 px-3 py-1.5 text-sm bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                value={filter}
                onChange={e => setFilter(e.target.value)}
              >
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Per Project</option>
              </select>
              <select
                className="rounded-lg border border-dark-200 px-3 py-1.5 text-sm bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                value={projectFilter}
                onChange={e => setProjectFilter(e.target.value)}
              >
                <option value="All">All Projects</option>
                {budgets.map(b => (
                  <option key={b.id} value={b.project}>{b.project}</option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <StunningGroupedBar
            data={filteredBudgets.map(b => ({
              name: b.project,
              Budget: b.budget,
              Spent: b.spent,
              Remaining: b.budget - b.spent,
            }))}
            height={340}
          />
        </CardBody>
      </Card>

      {/* Project Cards Section - Premium Design */}
      <div className="mb-10">
        <div className="flex flex-wrap gap-6 justify-start">
          {budgets.map((b, idx) => {
            const percent = Math.round((b.spent / b.budget) * 100);
            let status = 'On Track', statusColor = 'text-green-700', ring = 'ring-green-200';
            if (percent > 90) { status = 'Over Budget'; statusColor = 'text-red-700'; ring = 'ring-red-200'; }
            else if (percent > 70) { status = 'Warning'; statusColor = 'text-yellow-700'; ring = 'ring-yellow-200'; }
            return (
              <div
                key={b.id}
                className={`group relative min-w-[260px] max-w-xs bg-white/70 backdrop-blur rounded-2xl shadow-xl border border-dark-100 p-6 flex flex-col items-center transition-transform duration-200 hover:scale-[1.04] hover:shadow-2xl hover:bg-white/90 cursor-pointer ${ring}`}
                style={{ transition: 'box-shadow 0.2s, transform 0.2s' }}
                onClick={() => handleProjectClick(b)}
              >
                <div className="absolute top-3 right-3 z-10">
                  <span className={`px-3 py-1 rounded-full bg-dark-50 border border-dark-100 text-xs font-bold ${statusColor} shadow-sm`}>{status}</span>
                </div>
                <ModernCircularProgress value={percent} size={110} colorIdx={idx} />
                <div className="mt-4 text-center w-full">
                  <div className="text-lg font-bold text-dark-900 mb-1 truncate">{b.project}</div>
                  <div className="text-sm text-dark-500 mb-2">{percent}% Utilized</div>
                  <div className="flex justify-between text-xs text-dark-400 mb-1">
                    <span>Budget</span>
                    <span className="font-semibold text-blue-700">{formatCurrency(b.budget)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-dark-400 mb-1">
                    <span>Spent</span>
                    <span className="font-semibold text-yellow-700">{formatCurrency(b.spent)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-dark-400">
                    <span>Remaining</span>
                    <span className="font-semibold text-green-700">{formatCurrency(b.budget - b.spent)}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">View Details</button>
                  </div>
                  <div className="mt-2 text-xs text-dark-400 italic">Burn Rate: <span className="font-semibold text-dark-700">₱{Math.round(b.spent / 5).toLocaleString()}</span>/mo</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Projects Table - Premium, Searchable, Sortable */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
            <span className="text-xl font-bold text-dark-900">Projects Overview</span>
            <input
              type="text"
              placeholder="Search projects..."
              className="rounded-lg border border-dark-200 px-3 py-1.5 text-sm bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-300 transition w-64 text-dark-900 placeholder-dark-500"
              style={{ color: '#18181b' }}
              onChange={e => setProjectFilter(e.target.value === '' ? 'All' : e.target.value)}
            />
          </div>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="min-w-full text-base border-separate border-spacing-0">
              <thead className="sticky top-0 z-10 bg-white/90 backdrop-blur shadow-sm">
                <tr>
                  <th className="px-4 py-3 text-left text-dark-700 font-semibold">Project</th>
                  <th className="px-4 py-3 text-right text-dark-700 font-semibold">Budget</th>
                  <th className="px-4 py-3 text-right text-dark-700 font-semibold">Spent</th>
                  <th className="px-4 py-3 text-right text-dark-700 font-semibold">Remaining</th>
                  <th className="px-4 py-3 text-center text-dark-700 font-semibold">Status</th>
                  <th className="px-4 py-3 text-center text-dark-700 font-semibold">Progress</th>
                </tr>
              </thead>
              <tbody>
                {filteredBudgets.map((b) => {
                  const remaining = b.budget - b.spent;
                  const percent = (b.spent / b.budget) * 100;
                  let status = 'On Track', statusColor = 'bg-green-100 text-green-700';
                  if (percent > 90) { status = 'Over Budget'; statusColor = 'bg-red-100 text-red-700'; }
                  else if (percent > 70) { status = 'Warning'; statusColor = 'bg-yellow-100 text-yellow-700'; }
                  return (
                    <tr key={b.id} className="hover:bg-blue-50/60 cursor-pointer transition group" onClick={() => handleProjectClick(b)}>
                      <td className="px-4 py-3 font-semibold text-dark-900 whitespace-nowrap">{b.project}</td>
                      <td className="px-4 py-3 text-right text-dark-900 whitespace-nowrap">{formatCurrency(b.budget)}</td>
                      <td className="px-4 py-3 text-right text-dark-900 whitespace-nowrap">{formatCurrency(b.spent)}</td>
                      <td className="px-4 py-3 text-right text-dark-900 whitespace-nowrap">{formatCurrency(remaining)}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${statusColor} shadow-sm`}>{status}</span>
                      </td>
                      <td className="px-4 py-3 text-center w-48">
                        <div className="w-full bg-dark-100 rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-3 rounded-full transition-all duration-500 ${percent > 90 ? 'bg-red-400' : percent > 70 ? 'bg-yellow-400' : 'bg-green-400'}`}
                            style={{ width: `${Math.min(percent, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-dark-400 ml-2">{percent.toFixed(1)}%</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredBudgets.length === 0 && (
              <div className="text-center text-dark-400 py-6">No projects found.</div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Project Modal with Tab Navigation and Analytics */}
      {selectedProject && (
        <Modal isOpen={!!selectedProject} onClose={closeModal} title={selectedProject.project + ' - Financial Overview'} size="xl">
          <ProjectModalTabs project={selectedProject} />
        </Modal>
      )}
    </div>
  );
}

// Project Modal Tabs Component
function ProjectModalTabs({ project }) {
  const [tab, setTab] = useState('Overview');
  const tabs = ['Overview', 'Transactions', 'Analytics'];
  return (
    <div className="space-y-8 p-2 md:p-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b border-dark-100">
        {tabs.map(t => (
          <button
            key={t}
            className={`px-5 py-2 text-sm font-semibold rounded-t-lg transition-all duration-150 focus:outline-none ${tab === t ? 'bg-white shadow text-blue-700 border-x border-t border-dark-100 -mb-px' : 'text-dark-400 hover:text-blue-600'}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      {tab === 'Overview' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="rounded-2xl bg-gradient-to-tr from-blue-100 to-blue-300 border-t-4 border-blue-500 p-6 flex flex-col items-start w-full">
              <span className="text-blue-700 text-xs mb-1 font-semibold tracking-wide">Budget</span>
              <span className="text-3xl font-extrabold text-blue-900 drop-shadow">{formatCurrency(project.budget)}</span>
            </div>
            <div className="rounded-2xl bg-gradient-to-tr from-yellow-100 to-yellow-300 border-t-4 border-yellow-500 p-6 flex flex-col items-start w-full">
              <span className="text-yellow-700 text-xs mb-1 font-semibold tracking-wide">Spent</span>
              <span className="text-3xl font-extrabold text-yellow-900 drop-shadow">{formatCurrency(project.spent)}</span>
            </div>
            <div className="rounded-2xl bg-gradient-to-tr from-green-100 to-green-300 border-t-4 border-green-500 p-6 flex flex-col items-start w-full">
              <span className="text-green-700 text-xs mb-1 font-semibold tracking-wide">Remaining</span>
              <span className="text-3xl font-extrabold text-green-900 drop-shadow">{formatCurrency(project.budget - project.spent)}</span>
            </div>
          </div>
          <div className="mb-6">
            <BudgetBarChart data={[{ name: project.project, budget: project.budget, spent: project.spent }]} height={260} />
          </div>
        </div>
      )}
      {tab === 'Transactions' && (
        <div>
          <div className="overflow-x-auto rounded-2xl border border-dark-100 bg-white shadow">
            <table className="min-w-full text-lg">
              <thead>
                <tr className="bg-dark-50">
                  <th className="px-4 py-3 text-left text-dark-700">Date</th>
                  <th className="px-4 py-3 text-left text-dark-700">Type</th>
                  <th className="px-4 py-3 text-left text-dark-700">Description</th>
                  <th className="px-4 py-3 text-right text-dark-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                {(mockTransactions[project.id] || []).map((t, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-3 text-dark-900 whitespace-nowrap">{t.date}</td>
                    <td className="px-4 py-3 text-dark-900 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${t.type === 'Expense' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{t.type}</span>
                    </td>
                    <td className="px-4 py-3 text-dark-900">{t.description}</td>
                    <td className={`px-4 py-3 text-right font-bold ${t.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>{t.amount < 0 ? '-' : ''}{formatCurrency(Math.abs(t.amount))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(!mockTransactions[project.id] || mockTransactions[project.id].length === 0) && (
              <div className="text-center text-dark-400 py-6">No transactions found.</div>
            )}
          </div>
        </div>
      )}
      {tab === 'Analytics' && (
        <div className="space-y-8">
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-white border-0 shadow-xl p-6">
            <span className="text-lg font-bold text-dark-900 mb-2 block">Burn Rate (Mock)</span>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-extrabold text-blue-700">₱{Math.round(project.spent / 5).toLocaleString()}</span>
              <span className="text-dark-400">/ month</span>
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-yellow-50 to-white border-0 shadow-xl p-6">
            <span className="text-lg font-bold text-dark-900 mb-2 block">Spending Over Time (Mock)</span>
            <div className="w-full max-w-md">
              <Sparklines data={project.trend || [0,0,0,0,0]} width={200} height={40} margin={4}>
                <SparklinesLine color="#d4a012" style={{ strokeWidth: 3, fill: 'none' }} />
              </Sparklines>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BudgetPage;
