// ----------------------------------------
// BirthdayService
// ----------------------------------------

MyApp.factory('BirthdayService', 
  ['_', '$http',
  function(_, $http) {

    // ----------------------------------------
    // Private
    // ----------------------------------------

    var _birthdays = {};

    // ----------------------------------------
    // Public
    // ----------------------------------------

    var BirthdayService = {};


    BirthdayService.removeUser = function(user) {

      // Get the list of user IDs for the
      // given user's birthday
      var userIds = _birthdays[user.birthday];

      // Find the index of the user's ID
      var index = _.indexOf(userIds, user.id);

      // Remove that user's ID from the list
      userIds.splice(index, 1);

      // If the list is empty
      if (!userIds.length) {

        // Delete the birthday from the list
        delete _birthdays[user.birthday];
      }
    };


    BirthdayService.createOrAppendTo = function(birthday, userId) {

      // If the birthday exists
      if (_birthdays[birthday]) {

        // Push the user's ID to the list
        _birthdays[birthday].push(userId);
      } else {

        // If not, initialize it with an
        // array containing the user's ID
        _birthdays[birthday] = [userId];
      }
    };


    BirthdayService.all = function() {

      // Get the list of birthdays
      return $http({
        url: '/data/birthdays.json',
        method: 'GET'
      })
        .then(function(response) {

          // Copy in the data and return
          return angular.copy(response.data, _birthdays);
        });
    };


    return BirthdayService;


  }]);




