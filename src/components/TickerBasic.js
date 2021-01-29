import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Redirect } from 'react-router-dom';
import './TickerCard.css';

class TickerBasic extends React.Component{
    constructor(props){
      super(props);
      
    }
    calcChange = (last, close) => {
        return (last/close*100 -100).toFixed(2);
    };
    render(){
        let chng = this.calcChange(this.props.tickerClose, this.props.tickerOpen);
        const tickerCardInfo = <Col xs={12} lg={3}>
            <Card style={{ width: '26rem' }}>
            <Card.Header as="h5">
                {this.props.tickerSymbol}
                <p></p>
                <Card.Text style={{ fontSize: '16px' }}>{this.props.tickerName}</Card.Text>
                <Card.Header as="h4">{this.props.tickerClose}
                    <span style={{ paddingLeft: '3rem', fontSize: '16px' }}>{chng}%</span></Card.Header>
                </Card.Header>
                <Card.Body className="card-body">
                <Card.Text>Open<span style={{ paddingLeft: '5.5rem' }}>{this.props.tickerOpen}</span></Card.Text>
                <Card.Text>Close<span style={{ paddingLeft: '5.5rem' }}>{this.props.tickerClose}</span></Card.Text>
                <Card.Text>Day Range<span style={{ paddingLeft: '3.5rem' }}>{this.props.tickerLow} - {this.props.tickerHigh}</span></Card.Text>
                <Card.Text>Volume<span style={{ paddingLeft: '4.7rem' }}>{this.props.tickerVolume}</span></Card.Text>
                </Card.Body>
        </Card>
        </Col>

        return ( 
        <div>
            <div className="tickerInfo">
                {tickerCardInfo}
          </div>
          
        </div>
        )
    }
    
}

export default TickerBasic;