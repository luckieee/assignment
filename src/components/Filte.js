import React from 'react';

const Cart = (props)=>{
    return(
        props.cart.length !== 0 ? (
            <section className="cart-container">
                <div className="left">
                    {props.cart.map((item, ids) => {
                        return (
                            <div className="items" key={item.id}>
                                <div className="cont img">
                                    <img src={item.img} alt={item.name} />
                                </div>
                                <div className="other-cart-detail">
                                    <div className="cont detail">
                                        <h2>{item.name}</h2>
                                        <div className="pric">₹​ {item.price } 
                                            {item.disc ? (<span className="rlprice">{item.oldpr}</span>) : ''}

                                            {item.disc ? (<span className="discount" >{item.disc}%off</span>) : ''}
                                        </div>
                                    
                                    </div>
                                    <div className="cont cnt">
                                        <div className="vert">
                                            <button className="minus" onClick={ () => props.countCart(item.id, 'minus') }>-</button>
                                            <div className="realcnt">{item.cnt}</div>
                                            <button className="plus" onClick={ () => props.countCart(item.id, 'plus') }>+</button>  
                                        </div>
                                    </div>
                                    <div className="cont remove">
                                        <button onClick={ () => props.removeCart(item.id) }>Remove</button>
                                    </div>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
                <div className="right">
                    <h3>PRICE DETAIL</h3>
                    <div className="content">
                        <div className="flexer">
                            <div className="priceName">
                                Price (item {props.itemCnt})
                            </div>
                            <div className="realp">
                                {props.realtot}
                            </div>
                        </div>
                        <div className="flexer">
                            <div className="priceName">
                                Discount
                            </div>
                            <div className="realp">
                                {props.realtot - props.total}
                            </div>
                        </div>
                    </div>
                    <div className="total">
                        <div>Total Payable</div>
                        <div className="ttpz">
                            {props.total}
                        </div>
                    </div>
                </div>
            </section> 
        ) : (<section className="no-cart-container">No item in your cart</section>)
    )
}

export default Cart;