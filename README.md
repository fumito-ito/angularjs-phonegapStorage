# Aungular Phonegap Storage

An angularJS wrapper around window.openDatabase for Phonegap/Cordova plugin

## example

````javascript
function testCtrl ($scope, phonegapStorage) {
    // if you want to know details of phonegap storage api, see http://docs.phonegap.com/en/2.9.0/cordova_storage_storage.md.html#Storage
    var testDb = phonegapStorage.openDatabase('testDb', '1.0', 'testDb', 1000);

    var txs = function (tx) {

        // executeSql with Promise
        tx.executeSql('DROP TABLE IF EXISTS DEMO').then( function (resultObj) {
            console.log('success query with id ::', resultObj.resultSet.insetId);
        }, function (err) {
            console.log('failure query with error ::', err.codde);
        });
    }

    // transaction with Promise
    test.transaction(txs).then(function () {
        console.log('success transaction');
    }, function () {
        console.log('failure transaction')''
    });
}
````