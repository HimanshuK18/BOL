var fs = require('fs');
var erisC = require('eris-contracts');

var erisdbURL = "http://192.168.99.100:1337/rpc";
var contractFolder = '../contracts/';
var contractData = require(contractFolder + 'jobs_output.json');
var ContractAddress = contractData["test"];
var Abi = JSON.parse(fs.readFileSync("./contracts/abi/" + ContractAddress));
var accountData = require(contractFolder + './accounts.json');
var contractsManager = erisC.newContractManagerDev(erisdbURL, accountData.clinicaltrials_full_000);
var PatientContract = contractsManager.newContractFactory(Abi).at(ContractAddress);
 

module.exports = {
   getData : function(Patient_ID,callback) {
    PatientContract.getData(Patient_ID, function (error, result) {
      if (error) { throw error }
      callback(result);
    });
  },
  addData : function(Patient_ID, SaveData, callback){
    PatientContract.addData(Patient_ID, SaveData, function(error,result){
      if(error){throw error;}
      callback("Saved");
    });
  }
};