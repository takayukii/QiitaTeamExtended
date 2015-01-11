module.exports = Qiita;

function Qiita(host, token){
  this.host = host;
  this.token = token;
}
Qiita.prototype = {
  getItemHtml : function(id, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://' + this.host + '/api/v2/items/' + id, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var res = JSON.parse(xhr.responseText);
        callback(null, res.rendered_body);
      }else{
        callback(xhr, null);
      }
    };
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.token);
    xhr.send();

  }
};
