import API from './API';
import { useEffect, useState } from "react"
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate, Route, Routes } from "react-router-dom";




//props.game
function Card(props) {
    const [drug, setDrug] = useState(null);
    const [end, setEnd] = useState(false);
    const [update, setUpdate] = useState(false);
    const [endRound, setEndRound] = useState(false);
    const [round, setRound] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const getDrugForGame = async () => {
            try {
                const result = await API.getDrugToPlay(props.game);
                if (result.end) {
                    setEndRound(true);
                    setRound(result.oldRound);
                }
                else {
                    setDrug(result);
                    if (endRound) {
                        setEndRound(false);
                    }
                }
            } catch (err) {
                props.setErrMsg(err.error);
            }
        }
        getDrugForGame();
    }, [update]);

    const handleUpdate = () => {
        setUpdate(u => !u);
    };

    const sendResult = async (failed) => {
        try {
            await API.setResultForGame(props.game, drug, !failed);
            setEnd(false);
            handleUpdate();
        } catch (err) {
            props.setErrMsg(err.error);
        }
    }

    return (
        <>
            {drug !== null && end === false && endRound === false ? <CardPlay game={props.game} name={drug.name} setEnd={setEnd} /> : false}
            {end === true && endRound === false ? <CardEnd drug={drug} sendResult={sendResult} /> : false}
            {endRound === true ? <EndRound round={round} handleUpdate={handleUpdate} /> : false}
            <Row>
                <Button className="m-2" variant="warning" onClick={() => navigate("/")}>Stop playing</Button>
            </Row>
        </>
    )
}

//game, name, end
function CardPlay(props) {
    return (
        <>
            {props.game === "name" ?
                <CardName name={props.name} /> :
                <CardStruct name={props.name} />
            }
            <Row>
                <Button className="m-2" onClick={() => props.setEnd(true)}>Verify</Button>
            </Row>
        </>
    )
}

//drug, sendResult
function CardEnd(props) {
    return (
        <>
            <CardStruct name={props.drug.name} />
            <CardName name={props.drug.name} />
            <h5>{props.drug.secondName}</h5>
            <h4>{props.drug.category}</h4>
            <Row>
                <Button className="m-2" variant="success" onClick={() => props.sendResult(true)}>Correct</Button>
                <Button className="m-2" variant="danger" onClick={() => props.sendResult(false)}>Wrong</Button>
            </Row>
        </>
    )
}

function CardName(props) {
    return (
        <>
            <h1>{props.name}</h1>
        </>
    )
}

function CardStruct(props) {
    return (
        <>
            <img src={API.getImageUrl(props.name)} alt={props.name} />
        </>
    )
}

//round, handleUpdate
function EndRound(props) {
    return (
        <>
            <h1>You have finished the round {props.round + 1}</h1>
            <Row>
                <Button className="m-2" onClick={() => props.handleUpdate()}>Play again!!!</Button>
            </Row>
        </>
    )
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

export default Card;