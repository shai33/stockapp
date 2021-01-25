import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

class MarketsComp extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          result: ''
      };
    }
    render(){
        const exchangeCardInfo = [];
        const indexCardInfo = [];
        console.log('foooo', this.props.exchanges);
        console.log('foooo1', this.props.index.length);
        for(let i=0; i<this.props.exchanges.length; i++) {
            const cardContent = <Col xs={6} lg={3}>
            <Card style={{ width: '18rem' }}>
               <Card.Body>
                  <Card.Title>{this.props.exchanges[i]}</Card.Title>
                  <Card.Text>{this.props.index[i]}</Card.Text>
                  <Button variant="outline-secondary" size="sm"></Button>
               </Card.Body>
               </Card>
               </Col>
             exchangeCardInfo.push(cardContent);
         }

        return ( 
        <div>
            <div className="gallery">
            <Row>
                {exchangeCardInfo}

            </Row>
          </div>
        </div>
        )
    }
}

export default MarketsComp;