// app/routes.js
var mongojs = require('mongojs');
var dbUrl = require("../config/db");

//
module.exports = function (app) {
    app.get('/Contract/:id', ensureAuthorized, function (req, res) {
        var data = [];
        var i = 0;
        var db = mongojs(dbUrl.url, ['Orders', 'LOCUsers']);
        var contract = require('../config/contract');
        db.Orders.find({ 'importer': req.params.id }).count(function (err, count) {
            db.Orders.find({ 'importer': req.params.id }).forEach(function (err, DocM) {
                if (DocM) {
                    db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.expoter) }, function (err, DocE) {
                        DocM.ExporterName = DocE.companyname;
                        if (DocM.customs != undefined) {
                            db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.customs) }, function (err, DocC) {
                                DocM.CustomsName = DocC.companyname;
                                db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.insurance) }, function (err, DocI) {
                                    DocM.InsuranceName = DocI.companyname;
                                    db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.shipper) }, function (err, DocS) {
                                        DocM.ShipperName = DocS.companyname;
                                        db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.customsdestination) }, function (err, DocS) {
                                            DocM.CustomsNameDestination = DocS.companyname;
                                            data.push(DocM);
                                            i = i + 1;
                                            if (i == count) {
                                                db.close();
                                                res.json(data);
                                            }
                                        });
                                    });
                                });
                            });
                        }
                        else {
                            data.push(DocM);
                            i = i + 1;
                            if (i == count) {
                                res.json(data);
                            }
                        }
                    });
                }
            });
        });
    });

    app.get('/ShipmentDetail/:id', ensureAuthorized, function (req, res) {
        var data = [];
        var db = mongojs(dbUrl.url, ['Orders', 'LOCUsers']);
        db.Orders.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, DocM) {
            if (DocM) {
                db.LOCUsers.find({ _id: { $in: [mongojs.ObjectId(DocM.consignee), mongojs.ObjectId(DocM.shippingcompany)] } }, function (err, DocC) {
                    if (DocC[0].UserType == "Shipping Company") {
                        DocM.ShippingCompanyName = DocC[0].companyname;
                        DocM.ConsigneeName = DocC[1].companyname;
                    }
                    else {
                        DocM.ShippingCompanyName = DocC[1].companyname;
                        DocM.ConsigneeName = DocC[0].companyname;
                    }
                    db.close();
                    res.json(DocM);
                });
            }
        });
    });
    app.get('/GetShipperShipments/:id', ensureAuthorized, function (req, res) {
        var data = [];
        var i = 0;
        var db = mongojs(dbUrl.url, ['Orders', 'LOCUsers']);
        db.Orders.find({ 'shipper': req.params.id }).count(function (err, count) {
            db.Orders.find({ 'shipper': req.params.id }).forEach(function (err, DocM) {
                if (DocM) {
                    db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.consignee) }, function (err, DocE) {
                        DocM.ConsigneeName = DocE.companyname;
                        db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.shippingcompany) }, function (err, DocS) {
                            DocM.ShippingCompanyName = DocS.companyname;
                            db.SmartContracst.findOne({ bolid: JSON.stringify(DocM._id).replace(/"/g, "") }, function (err, DocC) {
                                if (DocC != null) {
                                    DocM.TransactionCode = DocC.contractaddress;
                                }
                                data.push(DocM);
                                i = i + 1;
                                if (i == count) {
                                    db.close();
                                    res.json(data);
                                }
                            });
                        });
                    });
                }
            });
        });
    });

    app.get('/GetConsigneeShipments/:id', ensureAuthorized, function (req, res) {
        var data = [];
        var i = 0;
        var db = mongojs(dbUrl.url, ['Orders', 'LOCUsers']);
        db.Orders.find({ 'consignee': req.params.id }).count(function (err, count) {
            db.Orders.find({ 'consignee': req.params.id }).forEach(function (err, DocM) {
                if (DocM) {
                    db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.shipper) }, function (err, DocE) {
                        DocM.ShipperName = DocE.companyname;
                        db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.shippingcompany) }, function (err, DocS) {
                            DocM.ShippingCompanyName = DocS.companyname;
                            db.SmartContracst.findOne({ bolid: JSON.stringify(DocM._id).replace(/"/g, "") }, function (err, DocC) {
                                if (DocC != null) {
                                    DocM.TransactionCode = DocC.contractaddress;
                                }
                                data.push(DocM);
                                i = i + 1;
                                if (i == count) {
                                    db.close();
                                    res.json(data);
                                }
                            });
                        });
                    });
                }
            });
        });
    });

    app.get('/GetBusinessRuleOutput/:id', ensureAuthorized, function (req, res) {
        var id = req.params.id;
        var db = mongojs(dbUrl.url, ['SmartContracst']);
        db.SmartContracst.findOne({ bolid: id }, function (err, doc) {
            if (doc) {
                var contract = require('../config/contract');
                contract.GetBusinessRules(doc,  function (BusinessRulesOutput) {
                    if (BusinessRulesOutput.b1.outcome == false) 
                    { 
                        BusinessRulesOutput.b9.outcome = false; 
                        BusinessRulesOutput.b10.outcome = false;
                        BusinessRulesOutput.b1.Justification = 'Violation of point 1. of L/C:Foul Bill of Lading issued by Shipping Company because damaged goods at Place of Receipt';
                        BusinessRulesOutput.b1.liable = 'Shipper/Exporter';
                        if(BusinessRulesOutput.b4.outcome  == false)
                        {
                            BusinessRulesOutput.b1.Justification = 'Violation of point 1. of L/C:Foul Bill of Lading Issued by Shipping Company because of missing goods at Place of Receipt';
                            BusinessRulesOutput.b1.liable = 'Shipper/Exporter';
                        }
                     }
                    if (BusinessRulesOutput.b2.outcome == false) 
                    { 
                        BusinessRulesOutput.b9.outcome = false; 
                        BusinessRulesOutput.b10.outcome = false; 
                    }
                    if (BusinessRulesOutput.b3.outcome == false) 
                    { 
                        BusinessRulesOutput.b9.outcome = false; 
                        BusinessRulesOutput.b10.outcome = false; 
                        BusinessRulesOutput.b3.Justification = 'Violation of point 3. of L/C: Integrity of Container not maintained';
                        BusinessRulesOutput.b3.liable = 'Shipping Company';
                    }
                    if (BusinessRulesOutput.b4.outcome == false) 
                    { 
                        BusinessRulesOutput.b9.outcome = false; 
                        BusinessRulesOutput.b10.outcome = false;
                        BusinessRulesOutput.b4.Justification = 'Violation of Point 4 of  L/C: Integrity of Handeling Units maintained';
                        BusinessRulesOutput.b4.liable = 'Shipping Company';
                     }
                    if (BusinessRulesOutput.b5.outcome == false) 
                    { 
                        BusinessRulesOutput.b9.outcome = false;
                        BusinessRulesOutput.b10.outcome = false;
                        BusinessRulesOutput.b5.Justification = 'Violation of point 5. of L/C:Different Port of Loading';
                        BusinessRulesOutput.b5.liable = 'Shipping Company';
                    }
                    if (BusinessRulesOutput.b6.outcome == false)
                    { 
                        BusinessRulesOutput.b9.outcome = false;
                        BusinessRulesOutput.b10.outcome = false;
                        BusinessRulesOutput.b6.Justification = 'Violation of point 6. of L/C: Ship reached wrong destination port.';
                        BusinessRulesOutput.b6.liable = 'Shipping Company';
                    }
                    if (BusinessRulesOutput.b7.outcome == false) 
                    { 
                        BusinessRulesOutput.b9.outcome = false;
                        BusinessRulesOutput.b10.outcome = false; 
                        BusinessRulesOutput.b7.Justification = 'Violation of point 7. of L/C:Wrong name of Consignee mentioned in Bill of Lading';
                        BusinessRulesOutput.b7.liable = 'Shipper/Exporter';
                        }
                    if (BusinessRulesOutput.b8.outcome == false) 
                    { 
                        BusinessRulesOutput.b9.outcome = false; 
                        BusinessRulesOutput.b10.outcome = false; 
                        BusinessRulesOutput.b8.Justification = '"Violation of point 8. of L/C:Delay in Shipment';
                        BusinessRulesOutput.b8.liable = 'Shipping Company'; 
                    }
                    db.close();
                    res.json(BusinessRulesOutput);
                });
            }
        });
    });
    app.get('/GetShippIngCompanyShipments/:id', ensureAuthorized, function (req, res) {
        var data = [];
        var i = 0;
        var db = mongojs(dbUrl.url, ['Orders', 'LOCUsers']);
        db.Orders.find({ $and: [{ 'shippingcompany': req.params.id }, { $or: [{ 'status': 'Send To Shipping Company' }, { 'status': 'Accepted By Shipping Company' }] }] }).count(function (err, count) {
            db.Orders.find({ $and: [{ 'shippingcompany': req.params.id }, { $or: [{ 'status': 'Send To Shipping Company' }, { 'status': 'Accepted By Shipping Company' }] }] }).forEach(function (err, DocM) {
                if (DocM) {
                    db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.consignee) }, function (err, DocE) {
                        DocM.ConsigneeName = DocE.companyname;
                        db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.shipper) }, function (err, DocS) {
                            DocM.ShipperName = DocS.companyname;
                            db.SmartContracst.findOne({ bolid: JSON.stringify(DocM._id).replace(/"/g, "") }, function (err, DocC) {
                                if (DocC != null) {
                                    DocM.TransactionCode = DocC.contractaddress;
                                }
                                data.push(DocM);
                                i = i + 1;
                                if (i == count) {
                                    db.close();
                                    res.json(data);
                                }
                            });
                        });
                    });
                }
            });
        });
    });

    app.get('/GetReadyToLoadShipments/:id', ensureAuthorized, function (req, res) {
        var data = [];
        var i = 0;
        var db = mongojs(dbUrl.url, ['Orders', 'LOCUsers']);
        db.Orders.find({ $and: [{ 'shippingcompany': req.params.id }, { 'status': 'Send For Loading' }] }).count(function (err, count) {
            db.Orders.find({ $and: [{ 'shippingcompany': req.params.id }, { 'status': 'Send For Loading' }] }).forEach(function (err, DocM) {
                if (DocM) {
                    db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.consignee) }, function (err, DocE) {
                        DocM.ConsigneeName = DocE.companyname;
                        db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.shipper) }, function (err, DocS) {
                            DocM.ShipperName = DocS.companyname;
                            db.SmartContracst.findOne({ bolid: JSON.stringify(DocM._id).replace(/"/g, "") }, function (err, DocC) {
                                if (DocC != null) {
                                    DocM.TransactionCode = DocC.contractaddress;
                                }
                                data.push(DocM);
                                i = i + 1;
                                if (i == count) {
                                    db.close();
                                    res.json(data);
                                }
                            });
                        });
                    });
                }
            });
        });
    });

    app.get('/GetReadyToUnLoadShipments/:id', ensureAuthorized, function (req, res) {
        var data = [];
        var i = 0;
        var db = mongojs(dbUrl.url, ['Orders', 'LOCUsers']);
        db.Orders.find({ $and: [{ 'shippingcompany': req.params.id }, { 'status': 'Shipment Loaded' }] }).count(function (err, count) {
            db.Orders.find({ $and: [{ 'shippingcompany': req.params.id }, { 'status': 'Shipment Loaded' }] }).forEach(function (err, DocM) {
                if (DocM) {
                    db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.consignee) }, function (err, DocE) {
                        DocM.ConsigneeName = DocE.companyname;
                        db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.shipper) }, function (err, DocS) {
                            DocM.ShipperName = DocS.companyname;
                            db.SmartContracst.findOne({ bolid: JSON.stringify(DocM._id).replace(/"/g, "") }, function (err, DocC) {
                                if (DocC != null) {
                                    DocM.TransactionCode = DocC.contractaddress;
                                }
                                data.push(DocM);
                                i = i + 1;
                                if (i == count) {
                                    db.close();
                                    res.json(data);
                                }
                            });
                        });
                    });
                }
            });
        });
    });

    app.get('/ContractGetCutomsOutgoing/:id', ensureAuthorized, function (req, res) {
        var data = [];
        var i = 0;
        var db = mongojs(dbUrl.url, ['Orders', 'LOCUsers']);
        db.Orders.find({ $and: [{ 'customsdestination': req.params.id }, { 'insurancestatus': 'Approved' }] }).count(function (err, count) {
            db.Orders.find({ $and: [{ 'customsdestination': req.params.id }, { 'insurancestatus': 'Approved' }] }).forEach(function (err, DocM) {
                if (DocM) {
                    db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.importer) }, function (err, DocE) {
                        DocM.ImporterName = DocE.companyname;
                        data.push(DocM);
                        i = i + 1;
                        if (i == count) {
                            db.close();
                            res.json(data);
                        }
                    });
                }
            });
        });
    });

    app.get('/ContractGetInsurance/:id', ensureAuthorized, function (req, res) {
        var data = [];
        var i = 0;
        var db = mongojs(dbUrl.url, ['Orders', 'LOCUsers']);
        db.Orders.find({ 'insurance': req.params.id }).count(function (err, count) {
            db.Orders.find({ 'insurance': req.params.id }).forEach(function (err, DocM) {
                if (DocM) {
                    db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.expoter) }, function (err, DocE) {
                        DocM.ExporterName = DocE.companyname;
                        data.push(DocM);
                        i = i + 1;
                        if (i == count) {
                            db.close();
                            res.json(data);
                        }
                    });
                }
            });
        });
    });

    app.get('/ContractGetInsuranceClaims/:id', ensureAuthorized, function (req, res) {
        var data = [];
        var i = 0;
        var db = mongojs(dbUrl.url, ['Orders', 'LOCUsers']);
        db.Orders.find({ $and: [{ 'insurance': req.params.id }, { 'status': 'Insurance Claimed' }] }).count(function (err, count) {
            db.Orders.find({ $and: [{ 'insurance': req.params.id }, { 'status': 'Insurance Claimed' }] }).forEach(function (err, DocM) {
                if (DocM) {
                    db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.expoter) }, function (err, DocE) {
                        DocM.ExporterName = DocE.companyname;
                        db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.importer) }, function (err, DocE) {
                            DocM.ImporterName = DocE.companyname;
                            data.push(DocM);
                            i = i + 1;
                            if (i == count) {
                                db.close();
                                res.json(data);
                            }
                        });
                    });
                }
            });
        });
    });

    app.get('/ExpoterList/', ensureAuthorized, function (req, res) {
        var db = mongojs(dbUrl.url, ['LOCUsers']);
        db.LOCUsers.find({ UserType: 'Expoter' }, { companyname: 1 }, function (err, doc) {
            db.close();
            res.json(doc);
        });
    });

    app.get('/getimpoterddldata/', ensureAuthorized, function (req, res) {
        var db = mongojs(dbUrl.url, ['LOCUsers']);
        db.LOCUsers.find({ UserType: { $in: ['Customs', 'Shipper', 'Insurer'] } }, { companyname: 1, UserType: 1 }, function (err, doc) {
            db.close();
            res.json(doc);
        });
    });

    app.get('/GetMapCoordinates/:id', ensureAuthorized, function (req, res) {
        var db = mongojs(dbUrl.url, ['MapPath']);
        db.MapPath.findOne({ 'shipmentid': '5a1d0c0a81825992e0c88481' }, function (err, doc) {
            db.close();
            res.json(doc);
        });
    });
    app.get('/getports', ensureAuthorized, function (req, res) {
        var db = mongojs(dbUrl.url, ['PortsList']);
        db.PortsList.find({}, function (err, doc) {
            db.close();
            res.json(doc);
        });
    });

    app.post('/ShipperSave', ensureAuthorized, function (req, res) {
        var s = req.body.handovershippingdate;
        var dateD = new Date(s.split('T')[0]);
        req.body.status = "With Shipper";
        req.body.handovershippingdate = dateD.toDateString();
        var db = mongojs(dbUrl.url, ['Orders']);
        db.Orders.insert(req.body, function (err, doc) {
            if (err) { console.log(" Woops! The error took place here... "); }
            else { db.close(); res.json("OK"); }
        });
    });

    app.put('/ContractCreateShipper/:id', ensureAuthorized, function (req, res) {
        var id = req.params.id;
        var db = mongojs(dbUrl.url, ['Orders']);
        db.Orders.findAndModify({
            query: { _id: mongojs.ObjectId(id) },
            update: { $set: { status: "Send To Shipping Company" } },
            new: true
        }, function (err, doc) {
            if (err) { console.log(" Woops! The error took place here... "); }
            else {
                var contract = require('../config/contract');
                contract.PublishDataContract(doc,  CreateLetterofCredit(null), function (message) {
                    if (message == "ok") { res.json("OK"); }
                });
            }
        }
        );
    });


    app.put('/AcceptShipmentShippingCompany/:id', ensureAuthorized, function (req, res) {
        //Update the shipment to say "Accepted by the shipping company"
        var id = req.params.id;
        var db = mongojs(dbUrl.url, ['Orders']);
        db.Orders.findAndModify({
            query: { _id: mongojs.ObjectId(id) },
            update: { $set: { status: "Accepted By Shipping Company" } },
            new: true
        }, function (err, doc) {
            if (err) { console.log(" Woops! The error took place here... "); }
            else { db.close(); res.json("OK"); }
        });
    });

    app.put('/ShippingComapanySave/', ensureAuthorized, function (req, res) {
        var id = req.body.ShipmentID;
        var s = req.body.receivedgoodsondate;
        var e = req.body.expecteddateofloading;
        var date_receivedgoodsondate = new Date(s.split('T')[0]);
        var date_expecteddateofloading = new Date(e.split('T')[0]);

        var db = mongojs(dbUrl.url, ['Orders']);
        db.Orders.findAndModify({
            query: { _id: mongojs.ObjectId(id) },
            update: {
                $set: {
                    status: "Send For Loading", receivedgoodsondate: date_receivedgoodsondate.toDateString(), billofladingno: req.body.billofladingno,
                    carrierscac: req.body.carrierscac, carriername: req.body.carriername, oceanvesselname: req.body.oceanvesselname, placeofreceipt: req.body.placeofreceipt,
                    portofdischarge: req.body.portofdischarge, bolissued: 'RECEIVED SHIPMENT BILL OF LADING', placeofdelivery: req.body.placeofdelivery, portofloading: req.body.portofloading, expecteddateofloading: date_expecteddateofloading.toDateString(),
                    authorizedpersonshippingcompany: req.body.authorizedpersonshippingcompany, containerfid: req.body.containerfid, cleanorfoul: req.body.cleanorfoul, costtobepaidbyshipper: req.body.costtobepaidbyshipper,
                    remarksbyshippingco: req.body.remarksbyshippingco, consignmentDataShippingCompany: req.body.consignmentDataShippingCompany
                }
            },
            new: false
        }, function (err, doc) {
            if (err) { console.log(" Woops! The error took place here... "); }
            else {
                //Add the new data to the contract
                db.Orders.findOne({ _id: mongojs.ObjectId(id) }, function (err, docu) {
                    var contract = require('../config/contract');
                    contract.saveShippingCompanyData(docu, function (message, data) {
                        if (message == "ok") { db.close(); res.json("OK"); }
                    });
                });
            }
        });
    });

    app.put('/ShippingComapanyLoadingSave/', ensureAuthorized, function (req, res) {
        var id = req.body.ShipmentIDLoad;
        var s = req.body.loadingdate;
        console.log(s);
        var date_loadingdate = new Date(s.split('T')[0]);

        var db = mongojs(dbUrl.url, ['Orders']);
        db.Orders.findAndModify({
            query: { _id: mongojs.ObjectId(id) },
            update: {
                $set: {
                    status: "Shipment Loaded", containerid: req.body.containerid, containerefidload: req.body.containerefidload,
                    loadedatport: req.body.loadedatport, gpscoordinatesofportofloading: req.body.gpscoordinatesofportofloading, loadingdate: date_loadingdate.toDateString(),
                    bolissued: 'Shipped On Board Bill of Lading', shipmastername: req.body.shipmastername, remarksloading: req.body.remarksloading
                }
            },
            new: false
        }, function (err, doc) {
            if (err) { console.log(" Woops! The error took place here... "); }
            else {
                //Add the new data to the contract
                db.Orders.findOne({ _id: mongojs.ObjectId(id) }, function (err, docu) {
                    var contract = require('../config/contract');
                    contract.saveShippingCompanyLoadingData(docu, function (message, data) {
                        if (message == "ok") { db.close(); res.json("OK"); }
                    });
                });

            }
        });
    });

    app.put('/ShippingComapanyUnLoadingSave/', ensureAuthorized, function (req, res) {
        var id = req.body.ShipmentIDLoad;
        var s = req.body.dateofarrivalunload;
        var date_dateofarrivalunload = new Date(s.split('T')[0]);

        var db = mongojs(dbUrl.url, ['Orders', 'SmartContracst']);
        db.Orders.findAndModify({
            query: { _id: mongojs.ObjectId(id) },
            update: {
                $set: {
                    status: "Shipment Un Loaded", portofdischargegps: req.body.portofdischargegps, dateofarrivalunload: date_dateofarrivalunload,
                    containerrfidunload: req.body.containerrfidunload, unloadconsignmentdata: req.body.UnLoadConsignmentData
                }
            },
            new: false
        }, function (err, doc) {
            if (err) { console.log(" Woops! The error took place here... "); }
            else {
                //Add the new data to the contract
                db.Orders.findOne({ _id: mongojs.ObjectId(id) }, function (err, docu) {
                    var contract = require('../config/contract');
                    contract.saveShippingCompanyUnLoadingData(docu, function (message) {
                        if (message == "ok") {
                            //Create the business rules contract 
                            contract.PublishBusinessRuleContract(id, function (message) {
                                if (message == "ok") {
                                    //Provide all the data to Business rule contract and get a outcome
                                    contract.ExecuteBusinessRules(id, function (message) {
                                        db.close();
                                        res.json("OK");
                                    });
                                }
                            });
                        }
                    });
                });

            }
        });
    });

    app.get('/getprofileandshippingcompany/:uid', function (req, res) {
        var db = mongojs(dbUrl.url, ['LOCUsers']);
        var data = [];
        db.LOCUsers.findOne({ _id: mongojs.ObjectId(req.params.uid) }, function (err, doc) {
            doc.password == "ASWRTY";
            data.push(doc);
            db.LOCUsers.find({ UserType: { $in: ['Consignee', 'Shipping Company'] } }, function (err, docs) {
                data.push(docs);
                db.close();
                res.json(data);
            });
        });
    });
};

function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}

function CreateLetterofCredit(doc) {
    var LetterofCredit = {
        'Bill of Lading issued by Shipping Company': 'Clean',
        'Final Status of Bill of Lading': 'Shipped Onboard Bill of Lading',
        'Integrity of Container Details': 'Same RFID of a Container at all three GPS Coordinates',
        'Condition and Integrity of Handling Units (HU) Details': 'Same RFIDs of all Handling Units, Count and Condition at three Key location: Place of Receipt, Port of Loading & Port of Destination. All Handling Units should be in good condition when unloaded at destination port.',
        'PortofLoading': 'Mumbai',
        'PortofDestination': 'Sydney',
        'DetailsofConsignee': '5a01895f613a01b8b42ca93c',
        'LastDateofShipment': 'Wed Jan 30 2018'
    };
    return LetterofCredit;
}

/*contract.getData(idc, function (result) {
    if (DocM.customs != undefined) {
        db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.customs) }, function (err, DocC) {
            DocM.CustomsName = DocC.companyname;
            db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.insurance) }, function (err, DocI) {
                DocM.InsuranceName = DocI.companyname;
                db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.shipper) }, function (err, DocS) {
                    DocM.ShipperName = DocS.companyname;
                    db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.customsdestination) }, function (err, DocS) {
                        DocM.CustomsNameDestination = DocS.companyname;
                        data.push(DocM);
                        data.push(JSON.parse(result[0]));
                        res.json(data);
                    });
                });
            });
        });
    }
    else {
        data.push(DocM);
        data.push(JSON.parse(result[0]));
        res.json(data);
    }
});*/