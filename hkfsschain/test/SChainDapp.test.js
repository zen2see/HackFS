const SChainDapp = artifacts.require('../contracts/SChainDapp.sol')

contract('SChainDapp', (accounts) => {

  let prodProducer = accounts[0]

  beforeEach(async () => {
    this.schainDapp = await SChainDapp.deployed()
  })

  describe("Setup...", async => {

    it('deploys successfully', async () => {
      const address = await this.schainDapp.address  
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a default product', async () => {
      const productIdcount = await this.schainDapp.productIdCounter()
      const product = await this.schainDapp.products(productIdcount)
      assert.equal(product.productId.toNumber(), productIdcount.toNumber())
      assert.equal(product.productInfo, 'Example product')
    })
  })

  describe("Functions...", async => {

    it('gets products', async () => {
      const productOne = await this.schainDapp.getProductById(1)
      assert.equal(productOne[0].toNumber(), 1)
      assert.equal(productOne[1], 'Example product')
      assert.equal(productOne[2], prodProducer)
    })

    it('adds a product', async () => {
      const result = await this.schainDapp.addProduct('Another Example product')
      const prodCount = await this.schainDapp.productIdCounter()
      assert.equal(prodCount, 2)
      const event = result.logs[0].args
      assert.equal(event.prodId.toNumber(), 2)
      assert.equal(event.prodInfo, 'Another Example product')
      assert.equal(event.prodProducer, prodProducer)
    })

  })
})
