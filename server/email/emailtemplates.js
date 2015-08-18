const emailtemplates = {


 mailHeader: "<div style='background-color:#eeeeee'>" +
    "               <div style='background-color:#cccccc;background-image:none;background-repeat:repeat;background-position:top left;background-attachment:scroll;padding-top:5px;padding-bottom:5px;'>" +
                    "<div style='padding-right: 15px;padding-left: 15px;margin-right: auto;margin-left: auto'>" +
                    "<div style='margin-right:-15px;margin-left:-15px;'>" +
                    "<div style='position: relative;min-height: 1px;padding-right: 15px;padding-left: 15px'>" +
                    "<div>" +
                    "<div style='padding-left:20px;color:#FFF;font-size: 18px;margin-top:25px;margin-bottom:25px;'>Mood Wonder</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div  style='padding-right: 15px;padding-left: 15px;margin-right: auto;margin-left: auto'>" +
                    "<div class='col s12 '>" +
                    "<div style='padding: 20px 40px;left: calc(50% - 200px);top: calc(50% - 13em);border-radius:3px;background: #FFF none repeat scroll 0% 0%;box-shadow:0px 1px 5px 0px rgba(0, 0, 0, 0.26);overflow: hidden;margin: 40px auto;color: #333;'>" +
                    "<div style='margin-right:-15px;margin-left:-15px;'>",


 mailFooter:    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div style='height: auto;background: #eeeeee;padding: 15px 0px 15px 0px;'>" +
                    "<div  style='padding-right: 15px;padding-left: 15px;margin-right: auto;margin-left: auto'>" +
                    "<div style='margin-right:-15px;margin-left:-15px;'>" +
                    "<div class='col-md-4 footer-logo'> <a href='#'></div>" +
                    "</div>" +
                    "<div style='margin: 40px 0px 0px 0px;'>" +
                    "<div  style='padding-right: 15px;padding-left: 15px;margin-right: auto;margin-left: auto'>" +
                    "<div style='margin-right:-15px;margin-left:-15px;'>" +
                    "<p style='color: #ae8200;font-size: 15px;'>Copyright © 2015 MoodWonder</p>" +
                    "<div  class='col-md-6 social-icons'> </div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div></div>",

  general: function(content) {
      var template = "";
      template += this.mailHeader;
      template += content;
      template += this.mailFooter;
      return template;
  }

};

module.exports = emailtemplates;
