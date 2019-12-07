import React from 'react';

const Listing = (props)=>{
    return(
            <div className="prod-container">
                <div className="sorting">
                    <h3>Sort By</h3>
                    <ul>
                        <li className={props.priceOrder === 'high' ? 'sel' : ''} onClick={ () => props.sortBy('high') }>Price -- High Low</li>
                        <li className={props.priceOrder === 'low' ? 'sel' : ''} onClick={ () => props.sortBy('low') }>Price -- Low High</li>
                        <li className={props.priceOrder === 'disc' ? 'sel' : ''} onClick={ () => props.sortBy('disc') }>Discount</li>
                    </ul>

                </div>
                {props.finalData.map((item, ids) => {
                    let aforthVal = item.price / 100 * item.discount + item.price;
                    return (
                        <div className="items" key={item.id}>
                            <div className="img-cont">
                                <img src={item.img_url} alt={item.name} />
                            </div>
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
                        )
                    })
                }




                
            </div>  
    )
}

export default Listing;