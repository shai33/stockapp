import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

class HomeComp extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          result: ''
      };
    }
    render(){
        const newsCardInfo = [];
        console.log('foooo', this.props.sources);
        console.log('foooo1', this.props.titles.length);
        for(let i=0; i<this.props.sources.length; i++) {
            const cardContent = <Col xs={12} lg={12}>
            <Card bg="secondary" text="white" style={{ width: '40rem',  margin: '3px' }}>
               <Card.Header as="h6">{this.props.titles[i]}</Card.Header>
               <Card.Body>
                  {/* <Card.Title>{this.props.exchanges[i]}</Card.Title> */}
                  <Card.Text>{this.props.sources[i]}</Card.Text>
                  <Card.Text>{this.props.contents[i]}</Card.Text>
                  <Card.Text>{this.props.urls[i]}</Card.Text>
               </Card.Body>
               </Card>
               </Col>
             newsCardInfo.push(cardContent);
         }

        return ( 
        <div>
            <div className="gallery">
            <Row style={{ margin: '2px' }}>
                {newsCardInfo}

            </Row>
          </div>
          
        </div>
        )
    }
}

export default HomeComp;