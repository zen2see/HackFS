import React, { Component } from 'react';
import './App.css';

class ProductList extends Component {

  renderProductTable() {
    return this.props.products.map((product, index) => {
      const { productId, productInfo, productProducer } = product
      return (
        <tr className="hoverStyleRow" key={productId}>
          <td>{productId}</td>
          <td>{productInfo}</td>
          <td>{productProducer}</td>
        </tr>
      )
     })
  }

  /*
  <ul className="list-unstyled" id="productList">
    { this.state.products.map((product, key) => {
      return(
        <div className="productTemplate" key={key}>
          <label>
            <span className="content">{product.productId}</span>
            <span className="content">{product.productInfo}</span> 
            <span className="content">{product.productProducer}</span>
          </label>
        </div>
      )
    })}
  </ul>
   */
  /*
  render() {
    return (
      <div className="row">
        <div className="col-lg-12 d-flex justify-content-center mt-3">
          <div id="content">
            <form 
              onSubmit={(event) => {
                event.preventDefault()
                this.props.createProduct(this.product.value)
              }}>
              <label>
                Enter Product Name:
                <input 
                  ref={(input) => {
                    this.product = input
                  }}
                  name="productName"
                  className="form-control"  
                  type="text" 
                  placeholder="Add name..." 
                  required 
                  /*onChange={this.prodChangeHandler}
                />
              </label>
              <br />
              <label>
                Enter Product Info:
                <input 
                  ref={(input) => {
                    this.product = input
                  }}
                  name="productInfo"
                  className="form-control"  
                  type="text" 
                  placeholder="Add info..." 
                  required 
                  /*onChange={this.prodChangeHandler}
                />
              </label>
              <br />
              <label>
                Enter Product Value:
                <input 
                  ref={(input) => {
                    this.product = input
                  }}
                  name="productValue"
                  className="form-control"  
                  type="number" 
                  placeholder="Add value..." 
                  required
                  /*onChange={this.prodChangeHandler}
                />
              </label>
              <br />
              <label>
                Enter Product Gppa:
                <input 
                  ref={(input) => {
                    this.product = input
                  }}
                  name="productGpgga"
                  className="form-control"  
                  type="text" 
                  placeholder="Add gpgga..." 
                  required
                  /*onChange={this.prodChangeHandler}
                />
              </label>
              <br />
              <label>
                Enter Product Dest:
                <input 
                  ref={(input) => {
                    this.product = input
                  }}
                  name="productDest"
                  className="form-control"  
                  type="text" 
                  placeholder="Add dest..." 
                  required
                  /*onChange={this.prodChangeHandler}
                />
              </label>
              <input type="submit" hidden={true} />
            </form>
            <ul className="list-unstyled" id="productList">
              { this.props.products.map((product, key) => {
                return(
                  <div className="productTemplate" key={key}>
                    <label>
                      <span className="content">{product.content}</span>
                    </label>
                  </div>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }*/
  render() {
    return (
      <div>
      <div className="row">
        <div className="col-lg-12 d-flex justify-content-center mt-3">
          <div id="content">
            <form
              onSubmit={(event) => {
                console.log(this.product.value)
                event.preventDefault()
                this.props.addProduct(this.product.value)
              }}>
              <label>
                Enter Product Info: 
                <input
                  id="prodInfo"
                  ref={(input) => { this.product = input}}
                  name="productInfo"  
                  type="text" 
                  className="form-control"  
                  placeholder="Add info..." 
                  required 
                />
              </label>
              <input type="submit" hidden={true} />
            </form>
          </div>        
        </div>
      </div>
      <div className="row pl-3">
            <div className="col-lg-12 d-flex">
              <table className=''id='products'>
                <thead>
                  <tr>
                    <th scope='col'>Id#</th>
                    <th scope='col'>Product Info</th>
                    <th scope='col'>Product address</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderProductTable()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
    );
  }
}

export default ProductList;