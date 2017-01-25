// ----------------------------------------
// UserService
// ----------------------------------------

MyApp.factory('UserService',
  ['_', '$http', 'BirthdayService',
  function(_, $http, BirthdayService) {

    // ----------------------------------------
    // Private
    // ----------------------------------------

    var _id;
    var _users = {};


    var _extendUser = function(user) {

      // Extend the user object
      // to handle its own deletion
      user.destroy = function() {

        // Remove the user from the
        // _users list
        delete _users[user.id];

        // Remove the user's ID
        // from the list of IDs
        // for the user's birthday
        BirthdayService.removeUser(user);
      };
    };


    var _extendUsers = function(users) {

      // Extend all users in the list
      _.each(users, function(user) {
        _extendUser(user);
      });
    };


    // ----------------------------------------
    // Public
    // ----------------------------------------

    var UserService = {};

    UserService.create = function(params) {

      // Create a new user object
      // from the params
      var user = angular.copy(params, {});

      // Get the next ID in the sequence
      var nextId = UserService.nextId();

      // Set the user's ID
      user.id = nextId;

      // Add the user to the users list
      // at the key of the user's ID
      _users[nextId] = user;

      // Extend the user
      _extendUser(user);

      // Increment the ID counter
      _id += 1;

      // Add the user's ID to the list of
      // user IDs for the user's birthday
      BirthdayService.createOrAppendTo(user.birthday, user.id);

      // Return a promise so this method
      // can be chained with .then()
      // and the user can be accessed 
      // in the callback
      return new Promise(function(resolve) { resolve(user) });
    };


    UserService.all = function() {

      // Get the list of users
      // from the JSON object
      return $http({
        url: '/data/users.json',
        method: 'GET'
      })
        .then(function(response) {

          // Copy in the data
          angular.copy(response.data, _users);

          // Extend the list of users
          _extendUsers(_users);

          // Return the list
          return _users;
        });
    };


    UserService.nextId = function() {

      // If the _id counter is not initialized
      if (!_id) {

        // If there are no users
        if (_.isEmpty(_users)) {

          // Initialize the counter to 1
          return _id = 1;
        }

        // If we have users map the IDs to an array
        var ids = _.map(Object.keys(_users), function(id) {
          return parseInt(id);
        });

        // Find the max ID
        _id = _.max(ids);

        // Return the next ID
        return _id + 1;
      }

      // If we have a counter
      // return the next ID
      return _id + 1;
    };

    return UserService;

  }]);








