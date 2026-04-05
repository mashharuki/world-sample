import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { network } from "hardhat";

describe("WorldCounter", async function () {
  const { viem, networkHelpers } = await network.connect();

  async function deployFixture() {
    const [owner, other] = await viem.getWalletClients();
    const counter = await viem.deployContract("WorldCounter");
    return { counter, owner, other };
  }

  it("should have initial count of 0", async function () {
    const { counter } = await networkHelpers.loadFixture(deployFixture);
    assert.equal(await counter.read.count(), 0n);
  });

  it("should increment count", async function () {
    const { counter } = await networkHelpers.loadFixture(deployFixture);
    await counter.write.increment();
    assert.equal(await counter.read.count(), 1n);
  });

  it("should increment by amount", async function () {
    const { counter } = await networkHelpers.loadFixture(deployFixture);
    await counter.write.incrementBy([5n]);
    assert.equal(await counter.read.count(), 5n);
  });

  it("should revert when incrementBy zero", async function () {
    const { counter } = await networkHelpers.loadFixture(deployFixture);
    await assert.rejects(counter.write.incrementBy([0n]), /IncrementByZero/);
  });

  it("should reset count as owner", async function () {
    const { counter } = await networkHelpers.loadFixture(deployFixture);
    await counter.write.incrementBy([10n]);
    await counter.write.reset();
    assert.equal(await counter.read.count(), 0n);
  });

  it("should revert reset by non-owner", async function () {
    const { counter, other } = await networkHelpers.loadFixture(deployFixture);
    await assert.rejects(counter.write.reset({ account: other.account }), /OnlyOwner/);
  });
});
