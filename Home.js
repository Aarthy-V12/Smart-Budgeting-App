import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import SpeechInput from "./SpeechInput";
import ExpensePieChart from "./PieChart";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

function Home({ user, darkMode, setDarkMode }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);

  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleSpeechInput = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
  };

  const handleAddExpense = async () => {
    if (!amount || !category) return;
    const docRef = await addDoc(collection(db, "expenses"), {
      uid: user.uid,
      amount: parseFloat(amount),
      category,
      date: Timestamp.now(),
    });
    setAmount("");
    setCategory("");
    fetchExpenses();
  };

  const fetchExpenses = async () => {
    const q = query(collection(db, "expenses"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const expenses = {};
    querySnapshot.forEach((doc) => {
      const { category, amount } = doc.data();
      expenses[category] = (expenses[category] || 0) + amount;
    });

    const chartData = Object.entries(expenses).map(([cat, amt]) => ({
      name: cat,
      value: amt,
    }));

    setData(chartData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome {user.email}</h1>
        <div className="space-x-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded"
            >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          <button
            onClick={() => signOut(auth)}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-2 p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="Category (e.g. food, travel)"
          value={category || transcript}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mb-2 p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <div className="flex space-x-2">
          <button
            onClick={handleAddExpense}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Expense
          </button>
          <button
            onClick={fetchExpenses}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Show Chart
          </button>
          <button
            onClick={handleSpeechInput}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            🎤 Speak Category
          </button>
        </div>
      </div>

      {data.length > 0 && (
        <div className="w-full h-64 mt-4">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default Home;