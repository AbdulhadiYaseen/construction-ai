"use client";

import { useState } from "react";

// Navbar component
const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-white text-2xl font-bold">
          Construction AI
        </a>

        <div className="flex gap-6">
          <a href="#" className="text-gray-300 hover:text-white">
            Dashboard
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            Projects
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            Settings
          </a>
        </div>
      </div>
    </nav>
  );
};

export default function Dashboard() {
  const [name, setName] = useState("");
  const [project, setProject] = useState("");
  const [result, setResult] = useState("");

  const generatePlan = async () => {
    const res = await fetch("/api/planner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        project,
      }),
    });

    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div>
      <Navbar />

      <div className="p-10 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">
          Construction AI Manager
        </h1>

        <input
          type="text"
          placeholder="Project Name"
          className="border p-3 w-full mt-5"
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="border p-3 w-full mt-5"
          rows={5}
          placeholder="Describe project..."
          onChange={(e) => setProject(e.target.value)}
        />

        <button
          onClick={generatePlan}
          className="bg-black text-white px-5 py-2 mt-4 rounded"
        >
          Generate Plan
        </button>

        <div className="mt-10 whitespace-pre-wrap bg-gray-100 p-4 rounded">
          {result}
        </div>
      </div>
    </div>
  );
}
