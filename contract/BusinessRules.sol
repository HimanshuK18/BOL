pragma solidity ^0.4.0;
contract BOLBusinessRules {
    address public creator;     
    bool public boolCleanOrFoul;
    bool public boolGoodsIntegrity;
    bool public boolBillLadingIssued;
    bool public boolContainerIntigrity;
    bool public boolHandlingUnitCount;
    bool public boolLoadingPort;
    bool public boolDestinationPort;
    bool public boolConsignee;
    
    
function BOLBusinessRules() 
    {
        creator = msg.sender; 
    }

    function setCleanOrFoul(string ClearOrFoul)
    {
        boolCleanOrFoul = keccak256("Clear") == keccak256(ClearOrFoul);
    }

    function setBillLadingIssued(string BillLadingIssued) 
    {
        boolBillLadingIssued = keccak256(BillLadingIssued) == keccak256("Shipped On Board Bill of Lading");
    }
    function setGoodsIntegrity(string GoodsHandOver, string GoodsReceipt)
    {
        boolGoodsIntegrity = keccak256(GoodsHandOver) == keccak256(GoodsReceipt);
    }
    
    function setContainerIntigrity(string ContainerID,string ContainerIDLoad, string ContainerIDUnLoad)
    {        
        boolContainerIntigrity = keccak256(ContainerID) == keccak256(ContainerIDLoad);
        if (boolContainerIntigrity)
        { boolContainerIntigrity = keccak256(ContainerIDLoad) == keccak256(ContainerIDUnLoad);}
    }
    
    function setHandlingUnitCount(string UnitCount,string UnitCountLoad, string UnitCountUnLoad)
    {
        boolHandlingUnitCount = keccak256(UnitCount) == keccak256(UnitCountLoad);
        if (boolHandlingUnitCount)
        { boolHandlingUnitCount = keccak256(UnitCountLoad) == keccak256(UnitCountUnLoad);}
    }
    
    function setLoadingPort(string LoadingPortBOL,string LoadingPortLC)
    {
        boolLoadingPort = keccak256(LoadingPortBOL) == keccak256(LoadingPortLC);
    }
    
    function setDestinationPort(string DestinationPortBOL,string DestinationPortLC) 
    {
        boolDestinationPort = keccak256(DestinationPortBOL) == keccak256(DestinationPortLC);
    }
    
    function setConsignee(string ConsigneeBOL,string ConsigneeLC)
    {
        boolConsignee = keccak256(ConsigneeBOL) == keccak256(ConsigneeLC);
    }

function kill()
    { 
        if (msg.sender == creator)
            suicide(creator);  
    }    
}
