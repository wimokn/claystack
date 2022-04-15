var ethers = require('ethers');
const mnemonic = process.env.ENV_MN;
//export NODE_PATH=/home/junk/.nodejs_global/lib/node_modules

const provider_rinkeby = new ethers.providers.JsonRpcProvider("https://eth-rinkeby.alchemyapi.io/v2/GIlmeHAY2YPTfvs_8JDU0Lsw6iGKjyxC");
const provider_goerli = new ethers.providers.JsonRpcProvider("https://eth-goerli.alchemyapi.io/v2/NtdJI9V0C07WUw8VHOA5tBJVEPKAqdp1");
const provider_mumbai = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/I9Uor6M9QsHuEWifInSUUbh2P9hjPE5c");
let contractAddr_rinkeby = "0x880c80c6739c05f9ddb8bc2597b65d1ec9b92c10";
let contractAddr_goerli = "0xe29d3d4d72997b31ccdf8188113c189f1106f6b8";
let contractAddr_mumbai = "0x9c3c9283d3e44854697cd22d3faa240cfb032889";

main();
async function main() {
      for(let i=9;i<18;i++) {
        let path = "m/44'/60'/0'/0/"+i;
        const wallet = ethers.Wallet.fromMnemonic(mnemonic, path);
        const signer = wallet.connect(provider_mumbai);
        console.log(i);
        console.log(wallet.address);
         const tx =  await signer.sendTransaction({
            to: contractAddr_mumbai,
            value: 0,
            data: "0x095ea7b3000000000000000000000000bf7cbaa25eadaaf1b3c9eeaea758a868678c0c09ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
            gasPrice: "0x4A817C800",
            gasLimit: 50000
        });  
        console.log(tx.hash);
    } 
}