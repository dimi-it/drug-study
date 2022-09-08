import { Button, Row } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";
import Card from './Card';

function Game(props) {
    return (
        <Routes>
            <Route path='' element={<GamePage />} />
            <Route path='name' element={<Card game="name" />} />
            <Route path='struct' element={<Card game="struct" />} />
        </Routes>
    )
}

function GamePage(props) {
    const navigate = useNavigate();

    return (
        <>
            <h2>You want to play the results by:</h2>
            <Row>
                <Button className='m-2' variant="info" onClick={() => navigate("name")}>Name</Button>
                <Button className='m-2' variant="info" onClick={() => navigate("struct")}>Struct</Button>
            </Row>
        </>
    )
}

export default Game;