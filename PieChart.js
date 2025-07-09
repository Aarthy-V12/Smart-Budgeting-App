import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bfff"];

const ExpensePieChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  const grouped = data.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + parseFloat(item.amount);
    return acc;
  }, {});

  const chartData = Object.keys(grouped).map((key) => ({
    name: key,
    value: grouped[key],
  }));

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Expense Breakdown</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensePieChart;