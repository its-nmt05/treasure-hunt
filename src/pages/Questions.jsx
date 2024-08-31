import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizCard } from "../components";
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
  }, []);

  return (
    <div className="space-y-12">
      <h2 className="font-bold text-[2em] text-center text-white">Level : {question.level != undefined ? question.level : null} / 13</h2>
      <QuizCard
        teamId={teamId}
        question={question}
        index={question.level != undefined ? question.level - 1 : 0}
        className="w-full lg:max-w-[40rem]"
        hintsLeft={powerUps.hint_questions ? 3 - powerUps.hint_questions.length : 3}
        skipsLeft={powerUps.skipped_questions ? 1 - powerUps.skipped_questions.length : 1}
        hintUsed={powerUps.hint_questions ? powerUps.hint_questions.includes(question.id) : null}
      />
    </div>
  );
}

export default Questions;
