ETFDEM.controller('MainController', ['$scope', 'config', '$http', function($scope, config, $http) {
  $scope.phrase = '';
  $scope.translatePhrase = function() {
    var params = { phrase : $scope.phrase };
  	$http.post(config.NODEURL + 'translate-to-filipino', params).then(function(resp){
      $scope.search_phrase = $scope.phrase;
      $scope.phrase = '';
      $('#result').show();
      $scope.translation = resp.data;
    }, function(resp) {
      throw 'There was an error.';
    });
  };

  // phrases must only contain alphanumeric and space characters
  $('#phrase').on('keyup', function(e) {
  	// if enter key, translate
  	if (e.which === 13) {
  		$scope.translatePhrase();
      //console.log($scope.phrase);
  		return;
  	}
  	// if key pressed is not equal to space key
  	// note: buggy behaviour without this IF statement for checking the space character.
  	if (e.which !== 32) {
  		$scope.phrase = $scope.phrase.replace(/[^A-Za-z0-9\s,\.?!']/g, '');
      $('#phrase').val($scope.phrase);
  	}
  });
}]);

ETFDEM.controller('AdminController', ['$scope', 'config', '$http', function($scope, config, $http) {
  var Words, words, whenClicked, addWords, admin, noloop, noloop2;
  $scope.word = $scope.word || {};
  $scope.sentence = $scope.sentence || {};
  $scope.word.type = 'noun'; // set default select
  $scope.sentence.isFormal = 0;
  $scope.suggest = [];
  $scope.suggest_sentence = [];

  adminAdd = {
    whenClicked : function () {
      var that = this;
      $('#addWords').click(function() {
        noloop = false;
        $scope.suggest = [];
        that.addWords();
      });

      $('#addSentence').click(function() {
        noloop2 = false;
        $scope.suggest_sentence = [];
        that.addSentence();
      });
    },
    addWords : function() {
      words = new Words($scope.word.eng_word, $scope.word.fil_word, $scope.word.type);
      words.insert(function(data, status) {
        if (status !== 200) {
          throw 'There was an error sending POST.';
          return;
        };

        $scope.word.eng_word = '';
        $scope.word.fil_word = '';
      });
    },
    addSentence : function() {
      sentence = new Sentence($scope.sentence.eng, $scope.sentence.fil, $scope.sentence.isFormal);
      sentence.insert(function(data, status) {
        if (status !== 200) {
          throw 'There was an error sending POST.';
          return;
        };

        $scope.sentence.eng = '';
        $scope.sentence.fil = '';
        $scope.sentence.isFormal = 0;
      });
    }
  };

  // for adding words
  noloop = false;
  $('#eng_word').on('keyup', function(e) {
    var char = $('#eng_word').val();
    if (char) {
      if (!noloop) {
        $http.post(config.NODEURL + 'suggest-words', { char : char }).then(function(resp){
          if ($.isEmptyObject(resp.data) === false) {
            var data = resp.data;
            for (var key in data) {
              if (data.hasOwnProperty(key)) {
                $scope.suggest.push(data[key]);
              };
            };
            $('div#suggest').show();
          };
        }, function(resp) {
          throw resp.status;
        });
      }
      noloop = true;
    } else {
      $('div#suggest').hide();
      $scope.suggest = [];
      noloop = false;
    }
  });

  $('#fil_word').on('keyup', function(e) {
    if (e.which === 13) {
      //adminAdd.addWords();
      $('#addWords').click();
      $('#eng_word').focus();
    }
  });

  // for adding sentences
  noloop2 = false;
  $('#eng_sentence').on('keyup', function(e) {
    var char = $('#eng_sentence').val();
    if (char) {
      if (!noloop2) {
        $http.post(config.NODEURL + 'suggest-sentences', { char : char }).then(function(resp){
          if ($.isEmptyObject(resp.data) === false) {
            var data = resp.data;
            for (var key in data) {
              if (data.hasOwnProperty(key)) {
                $scope.suggest_sentence.push(data[key]);
              };
            };
            $('div#suggest_sentence').show();
          };
        }, function(resp) {
          throw resp.status;
        });
      }
      noloop2 = true;
    } else {
      $('div#suggest_sentence').hide();
      $scope.suggest_sentence = [];
      noloop2 = false;
    }
  });

  // listen to click events
  adminAdd.whenClicked();

  // create the Words object
  Words = function(eng, fil, type) {
    this.eng = eng;
    this.fil = fil;
    this.word_type = type;
  };
  Words.prototype.insert = function(callback) {
    var params = { english: this.eng, filipino: this.fil, type: this.word_type };
    $http.post(config.NODEURL + 'add-to-dictionary', params).then(function(resp){
      callback(resp.data, resp.status);
    }, function(resp) {
      callback(resp.data, resp.status);
    });
  };

  // create the Sentence object
  Sentence = function(eng, fil, isFormal) {
    this.eng = eng;
    this.fil = fil;
    this.isFormal = isFormal;
  };
  Sentence.prototype.insert = function(callback) {
    var params = { english: this.eng, filipino: this.fil, isFormal: this.isFormal };
    $http.post(config.NODEURL + 'add-to-sentences', params).then(function(resp){
      callback(resp.data, resp.status);
    }, function(resp) {
      callback(resp.data, resp.status);
    });
  }
}]);