import { ethers } from 'ethers';

let contract = undefined;
let signer = undefined;
const contractAddress = "0x78ca25ea6c99366772be3a9869b12b0e7ace5409";
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_note",
                "type": "string"
            }
        ],
        "name": "setNote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getNote",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");

provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0]);
        contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
            );
        });
    });

document.getElementById("getNote").addEventListener("click", async function(){
    try {
        console.log('Wait a few seconds...')
        const note = await contract.getNote();
        document.getElementById("showNote").innerText = `${note}`;
        console.log(note);
    } catch (error) {
        console.error(error);
    };
});

document.getElementById("setNote").addEventListener("click", async function(){
    try {
        console.log("On process. Make sure you have balance on Sepolia. If not, let's get faucet from sepoliafaucet.com.");
        const note = document.getElementById("enterNote").value;
        await contract.setNote(note);
        setTimeout(() => alert("Let's reload page and click button \"Click it\" until the text changes."), 13000);
        console.log("Wait...");
        
    } catch (error) {
        console.error(error);
    };
});