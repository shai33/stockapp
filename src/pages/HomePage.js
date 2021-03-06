import React from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

import LiveSearchBox from '../components/LiveSearchBox';
import TickerBasic from '../components/TickerBasic';
import HomeComp from '../components/HomeView';
import '../components/HomeView.css';
import StockappNavbar from '../components/StockappNavbar';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            selectedTickers: [],
            symbolResults: [],
            sources: [],
            titles: [],
            contents: [],
            urls: [],
            imgs: []
        };
    }
    addTicker = (index) => {
        const ticker = this.state.results[index];
        const ticker_symbol = this.state.symbolResults[index];
        console.log('ticker_symbol', ticker_symbol);
        axios.get(`http://api.marketstack.com/v1/tickers/${ticker_symbol}/eod/latest?access_key=43d9fceee09a8d4b8113b69f9214c110`)
            .then((res) => {
                const open = res.data.open;
                const high =res.data.high;
                const low =res.data.low;
                const close =res.data.close;
                const volume =res.data.volume;
                console.log('res.data.open', res.data.open);
                // const open = res.data.data.eod.map( (item) => {
                //     return item.open;
                // })
                // const close = res.data.data.eod.map( (item) => {
                //     return item.close;
                // })

                this.setState({
                    selectedTickers: this.state.selectedTickers.concat({symbol: ticker_symbol, name: ticker, 
                        open: open, close: close, high: high, low: low, volume: volume}),
                    results: [],
                });
                console.log('gooo', this.state.selectedTickers);
            });
    };
    searchTickers = (searchText) => {
        if( ! searchText ) {
            this.setState({
                results: []
            })
            return;
        };
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
                console.log('symbolresults', names)
            });
    };
    render() {
        const tickerCards = this.state.selectedTickers.map( (ticker, index) => {
            return <TickerBasic tickerName={ticker.name} tickerSymbol={ticker.symbol} tickerOpen={ticker.open} 
            tickerClose={ticker.close} tickerHigh={ticker.high} tickerLow={ticker.low}
            tickerVolume={ticker.volume}> </TickerBasic>
            
        });
        return (
            <div className="c-home-page">
                <div className="search-box">
                   
                    <LiveSearchBox searchTextChanged={this.searchTickers} resultSelected={this.addTicker}
                    placeholderText="Symbol/Company/Index" results={this.state.results} />
                </div>
                <p></p>
                <div>{tickerCards}</div>
                <Container>
                    <h4>Finance Headlines - Top Stories</h4>
                    <p></p>
                    <div className="news-section">
                        <HomeComp sources={this.state.sources} titles={this.state.titles}
                                contents={this.state.contents} urls={this.state.urls} imgs={this.state.imgs}/>
                    </div>
                </Container>
            </div>
        )
    }
    componentDidMount(){
        axios.get('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bbf81e11158149bf8b08042e0ab76fe1').then( (res) => {
          const sources = res.data.articles.map( (item) => {
            return item.source.name;
          });
          const titles = res.data.articles.map( (item) => {
            return item.title;
          });
          const contents = res.data.articles.map( (item) => {
            return item.description;
          });
          const urls = res.data.articles.map( (item) => {
            return item.url;
          });
          const imgs = res.data.articles.map( (item) => {
            return item.urlToImage;
          });
          this.setState({
              sources: sources,
              titles: titles,
              contents: contents,
              urls: urls,
              imgs: imgs
            });
        });
      }
}
export default HomePage;