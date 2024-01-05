//Initial Open API GET Request to populate table on page load
function populateTable() {
    for (let i = 0; i < 5; i+=2) {
        fetch(`https://www.balldontlie.io/api/v1/players?per_page=100&page=${i}`)
        .then((res) => res.json())
        .then((playerDataObject) => {
            let playerData = playerDataObject.data; //grab relevant data from response
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
                sendNameToInput(e.target.innerText)
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
    const playerArray = searchAPIData(userPlayerInput);
    displayPlayerInfo(playerArray);
    })

//populates player last name to input field
function sendNameToInput(name) {
    lastNameInput.setAttribute('value', name);
    lastNameInput.innerText = name;
}

//searches API Data for match & returns match
function searchAPIData(playerInput) {
    let lastName;
    let playerMatches = [];
    console.log(playerInput)
    if (playerInput.last_name === "") {
        let teamMatchesNodeList = document.querySelectorAll(`.${playerInput.team}`);
        teamMatchesNodeList.forEach((player) => {
            let playerObject = {};
            lastName = player.getAttribute('id').slice(4);
            console.log(lastName);
            playerObject.last_name = lastName;
            playerObject.team = playerInput.team;
            playerObject.first_name = player.cells[0].innerText;
            playerObject.team_full_name = player.cells[3].innerText;
            playerObject.team_abbrev = player.cells[4].innerText;
            playerObject.conf = player.cells[5].innerText;
            playerObject.div = player.cells[6].innerText;
            playerMatches.push(playerObject);
        })
    }
    else {
        teamMatchesNodeList = document.querySelectorAll(`.${playerInput.team}`)
        teamMatchesNodeList.forEach((player) => {
            if (player.getAttribute('id').slice(4) === playerInput.last_name.toLowerCase()) {
                let playerObject = {};
                lastName = player.getAttribute('id').slice(4);
                playerObject.last_name = lastName;
                playerObject.team = playerInput.team;
                playerObject.first_name = player.cells[0].innerText;
                playerObject.team_full_name = player.cells[3].innerText;
                playerObject.team_abbrev = player.cells[4].innerText;
                playerObject.conf = player.cells[5].innerText;
                playerObject.div = player.cells[6].innerText;
                playerMatches.push(playerObject);
            }
        })
        console.log(lastName);
    }
    console.log(playerMatches)
    return playerMatches;
}

//Called by submit event, passed return value of searchAPI
function displayPlayerInfo(playerArray) {
    playerArray.forEach((playerObject) => {
        const playerInfoHolder = document.getElementById('player-container')
        const displayPlayerName = document.createElement('a');
        const displayPlayerFullTeamName = document.createElement('li');
        const displayPlayerTeamAbbrev = document.createElement('li');
        const displayPlayerConference = document.createElement('li');
        const displayPlayerDivision = document.createElement('li');
        let capitalFirstLetter;
        let lastName = playerObject.last_name;
        let team = playerObject.team;
        const lastNameMinusFirstLetter = lastName.slice(1);
        const teamMinusFirstLetter = team.slice(1);
        capitalFirstLetter = lastName.charAt(0).toUpperCase();
        lastName = capitalFirstLetter + lastNameMinusFirstLetter;
        capitalFirstLetter = team.charAt(0).toUpperCase();
        team = capitalFirstLetter + teamMinusFirstLetter;
        displayPlayerName.setAttribute('href', `http://www.google.com/search?q=${playerObject.first_name}+${lastName}+basketball`);
        displayPlayerName.setAttribute('title', 'Click to search additional player info');
        displayPlayerName.innerText = playerObject.first_name + " " + lastName;
        playerInfoHolder.appendChild(displayPlayerName);
        displayPlayerFullTeamName.innerText = `Team: ${team}`;
        playerInfoHolder.appendChild(displayPlayerFullTeamName);
        displayPlayerTeamAbbrev.innerText = `Abbreviation: ${playerObject.team_abbrev}`;
        playerInfoHolder.appendChild(displayPlayerTeamAbbrev);
        displayPlayerConference.innerText = `Conference: ${playerObject.conf}`;
        playerInfoHolder.appendChild(displayPlayerConference);
        displayPlayerDivision.innerText = `Division: ${playerObject.div}`;
        playerInfoHolder.appendChild(displayPlayerDivision);
    })
}
//clear displayed data
const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', () => {
    document.location.reload();
});