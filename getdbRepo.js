const dbrepo = require('./dbRepo');
const dbrepo_test = require('./mock/DbRepoMock');

function get_dbrepo(mode){
    if(mode == 'test'){
        return dbrepo_test;
    }
    return dbrepo;
}
module.exports.get_dbrepo = get_dbrepo;