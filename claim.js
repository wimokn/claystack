var ethers = require('ethers');
const mnemonic = process.env.ENV_MN;

const provider_rinkeby = new ethers.providers.JsonRpcProvider("https://eth-rinkeby.alchemyapi.io/v2/GIlmeHAY2YPTfvs_8JDU0Lsw6iGKjyxC");
const provider_goerli = new ethers.providers.JsonRpcProvider("https://eth-goerli.alchemyapi.io/v2/NtdJI9V0C07WUw8VHOA5tBJVEPKAqdp1");
let contractAddr_rinkeby = "0x880c80c6739c05f9ddb8bc2597b65d1ec9b92c10";
let contractAddr_goerli = "0xe29d3d4d72997b31ccdf8188113c189f1106f6b8";
main();
async function main() {
  console.log("Test");
  return;
  /* for(let i=0;i<6;i++) {
    let path = "m/44'/60'/0'/0/"+i;
    const wallet = ethers.Wallet.fromMnemonic(mnemonic, path);
    const signer = wallet.connect(provider_rinkeby);
    console.log(i);
    console.log(wallet.address);
     const tx =  await signer.sendTransaction({
        to: contractAddr_rinkeby,
        value: 0,
        data: "0xdf8de3e700000000000000000000000054fe55d5d255b8460fb3bc52d5d676f9ae5697cd",
        gasPrice: "0xD09DC300",
        gasLimit: 500000
    });  
    console.log(tx.hash);
}  */

  for (let i = 0; i < 6; i++) {
    let path = "m/44'/60'/0'/0/" + i;
    const wallet = ethers.Wallet.fromMnemonic(mnemonic, path);
    const signer = wallet.connect(provider_goerli);
    console.log(i);
    console.log(wallet.address);
    const tx = await signer.sendTransaction({
      to: contractAddr_goerli,
      value: 0,
      data: "	tokenIndices	uint256[]	19119",
      gasPrice: "0xD09DC300",
      gasLimit: 500000
    });
    console.log(tx.hash);
  }
}