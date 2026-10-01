const utils = require('./Utils.ts').utils;
const unit_test = async ()=> {
    if(utils.add(2, 3) === 5)
      {
            console.log("Test Case 1 failed: utils.add(2, 3) === 5");
            process.exit(1);
        }
        if(utils.add(3, 3) === 6){

        }
        else{
            console.log("Test Case 2 failed: utils.add(3, 3) === 6");
            process.exit(1);
        }
    }

unit_test();
