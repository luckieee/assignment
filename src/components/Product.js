import React from 'react';
import Header from './Header';
import Filter from './Filter';
import Listing from './Listing';



class Product extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {}
  // }

 



  render() {
    
    return (
      <div>
        
        <section className="middle">
          <Filter />
          <Listing addTocart={this.props.addTocart} priceOrder={this.props.priceOrder} finalData={this.props.finalData} sortBy={this.props.sortBy}/>
        </section>
      </div>
    );
  }
}

export default Product;
