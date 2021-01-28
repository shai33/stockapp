import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Redirect } from 'react-router-dom';

class MarketsComp extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          result: ''
      };
    }
    handleClick = (symbol) => {
        console.log('handleClick', symbol);
        // return <Redirect push to="/" />
        window.location = "/#/market/" + symbol;
    }
    render(){
        const exchangeCardInfo = [];
        const indexCardInfo = [];
        console.log('foooo', this.props.exchanges);
        console.log('foooo1', this.props.index.length);
        for(let i=0; i<this.props.exchanges.length; i++) {
            const cardContent = <Col xs={6} lg={3}>
            <Card bg="secondary" text="white" style={{ width: '18rem',  margin: '3px' }} 
                onClick={() => this.handleClick(this.props.index[i])}>
               <Card.Header as="h5">{this.props.exchanges[i]}</Card.Header>
               <Card.Body>
                  {/* <Card.Title>{this.props.exchanges[i]}</Card.Title> */}
                  <Card.Text>{this.props.index[i]} ({this.props.country[i]})</Card.Text>
               </Card.Body>
               </Card>
               </Col>
             exchangeCardInfo.push(cardContent);
         }

        return ( 
        <div>
            <div className="gallery">
            <Row style={{ margin: '2px' }}>
                {exchangeCardInfo}

            </Row>
          </div>
          
        </div>
        )
    }
    
}

export default MarketsComp;