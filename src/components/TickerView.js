import React from 'react';
import axios from 'axios';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {withRouter} from 'react-router';
import {Line} from 'react-chartjs-2';

class TickerComp extends React.Component{
    constructor(props){
      super(props);
      this.datasets = {
        label: '',
        fill: true,
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
        pointHitRadius: 10
      }
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
          last: '',
          chartData: ''
      };
    };
    getCurrentDate = (offset) => {
        let date = new Date();
        let previousDay = new Date(date.setDate(date.getDate() + offset));

        return previousDay.toISOString().slice(0,10);
    };
    calcDayHours = (offset, minutes) => {
        let date = new Date();
        let previousHour = new Date(date.setHours(date.getHours() + offset, minutes));
        
        return previousHour.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    };
    calcWeekDays = (offset) => {
        let date = new Date();
        let previousDay = new Date(date.setDate(date.getDate() + offset));
        
        return previousDay.toLocaleString('en-US', { day: 'numeric' })
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
                {this.state.chartData && <Line data={this.state.chartData} />}
                <div className="chart-btns">
                    <Button variant="outline-secondary" size="sm" onClick={() => this.dayChart()}>DAY</Button>
                    <Button variant="outline-secondary" size="sm" onClick={() => this.weekChart()}>WEEK</Button>
                    <Button variant="outline-secondary" size="sm" >MONTH</Button>
                    <Button variant="outline-secondary" size="sm" >YEAR</Button>
                </div>
                
                <Table striped>
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
        axios.get(`http://api.marketstack.com/v1/intraday/${this.getCurrentDate(0)}?access_key=43d9fceee09a8d4b8113b69f9214c110&symbols=${this.state.symbol}&interval=15min`)
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
                console.log('last', last)
                this.setState({
                    last1: last1,
                    last: last,
                    open: open, 
                    close: close, 
                    high: high, 
                    low: low, 
                    volume: volume,
                    chartData: {
                        labels: [this.calcDayHours(-8, 0), this.calcDayHours(-7, 0), this.calcDayHours(-6, 0), this.calcDayHours(-5, 0), this.calcDayHours(-4, 0), 
                            this.calcDayHours(-3, 0), this.calcDayHours(-2, 0), this.calcDayHours(-1, 0), this.calcDayHours(0, 0)],
                        datasets: [
                          {
                            ...this.datasets,
                            data: last.reverse()
                          }
                        ]
                      }
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
      };
      dayChart = () => {
        axios.get(`http://api.marketstack.com/v1/intraday/${this.getCurrentDate(0)}?access_key=43d9fceee09a8d4b8113b69f9214c110&symbols=${this.state.symbol}&interval=30min`)
            .then( (res) => {
                const last = res.data.data.map( (item) => {
                    return item.last;
                })
                console.log('lastDay', last)
                this.setState({
                    last: last,
                    chartData: {
                        labels: [this.calcDayHours(-8, 0), this.calcDayHours(-7, -30),  this.calcDayHours(-7, 0), this.calcDayHours(-6, -30), this.calcDayHours(-6, 0), 
                          this.calcDayHours(-5, -30), this.calcDayHours(-5, 0), this.calcDayHours(-4, -30), this.calcDayHours(-4, 0), 
                            this.calcDayHours(-3, -30), this.calcDayHours(-3, 0), this.calcDayHours(-2, -30), this.calcDayHours(-2, 0), 
                            this.calcDayHours(-1, -30), this.calcDayHours(-1, 0), this.calcDayHours(0, -30), this.calcDayHours(0, 0)],
                        datasets: [
                          {
                            ...this.datasets,
                            data: last.reverse()
                          }
                        ]
                      }
                });
        })
        .catch(err => {
            // Handle Error Here
            console.error(err);
        });
      };
      weekChart = () => {
        axios.get(`http://api.marketstack.com/v1/intraday?access_key=43d9fceee09a8d4b8113b69f9214c110&symbols=${this.state.symbol}&date_from=${this.getCurrentDate(-7)}&date_to=${this.getCurrentDate(0)}&interval=3hour`)
            .then( (res) => {
                const last = res.data.data.map( (item) => {
                    return item.last;
                })
                console.log('lastDay', last)
                this.setState({
                    last: last,
                    chartData: {
                        labels: [this.calcWeekDays(-7), this.calcWeekDays(-6), this.calcWeekDays(-5), this.calcWeekDays(-4), 
                                  this.calcWeekDays(-3), this.calcWeekDays(-2), this.calcWeekDays(-1)],
                        datasets: [
                          {
                            ...this.datasets,
                            data: last.reverse()
                          }
                        ]
                      }
                });
        })
        .catch(err => {
            // Handle Error Here
            console.error(err);
        });
      };
}

export default withRouter(TickerComp);
/*
const calcDayHours = (offset) => {
    let date = new Date();
    let previousHour = new Date(date.setHours(date.getHours() + offset));
    let time = new Date();
    
    return previousHour.toLocaleString('en-US', { hour: 'numeric', hour12: true })
};
// console.log('last', this.last)
const data = {
    labels: [calcDayHours(0), calcDayHours(1), calcDayHours(2), calcDayHours(3), calcDayHours(4), 
        calcDayHours(5), calcDayHours(6), calcDayHours(7), calcDayHours(8)],
    datasets: [
      {
        label: '',
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
  */