import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Redirect } from 'react-router-dom';
import './HomeView.css';

class MarketsComp extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          result: '',
          card: false,
          sort: ''
      };
    }
    handleClick = (symbol) => {
        console.log('handleClick', symbol);
        // return <Redirect push to="/" />
        window.location = "/#/market/" + symbol;
    };
    filterMarkets = (event) => {
        const inputStr = event.target.value;
        this.setState({
                result: inputStr,
                card: true,
                sort: ''
        });
    };
    getFilter = () => {
        const res = this.state.result;
        return res.toUpperCase(); // ignore upper and lowercase
    };
    render(){
        const exchangeCardInfo = [];
        const filteredMarket =[];
        const indexCardInfo = [];
        console.log('exchanges', this.props.exchanges);
        console.log('index', this.props.index);
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
            //  exchangeCardInfo.push(cardContent);
             
              if((this.props.exchanges[i].toUpperCase().includes(this.getFilter())) ||
                (this.props.index[i].toUpperCase().includes(this.getFilter())) ||
                (this.props.country[i].toUpperCase().includes(this.getFilter()))){
                    filteredMarket.push(cardContent);
                    exchangeCardInfo.push(cardContent);
                }
              else{
                exchangeCardInfo.push(cardContent);
                }
         }

        return ( 
        <div>
            <div className="inputFilter">
                <input onChange={this.filterMarkets} value={this.state.result} 
                    placeholder="Filter by Index Name"/>
            </div>
            <p></p>
            <div className="gallery">
            <Row style={{ margin: '2px' }}>
                {/* {exchangeCardInfo} */}
                {this.state.card ? filteredMarket : exchangeCardInfo}
            </Row>
          </div>
          
        </div>
        )
    }
    
}

export default MarketsComp;