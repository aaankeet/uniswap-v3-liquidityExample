const { ethers, network, helpers } = require('hardhat');
const { assert, expect } = require('chai');

const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const DAI_WHALE = '0x31d3243CfB54B34Fc9C73e1CB1137124bD6B13E1';
const USDC_WHALE = '0xc6f69e100Bbb34d3a18cAA01d3E2E1cA76214E16';

describe('Liquidity Example', function () {
  let liquidityExamples;
  let dai;
  let usdc;
  let account;

  ///////////////////////////////////////////////
  beforeEach(async () => {
    [account] = await ethers.getSigners();
    // console.log(account.address);

    dai = await ethers.getContractAt('IERC20', DAI);
    usdc = await ethers.getContractAt('IERC20', USDC);
    // console.log(dai);

    const LiquidityExample = await ethers.getContractFactory(
      'LiquidityExamples'
    );
    liquidityExamples = await LiquidityExample.deploy();
    await liquidityExamples.deployed();

    // Impersonate Whale Accounts
    await network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [DAI_WHALE],
    });
    await network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [USDC_WHALE],
    });

    const daiWhale = await ethers.getSigner(DAI_WHALE);
    const usdcWhale = await ethers.getSigner(USDC_WHALE);
    // console.log(usdcWhale);

    const daiAmount = ethers.utils.parseEther('2000');
    const usdcAmount = 2000 * 10 ** 6;
    // console.log(daiAmount, usdcAmount);

    // Send Dai & Usdc to Account
    await dai.connect(daiWhale).transfer(account.address, daiAmount);
    await usdc.connect(usdcWhale).transfer(account.address, usdcAmount);

    // Approve LiquidityExample Contract to Use Dai & Usdc
    await dai.connect(account).approve(liquidityExamples.address, daiAmount);
    await usdc.connect(account).approve(liquidityExamples.address, usdcAmount);
  });

  it('Should mint a position & Increase Liquidity ', async function () {
    // Mint New Position with 500 tokens for both Dai and Usdc
    // hard coded in the contract
    await liquidityExamples.mintNewPosition();

    console.log(
      'Dai Balace after add liquidity',
      (await dai.connect(account).balanceOf(account.address)) / 10 ** 18
    );
    console.log(
      'Usdc Balance after add liquidity',
      (await usdc.connect(account).balanceOf(account.address)) / 10 ** 6
    );

    // Token Id for Liquidity Position
    const tokenId = await liquidityExamples._tokenId();
    console.log('Token Id:', tokenId.toString());

    // Increase Liquidity Range
    const daiAmountToAdd = ethers.utils.parseEther('800');
    const usdcAmountToAdd = 800 * 10 ** 6;

    await liquidityExamples.increaseLiquidityCurrentRange(
      tokenId,
      daiAmountToAdd,
      usdcAmountToAdd
    );

    console.log(
      'Dai Balace after Increasing liquidity',
      (await dai.connect(account).balanceOf(account.address)) / 10 ** 18
    );
    console.log(
      'Usdc Balance after Increasing liquidity',
      (await usdc.connect(account).balanceOf(account.address)) / 10 ** 6
    );
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////
