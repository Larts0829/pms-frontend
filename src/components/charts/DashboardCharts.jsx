import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export function ProjectStatusBar({ data }) {
  const chartData = {
    labels: ['In Progress', 'Completed', 'Planning', 'On Hold'],
    datasets: [
      {
        label: 'Projects',
        data: [data.activeProjects, data.completedProjects, data.planningProjects, data.onHoldProjects],
        backgroundColor: [
          '#facc15', // yellow
          '#22c55e', // green
          '#38bdf8', // blue
          '#a3a3a3', // gray
        ],
        borderRadius: 8,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    animation: {
      duration: 1200,
      easing: 'easeOutQuart',
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };
  return <Bar data={chartData} options={options} />;
}

export function PortfolioPie({ data }) {
  const chartData = {
    labels: ['Active', 'Completed', 'Planning', 'On Hold'],
    datasets: [
      {
        data: [data.activeProjects, data.completedProjects, data.planningProjects, data.onHoldProjects],
        backgroundColor: [
          '#fde68a', // yellow
          '#bbf7d0', // green
          '#bae6fd', // blue
          '#e5e7eb', // gray
        ],
        borderWidth: 2,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: false },
    },
    animation: {
      animateRotate: true,
      duration: 1200,
    },
  };
  return <Pie data={chartData} options={options} />;
}

export function ProgressLine({ data }) {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Portfolio Progress %',
        data: data,
        fill: false,
        borderColor: '#facc15',
        backgroundColor: '#fde68a',
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    animation: {
      duration: 1200,
      easing: 'easeInOutCubic',
    },
    scales: {
      y: { beginAtZero: true, max: 100 },
    },
  };
  return <Line data={chartData} options={options} />;
}
