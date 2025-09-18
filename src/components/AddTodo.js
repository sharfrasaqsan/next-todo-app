"use client";
import { useState } from "react";
import { useTodoData } from "@/context/TodoDataContext";

export default function AddTodo() {
  const { addTodo } = useTodoData();
  const [input, setInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;
    try {
      setSubmitting(true);
      await addTodo(input);
      setInput("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group">
        <input
          className="form-control"
          placeholder="Add a todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={submitting}
        />
        <button
          className="btn btn-primary"
          type="submit"
          disabled={submitting || !input.trim()}
        >
          {submitting ? "Adding..." : "Add"}
        </button>
      </div>
    </form>
  );
}
