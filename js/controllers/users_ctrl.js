// ----------------------------------------
// UsersCtrl
// ----------------------------------------

MyApp.controller('UsersCtrl',
  ['_', '$scope', 'UserService', 'BirthdayService',
  function(_, $scope, UserService, BirthdayService) {

    $scope.userParams = {
      username: 'dude',
      email: 'dude@example.com',
      birthday: '2016-01-01',
      profile: {
        gender: 'male',
        favorite_food: 'Steak'
      }
    };


    UserService.all()
      .then(function(users) {
        $scope.users = users;
      });


    BirthdayService.all()
      .then(function(birthdays) {
        $scope.birthdays = birthdays;
      });

    $scope.createUser = function() {
      var u = $scope.userParams;
      var user = {
        username: u.username,
        email: u.email,
        birthday: u.birthday,
        profile: {
          gender: u.profile.gender,
          favorite_food: u.profile.favorite_food
        }
      };
      UserService.create(user);
    };

  }]);




