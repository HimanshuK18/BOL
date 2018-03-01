pragma solidity ^0.4.0;
contract BOLData 
{ 
    string public LetterofCreditData;
    string public ShipperData;
    string public ShippingCompanyData;
    string public ShippingCompanyLoadingData;
	string public ShippingCompanyUnLoadingData;
    
    function BOLData(string Shipper_Data, string LetterofCredit_Data) 
    { 
        LetterofCreditData = LetterofCredit_Data;
        ShipperData = Shipper_Data;
        ShippingCompanyData = '';
        ShippingCompanyLoadingData = '';
	    ShippingCompanyUnLoadingData = '';
    } 
    function getShipperData() constant returns (string retVal) 
    { 
        return ShipperData;
    }
    function setShippingCompanyData(string ShippingCompany_Data) 
    { 
        ShippingCompanyData = ShippingCompany_Data; 
    } 
    function getShippingCompanyData() constant returns (string retVal) 
    { 
        return ShippingCompanyData;
    }
    function setShippingCompanyLoadingData(string ShippingCompanyLoading_Data) 
    { 
        ShippingCompanyLoadingData = ShippingCompanyLoading_Data; 
    } 
    function getShippingCompanyLoadingData() constant returns (string retVal) 
    { 
        return ShippingCompanyLoadingData;
    }
    function setShippingCompanyUnLoadingData(string Consignee_Data) 
    { 
        ShippingCompanyUnLoadingData = Consignee_Data; 
    } 
    function getShippingCompanyUnLoadingData() constant returns (string retVal) 
    { 
        return ShippingCompanyUnLoadingData;
    }
}