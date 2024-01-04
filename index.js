
let playerData;
for (let i = 0; i < 3; i++) {
    fetch(`https://www.balldontlie.io/api/v1/players?per_page=100&page=${i}`)
    .then((res) => res.json())
    .then((playerDataObject) => {
        playerData = playerDataObject.data;
        console.log(playerData);
        const playerTable = document.getElementById('player-table')
        let tableBody = document.createElement('tbody');
        playerTable.appendChild(tableBody);
        let playerFirstName;
        let playerLastName;
        let teamName
        for (let i = 0; i < playerData.length; i++) {
            let createNewRow = document.createElement('tr');
            createNewRow.setAttribute('id', `row-${i + 1}`);
                let newCell = document.createElement('td')
                let newCell2 = document.createElement('td');
                let newCell3 = document.createElement('td');
                playerFirstName = playerData[i].first_name;
                newCell.innerText = playerFirstName;
                playerLastName = playerData[i].last_name;
                newCell2.innerText = playerLastName;
                teamName = playerData[i].team.name;
                newCell3.innerText = teamName;
                createNewRow.appendChild(newCell);
                createNewRow.appendChild(newCell2);
                createNewRow.appendChild(newCell3);
                tableBody.appendChild(createNewRow);
        }
    })
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
function searchAPIData(playerInput) {
    let playerInputObject = playerInput
    let playerTeamMatch;
    let playerNameMatch;
    let playerID;
    if (playerData) {
    for (let player of playerData) {
        if (player.teamName === playerInput.team) {
            playerTeamMatch = playerInput.team;
            playerID = playersObject.ID;
            console.log(playerTeamMatch);
            console.log(playerID);
            }
        }
    }
    else (searchAPIData(playerInput))
   console.log(playerData);
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
