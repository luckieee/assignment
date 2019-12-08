import React from 'react';
import { faFilter, faSort } from '@fortawesome/free-solid-svg-icons' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import Filter from './Filter';
const Listing = (props)=>{
    return(
        <div className="prod-container">
            <div className='sort-container'>
                <div className="sorting">
                    <h3 className="mobile-srt" onClick={props.sortmobileOpen}><FontAwesomeIcon icon={faSort} size="1x" /> Sort By</h3>
                    <h3 className="desk-srt">Sort By</h3>
                    <ul>
                        <li className={props.priceOrder === 'high' ? 'sel' : ''} onClick={ () => props.sortBy('high') }>Price -- High Low</li>
                        <li className={props.priceOrder === 'low' ? 'sel' : ''} onClick={ () => props.sortBy('low') }>Price -- Low High</li>
                        <li className={props.priceOrder === 'disc' ? 'sel' : ''} onClick={ () => props.sortBy('disc') }>Discount</li>
                    </ul>
                </div>
                <div className="mobile-filter" onClick={props.filtermobileOpen}>
                    <FontAwesomeIcon icon={faFilter} size="1x" />
                    <h3>Filter</h3>
                </div>
            </div>
            <div className="overlay" id="modal1">
                <div className="over-contain">
                    <h3>Sort option</h3>
                    <ul>
                        <li><label><input type="radio" name="priceorder" value="high" /> Price High to Low</label></li>
                        <li><label><input type="radio" name="priceorder" value="low" /> Price Low to High</label></li>
                        <li><label><input type="radio" name="priceorder" value="disc"/> Discount</label></li>
                    </ul>
                    <div className="button-cont">
                        <button className="apply" onClick={props.sortMobileCancel}>Cancel</button>
                        <button className="apply" onClick={props.sortMobile}>Apply</button>
                    </div>
                </div>
            </div>
            <div className="overlay" id="modal2">
                
                <div className="over-contain">
                    <h3>Filter Options</h3>
                    <div className="filter">
                        <Filter filterMobileCancel={props.filterMobileCancel} applyFilter={props.applyFilter}/>
                    </div>
                </div>
            </div>
            {props.finalData.map((item, ids) => {
                let aforthVal = item.price / 100 * item.discount + item.price;
                return (
                    <div className="items" key={item.id}>
                        <div className="img-cont">
                            <img src={item.img_url} alt={item.name} />
                        </div>
                        <div className="card-content">
                            <div className="allnames">{item.name}</div>
                            <div className="cartdivide">
                                <div className="pric">₹​ {item.price } 
                                    {item.discount ? (<span>{aforthVal}</span>) : ''}
                                </div>
                                {item.discount ? (<div className="disc" >{item.discount}%off</div>) : ''}
                            </div>
                            <div className="button-cont">
                                <button onClick={() => props.addTocart(item.id, item.name, item.img_url, item.price, aforthVal, item.discount  ) }>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                    )
                })
            }
        </div>  
    )
}

export default Listing;