import React from 'react';
import axios from 'axios';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {withRouter} from 'react-router';

class ExchangeComp extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          result: '',
          symbol: this.props.match.params.symbol,
          name: '',
          country: '',
          open: '', 
          close: '', 
          high: '', 
          low: '', 
          volume: ''
      };
    }
    render(){
        // const exchangeCardInfo = <Col xs={12} lg={12}>
        // <Card border="dark" className="text-center">
        // <Card.Header as="h4">{this.state.symbol}</Card.Header>
        //     <Card.Body>
        //         <Card.Title>{this.state.name} ({this.state.country})</Card.Title>
        //         <Card.Text>Open: {this.state.open}</Card.Text>
        //         <Card.Text>Previous Close: {this.state.close}</Card.Text>
        //         <Card.Text>Day Range: {this.state.low} - {this.state.high}</Card.Text>
        //         <Card.Text>Volume: {this.state.volume}</Card.Text>
        //     </Card.Body>
        //     </Card>
        // </Col>
        const exchangeCardInfo = <Col xs={12} lg={12}>
        <Card border="dark">
        <Card.Header as="h4">{this.state.symbol}</Card.Header>
            <Card.Body>
                <Table striped>
                    <thead>
                        <tr>
                        <th>{this.state.name}</th>
                        <th>({this.state.country})</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>Open</td>
                        <td>{this.state.open}</td>
                        </tr>
                        <tr>
                        <td>Previous Close</td>
                        <td>{this.state.close}</td>
                        </tr>
                        <tr>
                        <td>Day Range</td>
                        <td>{this.state.low} - {this.state.high}</td>
                        </tr>
                        <tr>
                        <td>Volume</td>
                        <td>{this.state.volume}</td>
                        </tr>
                    </tbody>
                </Table>
            </Card.Body>
            </Card>
        </Col>
        return ( 
        <div>
            <div className="gallery">
            <Container>
                {exchangeCardInfo}

            </Container>
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
        axios.get(`http://api.marketstack.com/v1/tickers/${this.state.symbol}?access_key=43d9fceee09a8d4b8113b69f9214c110`).then( (res) => {
    
          console.log('exchangeName', res.data.name)
          this.setState({
              name: res.data.name,
              country: res.data.country
            });
        });
      }
}

export default withRouter(ExchangeComp);