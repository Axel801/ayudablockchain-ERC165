// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';

interface MyInterface {
    function obtainSelector() external pure returns (bytes4);
}

contract MyToken is ERC20, ERC165, MyInterface {
    constructor() ERC20('MyToken', 'MTK') {}

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override returns (bool) {
        return
            interfaceId == type(MyInterface).interfaceId ||
            interfaceId == type(IERC20).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function obtainSelector() external pure override returns (bytes4) {
        return MyInterface.obtainSelector.selector;
    }
}
