import { Button, Card } from "react-bootstrap"

const TickerCard = function(props){
    const {tickerName, tickerOpen, tickerHigh, tickerLow, tickerClose, tickerVolume, removeTicker} = props
    
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{tickerName}</Card.Title>
                <Card.Text>Open: {tickerOpen}</Card.Text>
                <Card.Text>High: {tickerHigh}</Card.Text>
                <Card.Text>Low: {tickerLow}</Card.Text>
                <Card.Text>Close: {tickerClose}</Card.Text>
                <Card.Text>Volume: {tickerVolume}</Card.Text>
                {/* <Button variant="outline-secondary" size="sm" onClick={() => {localStorage.removeItem('localTickers')}}>remove</Button> */}
                <Button variant="outline-secondary" size="sm" onClick={removeTicker}>remove</Button>
            </Card.Body>
        </Card>

// <Card style={{ width: '18rem' }}>
// <Card.Body>
//     <Card.Title>{movieName}</Card.Title>
//     <Card.Text>Length in minutes: {movieLength}</Card.Text>
//     <Card.Img variant="top" src={moviePoster}/>
    
//     <Button variant="outline-secondary" size="sm" onClick={removeTicker}>remove</Button>
// </Card.Body>
// </Card>
    )
}

export default TickerCard