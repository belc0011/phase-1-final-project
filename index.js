//Initial Open API GET Request
function populateTable() {
    for (let i = 0; i < 3; i++) {
        fetch(`https://www.balldontlie.io/api/v1/players?per_page=100&page=${i}`)
        .then((res) => res.json())
        .then((playerDataObject) => {
            let playerData = playerDataObject.data;
            const playerTable = document.getElementById('player-table')
            let tableBody = document.createElement('tbody');
            playerTable.appendChild(tableBody);
            let playerFirstName;
            let playerLastName;
            let teamName;
            let teamFullName;
            let teamAbbrev;
            let teamConf;
            let teamDiv;
            for (let i = 0; i < playerData.length; i++) {
                let createNewRow = document.createElement('tr');
                let firstNameCell = document.createElement('td')
                let lastNameCell = document.createElement('td');
                let teamCell = document.createElement('td');
                let fullTeamCell = document.createElement('td');
                let teamAbbrevCell = document.createElement('td');
                let teamConfCell = document.createElement('td');
                let teamDivCell = document.createElement('td');
                playerFirstName = playerData[i].first_name;
                firstNameCell.innerText = playerFirstName;
                playerLastName = playerData[i].last_name;
                lastNameCell.innerText = playerLastName;
                lastNameCell.setAttribute('title', 'double-click to send name to input box')
                lastNameCell.addEventListener('dblclick', (e) => {
                sendPlayerNameToInput(e.target.innerText)
                })
                teamName = playerData[i].team.name;
                teamCell.innerText = teamName;
                teamFullName = playerData[i].team.full_name;
                fullTeamCell.innerText = teamFullName;
                fullTeamCell.setAttribute('id', `${teamFullName.toLowerCase()}`);
                teamAbbrev = playerData[i].team.abbreviation;
                teamAbbrevCell.innerText = teamAbbrev;
                teamAbbrevCell.setAttribute('id', `${teamAbbrev}`);
                teamConf = playerData[i].team.conference;
                teamConfCell.innerText = teamConf;
                teamConfCell.setAttribute('id', `${teamConf}`);
                teamDiv = playerData[i].team.division;
                teamDivCell.innerText = teamDiv;
                teamDivCell.setAttribute('id', `${teamDiv}`);
                createNewRow.setAttribute('id', `row-${playerLastName.toLowerCase()}`);
                createNewRow.setAttribute('class', `${teamName.toLowerCase()}`)
                createNewRow.appendChild(firstNameCell);
                createNewRow.appendChild(lastNameCell);
                createNewRow.appendChild(teamCell);
                createNewRow.appendChild(fullTeamCell);
                createNewRow.appendChild(teamAbbrevCell);
                createNewRow.appendChild(teamConfCell);
                createNewRow.appendChild(teamDivCell);
                tableBody.appendChild(createNewRow);
            }
            console.log(playerDataObject);
        })
    }
}
populateTable();
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
        userPlayerInput.last_name = lastNameEntered.toLowerCase();
        userPlayerInput.team = teamSelected;
    }
    else {
        userPlayerInput.last_name = "";
        userPlayerInput.team = teamSelected;
    }
    const playerObject = searchAPIData(userPlayerInput);
    displayPlayerInfo(playerObject);
    })

//populates player last name to input field
function sendPlayerNameToInput(name) {
    lastNameInput.setAttribute('value', name);
    lastNameInput.innerText = name;
}

//searches API Data for match & returns match
function searchAPIData(playerInput) {
    let playerObject = {};
    let lastName;
    if (playerInput.last_name === "") {
        let teamMatchesNodeList = document.querySelectorAll(`.${playerInput.team}`);
        teamMatchesNodeList.forEach((player) => {
            lastName = player.getAttribute('id').slice(4);
            playerObject.last_name = lastName;
            playerObject.team = playerInput.team;
            playerObject.first_name = player.cells[0].innerText;
            playerObject.team_full_name = player.cells[3].innerText;
            playerObject.team_abbrev = player.cells[4].innerText;
            playerObject.conf = player.cells[5].innerText;
            playerObject.div = player.cells[6].innerText;
            console.log(teamMatchesNodeList);
            console.log(playerObject);
        })
    }
    else {
        teamMatchesNodeList = document.querySelectorAll(`.${playerInput.team}`)
        teamMatchesNodeList.forEach((player) => {
            if (player.getAttribute('id').slice(4) === playerInput.last_name.toLowerCase()) {
                lastName = player.getAttribute('id').slice(4);
                playerObject.last_name = lastName;
                playerObject.team = playerInput.team;
                playerObject.first_name = player.cells[0].innerText;
                playerObject.team_full_name = player.cells[3].innerText;
                playerObject.team_abbrev = player.cells[4].innerText;
                playerObject.conf = player.cells[5].innerText;
                playerObject.div = player.cells[6].innerText;
            }
        })
    }
    console.log(playerObject);
    return playerObject;
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
