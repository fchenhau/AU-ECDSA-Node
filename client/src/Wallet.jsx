import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
	async function onChange(evt) {
		const privateKey = evt.target.value;
		setPrivateKey(privateKey);

		// Derive the address from the private key
		try {
			const address = secp.getPublicKey(privateKey);
			setAddress(toHex(address));
		} catch (err) {
			setAddress("");
		}

		if (address) {
			const {
				data: { balance },
			} = await server.get(`balance/${address}`);
			setBalance(balance);
		} else {
			setBalance(0);
		}
	}

	return (
		<div className="container wallet">
			<h1>Your Wallet</h1>

			{/* <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label> */}

			<label>
				Private Key
				<input placeholder="Type your private key" value={privateKey} onChange={onChange}></input>
			</label>

			<div className="address">Address: {address.slice(0, 4)}...</div>

			<div className="balance">Balance: {balance}</div>
		</div>
	);
}

export default Wallet;
