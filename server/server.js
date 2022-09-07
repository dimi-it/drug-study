"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const dao = require('./dao');
const path = require('path');

const app = new express();
const port = 3001;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

app.get('/api/drugs', async (req, res) => {
    try {
        const result = await dao.getDrugs();
        if (result.error) {
            res.status(404).json(result);
        }
        else {
            res.json(result);
        }
    }
    catch (err) {
        console.log(err);
        res.json(err);
    }
})

app.get('/api/drugs/name/:name', async (req, res) => {
    try {
        const result = await dao.getDrugByName(req.params.name);
        if (result.error) {
            res.status(404).json(result);
        }
        else {
            res.json(result);
        }
    }
    catch (err) {
        console.log(err);
        res.json(err);
    }
})

app.get('/api/drugs/name/:name/image.png', (req, res) => {
    const options = {
        root: path.join(__dirname)
    };
    res.sendFile("images/" + req.params.name + ".png", options, (err) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
    });
})

//get random drug
app.get('/api/drugs/game/:game', async (req, res) => {
    try {
        const round = await dao.getRoundForGame(req.params.game);
        if (round.error) {
            res.status(404).json(result);
        }
        const drugs = await dao.getListIdDrugsToPlay(req.params.game, round);
        if (drugs.error) {
            res.status(404).json(result);
        }
        const i = getRandomInt(drugs.length)
        res.json(drugs[i]);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

app.get('/api', (req, res) => {
    res.send("Hello world!");
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});