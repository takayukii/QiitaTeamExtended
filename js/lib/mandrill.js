module.exports = Mandrill;

function Mandrill(apikey){
  this.apikey = apikey;
}
Mandrill.prototype = {
  send : function(from, to, title, body, callback){

   var message = {
        "key": this.apikey,
        "message": {
            "html": body,
            "subject": title,
            "from_email": from,
            "to": [{
                    "email": to,
                    "type": "to"
                }],
            "headers": {
                "Reply-To": from
            }
        }
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'https://mandrillapp.com/api/1.0/messages/send.json', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        callback(null, xhr.responseText);
      }else{
        callback(xhr.responseText, null);
      }
    };
    xhr.send(JSON.stringify(message));
  }
};
