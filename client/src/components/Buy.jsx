import { ethers, parseEther } from "ethers";

function Buy({ state }) {
  async function buyChai(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    const amount = {
      value: parseEther("0.0001"),
    };

    const { contract } = state;
    const transaction = await contract.buyChai(name, message, amount);

    await transaction.wait();

    alert("Transaction is successful");
  }

  return (
    <div>
      <h1>Buy Aryan a Chai!!</h1>
      <form onSubmit={buyChai}>
        <input type="text" id="name" />
        <input type="text" id="message" />
        <button type="submit">Swoosh!</button>
      </form>
    </div>
  );
}

export default Buy;
