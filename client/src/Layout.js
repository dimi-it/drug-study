import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { useNavigate} from "react-router-dom";

function Layout(props) {
    const navigate = useNavigate();

    return(
        <Container>
            <Row className='mt-3'>
                <h1 className='text-center'>DRUGS CARD GAME</h1>
            </Row>
            <Row className='mb-3'>
                <Button className='mt-1' onClick={() => navigate("/")}>Home</Button>
                <Button className='mt-1' onClick={() => navigate("/list")}>Card list</Button>
                <Button className='mt-1' onClick={() => navigate("/game")}>Play</Button>
                <Button className='mt-1' onClick={() => navigate("/results")}>Results</Button>
            </Row>
            <Row>
                <Col className='text-center'>
                    <Outlet/>              
                </Col>
            </Row>
        </Container>
    )
}

function ErrorMessage(props){
    return (
        <>
            {props.errMsg ? 
                <Alert variant='danger' className='mt-3'>{props.errMsg}</Alert> :
                false
            }
        </>
    )
}

export default Layout;