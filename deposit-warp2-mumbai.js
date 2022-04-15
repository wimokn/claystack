var ethers = require('ethers');
const mnemonic = process.env.ENV_MN;

const provider_rinkeby = new ethers.providers.JsonRpcProvider("https://eth-rinkeby.alchemyapi.io/v2/GIlmeHAY2YPTfvs_8JDU0Lsw6iGKjyxC");
const provider_goerli = new ethers.providers.JsonRpcProvider("https://eth-goerli.alchemyapi.io/v2/NtdJI9V0C07WUw8VHOA5tBJVEPKAqdp1");
const provider_mumbai = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/I9Uor6M9QsHuEWifInSUUbh2P9hjPE5c");
let contractAddr_rinkeby = "0x880c80c6739c05f9ddb8bc2597b65d1ec9b92c10";
let contractAddr_goerli = "0xe29d3d4d72997b31ccdf8188113c189f1106f6b8";
let contractAddr_mumbai = "0xbf7cbaa25eadaaf1b3c9eeaea758a868678c0c09";

let abi = require("./abi.json");
//rinkeby
let GRT = "0x54Fe55d5d255b8460fB3Bc52D5D676F9AE5697CD";
//goerli
let Testv4 = "0x499d11E0b6eAC7c0593d8Fb292DCBbF815Fb29Ae";
//mumbai
let WMATIC = "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889";

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

        //let balance = provider_mumbai.getBalance(wallet.address);
        let balance = getBalance(WMATIC, wallet.address, provider_mumbai);
        await Promise.all([
            balance
        ]).then(async (values) => {

            const balCheck = ethers.BigNumber.from(values[0]);
            if (ethers.utils.formatEther(balCheck) > 0) {
                let funcDeposit = "0xb9b0e588";

                let pad_wrap = ethers.utils.hexZeroPad(WMATIC, 32);
                let contract_wrap = pad_wrap.split("0x")[1];

                let pad_amount = ethers.utils.hexZeroPad(values[0], 32);
                let amount = pad_amount.split("0x")[1];

                let pad_wallet = ethers.utils.hexZeroPad(wallet.address, 32);
                let wallet_str = pad_wallet.split("0x")[1];
                let slippage = "0000000000000000000000000000000000000000000000000dcef33a6f838000";

                let ts = (Math.round(new Date() / 1000)) + 1200;
                let hexts = ts.toString(16);
                let pad_hexts = ethers.utils.hexZeroPad("0x" + hexts, 32);
                let ts_str = pad_hexts.split("0x")[1];

                let data_ = funcDeposit + contract_wrap + amount + slippage + wallet_str + ts_str;

                const tx = await signer.sendTransaction({
                    to: contractAddr_mumbai,
                    value: 0,
                    data: data_,
                    gasPrice: "0x37E11D600",
                    gasLimit: 300000
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