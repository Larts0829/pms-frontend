import { useState } from 'react';
import { Card, CardBody, CardHeader } from '../../components/common/Card';
import { BudgetBarChart, ProjectStatusPieChart } from '../../components/charts/Charts';

// Example: Replace with real data from your backend/service
const mockBudgets = [
  { id: 1, project: 'Westwood Tower Phase 1', budget: 1000000, spent: 650000 },
  { id: 2, project: 'Metro Square Commercial', budget: 2000000, spent: 1200000 },
  { id: 3, project: 'Greenfield Residences', budget: 1500000, spent: 900000 },
];

function formatCurrency(value) {
  return value.toLocaleString('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 });
}

export default function BudgetTrackingPage() {
  const [budgets] = useState(mockBudgets);

  // Prepare data for charts
  const chartData = budgets.map((b) => ({
    name: b.project,
    budget: b.budget,
    spent: b.spent,
  }));

  const pieData = budgets.map((b) => ({
    name: b.project,
    value: b.spent,
  }));

  const totalBudget = budgets.reduce((sum, b) => sum + b.budget, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = totalBudget - totalSpent;

  return (
    <div className="space-y-8 p-4 md:p-8 bg-[#f7fafd] min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-dark-900 mb-2">Project Budget Tracking</h1>
      <p className="text-dark-600 mb-6 text-base md:text-lg">Monitor project budgets, spending, and remaining funds with visual analysis.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-xl border-0">
          <CardHeader title="Budget vs. Spent (per Project)" />
          <CardBody>
            <BudgetBarChart data={chartData} height={260} />
          </CardBody>
        </Card>
        <Card className="shadow-xl border-0">
          <CardHeader title="Spending Distribution" />
          <CardBody>
            <ProjectStatusPieChart data={pieData} height={260} />
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <Card className="shadow-xl border-0">
          <CardHeader title="Summary" />
          <CardBody>
            <div className="flex flex-col gap-2 text-lg">
              <div className="flex justify-between"><span className="font-semibold text-dark-700">Total Budget:</span> <span className="font-bold text-blue-700">{formatCurrency(totalBudget)}</span></div>
              <div className="flex justify-between"><span className="font-semibold text-dark-700">Total Spent:</span> <span className="font-bold text-gold-700">{formatCurrency(totalSpent)}</span></div>
              <div className="flex justify-between"><span className="font-semibold text-dark-700">Total Remaining:</span> <span className="font-bold text-green-700">{formatCurrency(totalRemaining)}</span></div>
            </div>
          </CardBody>
        </Card>
        <Card className="shadow-xl border-0">
          <CardHeader title="Detailed Table" />
          <CardBody>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-dark-50">
                    <th className="px-4 py-2 text-left">Project</th>
                    <th className="px-4 py-2 text-right">Budget</th>
                    <th className="px-4 py-2 text-right">Spent</th>
                    <th className="px-4 py-2 text-right">Remaining</th>
                    <th className="px-4 py-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {budgets.map((b) => {
                    const remaining = b.budget - b.spent;
                    const percent = (b.spent / b.budget) * 100;
                    return (
                      <tr key={b.id} className="bg-white border-b last:border-0">
                        <td className="px-4 py-2 font-medium text-dark-900 whitespace-nowrap">{b.project}</td>
                        <td className="px-4 py-2 text-right text-blue-700 whitespace-nowrap">{formatCurrency(b.budget)}</td>
                        <td className="px-4 py-2 text-right text-gold-700 whitespace-nowrap">{formatCurrency(b.spent)}</td>
                        <td className="px-4 py-2 text-right text-green-700 whitespace-nowrap">{formatCurrency(remaining)}</td>
                        <td className="px-4 py-2 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${percent > 90 ? 'bg-red-100 text-red-700' : percent > 70 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                            {percent > 90 ? 'Critical' : percent > 70 ? 'Warning' : 'Healthy'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
