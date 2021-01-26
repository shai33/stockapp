import React from 'react';
import axios from 'axios';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {withRouter} from 'react-router';
import {Line} from 'react-chartjs-2';

class TickerComp extends React.Component{
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
          volume: '',
          last1: '',
          last: ''
      };
    };
    getCurrentDate = () => {
        return new Date().toISOString().slice(0,10);
    };
    calcChange = (last, close) => {
        return (last/close*100 -100).toFixed(2);
    };
    render(){
        let chng = this.calcChange(this.state.last1, this.state.close);
        const exchangeCardInfo = <Col xs={12} lg={12}>
        <Card>
        <Card.Header as="h6">{this.state.name}
            <p></p>
            <Card.Header as="h4">{this.state.last1}
            <span style={{ paddingLeft: '1.5rem', fontSize: '14px' }}>{chng}%</span>
            </Card.Header>
        </Card.Header>
            <Card.Body>
            <Line data={data} />
                <Table striped>
                    <thead>
                        <tr>
                        <th>DAY</th>
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
        
        axios.get(`http://api.marketstack.com/v1/intraday/${this.getCurrentDate()}?access_key=43d9fceee09a8d4b8113b69f9214c110&symbols=${this.state.symbol}&interval=15min`)
            .then( (res) => {
                const open = res.data.data[0].open;
                const high =res.data.data[0].high;
                const low =res.data.data[0].low;
                const close =res.data.data[0].close;
                const volume =res.data.data[0].volume;
                const last1 = res.data.data[0].last;
                const last = res.data.data.map( (item) => {
                    return item.last;
                })

                this.setState({
                    last1: last1,
                    last: last,
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
              name: res.data.name
            });
        });
      }
}

export default withRouter(TickerComp);

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };