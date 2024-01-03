
function playerObjectMaker() {
    let playerData;
    for (let i = 0; i < 30; i++) {
        fetch(`https://www.balldontlie.io/api/v1/players?per_page=100&page=${i}`)
        .then((res) => res.json())
        .then((playerDataObject) => {
            playerData = playerDataObject.data;
        })
    }
    console.log("inside playerObjectMaker");
    return playerData;
   
}

const playerForm = document.getElementById('player-search-form');
const dropDown = document.getElementById('team-name');
playerForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const userPlayerInput = {};
    const teamSelected = document.getElementById('team-name').value;
    const lastNameEntered = document.getElementById('player-last-name').value;
    if (lastNameEntered !== "Optional: Enter player's last name") {
        userPlayerInput.lastName = lastNameEntered;
        userPlayerInput.team = teamSelected;
    }
    else {
        userPlayerInput.lastName = "";
        userPlayerInput.team = teamSelected;
    }
    searchAPIData(userPlayerInput);
    })
function searchAPIData(player) {
    let playerTeamMatch;
    let playerNameMatch;
    let playerID;
    playersObject = playerObjectMaker();
    for (let player in playersObject) {
        if (playersObject.teamName === player.team) {
            playerTeamMatch = player.team;
            playerID = playersObject.ID;
            console.log(playerTeamMatch);
            console.log(playerID);
        }
    }
   
}
function displayPlayerInfo(player) {
    const playerInfoHolder = document.getElementById('player-container')
    const playerInfoDisplay = document.getElementById('display-player')
    const displayPlayerName = document.createElement('h3');
    const displayPlayerTeamFullName = document.createElement('li');
    const displayPlayerTeamName = document.createElement('li');
    const displayPlayerTeamAbbrev = document.createElement('li');
    const displayPlayerTeamCity = document.createElement('li');
    const displayPlayerConference = document.createElement('li');
    const displayPlayerDivision = document.createElement('li');
    displayPlayerName.innerText = player.firstName + player.lastName;
    playerInfoHolder.appendChild(displayPlayerName);
}
