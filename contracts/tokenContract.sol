pragma solidity ^0.8.0;

// Remix syle import
import { ERC20 } from "@openzeppelin/contracts@4.0.0/token/ERC20/ERC20.sol";

//create a sample token that inherits Open Zepplins ERC-20 contract
contract sickleToken is ERC20 {

    uint public amountAllowed = 1000000000000000000;

    //when deploying the amount of tokens minted for the owner
    constructor(uint256 initialSupply) ERC20("SickleTokens", "SICKLE") {
        _mint(msg.sender, initialSupply);
    }

    //when you requestTokens address and blocktime+1 day is saved in Time Lock
    mapping(address => uint) public lockTime;

    //allow users to call the requestTokens function to mint tokens
    function requestTokens (address requestor , uint amount) external {
        
        //perform a few check to make sure function can execute
        require(block.timestamp > lockTime[msg.sender], "lock time has not expired. Please try again later");
        
        //mint tokens
        _mint(requestor, amount);

        //updates locktime 1 day from now
        lockTime[msg.sender] = block.timestamp + 1 days;
    }
}