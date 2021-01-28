import React from 'react';
import axios from 'axios';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {withRouter} from 'react-router';
import {Line} from 'react-chartjs-2';
import { getCurrentDate, calcDayHours, calcWeekDays, calcMonthDays, calcYearDays } from "../utils/handleTime"

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
  //   getCurrentDate = (offset) => {
  //       let date = new Date();
  //       let previousDay = new Date(date.setDate(date.getDate() + offset));

  //       return previousDay.toISOString().slice(0,10);
  //   };
  //   calcDayHours = (offsetHrs, offsetMins) => {
  //       let date = new Date();
  //       let previousHour = new Date(date.setHours(date.getHours() + offsetHrs, offsetMins));
        
  //       return previousHour.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  //   };
  //   calcWeekDays = (offset) => {
  //     let date = new Date();
  //     let previousDay = new Date(date.setDate(date.getDate() + offset));
      
  //     return previousDay.toLocaleString('en-US', { month: 'short', day: 'numeric' })
  // };
  //   calcMonthDays = (offsetDays) => {
  //       let date = new Date();
  //       let previousDay = new Date(date.setMonth(date.getMonth(), offsetDays));
        
  //       return previousDay.toLocaleString('en-US', { month: 'short', day: 'numeric' })
  //   };
  //   calcYearDays = (offsetMonth, offsetDays) => {
  //     let date = new Date();
  //     let previousDay = new Date(date.setFullYear(date.getFullYear(), date.getMonth() + offsetMonth, offsetDays));
      
  //     return previousDay.toLocaleString('en-US', { month: 'short', year: 'numeric' })
  // };
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
                    <Button variant="outline-secondary" size="sm" onClick={() => this.monthChart()}>MONTH</Button>
                    <Button variant="outline-secondary" size="sm" onClick={() => this.yearChart()}>YEAR</Button>
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
        axios.get(`http://api.marketstack.com/v1/intraday/${getCurrentDate(0)}?access_key=43d9fceee09a8d4b8113b69f9214c110&symbols=${this.state.symbol}&interval=15min`)
            .then( (res) => {
              console.log('res.data.dataToday', res.data.data)
              if(res.data.data.length === 0){
                axios.get(`http://api.marketstack.com/v1/intraday/${getCurrentDate(-1)}?access_key=43d9fceee09a8d4b8113b69f9214c110&symbols=${this.state.symbol}&interval=15min`)
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
                        labels: [calcDayHours(-8, 0), calcDayHours(-7, 0), calcDayHours(-6, 0), calcDayHours(-5, 0), calcDayHours(-4, 0), 
                            calcDayHours(-3, 0), calcDayHours(-2, 0), calcDayHours(-1, 0), calcDayHours(0, 0)],
                        datasets: [
                          {
                            ...this.datasets,
                            data: last.reverse()
                          }
                        ]
                      }
                    });
                });
              }
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
                        labels: [calcDayHours(-8, 0), calcDayHours(-7, 0), calcDayHours(-6, 0), calcDayHours(-5, 0), calcDayHours(-4, 0), 
                            calcDayHours(-3, 0), calcDayHours(-2, 0), calcDayHours(-1, 0), calcDayHours(0, 0)],
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
        axios.get(`http://api.marketstack.com/v1/intraday/${getCurrentDate(0)}?access_key=43d9fceee09a8d4b8113b69f9214c110&symbols=${this.state.symbol}&interval=15min`)
            .then( (res) => {
                const last = res.data.data.map( (item) => {
                    return item.last;
                })
                console.log('lastDay', last)
                this.setState({
                    last: last,
                    chartData: {
                        labels: [calcDayHours(-8, 0), calcDayHours(-7, -30),  calcDayHours(-7, 0), calcDayHours(-6, -30), calcDayHours(-6, 0), 
                          calcDayHours(-5, -30), calcDayHours(-5, 0), calcDayHours(-4, -30), calcDayHours(-4, 0), 
                            calcDayHours(-3, -30), calcDayHours(-3, 0), calcDayHours(-2, -30), calcDayHours(-2, 0), 
                            calcDayHours(-1, -30), calcDayHours(-1, 0), calcDayHours(0, -30), calcDayHours(0, 0)],
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
        axios.get(`http://api.marketstack.com/v1/intraday?access_key=43d9fceee09a8d4b8113b69f9214c110&symbols=${this.state.symbol}&date_from=${getCurrentDate(-7)}&date_to=${getCurrentDate(0)}&interval=3hour`)
            .then( (res) => {
                const last = res.data.data.map( (item) => {
                    return item.last;
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
        axios.get(`http://api.marketstack.com/v1/intraday?access_key=43d9fceee09a8d4b8113b69f9214c110&symbols=${this.state.symbol}&date_from=${getCurrentDate(-30)}&date_to=${getCurrentDate(0)}&interval=6hour`)
            .then( (res) => {
                const last = res.data.data.map( (item) => {
                    return item.last;
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
        axios.get(`http://api.marketstack.com/v1/intraday?access_key=43d9fceee09a8d4b8113b69f9214c110&symbols=${this.state.symbol}&date_from=${getCurrentDate(-365)}&date_to=${getCurrentDate(0)}&interval=6hour`)
            .then( (res) => {
                const last = res.data.data.map( (item) => {
                    return item.last;
                })
                console.log('lastYear', last)
                this.setState({
                    last: last,
                    chartData: {
                        labels: [calcYearDays(-12, 0), '', '', '', '', '', '', '', '', '', '', '', '', calcYearDays(-10, 10), '', '', '', '', '', '', '', '', '', '', '', '',  
                                calcYearDays(-8, 10), '', '', '', '', '', '', '', '', '', '', '', '', calcYearDays(-6, 10), '', '', '', '', '', '', '', '', '', '', '', '',  
                                  calcYearDays(-4, 10), '', '', '', '', '', '', '', '', '', '', '', '', calcYearDays(-2, 10), '', '', '', '', '', '', '', '', '', '', '', '', 
                                  calcYearDays(0, 29)],
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