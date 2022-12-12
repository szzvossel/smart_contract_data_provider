// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;
import "./EquityPriceStorage.sol";

contract StorageFactory {

    EquityPriceStorage[] public equityPriceStorages;

    function createEquityPriceStorageContract() public {
        EquityPriceStorage equityPriceStorage=new EquityPriceStorage();
        equityPriceStorages.push(equityPriceStorage);
    }

    function sfAddEquity(uint256 _index,string memory _name, uint256 _price) public {
        equityPriceStorages[_index].addEquity(_name,_price);        
    }

    function sfGePrice(uint256 _index, string memory _name) public view returns(uint256){
        return equityPriceStorages[_index].getPrice(_name);       
    }
}