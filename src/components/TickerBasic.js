import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Redirect } from 'react-router-dom';

class TickerBasic extends React.Component{
    constructor(props){
      super(props);
      
    }
    render(){
        const tickerCardInfo = <Col xs={12} lg={3}>
            <Card style={{ width: '18rem' }}>
            <Card.Header as="h6">
                {this.props.tickerSymbol}
                <p></p>
                <Card.Text >{this.props.tickerName}</Card.Text>
                <Card.Header as="h4">{this.props.tickerLast}</Card.Header>
                </Card.Header>
                <Card.Body onClick={() => this.handleClick(this.props.tickerSymbol)}>
                <Card.Text>Open: {this.props.tickerOpen}</Card.Text>
                <Card.Text>Previous Close: {this.props.tickerClose}</Card.Text>
                <Card.Text>Day Range: {this.props.tickerLow} - {this.props.tickerHigh}</Card.Text>
                <Card.Text>Volume: {this.props.tickerVolume}</Card.Text>
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