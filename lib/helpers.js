
var helpers = {};

helpers.createRandomString = function(strLength){
    strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
    if(strLength){
      var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      var str = '';
      for(i = 1; i <= strLength; i++) {

          var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
          str+=randomCharacter;
      }
      return str;
    } else {
      return false;
    }
  };

  module.exports = helpers;