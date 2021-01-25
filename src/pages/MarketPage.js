import React from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import StockappNavbar from '../components/StockappNavbar';
import MarketsComp from '../components/MarketsView';

class MarketPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exchangesData: [],
            indexData: []
          }
    }
    render() {
        return (
            <div className="c-market-page">
                <Container>
                    <h1>World Market Data</h1>
                    <p></p>
                    <MarketsComp exchanges={this.state.exchangesData} index={this.state.indexData}/>
                </Container>
            </div>
        )
    }
    componentDidMount(){
        let newIndex = [];
        axios.get('http://api.marketstack.com/v1/exchanges/INDX/tickers?access_key=43d9fceee09a8d4b8113b69f9214c110').then( (res) => {
    
          const names = res.data.data.indexes.map( (item) => {
            return item.name;
          });
          const symbols = res.data.data.indexes.map( (item) => {
            return item.symbol;
        });
          this.setState({
              exchangesData: names,
              indexData: symbols
            });
 /*       
          for(let i=0; i<names.length; i++){
            axios.get(`http://api.marketstack.com/v1/eod/latest?access_key=43d9fceee09a8d4b8113b69f9214c110&symbols=${symbols[i]}`).then( (res) => {

                console.log('marketPage', res.data.data)

            // newIndex.push(result.data.message)
            // console.log('newIndex', newIndex)
            // console.log(' Ajax finished loading'); 
            // this.setState({indexData: newIndex});
            })
            .catch(err => {
                // Handle Error Here
                console.error(err);
            });
          }*/
        });
      }
}
export default MarketPage;