
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

//Make default text disappear on click
const lastNameInput = document.getElementById('player-last-name');
    lastNameInput.addEventListener('click', (event) => {
            event.target.value = "";
    })

    //Get user input from form & pass to search function
const playerForm = document.getElementById('player-search-form');
const dropDown = document.getElementById('team-name');
playerForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const userPlayerInput = {};
    const teamSelected = document.getElementById('team-name').value;
    const lastNameEntered = lastNameInput.value;
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

//searches API Data for match & returns match
function searchAPIData(playerInput) {
    let playerTeamMatch;
    let playerNameMatch;
    let playerID;
    for (let player of playerData) {
        if (player.team.name.toLowerCase() === playerInput.team) {
            displayPlayerInfo(player);
            }
        else console.log("else");
        }
   
}
function displayPlayerInfo(player) {
    const playerInfoHolder = document.getElementById('player-container')
    const playerInfoDisplay = document.getElementById('display-player')
    const displayPlayerName = document.createElement('h3');
    const displayPlayerFullTeamName = document.createElement('li');
    const displayPlayerTeamAbbrev = document.createElement('li');
    const displayPlayerConference = document.createElement('li');
    const displayPlayerDivision = document.createElement('li');
    displayPlayerName.innerText = player.first_name + " " + player.last_name;
    playerInfoHolder.appendChild(displayPlayerName);
    displayPlayerFullTeamName.innerText = `Team: ${player.team.full_name}`;
    playerInfoHolder.appendChild(displayPlayerFullTeamName);
    displayPlayerTeamAbbrev.innerText = `Abbreviation: ${player.team.abbreviation}`;
    playerInfoHolder.appendChild(displayPlayerTeamAbbrev);
    displayPlayerConference.innerText = `Conference: ${player.team.conference}`;
    playerInfoHolder.appendChild(displayPlayerConference);
    displayPlayerDivision.innerText = `Division: ${player.team.division}`;
    playerInfoHolder.appendChild(displayPlayerDivision);
}
