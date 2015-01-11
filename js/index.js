chrome.tabs.getSelected(null, function(tab) {

  console.log("getSelected", tab.title, tab.url);

  var Vue = require('vue');
  var Qiita = require('./lib/qiita');
  var Mandrill = require('./lib/mandrill');

  var vm = new Vue({
      el: '#qiita-team-extended-index',
      data: {
          title: 'Qiita Team Ex',
          message: "",
          verified: false,
          content_title: "",
          content_body: "",
          tab_title: tab.title,
          tab_url: tab.url
      },
      created: function() {
        console.log("createdxx");
        var self = this;

        self.message = "情報が未設定のため「オプション」から設定してください";
        self.verified = false;

        var host = localStorage["host"];
        console.log("host: " + host);
        var token = localStorage["token"];
        console.log("token: " + token);

        if(!host || !token){
          return;
        }

        var retrieveQiitaContent = function(host, token, url){

          console.log("retrieveQiitaContent");

          var regex = new RegExp('^http.+://' + host + '/.+/([0-9a-f]{20}).*$');
          var matched = regex.exec(url);

          if(matched){
            var item_id = matched[1];

            var qiita = new Qiita(host, token);
            qiita.getItemHtml(item_id, function(err, res){

              if(err){
                self.message = "エラーが発生しました";
              }
              self.message = "投稿内容を取得しました";
              self.content_title = res.title;
              self.content_body = res.body;

              self.verified = true;

            });
          }else{
            self.message = "Qiita Teamの投稿ページで実行してください";
          }

        };

        retrieveQiitaContent(host, token, self.tab_url);
      },
      methods: {
          distribute: function () {
            var self = this;
            self.message = "メール送信します";

            var apikey = localStorage["apikey"];
            console.log("apikey: " + apikey);
            var your_email = localStorage["your_email"];
            console.log("your_email: " + your_email);
            var team_email = localStorage["team_email"];
            console.log("team_email: " + team_email);

            if(!apikey || !your_email || !team_email){
              self.message = "！情報が未設定のため「オプション」から設定してください";
              return;
            }

            var mandrill = new Mandrill(apikey);
            var body = 'Qiita Team上の投稿へのリンクは <a href="' + self.tab_url + '">' + self.content_title + '</a> です。<br/>' + self.content_body;

            mandrill.send(your_email, team_email, self.content_title, body, function(err, response){
              if(err){
                self.message = "メール送信に失敗しました";
              }else{
                self.message = "メール送信しました";
              }
            });
          },
          post: function () {
              this.message = "post";
          }
      }
  });

});
