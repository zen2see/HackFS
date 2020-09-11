import React, { Component } from 'react';
import './App.css';

class ProductList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      prodName: '',
      prodInfo: '',
      prodVal: '',
      prodGpgga: '',
      prodDest: '',
      prodProd: '',
      prodDist: '',
      prodRet: '',
      prodCon: '',
    }
    this.productInputChange = this.productInputChange.bind(this)
  }
  
  productInputChange(event) {
    
    const target = event.target;
    const name = target.name;
    let value = event.target.value;
    this.setState({
      ...this.state,
      [name]: value
    });
    const theState = [
      this.state.prodName, 
      this.state.prodInfo, 
      this.state.prodVal, 
      this.state.prodGpgga,
      this.state.prodDest,
      this.state.prodProd,
      this.state.prodDist,
      this.state.prodRet,
      this.state.ProdCon
    ];
    console.log("1st func " + theState)
  }

  renderProductTable() {
    return this.props.products.map((product, index) => {
      const { 
        productId, 
        productName, 
        productInfo, 
        productValue,
        productGpgga,
        productDest,
        productProducer,
        productDistributor,
        productRetailer,
        productConsumer
      } = product
      return (
        <tr className="hoverStyleRow" key={productId}>
          <td>{productId}</td>
          <td>{productName}</td>
          <td>{productInfo}</td>
          <td>{productValue}</td>
          <td>{productGpgga}</td>
          <td>{productDest}</td>
          <td>{productProducer}</td>
          <td>{productDistributor}</td>
          <td>{productRetailer}</td>
          <td>{productConsumer}</td>
        </tr>
      )
     })
  }
  /*
  renderTableHeader() {
    let header = Object.keys(this.props.products)
    console.log(this.props.products)
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  .slice(0,6) + "...." + this.state.prodProd.slice(-4)
  */

  render() {
    return (
      <div>
      <div className="row">
        <div className="col-lg-12 d-flex justify-content-center mt-3">
          <div id="content">
            <form        
              onSubmit={(event) => {
                event.preventDefault()
                this.props.addProduct(
                  this.state.prodName, 
                  this.state.prodInfo,
                  this.state.prodValue,
                  this.state.prodGpgga,
                  this.state.prodDest
                  )
              }}
            >
              <label>
                Enter Product Name:
                <input
                  name="prodName"
                  className="form-control"  
                  type="text" 
                  placeholder="Add name..." 
                  required 
                  onChange={this.productInputChange}
                />
              </label>
              <br />
              <label>
                Enter Product Info: 
                <input
                  name="prodInfo"  
                  type="text" 
                  className="form-control"  
                  placeholder="Add info..." 
                  required 
                  onChange={this.productInputChange}
                />
              </label>
              <br />
              <label>
                Enter Product Value:
                <input 
                  name="prodValue"
                  className="form-control"  
                  type="number" 
                  placeholder="Add value..." 
                  required
                  onChange={this.productInputChange}
                />
              </label>
              <br />
              <label>
                Enter Product GPGGA:
                <input 
                  name="prodGpgga"
                  className="form-control"  
                  type="text" 
                  placeholder="Add gpgga..." 
                  required
                  onChange={this.productInputChange}
                />
              </label>
              <br />
              <label>
                Enter Product Dest:
                <input 
                  name="prodDest"
                  className="form-control"  
                  type="text" 
                  placeholder="Add dest..." 
                  required
                  onChange={this.productInputChange}
                />
              </label>
              <input type="submit" hidden={true} />
              {/*
              <button type="submit" className="btn btn-secondary btn"
                      onClick={()=>this.submit()}>submit
              </button>
              */}  
              <br />
            </form>
          </div>        
        </div>
      </div>
      <div>
        {/*{this.renderTableHeader()*/}
        <br />
        <h5 className="productTableHeader">CURRENT PRODUCTS</h5>
      </div>
      <div className="row pl-3 justify-content-center">
        {/*<div className="col-2"></div>*/}
        <div className="table-responsive ">
          <table className="table-sm" id="products">
            <thead className="" style={{ whiteSpace: "nowrap"}}>
              <tr>
                <th scope='col'>Id#</th>
                <th scope='col'>Product Name</th>
                <th scope='col'>Product Info</th>
                <th scope='col'>Product Value</th>
                <th scope='col'>Product Gpgga</th>
                <th scope='col'>Product Dest</th>
                <th scope='col'>Producer Address</th>
                <th scope='col'>Distributor Address</th>
                <th scope='col'>Retailer Address</th>
                <th scope='col'>Consumer Address</th>
              </tr>
            </thead>
            <tbody>
              {this.renderProductTable()}
            </tbody>
          </table>
        </div>
        {/*<div className="col-2"></div>*/}
      </div>
    </div>    
    );
  }
}

export default ProductList;