import React from 'react';
import Header from './Header';
import Filter from './Filter';
import Listing from './Listing';

const Product = (props)=>{
  return(
    <div>
        <section className="middle">
          <div className="filter-container">
            <h3>Filter</h3>
            <Filter applyFilter={props.applyFilter}/>
          </div>
          <Listing filtermobileOpen={props.filtermobileOpen} filterMobileCancel={props.filterMobileCancel} sortmobileOpen={props.sortmobileOpen} sortMobile={props.sortMobile} sortMobileCancel={props.sortMobileCancel} addTocart={props.addTocart} priceOrder={props.priceOrder} finalData={props.finalData} sortBy={props.sortBy} applyFilter={props.applyFilter}/>
        </section>
      </div>
  )
}

export default Product;
