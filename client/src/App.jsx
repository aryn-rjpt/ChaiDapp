import { useEffect, useState } from 'react'
import './App.css'
import { ethers } from 'ethers';
import abi from "../contractJson/Chai.json"
import Memos from './components/Memos';
import Buy from './components/Buy';
import chai from './chai.png';

function App() {

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });

  const [account, setAccount] = useState("bla");

  useEffect(() => {
    const template = async () => {

      try {
        const contractAddress = "0xfFFEf3815492D5369bda0ED781Fe956269B095Cc";
        const contractABI = abi.abi;

        // Metamask part
        // 1. In order to do trans on sepolia testnet.
        // 2. Metamask consists of infura api which actually helps us to connect to the blockchain

        const { ethereum } = window;

        const account = await ethereum.request({ method: "eth_requestAccounts" })

        setAccount(account);

        const provider = new ethers.BrowserProvider(ethereum);
        const network = await provider.getNetwork();
        console.log('Connected network: ', network);

        const signer = await provider.getSigner();

        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        setState({
          provider: provider,
          signer: signer,
          contract: contract
        });

        // console.log(contract);
      }

      catch (e) {
        alert(e);
      }
    }
    template();
  }, []);

  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "100%" }} className='App'>
      <img src={chai} width="100%" className='img-fluid' alt="" />
      <p className='text-muted lead' style={{ marginTop: "10px", marginLeft: "5px" }}>
        <small>
          Connected Account: {account}
        </small>
      </p>
      <div className='container'>

        <Buy state={state} />
      </div>
      <div className="container">

        <Memos state={state} />
      </div>

    </div>

  )
}

export default App
