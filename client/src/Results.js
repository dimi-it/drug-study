import { useEffect, useState } from "react";
import { Button, Form, FormGroup, FormLabel, Row, Table } from "react-bootstrap"
import { Route, Routes, useNavigate } from "react-router-dom"
import API from "./API";

function Results(props) {
    return (
        <Routes>
            <Route path="" element={<ResultsMainPage />} />
            <Route path="game/" element={<ResultsByGame />} />
            <Route path="round/" element={<ResultsByGameAndRound />} />
        </Routes>
    )
}

function ResultsMainPage(props) {
    const navigate = useNavigate();
    return (
        <>
            <h2>You want to see the results by:</h2>
            <Row>
                <Button className='m-2' variant="info" onClick={() => navigate("game/")}>Game</Button>
                <Button className='m-2' variant="info" onClick={() => navigate("round/")}>Round</Button>
            </Row>
        </>
    )
}

function ResultsByGame(props) {
    const [game, setGame] = useState("");
    const [results, setResults] = useState(null);

    useEffect(() => {
        const handleChange = async () => {
            if (game) {
                const result = await API.getResultsByGame(game);
                setResults(result);
            }
        };
        handleChange();
    }, [game])

    return (
        <>
            <h2 className='mb-3'>Results by game</h2>
            <Form>
                <Form.Group>
                    <FormLabel><h4>Game:</h4></FormLabel>
                    <Form.Control className='mb-3' as="select" onChange={e => setGame(e.target.value)}>
                        <option disabled={game}>Choose a game</option>
                        <option key="1" value="name">Name game</option>
                        <option key="2" value="struct">Struct game</option>
                    </Form.Control>
                </Form.Group>
            </Form>
            <ResultsTableByGame results={results} />
        </>
    )
}

//results
function ResultsTableByGame(props) {
    return (
        <Table>
            <thead>
                <tr>
                    <td className="h5">Name</td>
                    <td className="h5">Category</td>
                    <td className="h5">Success %</td>
                </tr>
            </thead>
            <tbody>
                {
                    props.results ?
                        props.results.map(r => <ResultsTableByGameRow key={r.id} result={r} />) :
                        false
                }
            </tbody>
        </Table>
    )
}

//result
function ResultsTableByGameRow(props) {
    const val = (props.result.played - props.result.failed) / props.result.played * 100;
    return (
        <tr className={val >= 50 ? val == 100 ? 'table-success' : '' : 'table-danger'}>
            <td>{props.result.name}</td>
            <td>{props.result.category}</td>
            <td>{val}</td>
        </tr>
    )
}

function ResultsByGameAndRound(props) {
    const [game, setGame] = useState("");
    const [round, setRound] = useState(0);
    const [roundOptRows, setRoundOptRows] = useState();
    const [drugsCount, setDrugsCount] = useState();
    const [results, setResults] = useState(null);

    useEffect(() => {
        const handleDrugsCount = async () => {
            const result = await API.getDrugCount();
            setDrugsCount(result.count);
        }
        handleDrugsCount();
    }, [])

    useEffect(() => {
        const handleGameChange = async () => {
            if (game) {
                const r = await API.getRoundForGame(game);
                const rows = [];
                for (let i = 0; i < r + 1; i++) {
                    rows.push(<option key={i} value={i + 1}>{i + 1}</option>)
                }
                setRoundOptRows(rows);
                setRound(0);
                setResults(null);
            }
        };
        handleGameChange();
    }, [game]);

    useEffect(() => {
        const handleRoundChange = async () => {
            if (round) {
                const result = await API.getResultsByGameAndRound(game, round - 1);
                setResults(result);
            }
        }
        handleRoundChange();
    }, [round])

    return (
        <>
            <h2 className='mb-3'>Results by game and round</h2>
            <Form>
                <Form.Group>
                    <FormLabel><h4>Game:</h4></FormLabel>
                    <Form.Control className='mb-3' as="select" onChange={e => setGame(e.target.value)}>
                        <option disabled={game}>Choose a game</option>
                        <option key="1" value="name">Name game</option>
                        <option key="2" value="struct">Struct game</option>
                    </Form.Control>
                    <FormLabel><h4>Round:</h4></FormLabel>
                    <Form.Control className='mb-3' as="select" disabled={!game} value={round} onChange={e => setRound(e.target.value)}>
                        <option disabled={round}>Choose a round</option>
                        {roundOptRows}
                    </Form.Control>
                </Form.Group>
            </Form>
            {results ?
                <RoundCompletion count={results.length} drugsCount={drugsCount} /> :
                false
            }
            <ResultsTableByGameAndRound results={results} />
        </>
    )
}

//results.length, drugsCount
function RoundCompletion(props) {
    return (
        <h4 className='mb-3'>
            Completion of the round: {props.count} / {props.drugsCount}
        </h4>
    )
}

//results
function ResultsTableByGameAndRound(props) {
    return (
        <Table hover>
            <thead>
                <tr>
                    <td className="h5">Name</td>
                    <td className="h5">Category</td>
                </tr>
            </thead>
            <tbody>
                {
                    props.results ?
                        props.results.map(r => <ResultsTableByGameAndRoundRow key={r.id} result={r} />) :
                        false
                }
            </tbody>
        </Table>
    )
}

//result
function ResultsTableByGameAndRoundRow(props) {
    const [showDetails, setShowDetails] = useState(false);

    const handleClick = () => {
        setShowDetails(d => !d);
    }

    return (
        <tr onClick={handleClick} className={props.result.failed ? 'table-danger' : 'table-success'}>
            <td>
                {props.result.name}             
                {showDetails ? <ImageDetails name={props.result.name}/>: false}          
            </td>
            <td>{props.result.category}</td>
        </tr>
    )
}

//name
function ImageDetails(props){
    return(
        <>
            <br/>
            <img src={API.getImageUrl(props.name)} alt={props.name} />
        </>
    )
}

export default Results;
