import React from "react"
import { QuizCard } from "../components"
import questions from "../data/questions"

function Home() {
  return (
    <div className="mt-5 space-y-10">
      {questions.slice(-3).map((q, index) => (
        <QuizCard key={q.id} question={q} index={index} className="w-[40rem]" />
      ))}
    </div>
  )
}

export default Home
