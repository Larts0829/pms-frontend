import { useState } from 'react';
import { Card, CardBody, CardHeader } from '../../components/common/Card';
import Button from '../../components/common/Button';

// Mock data for demonstration
const mockBudgets = [
  { id: 1, project: 'Westwood Tower Phase 1', budget: 1000000, spent: 650000 },
  { id: 2, project: 'Metro Square Commercial', budget: 2000000, spent: 1200000 },
  { id: 3, project: 'Greenfield Residences', budget: 1500000, spent: 900000 },
];

function formatCurrency(value) {
  return value.toLocaleString('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 });
}

export default function ProjectBudgetPage() {
  const [budgets] = useState(mockBudgets);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader title="Project Budget & Expenses" />
        <CardBody>
          <p className="mb-4 text-dark-600">Track project budgets, expenses, and remaining funds.</p>
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
                    <tr key={b.id}>
                      <td className="px-4 py-2 font-medium text-dark-900">{b.project}</td>
                      <td className="px-4 py-2 text-right">{formatCurrency(b.budget)}</td>
                      <td className="px-4 py-2 text-right">{formatCurrency(b.spent)}</td>
                      <td className="px-4 py-2 text-right">{formatCurrency(remaining)}</td>
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
  );
}
