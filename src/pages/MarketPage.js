import React from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

import MarketsComp from '../components/MarketsView';

class MarketPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exchangesData: [],
            indexData: [],
            countryData: []
          }
    }
    render() {
        return (
            <div className="c-market-page">
                <Container>
                    <h1>World Market Data</h1>
                    <p></p>
                    <MarketsComp exchanges={this.state.exchangesData} index={this.state.indexData}
                                  country={this.state.countryData}/>
                </Container>
            </div>
        )
    }
    componentDidMount(){
        axios.get('http://api.marketstack.com/v1/exchanges/INDX/tickers?access_key=43d9fceee09a8d4b8113b69f9214c110').then( (res) => {
          const names = res.data.data.indexes.map( (item) => {
            return item.name;
          });
          const symbols = res.data.data.indexes.map( (item) => {
            return item.symbol;
          });
          const countries = res.data.data.indexes.map( (item) => {
            return item.country;
          });
          this.setState({
              exchangesData: names,
              indexData: symbols,
              countryData: countries
            });
 /*       
          let newIndex = [];
          for(let i=0, symbolsArr=[]; i<names.length; i++){
            symbolsArr.push(symbols[i]);
          }
          const symbolsStr = symbolsArr.join(",");
            axios.get(`http://api.marketstack.com/v1/eod/latest?access_key=43d9fceee09a8d4b8113b69f9214c110&symbols=${symbolsStr}`).then( (res) => {

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