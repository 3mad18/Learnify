import React, { useState } from "react";

const defaultQuestion = {
  question: "",
  options: ["", "", "", ""],
  answer: 0,
  score: 1,
};

const QuizEditor = ({ quiz, onChange }) => {
  const [questions, setQuestions] = useState(quiz || [defaultQuestion]);

  const handleQuestionChange = (idx, field, value) => {
    const updated = [...questions];
    updated[idx][field] = value;
    setQuestions(updated);
    onChange && onChange(updated);
  };

  const handleOptionChange = (qIdx, optIdx, value) => {
    const updated = [...questions];
    updated[qIdx].options[optIdx] = value;
    setQuestions(updated);
    onChange && onChange(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { ...defaultQuestion }]);
  };

  const removeQuestion = (idx) => {
    const updated = questions.filter((_, i) => i !== idx);
    setQuestions(updated);
    onChange && onChange(updated);
  };

  return (
    <div className="space-y-8">
      {questions.map((q, idx) => (
        <div key={idx} className="bg-gray-100 p-4 rounded-lg shadow">
          <div className="mb-2 font-bold">Question {idx + 1}</div>
          <input
            type="text"
            className="input input-bordered w-full mb-2"
            placeholder="Question text"
            value={q.question}
            onChange={(e) => handleQuestionChange(idx, "question", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-2 mb-2">
            {q.options.map((opt, oidx) => (
              <input
                key={oidx}
                type="text"
                className="input input-bordered"
                placeholder={`Option ${oidx + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(idx, oidx, e.target.value)}
              />
            ))}
          </div>
          <div className="flex items-center gap-4 mb-2">
            <label>Correct Answer:</label>
            <select
              className="select select-bordered"
              value={q.answer}
              onChange={(e) => handleQuestionChange(idx, "answer", Number(e.target.value))}
            >
              {q.options.map((opt, oidx) => (
                <option key={oidx} value={oidx}>{`Option ${oidx + 1}`}</option>
              ))}
            </select>
            <label>Score:</label>
            <input
              type="number"
              min={1}
              className="input input-bordered w-20"
              value={q.score}
              onChange={(e) => handleQuestionChange(idx, "score", Number(e.target.value))}
            />
          </div>
          <button className="btn btn-error btn-sm" onClick={() => removeQuestion(idx)}>
            Remove Question
          </button>
        </div>
      ))}
      <button className="btn btn-primary" onClick={addQuestion}>
        Add Question
      </button>
    </div>
  );
};

export default QuizEditor;
