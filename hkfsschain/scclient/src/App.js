import React, { Component } from 'react';
import Web3 from 'web3';
import logo from './logo.svg';
import './App.css';
import { SCHAIN_ABI, SCHAIN_ADD } from './abis'
import ProductList from './ProductList'

// const web3 = new Web3(web3.givenProvider);
// const SChainContract = new web3.eth.Contract(sChainAbi, sChainAddr);

class App extends Component {
  componentWillMount() {
    document.body.style.backgroundColor = "#282c34"
    document.body.style.color = "grey"
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const schainDapp = new web3.eth.Contract(SCHAIN_ABI, SCHAIN_ADD)
    this.setState({ schainDapp })
    const productIdCount = await schainDapp.methods.productIdCounter().call()
    this.setState({ productIdCount })
    for (let i = 1; i <= productIdCount; i++) {
      const product = await schainDapp.methods.products(i).call()
      this.setState({
        products: [...this.state.products, product]
      })
    }
    console.log('products', this.state.products)
    this.setState({ loading: false})
  }
  
  constructor(props) {  
    super(props)
    this.state = { 
      account: '',
      prodIdCount: 0,
      loading: true,
      products: []    
    }
    // this.prodChangeHandler = this.prodChangeHandler.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);

    // this.createProduct = this.createProduct.bind(this)
  }

  /*prodChangeHandler(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(name, value);
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }


  
  createProduct() {
    this.setState({ loading: true })
    this.state.schainDapp.methods.addProduct(
      this.state.productName, 
      this.state.productInfo, 
      this.state.productValue,
      this.state.productGpgga,
      this.state.productDest
    ).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }
  */
  
  render() {
    return (
      <div>
        {/* Nav bar */}
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
         <a className="navbar-brand col-sm-3 col-md-2 mr-0" 
            href="https://ethglobal.co/" target="_blank">HackFS - Supply Chain
         </a>
         <span className="navbar-text navbar-right px-2">Your account: {this.state.account}</span> 
        </nav>

        {/* Main content */}
        <div className="container-fluid">
          <div className="row mt-5">
            <main role="main" className="col-lg-12 d-flex justify-content-center">
              <div className="row">
                <div className="col-lg-12 d-flex justify-content-center">
                  <h2>Track your products on the Blockchain</h2>
                </div>
              </div>
              {/*<div className="row">Current products: { this.state.productIdCount }</div>*/}
            </main>           
          </div>
          <div className="row">
        <div className="col-lg-12 d-flex justify-content-center mt-3">
          <div id="content">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                this.props.createProduct()
              }}>
              <label>
                Enter Product Info: 
                <input 
                  name="productInfo"  
                  type="text" 
                  className="form-control"  
                  placeholder="Add info..." 
                  required 
                  onChange={this.prodChangeHandler}
                />
              </label>
              <input type="submit" hidden={true} />
            </form>
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
            <ul></ul>
          </div>
        </div>
      </div>

          {/* Main actions 
          { this.state.loading ? <div id="loader"> <p>Loading...</p> </div>
            : <ProductList products={this.state.products}  />
          }  
          */}

        </div>
      </div>
    );
  }
}

export default App;
