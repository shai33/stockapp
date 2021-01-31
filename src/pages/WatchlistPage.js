import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Row } from 'react-bootstrap';

import LiveSearchBox from '../components/LiveSearchBox';
import TickerCard from '../components/TickerCard';
import tickerJSON from '../data/tickers.json';
import './Pages.css';

class WatchlistPage extends React.Component {
    constructor(props) {
        super(props);
        let myTickers;
        if(localStorage.getItem('localTickers')){
        myTickers = JSON.parse(localStorage.getItem('localTickers'));
        }
        else{
        myTickers = tickerJSON;
        }
        this.state = {
            results: [],
            selectedTickers: [],
            symbolResults: [],
            myTickers: myTickers,
            index: ''
        };
    }
    addTicker = (index) => {
        const ticker = this.state.results[index];
        const ticker_symbol = this.state.symbolResults[index];
        console.log('ticker_symbol', ticker_symbol);
        axios.get(`http://api.marketstack.com/v1/intraday/latest?access_key=43d9fceee09a8d4b8113b69f9214c110&symbols=${ticker_symbol}`)
            .then((res) => {
                
                const open = res.data.data.map( (item) => {
                    return item.open;
                })
                const close = res.data.data.map( (item) => {
                    return item.close;
                })
                const high = res.data.data.map( (item) => {
                    return item.high;
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
                // const open = res.data.open;
                // const high =res.data.high;
                // const low =res.data.low;
                // const close =res.data.close;
                // const volume =res.data.volume;
                // console.log('res.data.open', res.data.open);
                
                const newTickers = this.state.myTickers.concat({symbol: ticker_symbol, name: ticker, 
                    open: open, close: close, high: high, low: low, volume: volume, last: last})
                localStorage.setItem('localTickers', JSON.stringify(newTickers))

                this.setState({
                    selectedTickers: this.state.selectedTickers.concat({symbol: ticker_symbol, name: ticker, 
                        open: open, close: close, high: high, low: low, volume: volume, last: last}),
                    results: [],
                    myTickers: newTickers
                });
                console.log('foooo', this.state.selectedTickers);
            });
    };
    searchTickers = (searchText) => {
        if( ! searchText ) {
            this.setState({
                results: []
            })
            return;
        };
        // Array.filter -> An array method
        // Takes a callback
        // for each item in the array -> the callback is run with a different item
        // if the callback returns true, the item stays
        // if false it is not in the new array
        // Returns a new filtered array, does not effect the original array
        
        // const searchResults = this.staticActorsJson.filter( (actor) => {
        //     return actor.toLowerCase().includes(searchText.toLowerCase());
        // })
        axios.get(`http://api.marketstack.com/v1/tickers?access_key=43d9fceee09a8d4b8113b69f9214c110&search=${searchText}`)
            .then((res) => {
                const names = res.data.data.map( (item) => {
                    return item.name;
                })
                const symbols = res.data.data.map( (item) => {
                    return item.symbol;
                })
                this.setState({
                    results: names,
                    symbolResults: symbols,
                    selectedTickers: []
                })
                console.log('symbolresults', symbols)
            });
    };
    // removeTicker = () => {
    //     this.state.myTickers.splice(this.index, 1);
    //     localStorage.setItem('localTickers', JSON.stringify(this.state.myTickers));
    //     // localStorage.removeItem('localTickers');
    //     this.setState({
    //         myTickers: JSON.parse(localStorage.getItem('localTickers'))
    //     });
    // };
    removeTicker = (symbol) => {
        const filteredTickers = this.state.myTickers.filter( (item) => {
            if(item.symbol !== symbol){
                return true;
            }
        });
        console.log('filteredTickers', filteredTickers)
        localStorage.setItem('localTickers', JSON.stringify(filteredTickers));
        // localStorage.removeItem('localTickers');
        this.setState({
            myTickers: JSON.parse(localStorage.getItem('localTickers'))
        });
    };
    render() {
        if( ! this.props.activeUser){
            return <Redirect push to="/login" />
        }
        let tickerCards;
        if(this.state.myTickers){
            tickerCards = this.state.myTickers.map( (ticker, index) => {
                return <TickerCard tickerName={ticker.name} tickerSymbol={ticker.symbol} tickerOpen={ticker.open} 
                tickerClose={ticker.close} tickerHigh={ticker.high} tickerLow={ticker.low}
                tickerVolume={ticker.volume} tickerLast={ticker.last} 
                removeTicker={() => this.removeTicker(ticker.symbol)}></TickerCard>
                
            });
        }
        else{
            tickerCards = this.state.selectedTickers.map( (ticker, index) => {
                return <TickerCard tickerName={ticker.name} tickerSymbol={ticker.symbol} tickerOpen={ticker.open} 
                tickerClose={ticker.close} tickerHigh={ticker.high} tickerLow={ticker.low}
                tickerVolume={ticker.volume} tickerLast={ticker.last}> </TickerCard>
                
            });
        }
        return (
            <div className="c-watchlist-page">
                <LiveSearchBox 
                    searchTextChanged={this.searchTickers}
                    resultSelected={this.addTicker}
                    placeholderText="Symbol/Company/Index" 
                    results={this.state.results} />
                    <p></p>
                <div className="c-watchlist-cards">
                <Row>
                    {tickerCards}
                </Row>
                <p></p>
                </div>
            </div>
        )
    }
}
export default WatchlistPage;