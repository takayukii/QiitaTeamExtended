chrome.tabs.getSelected(null, function(tab) {

  console.log("getSelected", tab.title, tab.url);

  var Vue = require('vue');
  var Qiita = require('./qiita');
  var Mandrill = require('./mandrill');

  var vm = new Vue({
      el : '#qiita-team-extended-index',
      data : {
          title : 'Qiita Team Ex',
          message : "",
          verified : false,
          content_title : "",
          content_body : ""
      },
      created: function() {
        console.log("created");
        var self = this;

        this.message = "情報が未設定のため「オプション」から設定してください";
        this.verified = true;
      },
      methods: {
          distribute: function () {
              this.message = "distribute";
          },
          post: function () {
              this.message = "post";
          }
      }
  });

});