//create HTML nodes to hold chat data from server
  $.ajax('https://api.parse.com/1/classes/messages', {
    contentType: 'application/json',
    success: function(data){
      _.each(data.results, function(userData) {
        var username = userData.username || 'visitor';
        var message = userData.text;
        var date = moment(userData.createdAt).fromNow();
        $(messages).append(username + ': ' + message + ', ' + date +  '<br>');
        console.log(userData);
      });
    }
  });

