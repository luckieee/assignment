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
    //this.searhKey = this.searhKey.bind(this);
    this.sortBy = this.sortBy.bind(this);
    //this.removeCart = this.removeCart.bind(this);
    //this.countCart = this.countCart.bind(this);
    //this.debounceFunc = this.debounceFunc.bind(this);
    //this.debounceEvent = this.debounceEvent.bind(this);
    
  }

  


  componentDidMount(){
    /*
    axios.get('https://api.myjson.com/bins/qzuzi')
      .then(response => {
        
        console.log(response.data);
        this.setState({ maindata : response.data, oldData : response.data })
      }, error => {
        //console.log(error);
      });
      */

      var x = [
        {
          "id": 9090,
          "name": "Item1",
          "price": 200,
          "discount": 10,
          "category": "fiction",
          "img_url": "http://lorempixel.com/500/600/technics/"
        },
        {
          "id": 9091,
          "name": "Item2",
          "price": 250,
          "discount": 15,
          "category": "literature",
          "img_url": "http://lorempixel.com/500/600/technics/"
        },
        {
          "id": 9092,
          "name": "Item3",
          "price": 320,
          "discount": 5,
          "category": "literature",
          "img_url": "http://lorempixel.com/500/600/technics/"
        },
        {
          "id": 9093,
          "name": "Item4",
          "price": 290,
          "discount": 0,
          "category": "thriller",
          "img_url": "http://lorempixel.com/500/600/technics/"
        },
        {
          "id": 9094,
          "name": "Item1",
          "price": 500,
          "discount": 25,
          "category": "thriller",
          "img_url": "http://lorempixel.com/500/600/technics/"
        },
        {
          "id": 9095,
          "name": "Item2",
          "price": 150,
          "discount": 5,
          "category": "literature",
          "img_url": "http://lorempixel.com/500/600/technics/"
        },
        {
          "id": 9096,
          "name": "Item3",
          "price": 700,
          "discount": 22,
          "category": "literature",
          "img_url": "http://lorempixel.com/500/600/technics/"
        },
        {
          "id": 9097,
          "name": "Item4",
          "price": 350,
          "discount": 18,
          "category": "fiction",
          "img_url": "http://lorempixel.com/500/600/technics/"
        }
      ];

      this.setState({ maindata : x, oldData : x })
  }

  showSearh(){
    document.querySelector("#searchfieled").style.display = 'block';
  }

  searhKey = e => {
    //console.log("--", e);

    const searchedWord = e.target.value;
    
    const updatedList = this.state.oldData.filter(function (item) {
      return item.name.toLowerCase().search(searchedWord) !== -1;
    });
    this.setState({ maindata : updatedList })
  }

  /*
  debounceFunc = (fn, delay) => {
    
    let time ;
    return function(){
      clearTimeout(time);
      time = setTimeout(() => {
        fn.apply(this)
      }, delay)
    }
  }
  */
  //debounceEvent = this.debounceFunc(this.searhKey.bind(this), 300);

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
    // setTimeout(() => {
      
    //   //console.log(this.state.total)
    // }, 0)
    

    
    
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
    //console.log(this.state.cart)

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
    // let removedAr = this.state.cart.filter(function(item) {
    //   if(item.id === id){
    //     console.log(item);
    //     let tot = this.state.total - item.price,
    //     otlPrc = this.state.realtot - item.oldpr;
    //     this.setState({ total : tot, realtot: otlPrc })
    //   }
    //   return item.id != id;
    // });

    //this.setState({ cart : removedAr })

    this.state.cart.forEach((item, ind) => {
      if(item.id === id){
        //console.log(item);
        let tot = this.state.total - item.price,
        otlPrc = this.state.realtot - item.oldpr;
        this.setState({ total : tot, realtot: otlPrc })
      }
    });
    let removedAr = this.state.cart.filter(function(item) {
      return item.id != id;
    });

    this.setState({ cart : removedAr, itemCnt: this.state.itemCnt - 1 })
  }
  
  render() {
    return (
      <>
        <Header itemCnt={this.state.itemCnt} showSearh={this.showSearh} searhKey={this.searhKey} />  
        <Router>
          <div className="App">
            <HashRouter>
              <Route exact path="/" 
                component={() => (<Product addTocart={this.addTocart} priceOrder={this.state.priceOrder} sortBy={this.sortBy} finalData={this.state.maindata} showSearh={this.showSearh} searhKey={this.searhKey} />) }

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