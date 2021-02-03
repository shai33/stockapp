import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

import './TickerCard.css';

class TickerEmptyCard extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        isLoaded: this.props.isCardLoaded()
      };
    }
    render(){
        const tickerCardEmpty = <div className="card mx-auto my-5" style={{"max-width": '20rem' }}>
            <div className="card-body">
                <div className="avatar-placeholder placeholder rounded-circle"></div>
                <div className="text-placeholder placeholder w-75"></div>
                <div className="text-placeholder placeholder w-50"></div>
                <div className="text-placeholder placeholder w-75"></div>
                <div className="text-placeholder placeholder w-100"></div>
                <div className="text-placeholder placeholder w-100"></div>
            </div>
        </div>
        console.log('isCardLoadedEmptyCard', this.state.isLoaded);
        return ( 
        <div>
            {tickerCardEmpty}
            console.log('isCardLoadedEmptyCard1', this.state.isLoaded);
        </div>
        )
    }
    
}

export default TickerEmptyCard;