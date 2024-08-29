let numFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
})

function numFormat(num) {
    return num.toString().padStart(2, 0)
}

function saveTeamId(team_id) {
    localStorage.setItem("team_id", team_id)
}

function getTeamId() {
    return localStorage.getItem("team_id")
}

export { numFormat, saveTeamId, getTeamId }
