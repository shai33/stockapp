import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import './HomeView.css';

class HomeComp extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          result: '',
          card: false
      };
    };
    filterMarkets = (event) => {
        const inputStr = event.target.value;
        this.setState({
                result: inputStr,
                card: true
        });
    };
    getFilter = () => {
        const res = this.state.result;
        return res.toUpperCase(); // ignore upper and lowercase
    };
    render(){
        const newsCardInfo = [];
        const filteredArticle =[];
        console.log('foooo', this.props.contents);
        console.log('foooo1', this.props.titles.length);
        for(let i=0; i<this.props.sources.length; i++) {
            const cardContent = <Col xs={12} lg={12} className="c-headlines"><a target="_blank" href={this.props.urls[i]}>
            <Card bg="light" text="dark" style={{ width: '40rem',  margin: '3px' }}>
               <Card.Header as="h6">{this.props.titles[i]}</Card.Header>
               <Card.Body>
                  {/* <Card.Title>{this.props.exchanges[i]}</Card.Title> */}
                  <Card.Img src={this.props.imgs[i]} style={{ width: '9rem' }}/>
                  <Card.Text><Card.Text>{this.props.sources[i]}</Card.Text>{this.props.contents[i]}</Card.Text>
               </Card.Body>
               </Card></a>
               </Col>
            //  newsCardInfo.push(cardContent);
             
             if((this.props.sources[i].toUpperCase().includes(this.getFilter())) ||
                ((this.props.contents[i]) && (this.props.contents[i].toUpperCase().includes(this.getFilter()))) ||
                (this.props.titles[i].toUpperCase().includes(this.getFilter()))){
                    filteredArticle.push(cardContent);
                    newsCardInfo.push(cardContent);
                }
              else{
                newsCardInfo.push(cardContent);
                }
         }
        return ( 
        <div>
            <div className="inputFilter">
                <input onChange={this.filterMarkets} value={this.state.result} 
                    placeholder="Filter by Name/Title/Source" size="35"/>
            </div>
            <p></p>
            <div className="gallery">
            <Row style={{ margin: '2px' }}>
                {/* {newsCardInfo} */}
                {this.state.card ? filteredArticle : newsCardInfo}
            </Row>
          </div>
          
        </div>
        )
    }
}

export default HomeComp;