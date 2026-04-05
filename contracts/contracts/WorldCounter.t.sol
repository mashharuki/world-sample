// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { Test } from "forge-std/Test.sol";
import { WorldCounter } from "./WorldCounter.sol";

contract WorldCounterTest is Test {
  WorldCounter counter;
  address owner;
  address user;

  function setUp() public {
    owner = address(this);
    user = makeAddr("user");
    counter = new WorldCounter();
  }

  function test_InitialCount() public view {
    assertEq(counter.count(), 0);
    assertEq(counter.owner(), owner);
  }

  function test_Increment() public {
    counter.increment();
    assertEq(counter.count(), 1);
  }

  function test_IncrementEmitsEvent() public {
    vm.expectEmit(true, false, false, true);
    emit WorldCounter.Incremented(address(this), 1);
    counter.increment();
  }

  function test_IncrementBy() public {
    counter.incrementBy(5);
    assertEq(counter.count(), 5);
  }

  function testFuzz_IncrementBy(uint8 amount) public {
    vm.assume(amount > 0);
    counter.incrementBy(amount);
    assertEq(counter.count(), amount);
  }

  function test_IncrementByZero_Reverts() public {
    vm.expectRevert(WorldCounter.IncrementByZero.selector);
    counter.incrementBy(0);
  }

  function test_Reset() public {
    counter.incrementBy(10);
    counter.reset();
    assertEq(counter.count(), 0);
  }

  function test_ResetByNonOwner_Reverts() public {
    vm.prank(user);
    vm.expectRevert(WorldCounter.OnlyOwner.selector);
    counter.reset();
  }
}
