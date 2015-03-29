chrome.tabs.getSelected(null, function(tab) {

  console.log("getSelected", tab.title, tab.url);

  var Vue = require('vue');
  var $ = require('jquery');
  var Qiita = require('./lib/qiita');
  var Mandrill = require('./lib/mandrill');

  var vm = new Vue({
      el: '#qiita-team-extended-index',
      data: {
          title: 'Qiita Team Ex',
          message: "",
          verified: false,
          content_title: "",
          content_body_html: "",
          content_body_md: "",
          tab_title: tab.title,
          tab_url: tab.url,
          posting: false,
          qiita_tags: ""
      },
      created: function() {
        var self = this;

        self.message = "情報が未設定のため「オプション」から設定してください";
        self.verified = false;

        var host = localStorage["host"];
        var token = localStorage["token"];

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
                return;
              }

              var $body = $('<div style="padding: 2px;">' + res.body_html + '</div>');
              var $tables = $body.find('table');
              $.each($tables, function(idx, table){
                var $table = $(table);
                $table.attr('style', 'border: 1px solid silver; border-collapse: collapse; padding: 1px;');
              });
              var $tds = $body.find('td');
              $.each($tds, function(idx, td){
                var $td = $(td);
                $td.attr('style', 'border: 1px solid silver; border-collapse: collapse; padding: 1px;');
              });
              var $ths = $body.find('th');
              $.each($ths, function(idx, th){
                var $th = $(th);
                $th.attr('style', 'border: 1px solid silver; border-collapse: collapse; padding: 1px;');
              });

              self.message = "投稿内容を取得しました";
              self.content_title = res.title;
              self.content_body_html = $body.html();//res.body_html;
              self.content_body_md = res.body_md;

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
          var your_email = localStorage["your_email"];
          var team_email = localStorage["team_email"];

          if(!apikey || !your_email || !team_email){
            self.message = "情報が未設定のため「オプション」から設定してください";
            return;
          }

          var body = 'Qiita Team上の投稿へのリンクは <a href="' + self.tab_url + '">' + self.content_title + '</a> です。<br/>' + self.content_body_html;

          var mandrill = new Mandrill(apikey);
          mandrill.send(your_email, team_email, self.content_title, body, function(err, response){
            if(err){
              self.message = "メール送信に失敗しました";
            }else{
              self.message = "メール送信しました";
            }
          });
        },
        post: function () {
          var self = this;
          self.message = "Qiitaに投稿します";
          var tags = self.qiita_tags.replace(/\s+/g, "").split(',');
          var host = localStorage["host"];
          var token = localStorage["token"];

          if(!host || !token){
            self.message = "情報が未設定のため「オプション」から設定してください";
            return;
          }
          if(tags.length < 1){
            self.message = "タグは必ず1つ以上必要です";
            return;
          }
          var qiita = new Qiita(host, token);
          qiita.postItem(self.content_title, self.content_body_md, tags, function(err, res){

            if(err){
              self.message = "エラーが発生しました";
              return;
            }
            self.message = "Qiitaに投稿しました";
            self.posting = false;

          });

        },
        tags: function () {
          this.message = "Qiitaに投稿するには最低1つのタグが必要です（複数カンマ区切り）";
          this.posting = true;
        }
      }
  });

});
