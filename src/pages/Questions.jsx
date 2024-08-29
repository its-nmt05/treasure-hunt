import React from "react";
import { useParams } from "react-router-dom";
import { QuizCard } from "../components";
import questions from "../data/questions";
import { Button } from "@nextui-org/react";

function Questions() {
  const { teamId } = useParams();
  const teamLevel = 3;
  return (
    <div className="space-y-12">
      <p className="font-bold">Team Name: {teamId}</p>
      <h2 className="font-bold text-[2em] text-center">Level : {teamLevel} / 12</h2>
      <QuizCard teamId={teamId} question={questions[0]} index={teamLevel - 1} className="w-[40rem]" hintsLeft={3} skipsLeft={1} />

      {/* {questions.slice(-3).map((q, index) => (
        <QuizCard key={q.id} question={q} index={index} className="w-[40rem]" />
      ))} */}
    </div>
  );
}

export default Questions;
