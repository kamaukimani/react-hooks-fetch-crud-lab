import React from "react";

function QuestionList({ questions, setQuestions }) {
  function handleAnswerChange(questionId, newCorrectIndex) {
    setQuestions((questions) =>
      questions.map((q) =>
        q.id === questionId ? { ...q, correctIndex: newCorrectIndex } : q
      )
    );
  }

  function handleDelete(questionId) {
    setQuestions((questions) => questions.filter((q) => q.id !== questionId));
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((q, index) => (
          <li key={q.id}>
            <h4>
              Question {index + 1}
            </h4>
            <h5>Prompt: {q.prompt}</h5>
            <label>
              Correct Answer:
              <select
                value={q.correctIndex}
                onChange={(e) =>
                  handleAnswerChange(q.id, Number(e.target.value))
                }
              >
                {q.answers.map((answer, idx) => (
                  <option key={idx} value={idx}>
                    {answer}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={() => handleDelete(q.id)}>Delete Question</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
