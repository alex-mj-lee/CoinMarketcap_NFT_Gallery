// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Filecoin is ERC20, Ownable {
    constructor() ERC20("Filecoin", "FIL") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    receive() external payable {}
}