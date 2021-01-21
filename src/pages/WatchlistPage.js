import React from 'react';
import { Redirect } from 'react-router-dom';
import StockappNavbar from '../components/StockappNavbar';

class WatchlistPage extends React.Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        if( ! this.props.activeUser){
            return <Redirect push to="/login" />
        }
        return (
                <div className="c-watchlist-page">WatchlistPage</div>
        )
    }
}
export default WatchlistPage;