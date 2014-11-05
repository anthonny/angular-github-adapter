angular.module('pascalprecht.github-adapter')

.factory('$githubAuthorization', ['$q', function ($q) {

  return function (authorization) {

    var authorizationPromiseAdapter = {

      create: function (options) {
        var deferred = $q.defer();

        authorization.create(options, function (err, res) {
          if (err) {
            deferred.reject(err);
          } else {
            deferred.resolve(res);
          }
        });
        return deferred.promise;
      },

      list: function () {
        var deferred = $q.defer();

        authorization.list(function (err, res) {
          if (err) {
            deferred.reject(err);
          } else {
            deferred.resolve(res);
          }
        });
        return deferred.promise;
      }
    };

    return authorizationPromiseAdapter;
  };

}]);
