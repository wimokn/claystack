var ethers = require('ethers');
const mnemonic = process.env.ENV_MN;

const provider_rinkeby = new ethers.providers.JsonRpcProvider("https://eth-rinkeby.alchemyapi.io/v2/GIlmeHAY2YPTfvs_8JDU0Lsw6iGKjyxC");
const provider_goerli = new ethers.providers.JsonRpcProvider("https://eth-goerli.alchemyapi.io/v2/NtdJI9V0C07WUw8VHOA5tBJVEPKAqdp1");
const provider_mumbai = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/I9Uor6M9QsHuEWifInSUUbh2P9hjPE5c");
let contractAddr_rinkeby = "0x880c80c6739c05f9ddb8bc2597b65d1ec9b92c10";
let contractAddr_goerli = "0xe29d3d4d72997b31ccdf8188113c189f1106f6b8";
let contractAddr_mumbai = "0x9c3c9283d3e44854697cd22d3faa240cfb032889";

let abi = require("./abi.json");
//rinkeby
let GRT = "0x54Fe55d5d255b8460fB3Bc52D5D676F9AE5697CD";
//goerli
let Testv4 = "0x499d11E0b6eAC7c0593d8Fb292DCBbF815Fb29Ae";
//mumbai
//let MATIC = "0x2352c63A83f9Fd126af8676146721Fa00924d7e4";

main();
async function main() {
    
    console.log("--------------mumbai--------------");
    for (let i = 10; i < 18; i++) {
        if (i == 6 || i == 7 || i == 8)
            continue;
        let path = "m/44'/60'/0'/0/" + i;
        const wallet = ethers.Wallet.fromMnemonic(mnemonic, path);
        const signer = wallet.connect(provider_mumbai);
        console.log(i);
        console.log(wallet.address);

        let balance = provider_mumbai.getBalance(wallet.address);
        await Promise.all([
            balance
        ]).then(async (values) => {

            const balCheck = ethers.BigNumber.from(values[0]);
            if (ethers.utils.formatEther(balCheck) > 0) {
                let funcDeposit = "0xd0e30db0";
                //let pad = ethers.utils.hexZeroPad(values[0], 32);
                //let amount = pad.split("0x")[1];
                //let data_amount = funcDeposit + amount;

                const tx = await signer.sendTransaction({
                    to: contractAddr_mumbai,
                    value: ethers.utils.parseEther("1"),
                    data: funcDeposit,
                    gasPrice: "0x37E11D600",
                    gasLimit: 50000
                });
                console.log(tx.hash);
            }
        });
    }
}

async function getBalance(contractAddr, address, provider) {
    return new Promise(async (resolve, reject) => {
        const contract = new ethers.Contract(contractAddr, abi, provider);
        const balanceOf = await contract.balanceOf(address);
        resolve(balanceOf);
    });
}

function isEven(n) {
    return n % 2 == 0;
}  