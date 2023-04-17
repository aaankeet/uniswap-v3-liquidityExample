const { ethers, network } = require('hardhat');

const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const DAI_WHALE = '0x075e72a5eDf65F0A5f44699c7654C1a76941Ddc8';
const USDC_WHALE = '0x0A59649758aa4d66E25f08Dd01271e891fe52199';

describe('Add Liquidity', async function () {
  let liquidityExamples;
  let dai;
  let usdc;
  let account;
  ///////////////////////////////////////////////
  beforeEach(async () => {
    [account] = await ethers.getSigners();

    dai = await ethers.getContractAt('IERC20', DAI);
    usdc = await ethers.getContractAt('IERC20', USDC);

    const LiquidityExample = await ethers.getContractFactory(
      'LiquidityExamples'
    );
    liquidityExamples = await LiquidityExample.deploy();

    await network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [DAI_WHALE],
    });

    const daiWhale = await ethers.getSigner(DAI_WHALE);

    await network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [USDC_WHALE],
    });

    const usdcWhale = await ethers.getSigner(USDC_WHALE);
  });
  it('Should mint a position ', (async = () => {}));
  //////////////////////////////////////////////////
});
