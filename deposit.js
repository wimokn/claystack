var ethers = require('ethers');
const mnemonic = process.env.ENV_MN;

const provider_rinkeby = new ethers.providers.JsonRpcProvider("https://eth-rinkeby.alchemyapi.io/v2/GIlmeHAY2YPTfvs_8JDU0Lsw6iGKjyxC");
const provider_goerli = new ethers.providers.JsonRpcProvider("https://eth-goerli.alchemyapi.io/v2/NtdJI9V0C07WUw8VHOA5tBJVEPKAqdp1");
let contractAddr_rinkeby = "0x880c80c6739c05f9ddb8bc2597b65d1ec9b92c10";
let contractAddr_goerli = "0xe29d3d4d72997b31ccdf8188113c189f1106f6b8";
let abi = require("./abi.json");
//rinkeby
let GRT = "0x54Fe55d5d255b8460fB3Bc52D5D676F9AE5697CD";
//goerli
let Testv4 = "0x499d11E0b6eAC7c0593d8Fb292DCBbF815Fb29Ae";

main();
async function main() {
    //rinkeby
    for (let i = 0; i < 6; i++) {
        let path = "m/44'/60'/0'/0/" + i;
        const wallet = ethers.Wallet.fromMnemonic(mnemonic, path);
        const signer = wallet.connect(provider_rinkeby);
        console.log(i);
        console.log(wallet.address);

        let balance = getBalance(GRT, wallet.address, provider_rinkeby);
        await Promise.all([
            balance
        ]).then(async (values) => {

            const balCheck = ethers.BigNumber.from(values[0]);
            if (ethers.utils.formatEther(balCheck) > 0) {
                let funcDeposit = "0xb6b55f25";
                let pad = ethers.utils.hexZeroPad(values[0], 32);
                let amount = pad.split("0x")[1];
                let data_amount = funcDeposit + amount;

                const tx = await signer.sendTransaction({
                    to: contractAddr_rinkeby,
                    value: 0,
                    data: data_amount,
                    gasPrice: "0xD09DC300",
                    gasLimit: 1000000
                });
                console.log(tx.hash);
            }
        });
    }
    //goerli
    for (let i = 0; i < 6; i++) {
        let path = "m/44'/60'/0'/0/" + i;
        const wallet = ethers.Wallet.fromMnemonic(mnemonic, path);
        const signer = wallet.connect(provider_goerli);
        console.log(i);
        console.log(wallet.address);

        let balance = getBalance(Testv4, wallet.address, provider_goerli);
        await Promise.all([
            balance
        ]).then(async (values) => {

            const balCheck = ethers.BigNumber.from(values[0]);
            if (ethers.utils.formatEther(balCheck) > 0) {
                let funcDeposit = "0xb6b55f25";
                let pad = ethers.utils.hexZeroPad(values[0], 32);
                let amount = pad.split("0x")[1];
                let data_amount = funcDeposit + amount;

                const tx = await signer.sendTransaction({
                    to: contractAddr_goerli,
                    value: 0,
                    data: data_amount,
                    gasPrice: "0xD09DC300",
                    gasLimit: 1000000
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