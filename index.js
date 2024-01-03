
for (let i = 0; i < 30; i++) {
        fetch(`https://www.balldontlie.io/api/v1/players?per_page=100&page=${i}`)
        .then((res) => res.json())
        .then((playerDataObject) => {
            const playerData = playerDataObject.data;
            playerObjectMaker(playerData);
            })
        }

function playerObjectMaker(playerData) {
    let playersObject = {};
    for (let player of playerData) {
        playersObject.firstName = player.first_name;
        playersObject.lastName = player.last_name;
        playersObject.ID = player.id;
        playersObject.position = player.position;
        const teamObject = player.team;
        playersObject.teamAbbrev = teamObject.abbreviation;
        playersObject.teamCity = teamObject.city;
        playersObject.teamConference = teamObject.conference;
        playersObject.teamDivision = teamObject.division;
        playersObject.teamFullName = teamObject.full_name;
        playersObject.teamName = teamObject.name;
        }
        return playersObject;
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
function searchAPIData(playerObject) {
   for (let player in playerObject) {
    console.log(player);
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
