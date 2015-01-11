var Vue = require('vue');

var vm = new Vue({
    el: '#qiita-team-extended-options',
    data: {
        title: 'Qiita Team Ex Options',
        host: "",
        token: "",
        apikey: "",
        your_email: "",
        team_email: "",
        message: ""
    },
    created: function() {
      console.log("created");
      var self = this;

      this.host = localStorage["host"] ? localStorage["host"] : "";
      this.token = localStorage["token"] ? localStorage["token"] : "";
      this.apikey = localStorage["apikey"] ? localStorage["apikey"] : "";
      this.your_email = localStorage["your_email"] ? localStorage["your_email"] : "";
      this.team_email = localStorage["team_email"] ? localStorage["team_email"] : "";
    },
    methods: {
        save: function () {
            console.log("save");
            var self = this;

            localStorage["host"] = this.host;
            localStorage["token"] = this.token;
            localStorage["apikey"] = this.apikey;
            localStorage["your_email"] = this.your_email;
            localStorage["team_email"] = this.team_email;
            this.message = "Saved";

            setTimeout(function(){
              console.log("setTimeout");
              self.message = "";
            }, 3000);
        }
    }
});