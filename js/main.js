$(document).ready(function() {
  var user;
  var userMessage;
  var friends = {};
  var mostRecent = '2013-08-20T02:08:09.042Z';

  $.ajax('https://api.parse.com/1/classes/messages?order=-createdAt&where={"createdAt":{"$gte":{"__type":"Date","iso":"'+ mostRecent +'"}}}', {
    contentType: 'application/json',
    success: function(data){
      mostRecent = data.results[0].createdAt;
      _.each(data.results, function(userData) {
        var username = userData.username || 'visitor';
        var date = moment(userData.createdAt).fromNow();
        var message = username + ': ' + userData.text + ', ' + date;

        $('#messages').append($('<div class="messageContainer"/>').data('username', username).text(message));
          console.log(userData);
      });
      setUpFriends();
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

  var setUpFriends = function() {
    $('.messageContainer').on('click', function() {
      var dataAttr = $(this).data().username;
      friends[dataAttr] = dataAttr;
    });
  };



  //when user clicks username,add to friend set with friend[username] = username
  // for each username in set, make messages bold font 
});
