import React from 'react';
import axios from 'axios';
import { Button, Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Redirect } from 'react-router-dom';

import TickerEmptyCard from './TickerEmptyCard';
import './TickerCard.css';

class TickerCard extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        last: '',
        open: '', 
        close: '', 
        high: '', 
        low: '', 
        volume: '',
        isLoaded: false
      };
    }
    handleClick = (symbol) => {
        console.log('handleClick', symbol);
        // return <Redirect push to="/" />
        window.location = "/#/watchlist/" + symbol;
    };
    calcChange = (last, close) => {
        return (last/close*100 -100).toFixed(2);
    };
    render(){
        if(!this.state.isLoaded){
            return <TickerEmptyCard/>
        };
        let chng = this.calcChange(this.state.last, this.state.close);
        const tickerCardInfo = <Col xs={12} lg={3}>
            <Card style={{ width: '18rem', marginTop: '15px' }}>
            <Card.Header as="h6" onClick={() => this.handleClick(this.props.tickerSymbol)}>
                {this.props.tickerSymbol}
                <p></p>
                <Card.Text style={{ fontSize: '16px' }}>{this.props.tickerName}</Card.Text>
                <Card.Header as="h4">{this.state.last}
                    <span style={{ paddingLeft: '3rem', fontSize: '16px' }}>{chng}%</span></Card.Header>
                </Card.Header>
                <Card.Body onClick={() => this.handleClick(this.props.tickerSymbol)} className="card-body">
                <Card.Text>Open<span style={{ paddingLeft: '4.55rem' }}>{this.state.open}</span></Card.Text>
                <Card.Text>Previous Close<span style={{ paddingLeft: '1.085rem' }}>{this.state.close}</span></Card.Text>
                <Card.Text>Day Range<span style={{ paddingLeft: '2.65rem' }}>{this.state.low} - {this.state.high}</span></Card.Text>
                <Card.Text>Volume<span style={{ paddingLeft: '4rem' }}>{this.state.volume}</span></Card.Text>
                </Card.Body>
                {/* <Button variant="outline-secondary" size="sm" onClick={() => {localStorage.removeItem('localTickers')}}>remove</Button> */}
                <Button variant="outline-secondary" size="sm" onClick={this.props.removeTicker}>remove</Button>
            
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
    componentDidMount(){
        axios.get(`http://api.marketstack.com/v1/intraday/latest?access_key=43d9fceee09a8d4b8113b69f9214c110&symbols=${this.props.tickerSymbol}&interval=1min`)
            .then((res) => {
                const open = res.data.data.map( (item) => {
                    return item.open;
                })
                const close = res.data.data.map( (item) => {
                    return item.close;
                })
                const high = res.data.data.map( (item) => {
                    return (item.high).toFixed(2);
                })
                const low = res.data.data.map( (item) => {
                    return item.low;
                })
                const volume = res.data.data.map( (item) => {
                    return item.volume;
                })
                const last = res.data.data.map( (item) => {
                    return item.last;
                })

                this.setState({
					last: last,
                    open: open, 
                    close: close, 
                    high: high, 
                    low: low, 
                    volume: volume,
                    isLoaded: true
                });
            });
      }
}

export default TickerCard;