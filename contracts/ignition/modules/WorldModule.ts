import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const WorldModule = buildModule("WorldModule", (m) => {
  const counter = m.contract("WorldCounter");
  return { counter };
});

export default WorldModule;
