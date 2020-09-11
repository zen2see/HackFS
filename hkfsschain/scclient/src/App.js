import React, { Component } from 'react';
import Web3 from 'web3';
import logo from './logo.svg';
import './App.css';
import { SCHAIN_ABI, SCHAIN_ADD } from './abis'
import ProductList from './ProductList'
import DynamicTable from './DynamicTable'

class App extends Component {
  componentWillMount() { 
    document.body.style.backgroundColor = "#282c34"
    document.body.style.color = "grey"
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    try {
      const accounts = await web3.eth.getAccounts()
      // const accountsm = (accounts[0].slice(0,6) + "...." + accounts[0].slice(-4))
      const accountsm = accounts[0]
      this.setState({ account: accountsm })
    } catch(error) {
      console.log('error with accounts')
    } 
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
      products: [],    
    }
       
    this.addProduct = this.addProduct.bind(this)
  }
  
  addProduct(name, info, val, gpa, dest) {
    this.setState({ loading: true })
    this.state.schainDapp.methods.addProduct(name, info, val, gpa, dest)
    .send({ from: this.state.account, gasPrice: "90000000000", value: "0000000000000000000", })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <div className="container-fluid">
        {/* Main content */}
        {/* Nav bar */}
        <nav className="navbar navbar-dark fixed-top bg-dark flex-sm-nowrap p-0 shadow">
         <a className="navbar-brand col-sm-4 mr-0" 
            href="https://ethglobal.co/" target="_self">HackFS - Supply Chain
         </a>
         <span className="navbar-text navbar-right px-2">Your account: {
           this.state.account.slice(0,6) + "...." + this.state.account.slice(-4)}</span> 
        </nav>
          <div className="row mt-5">
            <main role="main" className="col-lg-12 d-flex justify-content-center">
              <div className="row mt-4">
                <div className="col-lg-12 d-flex justify-content-center">
                  <h2>Track your products on the Blockchain</h2>
                </div>
              </div>
              {/*<div className="row">Current products: { this.state.productIdCount }</div>*/}
            </main>           
          </div>
       
        {/* Main actions */} 
        { this.state.loading ? 
            <div id="loader"> 
              <p className="mb-0">Loading...</p> 
              <p className="blink blink-fade">Checking for account...</p></div>
            : <ProductList products={this.state.products} addProduct={this.addProduct} />        
        }  
      </div>
    );
  }
}

export default App;
