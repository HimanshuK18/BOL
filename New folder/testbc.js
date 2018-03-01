var tt = "{\"_id\":\"5a1bec91f67fdc724cdb276c\",\"shippername\":\"Prosol Chemicals\",\"shipperaddress\":\"12/23 Krol Bhag, New Delhi\",\"shippercity\":\"New Delhi\",\"shippercountry\":\"India\",\"shipperphone\":\"091-22345678\",\"ponumber\":\"test33\",\"notifyingparty\":\"hkjkh\",\"ordernumber\":7777,\"handovershippingdate\":\"Tue Nov 07 2017\",\"consignee\":\"5a01895f613a01b8b42ca940\",\"consigneeaddress\":\"12/33, Dubai\",\"consigneecity\":\"Dubai\",\"consigneecountry\":\"UAE\",\"consigneephone\":\"097-222678\",\"shippingcompany\":\"59969917e30d9c4ab2437cf5\",\"authorizedperson\":\"eee\",\"shipper\":\"5996978de30d9c4ab2437cc4\",\"consignmentData\":[{\"unit\":\"csdf\",\"type\":\"Box\",\"rfid\":\"sdfsdf\",\"hazardousmaterial\":\"No\",\"description\":\"sdfs\",\"weight\":22,\"selected\":\"\"}],\"status\":\"Send To Shipping Company\"}";
//var mystring = '{"shippername":"Prosol Chemicals","shipperaddress":"12/23 Krol Bhag, New Delhi","shippercity":"New Delhi","shippercountry":"India","shipperphone":"091-22345678","ponumber":"xcbcbcvb","notifyingparty":"LLO\"llP\"","ordernumber":22,"consignee":"5996964fe30d9c4ab2437ca3","consigneeaddress":"New Home, road 12,houston","consigneecity":"houston","consigneecountry":"USA","consigneephone":"001-555678","shippingcompany":"59969917e30d9c4ab2437cf5","authorizedperson":"ggg","handovershippingdate":"Mon Nov 13 2017","shipper":"5996978de30d9c4ab2437cc4","consignmentData":[{"unit":"gg\"HHJ\"","type":"Box","rfid":"sdfsdf","hazardousmaterial":"No","description":"'fffff' kljdkfsdf 'ddd'","weight":33,"selected":""}],"status":"With Shipper","_id":"5a1d04d060e3b66cf0c88ef7"}';
var yy = '{"_id":"5a1c0bb70fbd437980064b03","shippername":"Prosol "loop" Chemicals","shipperaddress":"12/23 Krol "Bhag, New Delhi","shippercity":"New Delhi","shippercountry":"India","shipperphone":"091-22345678","ponumber":"fsdfsdfsd","notifyingparty":"fsdfss","ordernumber":44,"handovershippingdate":"Tue Nov 28 2017","consignee":"5996964fe30d9c4ab2437ca3","consigneeaddress":"New Home, road 12,houston","consigneecity":"houston","consigneecountry":"USA","consigneephone":"001-555678","shippingcompany":"59969917e30d9c4ab2437cf7","authorizedperson":"fsdfsdf","shipper":"5996978de30d9c4ab2437cc4","consignmentData":[{"unit":"sdfsd","type":"Box","rfid":"sdfsdf","hazardousmaterial":"No","description":"sfsdfsdf","weight":44,"selected":""}],"status":"Send To Shipping Company"}';
var ii ='{"_id":"5a1cf04685fbda7fe0f11774","shippername":"Prosol Chemicals","shipperaddress":"12/23 Krol Bhag, New Delhi","shippercity":"New Delhi","shippercountry":"India","shipperphone":"091-22345678","ponumber":"ASWER","notifyingparty":"sdf","handovershippingdate":"Wed Nov 29 2017","consignee":"5a01895f613a01b8b42ca93c","consigneeaddress":"12 building 10, Mahatten, New York","consigneecity":"new York","consigneecountry":"USA","consigneephone":"001-555678","shippingcompany":"59969917e30d9c4ab2437cf5","authorizedperson":"ffff","ordernumber":444,"shipper":"5996978de30d9c4ab2437cc4","consignmentData":[{"unit":"sdfsd","type":"Box","rfid":"sdfsdf","hazardousmaterial":"No","description":"sdfsdf","weight":44,"selected":""}],"status":"Send To Shipping Company"}';

var i = CreateJSONString(ii);
console.log(ii);
console.log('________________________________________________________________________________________________________________________________');
console.log(i);
console.log('________________________________________________________________________________________________________________________________');
var oo = CreateJSONObject(i);
console.log(oo);
console.log('________________________________________________________________________________________________________________________________');
var y = CreateJSONString(yy);
console.log(y);
console.log('________________________________________________________________________________________________________________________________');
console.log(yy);
console.log('________________________________________________________________________________________________________________________________');
var ol = CreateJSONObject(y);
console.log(ol);
//var ss =JSON.parse(yy);

function CreateJSONString(input) {
  var output = input.replace(/"/g , "'");
  return output;
}
function CreateJSONObject(input){
  var op = input.replace(/'/g , "\"");
  var output = JSON.parse(op);
  return output;
}
/*var Web3 = require('web3');

var fs = require('fs');
var contractPath = './contract/DataContract1.sol';
fs.readFile(contractPath, 'utf8', function read(err, data) {
  if (err) {
    throw err;
  }
  var contractcontent = data; 
  var gdata = "CalcSal {uint day;function set(uint x) {day = x;}function get() constant returns (uint) {return day*500;}},hfkdf jhsdffh sdjfh fhklsdhfdhsfjksd fl hsdlfhsd lfsdhfjksdhfjklsdhfjklsdhfjksdhfjklsdhfjkhsdfhsdjfhjklsdhfjksdhf jklsdhfjklhsd fjhsdjfhjksdhfjklsdhfjhsd fhsdjkfhjklsdhfsd hfsdk fh jklsdhfjsdhfjklsdhfjksdhfjhsdjlfhjksdfhjklsdfjksdfjkhsdfhjksdhfjklsdhfjksdhfklsdhfksdhfklsdhfjksdhfkhsdjkfhjklsdfhjksdfhjksdfhjksdfjklsdhfjksdhfjklsdhfjklsdhflsdhfklsdhfklsdjfhlshdflshdflsdfhlsdfhljkasdfh sdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff sfddddddddddddddddhhhhhh sufhsdiufhsiodhfjsdfh";
  var simpleSource = contractcontent;//'contract FileHash{struct File {string fileHash;string fileName;string fileCreatedDate;uint blockNumber;}mapping(string => File) private FileData;function addFileHash(string fileHash,string fileName, string fileCreatedDate, string fileDB_ID) public {FileData[fileDB_ID] = File(fileHash, fileName, fileCreatedDate,block.number);}function getFileHash(string fileDB_ID) returns (string, string,string, uint){string hash = FileData[fileDB_ID].fileHash;string fileName = FileData[fileDB_ID].fileName;string fileCreatedDate = FileData[fileDB_ID].fileCreatedDate;uint blockNumber = FileData[fileDB_ID].blockNumber;return(hash, fileName,fileCreatedDate, blockNumber);}}'
  if (typeof web3 !== 'undefined')
   {
      web3 = new Web3(web3.currentProvider);
    } 
    else
     {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:22000"));
    var account = '0x6585c8466ecd527dda9e09ebc1390ecab0844f2c';
    web3.eth.defaultAccount = account;
     var addresss ="0x6585c8466ecd527dda9e09ebc1390ecab0844f2c";
     var abis = [{"constant":true,"inputs":[],"name":"getShipperData","outputs":[{"name":"retVal","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getShippingCompanyLoadingData","outputs":[{"name":"retVal","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ShipperData","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getConsigneeData","outputs":[{"name":"retVal","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ShippingCompanyData","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ConsigneeData","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ShippingCompany_Data","type":"string"}],"name":"setShippingCompanyData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"Consignee_Data","type":"string"}],"name":"setConsigneeData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ShippingCompanyLoading_Data","type":"string"}],"name":"setShippingCompanyLoadingData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ShippingCompanyLoadingData","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getShippingCompanyData","outputs":[{"name":"retVal","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"Shipper_Data","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
    var privates = web3.eth.contract(abis).at(addresss);
    var simpleCompiled = web3.eth.compile.solidity(simpleSource);
    var simpleRoot = Object.keys(simpleCompiled)[0];
    var simpleContract = web3.eth.contract(simpleCompiled[simpleRoot].info.abiDefinition);
    console.log(JSON.stringify(simpleCompiled[simpleRoot].info.abiDefinition));
    var simple = simpleContract.new(gdata,{ from: web3.eth.defaultAccount, data: simpleCompiled[simpleRoot].code, gas: 30000000, privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="] }, function (e, contract) {
      if (e) {
        console.log("err creating contract:", e);
      } else {
        if (!contract.address) {
          console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
        } else {
          console.log("Contract mined! Address: " + contract.address);
          console.log(contract);          
        }
      }
    });
     }
});


   //0x1349f3e1b8d71effb47b840594ff27da7e603d17
   //0x9d13c6d3afe1721beef56b55d303b09e021e27ab

//   var address = "0x1932c48b2bf8102ba33b4a6b545c32236e342f34";
    //var abi = [{"constant":true,"inputs":[],"name":"getShipperData","outputs":[{"name":"retVal","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getShippingCompanyLoadingData","outputs":[{"name":"retVal","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ShipperData","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getShippingCompanyUnLoadingData","outputs":[{"name":"retVal","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ShippingCompanyData","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ShippingCompanyUnLoadingData","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ShippingCompany_Data","type":"string"}],"name":"setShippingCompanyData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ShippingCompanyLoading_Data","type":"string"}],"name":"setShippingCompanyLoadingData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ShippingCompanyLoadingData","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getShippingCompanyData","outputs":[{"name":"retVal","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"Consignee_Data","type":"string"}],"name":"setShippingCompanyUnLoadingData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"Shipper_Data","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
    //var MyContract = web3.eth.contract(abi).at(address);
    //console.log(MyContract.get());

  // web3.eth.getTransactionReceipt("0x48f84b73bef83eadbcee20264e818077dab74ad33ab3bb530edb0ffe6ce6ced6")
  //0xcb0928ea252d0e345ee88fd9936659816465bfec93bc71472cdc3df369ea1171
  // var address = "0x1349f3e1b8d71effb47b840594ff27da7e603d17"
  // var abi = [{"constant":false,"inputs":[{"name":"ShippingCompany_Data","type":"string"},{"name":"ShippingCompanyLoading_Data","type":"string"},{"name":"Consignee_Data","type":"string"},{"name":"bolid","type":"string"}],"name":"addData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"DataID","type":"string"}],"name":"getData","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"Shipper_Data","type":"string"},{"name":"bolid","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
  // var private = eth.contract(abi).at(address)
  //  private.get()
  //tranaction hash : 0x781f035b492f7752c7e7058494691c45da560809fd9972b9b0703b08cd806378,

//var address ="0xd0a5685a4ba479d0ff4e86ca8300738573816c63";
//private.set(4,{from:eth.coinbase,privateFor:["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]});
//contract simplestorage { bytes32 public storedData; function simplestorage(bytes32 initVal) { storedData = initVal; } function set(bytes32 x) {storedData = x; } function get() constant returns (bytes32 retVal)  { return storedData; }}



  // var addresss ="0xd0a5685a4ba479d0ff4e86ca8300738573816c63";
  // var abis = [{\"constant\":false,\"inputs\":[{\"name\":\"ShippingCompany_Data\",\"type\":\"string\"},{\"name\":\"ShippingCompanyLoading_Data\",\"type\":\"string\"},{\"name\":\"Consignee_Data\",\"type\":\"string\"},{\"name\":\"bolid\",\"type\":\"string\"}],\"name\":\"addData\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"DataID\",\"type\":\"string\"}],\"name\":\"getData\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"},{\"name\":\"\",\"type\":\"string\"},{\"name\":\"\",\"type\":\"string\"},{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"name\":\"Shipper_Data\",\"type\":\"string\"},{\"name\":\"bolid\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"}];
  // var privates = eth.contract(abis).at(addresss);
  */
