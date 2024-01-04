
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
                let firstNameCell = document.createElement('td')
                let lastNameCell = document.createElement('td');
                let teamCell = document.createElement('td');
                playerFirstName = playerData[i].first_name;
                firstNameCell.innerText = playerFirstName;
                playerLastName = playerData[i].last_name;
                lastNameCell.innerText = playerLastName;
                lastNameCell.addEventListener('dblclick', (e) => {
                    sendPlayerNameToInput(e.target.innerText)
                })
                teamName = playerData[i].team.name;
                teamCell.innerText = teamName;
                createNewRow.appendChild(firstNameCell);
                createNewRow.appendChild(lastNameCell);
                createNewRow.appendChild(teamCell);
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
        userPlayerInput.lastName = lastNameEntered.toLowerCase();
        userPlayerInput.team = teamSelected;
    }
    else {
        userPlayerInput.lastName = "";
        userPlayerInput.team = teamSelected;
    }
    searchAPIData(userPlayerInput);
    })

//populates player last name to input field
function sendPlayerNameToInput(name) {
    lastNameInput.setAttribute('value', name);
    console.log("inside send player function")
}
//searches API Data for match & returns match
function searchAPIData(playerInput) {
    for (let player of playerData) {
        if (player.team.name.toLowerCase() === playerInput.team) {
            if (playerInput.lastName !== "" && playerInput.lastName.toLowerCase() === player.last_name.toLowerCase()) {
            console.log(playerInput.lastName.toLowerCase() + player.last_name.toLowerCase());
            displayPlayerInfo(player);
            }
            else if (playerInput.lastName === "") {
                displayPlayerInfo(player);
            }
        }
    }
   
}
function displayPlayerInfo(player) {
    const playerInfoHolder = document.getElementById('player-container')
    const displayPlayerName = document.createElement('a');
    const displayPlayerFullTeamName = document.createElement('li');
    const displayPlayerTeamAbbrev = document.createElement('li');
    const displayPlayerConference = document.createElement('li');
    const displayPlayerDivision = document.createElement('li');
    displayPlayerName.setAttribute('href', `http://www.google.com/search?q=${player.first_name}+${player.last_name}`);
    displayPlayerName.setAttribute('title', 'Click to search additional player info');
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
