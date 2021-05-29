const csvtojson = require("csvtojson");
const mongoose = require("mongoose");
const async = require("async");

const agentDB = mongoose.model("Agent");
const carrierDB = mongoose.model("Carrier");
const lobDB = mongoose.model("LOB");
const policyDB = mongoose.model("Policy");
const user_accountDB = mongoose.model("Users_Account");
const userDB = mongoose.model("User");

let dataArray = [];

agentDB.find().exec(function (err, res) {
  if (res.length === 0) {
    csvtojson()
      .fromFile("data-sheet.csv")
      .then((csvData) => {
        dataArray = csvData;
        if (dataArray.length) {
          importDataFunc(dataArray, 0);
        }
      });
  } else {
    console.log("Already datas imported");
  }
});

function importDataFunc(impData, inc) {
  try {
    let info = impData[inc];
    if (info) {
      dbCreateCallback(info, function (err, res) {
        if (inc != impData.length - 1) {
          inc = inc + 1;
          importDataFunc(impData, inc);
        } else {
          console.log("Imported Successfully");
        }
      });
    }
  } catch (e) {
    console.log("Import Function Exception----", e);
  }
}

function dbCreateCallback(items, callback) {
  try {
    async.parallel(
      {
        agent: function (cb) {
          agentDB.create({ AgentName: items.agent }, cb);
        },
        carrier: function (cb) {
          carrierDB.create({ company_name: items.company_name }, cb);
        },
        lob: function (cb) {
          lobDB.create({ category_name: items.category_name }, cb);
        },
        lob: function (cb) {
          user_accountDB.create({ AccountName: items.account_name }, cb);
        },
        user: function (cb) {
          let userData = {
            firstname: items.firstname,
            Dob: items.dob,
            address: items.address,
            phonenumber: items.phone,
            state: items.state,
            zipcode: items.zip,
            email: items.email,
            gender: items.gender,
            userType: items.userType,
          };
          userDB.create(userData, cb);
        },
      },
      function (err, result) {
        let policyData = {
          policy_number: items.policy_number,
          policy_start_date: items.policy_start_date,
          policy_end_date: items.policy_end_date,
          policy_category: items.category_name,
          company_collection_id: mongoose.mongo.ObjectId(result.carrier._id),
          user_id: mongoose.mongo.ObjectId(result.user._id),
        };

        policyDB.create(policyData, function (policyerr, policyres) {
          if (!policyerr) {
            callback(1);
          }
        });
      }
    );
  } catch (e) {
    callback(1);
  }
}
