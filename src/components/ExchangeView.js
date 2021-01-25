import React from 'react';
import axios from 'axios';
import { Button, Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {withRouter} from 'react-router';

class ExchangeComp extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          result: '',
          symbol: this.props.match.params.symbol,
          name: '',
          open: '', 
          close: '', 
          high: '', 
          low: '', 
          volume: ''
      };
    }
    render(){
        const exchangeCardInfo = <Col xs={6} lg={3}>
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{this.state.name}</Card.Title>
                <Card.Text>Symbol: {this.state.symbol}</Card.Text>
                <Card.Text>Open: {this.state.open}</Card.Text>
                <Card.Text>Vlose: {this.state.close}</Card.Text>
                <Card.Text>High: {this.state.high}</Card.Text>
                <Card.Text>Low: {this.state.low}</Card.Text>
                <Card.Text>Volume:{this.state.volume}</Card.Text>
            </Card.Body>
            </Card>
        </Col>
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
    componentDidMount(){
        
        axios.get(`http://api.marketstack.com/v1/eod/latest?access_key=43d9fceee09a8d4b8113b69f9214c110&symbols=${this.state.symbol}`)
            .then( (res) => {

                console.log('marketPage', res.data);
                const open = res.data.data[0].open;
                const high =res.data.data[0].high;
                const low =res.data.data[0].low;
                const close =res.data.data[0].close;
                const volume =res.data.data[0].volume;
                console.log('res.data.open', open);
                this.setState({
                    open: open, 
                    close: close, 
                    high: high, 
                    low: low, 
                    volume: volume
                });
        })
        .catch(err => {
            // Handle Error Here
            console.error(err);
        });
      }
}

export default withRouter(ExchangeComp);