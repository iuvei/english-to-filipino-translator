ETFDEM.controller('MainController', ['$scope', function($scope) {
  $scope.phrase = '';
  $scope.translatePhrase = function() {
  	console.log($scope.phrase);
  };

  // phrases must only contain alphanumeric and space characters
  $('#phrase').on('keyup', function(e) {
  	// if enter key, translate
  	if (e.which === 13) {
  		$scope.translatePhrase();
  		return;
  	}
  	// if key pressed is not equal to space key
  	// note: buggy behaviour without this IF statement for checking the space character.
  	if (e.which !== 32) {
  		$scope.phrase = $scope.phrase.replace(/[^A-Za-z0-9\s]+/g, '');
  		$('#phrase').val($scope.phrase);
  	}
  });
}]);

ETFDEM.controller('AdminController', ['$scope', '$route', 'config', '$http', function($scope, $route, config, $http) {
  var Words, words, whenClicked, addWords, admin;
  var p = $route.current.params;

  adminAdd = {
    whenClicked : function () {
      var that = this;
      $('#addWords').click(function() {
        that.addWords();
      });
    },
    addWords : function() {
      words = new Words($scope.word.eng_word, $scope.word.fil_word);
      words.insert(function(data, status) {
        if (status !== 200) {
          console.log('There was an error sending POST.');
          return;
        };

        console.log('success');
      });
    }
  };

  // check the URL path
  if (p.words_dictionary) {
    // words_dictionary
    adminAdd.whenClicked();
  } else {
    // '/'
    adminAdd.whenClicked();
  }

  // create the Words object
  Words = function(eng, fil) {
    this.eng = eng;
    this.fil = fil;
  };
  Words.prototype.insert = function(callback) {
    var params = { english: this.eng, filipino: this.fil };
    $http.post(config.NODEURL + 'add-to-dictionary', params).then(function(resp){
      callback(resp.data, resp.status);
    }, function(resp) {
      callback(resp.data, resp.status);
    });
  }
}]);