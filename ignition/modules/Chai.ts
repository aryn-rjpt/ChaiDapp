import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("ChaiModule", (m) => {
    const chai = m.contract("Chai");
    // m.call(chai, "buyChai", ["TestName", "TestMsg"], { value: 1n });
    // let call = m.call(chai, "getMemos");
    return { chai };
})