angular.module('pascalprecht.github-adapter', ['ng']);

angular.module('pascalprecht.github-adapter').provider('$github', function () {

  var $username,
      $password,
      $authType,
      $token,
      $OAUTH = 'oauth',
      $BASIC = 'basic';

  // Constant for authentication

  this.OAUTH = $OAUTH;
  this.BASIC = $BASIC;

  this.username = function (name) {
    if (!name) {
      return $username;
    }
    $username = name;
  };

  this.password = function (password) {
    if (!password) {
      return $password;
    }
    $password = password;
  };

  this.authType = function (type) {
    if (!type) {
      return $authType;
    }
    $authType = type;
  };
  this.token = function (token) {
    if (!token) {
      return $token;
    }
    $token = token;
  };

  this.$get = ['$q', '$githubRepository', '$githubUser', '$githubGist', function ($q, $githubRepository, $githubUser, $githubGist, $githubAuthorization) {

    var config = {};
    if ($username && $password) {
      config = {
        username: $username,
        password: $password,
        auth: $authType || 'basic'
      }
    }
    if ($token) {
      config.token = $token;
    }
    var github = new Github(config);

    var $github = {};

    $github.setCreds = function (authType, username, password) {
      var credentials;

      if (authType === $BASIC) {
        credentials = {
          username: username,
          password: password,
          auth: authType
        };
      } else {
        credentials = {
          token: username,
          auth: authType
        };
      }

      github = new Github(credentials);
    };

    $github.getRepo = function (username, reponame) {
      return $q.when($githubRepository(github.getRepo(username, reponame)));
    };

    $github.getUser = function () {
      return $q.when($githubUser(github.getUser()));
    };

    $github.getGist = function (id) {
      return $q.when($githubGist(github.getGist(id)));
    };

    $github.getAuthorization = function () {
      return $q.when($githubAuthorization(github.getAuthorization()));
    };

    return $github;
  }];
});
