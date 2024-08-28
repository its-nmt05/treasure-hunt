import React from "react"
import { useParams } from "react-router-dom"
import { QuizCard } from "../components"
import questions from "../data/questions"

function Questions() {
  const { teamId } = useParams()
  return (
    <div className="space-y-12">
      <p className="font-bold">Team id is: {teamId}</p>
      {questions.slice(-3).map((q, index) => (
        <QuizCard key={q.id} question={q} index={index} className="w-[40rem]" />
      ))}
    </div>
  )
}

export default Questions
