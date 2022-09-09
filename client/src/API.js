const APIURL = new URL('http://localhost:3001/api/');

async function getDrugs() {
    return new Promise((resolve, reject) => {
        fetch(new URL(`drugs/`, APIURL), {
            method: 'GET'
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {
                response.json()
                    .then((obj) => { reject(obj); })
                    .catch(() => { reject({ error: "Cannot parse server response." }) });
            }
        }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
    });
}

async function getDrugByName(name) {
    return new Promise((resolve, reject) => {
        fetch(new URL(`drugs/name/${name}/`, APIURL), {
            method: 'GET'
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {
                response.json()
                    .then((obj) => { reject(obj); })
                    .catch(() => { reject({ error: "Cannot parse server response." }) });
            }
        }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
    });
}

async function getDrugById(id) {
    return new Promise((resolve, reject) => {
        fetch(new URL(`drugs/id/${id}/`, APIURL), {
            method: 'GET'
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {
                response.json()
                    .then((obj) => { reject(obj); })
                    .catch(() => { reject({ error: "Cannot parse server response." }) });
            }
        }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
    });
}

async function getDrugCount() {
    return new Promise((resolve, reject) => {
        fetch(new URL(`drugs/count/`, APIURL), {
            method: 'GET'
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {
                response.json()
                    .then((obj) => { reject(obj); })
                    .catch(() => { reject({ error: "Cannot parse server response." }) });
            }
        }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
    });
}

async function getDrugToPlay(game) {
    return new Promise((resolve, reject) => {
        fetch(new URL(`drugs/game/${game}/`, APIURL), {
            method: 'GET'
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {
                response.json()
                    .then((obj) => { reject(obj); })
                    .catch(() => { reject({ error: "Cannot parse server response." }) });
            }
        }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
    });
}

async function getResultsByGame(game) {
    return new Promise((resolve, reject) => {
        fetch(new URL(`drugs/results/${game}/`, APIURL), {
            method: 'GET'
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {
                response.json()
                    .then((obj) => { reject(obj); })
                    .catch(() => { reject({ error: "Cannot parse server response." }) });
            }
        }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
    });
}

async function getResultsByGameAndRound(game, round) {
    return new Promise((resolve, reject) => {
        fetch(new URL(`drugs/results/${game}/${round}`, APIURL), {
            method: 'GET'
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {
                response.json()
                    .then((obj) => { reject(obj); })
                    .catch(() => { reject({ error: "Cannot parse server response." }) });
            }
        }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
    });
}

async function getRoundForGame(game) {
    return new Promise((resolve, reject) => {
        fetch(new URL(`drugs/round/${game}`, APIURL), {
            method: 'GET'
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {
                response.json()
                    .then((obj) => { reject(obj); })
                    .catch(() => { reject({ error: "Cannot parse server response." }) });
            }
        }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
    });
}

async function setResultForGame(game, drug, failed) {
    return new Promise((resolve, reject) => {
        fetch(new URL(`drugs/game/${game}/`, APIURL), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ drug: drug, failed: failed })
        }).then((response) => {
            if (response.ok) {
                resolve({a:"aa"});
            } else {
                response.json()
                    .then((obj) => { reject(obj); })
                    .catch(() => { reject({ error: "Cannot parse server response." }) });
            }
        }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
    });
}

function getImageUrl(name) {
    return new URL(`drugs/name/${name}/image.png`, APIURL);
}

const API = { getDrugs, getDrugByName, getDrugById, getDrugCount, getDrugToPlay, getResultsByGame, getResultsByGameAndRound, getRoundForGame, getImageUrl, setResultForGame }
export default API