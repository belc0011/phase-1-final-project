
for (let i = 0; i < 30; i++) {
        fetch(`https://www.balldontlie.io/api/v1/players?per_page=100&page=${i}`)
        .then((res) => res.json())
        .then((playerDataObject) => {
            const playerData = playerDataObject.data;
            playerCardMaker(playerData);
            })
        }

function playerCardMaker(playerData) {
    for (let player of playerData) {
        const firstName = player.first_name;
        const lastName = player.last_name;
        const playerID = player.id;
        const playerPosition = player.position;
        const teamObject = player.team;
        const teamAbbrev = teamObject.abbreviation;
        const teamCity = teamObject.city;
        const teamConference = teamObject.conference;
        const teamDivision = teamObject.division;
        const teamFullName = teamObject.full_name;
        const teamName = teamObject.name;
        }
}

const submitButton = document.getElementById('submit-btn');
const dropDown = document.getElementById('team-name');
submitButton.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e);
    const teamSelection = e.value;
    })
const playerDisplay = document.getElementById('display-player');

