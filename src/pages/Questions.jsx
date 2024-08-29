import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizCard } from "../components";
import questions from "../data/questions";
import databaseService from "../supabase/database";
import { getTeamId } from "../utils/Helper";

function Questions() {
  const teamId = getTeamId();
  const navigate = useNavigate();
  const [powerUps, setPowerUps] = useState(getTeamId());
  const [question, setQuestion] = useState({});

  useEffect(() => {
    databaseService.getQuestion(teamId).then((res, error) => {
      if (!res.data) navigate("/leader-board");
      setQuestion(res.data ? res.data[0] : null);
    });
    databaseService.getPowerUpDetails(teamId).then((res, error) => setPowerUps(res.data.length > 0 ? res.data[0] : null));
    console.log(11, powerUps);
  }, []);

  const teamLevel = 3;
  const teamName = "Some team";
  return (
    <div className="space-y-12">
      <p className="font-bold">Team Name: {teamName}</p>
      <h2 className="font-bold text-[2em] text-center">Level : {teamLevel} / 12</h2>
      <QuizCard
        teamId={teamId}
        question={question}
        index={teamLevel - 1}
        className="w-[40rem]"
        hintsLeft={powerUps.hint_questions ? 3 - powerUps.hint_questions.length : 3}
        skipsLeft={powerUps.skipped_questions ? 0 : 1}
        hintUsed={powerUps.hint_questions ? powerUps.hint_questions.includes(question.id) : null}
      />
    </div>
  );
}

export default Questions;
