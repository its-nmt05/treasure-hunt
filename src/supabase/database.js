import { createClient } from "@supabase/supabase-js";
import config from "../config/config";

export class DatabaseService {
  constructor() {
    this.client = createClient(config.supabaseUrl, config.supabaseProjectAPIKey);
  }

  async getAllQuestions() {
    return await this.client.from("questions").select();
  }

  async getPowerUpDetails(teamId) {
    return await this.client.from("teams").select("hint_questions, skipped_questions").eq("id", teamId);
  }

  async getQuestion(teamId) {
    const { data, error } = await this.client.from("teams").select("path, level").eq("id", teamId);
    if (error && data.length > 0) {
      console.log(error);
      return null;
    }
    // console.log(data[0].path[data[0].level - 1]);
    return await this.client
      .from("questions")
      .select()
      .eq("id", data[0].path[data[0].level - 1]);
  }

  async register({ name, members }) {
    return await this.client.rpc("register", {
      _name: name,
      _members: members,
    });
  }

  async generatePath(generatedPath, teamId) {
    return await this.client.from("teams").update({ path: generatedPath }).eq("id", teamId);
  }

  async get_hint({ question_id, team_id }) {
    return await this.client.rpc("get_hint", {
      team_id,
      question_id,
    });
  }

  async skip_question({ question_id, team_id }) {
    return await this.client.rpc("skip_question", {
      team_id,
      question_id,
    });
  }

  async submit_question({ question_id, team_id, answer }) {
    return await this.client.rpc("submit_question", {
      _answer: answer,
      question_id,
      team_id,
    });
  }

  async get_leaderboard() {
    return await this.client.from("teams").select().order("points", { ascending: false });
  }
}

const databaseService = new DatabaseService();

export default databaseService;
