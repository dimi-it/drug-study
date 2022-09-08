import { Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function Home(props) {
    const navigate = useNavigate();

    return (
        <>
            <Container>
                <h2>Welcome to the drugs card game:</h2>
                <h3>Good fun!!!! 😁</h3>
                <Button onClick={() => navigate('/game/')}>Play</Button>
            </Container>
        </>
    );
}

export default Home;