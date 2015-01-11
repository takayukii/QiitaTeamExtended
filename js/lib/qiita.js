module.exports = Qiita;

function Qiita(host, token){
  this.host = host;
  this.token = token;
}
Qiita.prototype = {
  getItemHtml: function(id, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://' + this.host + '/api/v2/items/' + id, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if(200 <= xhr.status && xhr.status < 300){
          var res = JSON.parse(xhr.responseText);
          callback(null, {
            "title": res.title,
            "body_html": res.rendered_body,
            "body_md": res.body,
          });
        }else{
          callback(xhr.responseText, null);
        }
      }
    };
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.token);
    xhr.send();
  },
  postItem: function(title, body, tags, callback){

    var _tags = [];
    for(var i = 0; i < tags.length; i ++){
      _tags.push({'name': tags[i]});
    }

    var message = {
        "body": body,
        "coediting": false,
        "gist": false,
        "private": false,
        "tags": _tags,
        "title": title,
        "tweet": false
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'https://qiita.com/api/v2/items', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if(200 <= xhr.status && xhr.status < 300){
          callback(null, xhr.responseText);
        }else{
          callback(xhr.responseText, null);
        }
      }
    };
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.token);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(message));

  }
};
