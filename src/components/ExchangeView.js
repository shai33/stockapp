import React from 'react';
import axios from 'axios';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {withRouter} from 'react-router';
import {Line} from 'react-chartjs-2';
import { getCurrentDate, calcDayHours, calcWeekDays, calcMonthDays, calcYearDays } from "../utils/handleTime"

class ExchangeComp extends React.Component{
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
          country: '',
          open: '', 
          close: '', 
          high: '', 
          low: '', 
          volume: '',
          last: '',
          chartData: ''
      };
    };
    calcChange = (last, close) => {
        return (last/close*100 -100).toFixed(2);
    };
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
        let chng = this.calcChange(this.state.close, this.state.open);
        const exchangeCardInfo = <Col xs={12} lg={12}>
        <Card border="dark">
            <Card.Header as="h4">{this.state.symbol}
                <p></p>
                <Card.Header as="h4">{this.state.close}
                <span style={{ paddingLeft: '1.5rem', fontSize: '14px' }}>{chng}%</span>
                </Card.Header>
            </Card.Header>
            <Card.Body>
            {this.state.chartData && <Line data={this.state.chartData} />}
                <div className="chart-btns">
                    <Button variant="outline-secondary" size="sm" onClick={() => this.weekChart()}>WEEK</Button>
                    <Button variant="outline-secondary" size="sm" onClick={() => this.monthChart()}>MONTH</Button>
                    <Button variant="outline-secondary" size="sm" onClick={() => this.yearChart()}>YEAR</Button>
                </div>
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
                        <td>Close</td>
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
    weekChart = () => {
        axios.get(`http://api.marketstack.com/v1/tickers/${this.state.symbol}/eod?access_key=43d9fceee09a8d4b8113b69f9214c110&limit=7`)
            .then( (res) => {
                const last = res.data.data.eod.map( (item) => {
                    return item.close;
                })
                console.log('lastWeek', last)
                this.setState({
                    last: last,
                    chartData: {
                        labels: [calcWeekDays(-7), calcWeekDays(-6), calcWeekDays(-5), calcWeekDays(-4), 
                                  calcWeekDays(-3), calcWeekDays(-2), calcWeekDays(-1)],
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
    monthChart = () => {
        axios.get(`http://api.marketstack.com/v1/tickers/${this.state.symbol}/eod?access_key=43d9fceee09a8d4b8113b69f9214c110&limit=30`)
            .then( (res) => {
                const last = res.data.data.eod.map( (item) => {
                    return item.close;
                })
                console.log('lastMonth', last)
                this.setState({
                    last: last,
                    chartData: {
                        labels: [calcMonthDays(-27), calcMonthDays(-22), calcMonthDays(-17), calcMonthDays(-12), 
                                  calcMonthDays(-7), calcMonthDays(-2), calcMonthDays(5)],
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
    yearChart = () => {
        axios.get(`http://api.marketstack.com/v1/tickers/${this.state.symbol}/eod?access_key=43d9fceee09a8d4b8113b69f9214c110&limit=365`)
            .then( (res) => {
                const last = res.data.data.eod.map( (item) => {
                    return item.close;
                })
                console.log('lastMonth', last)
                this.setState({
                    last: last,
                    chartData: {
                        labels: [calcYearDays(-12, 0), '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', calcYearDays(-10, 10), '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',  
                                calcYearDays(-8, 10), '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', calcYearDays(-6, 10), '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',  
                                  calcYearDays(-4, 10), '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', calcYearDays(-2, 10), '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 
                                  calcYearDays(0, 29), '', '', '', '', '', '', '', '', '', ''],
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
    }
}

export default withRouter(ExchangeComp);