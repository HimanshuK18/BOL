contract BOLData{
	struct Data {
        string ShipperData;
        string ShippingCompanyData;
        string ShippingCompanyLoadingData;
		string ConsigneeData;
		string BOL_ID;}
	mapping(string => Data) private BOL_Data;
    //Add the initial value in the constructor
    function BOLData (string Shipper_Data, string  bolid)
    {
        BOL_Data[bolid] = Data(Shipper_Data,'', '','',bolid);
    }
	//Add data, hash to Block Chain
	function addData(string ShippingCompany_Data, string ShippingCompanyLoading_Data,string Consignee_Data, string bolid) public {
	    string Shipper_DataO = BOL_Data[bolid].ShipperData;
        string ShippingCompany_DataO = BOL_Data[bolid].ShippingCompanyData;
        string ShippingCompanyLoading_DataO = BOL_Data[bolid].ShippingCompanyLoadingData;
        string Consignee_DataO = BOL_Data[bolid].ConsigneeData;
        if(bytes(ShippingCompany_DataO).length > 0)
        { ShippingCompany_Data = ShippingCompany_DataO;}
        if(bytes(ShippingCompanyLoading_DataO).length > 0)
        {ShippingCompanyLoading_Data = ShippingCompanyLoading_DataO;}
        if(bytes(Consignee_DataO).length > 0)
        { Consignee_Data = Consignee_DataO;}
        BOL_Data[bolid] = Data(Shipper_DataO,ShippingCompany_Data, ShippingCompanyLoading_Data,Consignee_Data, bolid);
    }

    //Fetch data, hash values from block chain
    function getData(string DataID) returns (string, string, string,string){
        string Shipper_Data = BOL_Data[DataID].ShipperData;
        string ShippingCompany_Data = BOL_Data[DataID].ShippingCompanyData;
        string ShippingCompanyLoading_Data = BOL_Data[DataID].ShippingCompanyLoadingData;
        string Consignee_Data = BOL_Data[DataID].ConsigneeData;
        return(Shipper_Data, ShippingCompany_Data,ShippingCompanyLoading_Data, Consignee_Data);
    }
}