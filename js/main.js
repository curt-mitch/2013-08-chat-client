//var userID = (window.location.search).slice((window.location.search).indexOf("=") + 1);

//create HTML nodes to hold chat data from server

//string.slice(beginslice[, endSlice])

$(document).ready(function() {
  var user;
  var userMessage;

  $.ajax('https://api.parse.com/1/classes/messages', {
    contentType: 'application/json',
    success: function(data){
      _.each(data.results, function(userData) {
        var username = userData.username || 'visitor';
        var date = moment(userData.createdAt).fromNow();
        var message = username + ': ' + userData.text + ', ' + date;

        $('#messages').append($('<span/>').text(message).append('<br>'));
          console.log(userData);
      });
    },
    error: function(data) {
      console.log('Ajax request failed </3');
    }
  });

  $('#chatbutton').on('click', function() {
    user = $('#userForm').val();
    userMessage = $('#inputmessage').val();
    var data = messageData(user, userMessage);
    postMessage(data);
  });

  var messageData = function(username, message){
    var result = {};
    result.username = username;
    result.text = message;
    return result;
  };

  var postMessage = function(messageData){
    $.ajax('https://api.parse.com/1/classes/messages', {
      contentType: 'application/json',
      type: 'POST',
      data: messageData,
      success: function(){
        console.log('Success!!!');
      }
    });
  };
});
