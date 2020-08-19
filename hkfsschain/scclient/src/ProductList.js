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
      this.state.prodDest
    ];
    console.log("1st func " + theState)
  }

  renderProductForm() {
    return this.props.products.map((product, index) => {
      const { 
        productId, 
        productName, 
        productInfo, 
        productProducer,
        productValue,
        productGpgga,
        productDest
      } = product
      return (
        <tr className="hoverStyleRow" key={productId}>
          <td>{productId}</td>
          <td>{productName}</td>
          <td>{productInfo}</td>
          <td>{productProducer}</td>
          <td>{productValue}</td>
          <td>{productGpgga}</td>
          <td>{productDest}</td>
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
      <div className="row pl-3">
        <div className="col-lg-12 d-flex">
          <table className=''id='products'>
            <thead>
              <tr>
                <th scope='col'>Id#</th>
                <th scope='col'>Product Name</th>
                <th scope='col'>Product Info</th>
                <th scope='col'>Product address</th>
                <th scope='col'>Product Value</th>
                <th scope='col'>Product Gpgga</th>
                <th scope='col'>Product Dest</th>
              </tr>
            </thead>
            <tbody>
              {this.renderProductForm()}
            </tbody>
          </table>
        </div>
      </div>
    </div>    
    );
  }
}

export default ProductList;