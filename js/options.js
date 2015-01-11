var Vue = require('vue');

var vm = new Vue({
    el : '#qiita-team-extended-options',
    data : {
        title : 'Qiita Team Ex Options',
        token : "",
        your_email : "",
        team_email : "",
        message : ""
    },
    created: function() {
      console.log("created");
      var self = this;

      this.token = localStorage["token"] ? localStorage["token"] : "xx";
      this.your_email = localStorage["your_email"] ? localStorage["your_email"] : "xx";
      this.team_email = localStorage["team_email"] ? localStorage["team_email"] : "xx";
    },
    methods: {
        save: function () {
            console.log("save");
            var self = this;

            localStorage["token"] = this.token;
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