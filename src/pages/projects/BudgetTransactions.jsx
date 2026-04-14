import { useState } from 'react';
import { Card, CardBody, CardHeader } from '../../components/common/Card';

// Example transaction data
const mockTransactions = [
  { id: 1, project: 'Westwood Tower Phase 1', date: '2026-04-01', type: 'Expense', description: 'Cement Purchase', amount: -50000 },
  { id: 2, project: 'Westwood Tower Phase 1', date: '2026-04-03', type: 'Income', description: 'Client Payment', amount: 200000 },
  { id: 3, project: 'Metro Square Commercial', date: '2026-04-02', type: 'Expense', description: 'Steel Bars', amount: -120000 },
  { id: 4, project: 'Greenfield Residences', date: '2026-04-04', type: 'Expense', description: 'Labor', amount: -30000 },
];

function formatCurrency(value) {
  return value.toLocaleString('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 });
}

export default function BudgetTransactions({ project }) {
  // Filter by project if provided
  const transactions = project
    ? mockTransactions.filter(t => t.project === project)
    : mockTransactions;

  return (
    <Card>
      <CardHeader title="Transactions" />
      <CardBody>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-dark-50">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td className="px-4 py-2">{t.date}</td>
                  <td className="px-4 py-2">{t.type}</td>
                  <td className="px-4 py-2">{t.description}</td>
                  <td className={`px-4 py-2 text-right font-semibold ${t.amount < 0 ? 'text-red-600' : 'text-green-700'}`}>{formatCurrency(t.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
