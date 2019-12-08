import React from 'react';


class Filter extends React.Component {
  
  constructor(){
    super();
    
    this.state = ({
      leftVal: 0,
      righVal: 100
    });

    this.leftAction = this.leftAction.bind(this);
    this.rightAction = this.rightAction.bind(this);
  }

  leftAction = (e) => {
    let value = Math.min(e.target.value, e.target.parentNode.childNodes[1].value-1);
    let Fvalue = (value/parseInt(e.target.max))*100
    let children = e.target.parentNode.childNodes[0].childNodes;
    
    children[0].style.width=Fvalue+'%';
    children[2].style.left=Fvalue+'%';
    children[3].style.left=Fvalue+'%';
    children[5].style.left=Fvalue+'%';
    children[5].childNodes[0].innerHTML = '₹'+value;
    this.setState({ leftVal: value });
  }

  rightAction = (e) => {
    let value = Math.max(e.target.value, e.target.parentNode.childNodes[2].value-1);
    let Fvalue = (value/parseInt(e.target.max))*100
    let children = e.target.parentNode.childNodes[0].childNodes;

    children[1].style.width=(100-Fvalue)+'%';
    children[2].style.right=(100-Fvalue)+'%';
    children[4].style.right=(100-Fvalue)+'%';
    children[6].style.right=(100-Fvalue)+'%';
    children[6].childNodes[0].innerHTML = '₹'+value;
    this.setState({ righVal: value });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    
    return (
      <>
        <div className="slider" id="slider-distance">
          <div>
            <div className="inverse-left"  style={{width: 0 + '%'}} ></div>
            <div className="inverse-right"  style={{width: 0 + '%'}}></div>
            <div className="range"  style={{left: 0, right: 0}} ></div>
            <span className="thumb" style={{left: 0 + '%'}}  ></span>
            <span className="thumb" style={{left: 100 + '%'}}></span>
            <div className="sign" style={{left: 0 + '%'}}>
              <span id="valueleft">₹0</span>
            </div>
            <div className="sign" style={{left: 100 + '%'}} >
              <span id="valueright">₹1000</span>
            </div>
          </div>
          <input type="range" id="price-f-low" defaultValue="0" max="1000" min="0" step="1" onInput={this.leftAction}
          />

          <input type="range" id="price-f-high" defaultValue="1000" max="1000" min="0" step="1" onInput={this.rightAction} />
        </div>
        <div className="namefilter">Price</div>
        <div className="butCont">
          <button onClick={this.props.applyFilter}>Apply</button>
        </div>
        <div className="button-cont">
            <button className="apply" onClick={this.props.filterMobileCancel}>Cancel</button>
            <button className="apply" onClick={this.props.applyFilter}>Apply</button>
        </div>
      </>
    );
  }
}

export default Filter;