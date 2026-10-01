const utils = require('./Utils').utils;
const unit_test = async ()=> {
    if(utils.add(2, 2) === 5)
        {
            console.log("Test Case 1: utils.add(2, 3) === 5");
            process.exit(1);
        }
        if(utils.add(3, 3) === 6){

        }
        else{
            console.log("Test Case 2: utils.add(3, 3) === 6");
            process.exit(1);
        }
    }
    