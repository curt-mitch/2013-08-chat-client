$(document).ready(function() {
  var user;
  var userMessage;

  // where={"createdAt":{"$gte":{"__type":"Date","iso":"2011-08-21T18:02:52.249Z"}}}

  var mostRecent = '2013-08-20T02:08:09.042Z';

  $.ajax('https://api.parse.com/1/classes/messages?order=-createdAt&where={"createdAt":{"$gte":{"__type":"Date","iso":"'+ mostRecent +'"}}}', {
    contentType: 'application/json',
    success: function(data){
      mostRecent = data.results[0].createdAt;
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
      data: JSON.stringify(messageData),
      success: function(){
        console.log('Success!!!');
      }
    });
  };

  //when user clicks username,add to friend set with friend[username] = username
  // for each username in set, make messages bold font 
});
