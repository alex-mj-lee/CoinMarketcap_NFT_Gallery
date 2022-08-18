const { ethers } = require('hardhat')
const main = async () => {
  const usdcFactory = await hre.ethers.getContractFactory('Usdc')
  const usdcContract = await usdcFactory.deploy()
  await usdcContract.deployed()
  console.log('USDC deployed to:', usdcContract.address)

  const filecoinFactory = await hre.ethers.getContractFactory('Filecoin')
  const filecoinContract = await filecoinFactory.deploy()
  await filecoinContract.deployed()
  console.log('Filecoin deployed to:', filecoinContract.address)

  const etcFactory = await hre.ethers.getContractFactory('Etc')
  const etcContract = await etcFactory.deploy()
  await etcContract.deployed()
  console.log('ETC deployed to:', etcContract.address)

  const zcashFactory = await hre.ethers.getContractFactory('Zcash')
  const zcashContract = await zcashFactory.deploy()
  await zcashContract.deployed()
  console.log('Zcash deployed to:', zcashContract.address)
}

;(async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
