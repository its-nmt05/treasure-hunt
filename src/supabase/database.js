import { createClient } from "@supabase/supabase-js"
import config from "../config/config"

export class DatabaseService {
    constructor() {
        this.client = createClient(
            config.supabaseUrl,
            config.supabaseProjectAPIKey
        )
    }

    async getData({}) {}

    async register({ name, members }) {
        return await this.client.rpc("register", {
            _name: name,
            _members: members,
        })
    }

    async get_hint({ question_id, team_id }) {
        return await this.client.rpc("get_hint", {
            team_id,
            question_id,
        })
    }

    async get_leaderboard() {
        return await this.client
            .from("teams")
            .select()
            .order("points", { ascending: false })
    }
}

const databaseService = new DatabaseService()

export default databaseService
