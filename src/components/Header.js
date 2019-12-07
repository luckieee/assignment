import React from 'react';
//import FontAwesomeIcon from '@fortawesome/react-fontawesome';
//import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid';

import { faStar, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;

const Header = (props)=>{
    //console.log('lu', props)
    return(
            <header className="header-container">
                
                <h1 className="left logo">
                    <a href="/#/">
                        <FontAwesomeIcon icon={faStar} color={'yellow'} size="2x" />
                    </a>
                </h1>
                
                <ul className="right">
                    <li>
                        <input type="text" placeholder="Search" id="searchfieled" onKeyUp={props.searhKey} />
                    </li>
                    <li><FontAwesomeIcon icon={faSearch} onClick={props.showSearh} color={'#fff'} size="2x" /></li>
                    <li>
                        <a href="/#/Cart">
                            <FontAwesomeIcon icon={faShoppingCart} color={'#fff'} size="2x" />
                            <div className="cart-cnt">{props.itemCnt}</div>
                        </a>
                    </li>
                </ul>
            </header>  
    )
}

export default Header;