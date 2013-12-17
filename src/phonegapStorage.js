'use strict';

/**
 * error messages
 */
angular.module('phonegapStorage', []).constant('phonegapStorage_msgs', {
    'errors.phonegapStorage.notSupported': 'window.openDatabase is not supported on this device'
});

/**
 * Angular Phonegap Storage
 */
angular.module('phonegapStorage').factory('phonegapStorage', [
    '$q',
    '$rootScope',
    '$window',
    'phonegapStorage_msgs'
    function ($q, $rootScope, $window, phonegapStorage_msgs) {
        var storage = {};

        var extendSQLTransaction = function (tx, queryFn) {
            var exTx = {};

            exTx.executeSql = function (queryString) {
                var deferred = $q.defer();
                //
                tx.executeSql(queryString, [], function (tx, results) {
                    $rootScope.$apply( deferred.resolve({tx: tx, results: results}) );
                }, function (err) {
                    $rootScope.$apply( deferred.reject );
                });

                return deferred.promise;
            }

            return queryFn(exTx);
        };

        var extendDatabase = function (db) {
            var exDb = {};

            exDb.transaction = function (query) {
                var deferred = $q.defer();
                //
                db.transaction(function (tx) {
                    return extendSQLTransaction(tx, queryFn);
                }, function (err) {
                    $rootScope.$apply( deferred.reject(err) );
                }, function () {
                    $rootScope.$apply( deferred.resolve() );
                });

                return deferred.promise;
            };

            exDb.changeVersion = db.changeVersion;

            return exDb;
        };

        storage.openDatabase = function (database_name, database_version, database_displayname, database_size) {
            var deferred = $q.defer();

            if ($window && $window.openDatabase) {
                //
                var db = $window.openDatabase(database_name, database_version, database_displayname, database_size);
                return extendDatabase(db);
            } else {
                // storage api is not defined or permitted.
                $rootScope.$broadcast('error', phonegapStorage_msgs['errors.phonegapStorage.notSupported']);
                $rootScope.$apply( function () {
                    deferred.reject(phonegapStorage_msgs['errors.phonegapStorage.notSupported']);
                });
            }

            return deferred.promise;
        };

        return storage;
    }]);