// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title WorldCounter
 * @notice World Chain Sepolia にデプロイするサンプルカウンターコントラクト
 */
contract WorldCounter {
  uint256 public count;
  address public owner;

  event Incremented(address indexed by, uint256 newCount);
  event Reset(address indexed by);

  error OnlyOwner();
  error IncrementByZero();

  constructor() {
    owner = msg.sender;
    count = 0;
  }

  function increment() external {
    count += 1;
    emit Incremented(msg.sender, count);
  }

  function incrementBy(uint256 amount) external {
    if (amount == 0) revert IncrementByZero();
    count += amount;
    emit Incremented(msg.sender, count);
  }

  function reset() external {
    if (msg.sender != owner) revert OnlyOwner();
    count = 0;
    emit Reset(msg.sender);
  }
}
