import React, { Component } from 'react';
import Web3 from 'web3';
import logo from './logo.svg';
import './App.css';
import { SCHAIN_ABI, SCHAIN_ADD } from './abis'
import ProductList from './ProductList'
import DynamicTable from './DynamicTable'

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
    console.log('lbd_products', this.state.products)
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

    this.addProduct = this.addProduct.bind(this)
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
 
  */
  
  addProduct(product) {
    this.setState({ loading: true })
    this.state.schainDapp.methods.addProduct(product)
    .send({ from: this.state.account, gasPrice: "90000000000", value: "0000000000000000000", })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }
  
 renderTableHeader() {
   let header = Object.keys(this.state.products)
   console.log(this.state.products)
   return header.map((key, index) => {
     return <th key={index}>{key.toUpperCase()}</th>
   })
 } 
  
  render() {
    return (
      <div>
        {/* Nav bar */}
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
         <a className="navbar-brand col-sm-3 col-md-2 mr-0" 
            href="https://ethglobal.co/" target="_self">HackFS - Supply Chain
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
        </div>
        {/* Main actions */} 
        { this.state.loading ? <div id="loader"> <p>Loading...</p> </div>
            : <ProductList products={this.state.products} addProduct={this.addProduct} />        
        }  
      </div>
    );
  }
}

export default App;
