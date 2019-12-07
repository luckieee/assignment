import React, { Component } from "react";
import axios from 'axios';
import { hot } from "react-hot-loader";
import './sass/app.scss';
import { Route, Link, BrowserRouter as Router,  HashRouter  } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer'; 
import Product from './components/Product';
import Cart from './components/Cart';

class App extends Component {
  constructor() {
    super();

    
    this.state = {
      maindata: [],
      priceOrder: '',
      oldData: [],
      cart : [],
      itemCnt: 0,
      total: 0,
      realtot: 0,
      totalDisc : 0
    };

    this.showSearh = this.showSearh.bind(this);
    
    this.sortBy = this.sortBy.bind(this);
}

  


  componentDidMount(){
    
    axios.get('https://api.myjson.com/bins/qzuzi')
      .then(response => {
        
        console.log(response.data);
        this.setState({ maindata : response.data, oldData : response.data })
      }, error => {
        //console.log(error);
      });
  }

  showSearh(){
    document.querySelector("#searchfieled").style.display = 'block';
  }

  searhKey = e => {
    const searchedWord = e.target.value;
    
    const updatedList = this.state.oldData.filter(function (item) {
      return item.name.toLowerCase().search(searchedWord) !== -1;
    });
    this.setState({ maindata : updatedList })
  }

  addTocart = (id, name, img, price, oldpr, disc) => {
    var flag = true;
    this.state.cart.forEach((item, ind) => {
      if(item.id === id){
        item.cnt = item.cnt + 1;
        flag = false;
      }
    });

    if(flag){
      let crtd = {
        id,
        name,
        img,
        price,
        oldpr,
        disc,
        cnt: 1
      };
      this.state.cart.push(crtd);
      
  
      
    }
    let total = price + this.state.total,
        realTot = oldpr + this.state.realtot ;
    this.setState({ cart : this.state.cart, itemCnt: this.state.cart.length, total : total, realtot: realTot});
      
  }


  sortBy(pas){
    
    const cont = this.state.maindata ;
    cont.sort(sortFunc);

    function sortFunc(a, b) {
      if(pas === 'high'){
        return b['price'] - a['price']
      } else if(pas === 'low'){
        return a['price'] - b['price']
      } else {
        return b['discount'] - a['discount']
      }
      
    }

    this.setState({ maindata : cont, priceOrder: pas })
    
  }
  
  countCart = (id, val) => {
   
    this.state.cart.forEach((item, ind) => {
      if(item.id === id){
        
          if(val === 'plus'){
            item.cnt = item.cnt + 1;
            let Total = item.price + this.state.total,
            realTot = item.oldpr + this.state.realtot ;

            this.setState({ cart : this.state.cart, total: Total , realtot: realTot})
          }else{
            if(item.cnt !== 1){
              item.cnt = item.cnt - 1;
              let Total = this.state.total - item.price ,
              realTot = this.state.realtot - item.oldpr ;

              this.setState({ cart : this.state.cart, total: Total, realtot: realTot })
              
            }else{
              alert('cannot less than 1')
            }
            
          }
        
      }
    });
    
  }

  removeCart = id => {
    

    this.state.cart.forEach((item, ind) => {
      if(item.id === id){
        //console.log(item);
        let tot = this.state.total - item.price * item.cnt,
        otlPrc = this.state.realtot - item.oldpr * item.cnt;
        this.setState({ total : tot, realtot: otlPrc })
      }
    });
    let removedAr = this.state.cart.filter(function(item) {
      return item.id != id;
    });

    this.setState({ cart : removedAr, itemCnt: this.state.itemCnt - 1 })
  }
  sortMobile = () => { 
    let val = document.querySelector('input[name="priceorder"]:checked');
    
    if(val){
      let fVal = val.value;
      this.sortBy(fVal);
      setTimeout(() => {
        document.querySelector('.overlay').style.display = 'none';
      }, 500)
    }else{
      alert("Please check");
    }
    
    
  }

  sortMobileCancel = () => {
    document.querySelector('.overlay').style.display = 'none';
  }
  
  mobileFilter = () => {
    document.querySelector('.overlay').style.display = 'block';
  }
  render() {
    return (
      <>
        <Header itemCnt={this.state.itemCnt} showSearh={this.showSearh} searhKey={this.searhKey} />  
        <Router>
          <div className="App">
            <HashRouter>
              <Route exact path="/" 
                component={() => (<Product mobileFilter={this.mobileFilter} sortMobile={this.sortMobile}  sortMobileCancel={this.sortMobileCancel} addTocart={this.addTocart} priceOrder={this.state.priceOrder} sortBy={this.sortBy} finalData={this.state.maindata} showSearh={this.showSearh} searhKey={this.searhKey} />) }

              />
              <Route exact strict 
                path="/Cart" 
                component={() => (<Cart itemCnt={this.state.itemCnt} countCart={this.countCart} removeCart={this.removeCart} total={this.state.total}  realtot={this.state.realtot}  cart={this.state.cart}  />) }
              />

            </HashRouter>
              
          </div>
          </Router>
          <Footer />
      </>
    );
  }
}


export default hot(module)(App);