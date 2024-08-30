let numFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
})

function numFormat(num) {
    return num.toString().padStart(2, 0)
}

function timeFormat(timeString) {
    return new Date(timeString).toLocaleString()
}

function saveTeamId(teamId) {
    localStorage.setItem("teamId", teamId)
}

function getTeamId() {
    return localStorage.getItem("teamId")
}

export { numFormat, timeFormat, saveTeamId, getTeamId }
