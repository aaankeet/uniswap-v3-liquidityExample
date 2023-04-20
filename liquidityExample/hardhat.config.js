require('@nomicfoundation/hardhat-toolbox');

/** @type import('hardhat/config').HardhatUserConfig */

const DEFAULT_COMPILER_SETTINGS = {
  version: '0.7.6',
  settings: {
    evmVersion: 'istanbul',
    optimizer: {
      enabled: true,
      runs: 1_000,
    },
    metadata: {
      bytecodeHash: 'none',
    },
  },
};

module.exports = {
  networks: {
    hardhat: {
      forking: {
        url: 'https://eth-mainnet.g.alchemy.com/v2/FhmyyB8FMWbFHQK2OBPo_sGCSD3IU-sp',
      },
    },
  },
  solidity: {
    compilers: [DEFAULT_COMPILER_SETTINGS],
  },
};
