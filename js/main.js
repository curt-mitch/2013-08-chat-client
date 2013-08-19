//create HTML nodes to hold chat data from server
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

//
