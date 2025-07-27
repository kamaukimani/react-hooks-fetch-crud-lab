import React, { useState } from "react";

function QuestionForm({ setQuestions }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((f) => ({
      ...f,
      [name]: name === "correctIndex" ? Number(value) : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newQuestion = {
      prompt: formData.prompt,
      answers: [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
      correctIndex: formData.correctIndex,
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((newQ) => {
        setQuestions((prev) => [...prev, newQ]);
        setFormData({
          prompt: "",
          answer1: "",
          answer2: "",
          answer3: "",
          answer4: "",
          correctIndex: 0,
        });
      })
      .catch(console.error);
  }

  return (
    <section>
      <h1>Add New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            value={formData.answer1}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Answer 2:
          <input
            type="text"
            name="answer2"
            value={formData.answer2}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Answer 3:
          <input
            type="text"
            name="answer3"
            value={formData.answer3}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Answer 4:
          <input
            type="text"
            name="answer4"
            value={formData.answer4}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value={0}>Answer 1</option>
            <option value={1}>Answer 2</option>
            <option value={2}>Answer 3</option>
            <option value={3}>Answer 4</option>
          </select>
        </label>

        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
