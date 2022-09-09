import { useEffect, useState } from "react";
import { Button, Form, FormGroup, FormLabel, Row, Table } from "react-bootstrap"
import API from "./API";

function CardList(props) {
    const [drugs, setDrugs] = useState(null);

    useEffect(() => {
        const getDrugs = async () => {
            const result = await API.getDrugs();
            setDrugs(result);
        }
        getDrugs();
    }, []);
    
    return(
        <>
            <h2 className='mb-3'>List of drugs</h2>
            <DrugsTable drugs={drugs}/>
        </>
    )
}

//drugs
function DrugsTable(props) {
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
                    props.drugs ?
                        props.drugs.map(d => <ResultsTableByGameAndRoundRow key={d.id} drug={d} />) :
                        false
                }
            </tbody>
        </Table>
    )
}

//drug
function ResultsTableByGameAndRoundRow(props) {
    const [showDetails, setShowDetails] = useState(false);

    const handleClick = () => {
        setShowDetails(d => !d);
    }

    return (
        <tr onClick={handleClick}>
            <td>
                {props.drug.name}             
                {showDetails ? <ImageDetails name={props.drug.name}/>: false}          
            </td>
            <td>{props.drug.category}</td>
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

export default CardList;