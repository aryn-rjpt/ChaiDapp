import { useEffect, useState } from "react";

function Memos({ state }) {
  const [memos, setMemos] = useState([]);

  const { contract } = state;

  useEffect(() => {
    async function fetchMemos() {
      try {
        const rawMemos = await contract.getMemos();
        const parsedMemos = [];
        rawMemos.forEach((memo) => {
          parsedMemos.push({ name: memo.name, message: memo.message });
        });
        setMemos(parsedMemos);
      } catch (e) {
        console.error("Some error: ", e);
      }
    }
    contract && fetchMemos();
  }, [contract]);

  return (
    <>
      <h2> Memos</h2>
      <div>
        {memos.map((memo, idx) => {
          return (
            <div key={idx} className="memo">
              <div>Name: {memo.name}</div>
              <div>Message: {memo.message}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Memos;
