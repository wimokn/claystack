var ethers = require('ethers');
const mnemonic = process.env.ENV_MN;

//const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.alchemyapi.io/v2/OePDKEAtMy2lr5W5J8aBCML6qYmeCaFX");
const provider_rinkeby = new ethers.providers.JsonRpcProvider("https://eth-rinkeby.alchemyapi.io/v2/GIlmeHAY2YPTfvs_8JDU0Lsw6iGKjyxC");
const provider_goerli = new ethers.providers.JsonRpcProvider("https://eth-goerli.alchemyapi.io/v2/NtdJI9V0C07WUw8VHOA5tBJVEPKAqdp1");
let contractAddr_rinkeby = "0x83b7cf23b047df8b0c69649df43362631cbbedbf";
let contractAddr_goerli = "0x11fe0b9b1a408f5d790c6ea5666ee6f31306408f";
main();
async function main() {

  // 0-2 */1 * * *
  console.log("--------------rinkeby--------------");
  for (let i = 0; i < 18; i++) {
    let path = "m/44'/60'/0'/0/" + i;
    const wallet = ethers.Wallet.fromMnemonic(mnemonic, path);
    const signer = wallet.connect(provider_rinkeby);
    console.log(i);
    console.log(wallet.address);
    const tx = await signer.sendTransaction({
      to: contractAddr_rinkeby,
      value: 0,
      data: "0xdf8de3e700000000000000000000000054fe55d5d255b8460fb3bc52d5d676f9ae5697cd",
      gasPrice: "0xD09DC300",
      gasLimit: 500000
    });
    console.log(tx.hash);
  }
  console.log("--------------goerli--------------");
  for (let i = 0; i < 18; i++) {
    let path = "m/44'/60'/0'/0/" + i;
    const wallet = ethers.Wallet.fromMnemonic(mnemonic, path);
    const signer = wallet.connect(provider_goerli);
    console.log(i);
    console.log(wallet.address);
    const tx = await signer.sendTransaction({
      to: contractAddr_goerli,
      value: 0,
      data: "0xdf8de3e7000000000000000000000000499d11e0b6eac7c0593d8fb292dcbbf815fb29ae",
      gasPrice: "0xD09DC300",
      gasLimit: 500000
    });
    console.log(tx.hash);
  }
}