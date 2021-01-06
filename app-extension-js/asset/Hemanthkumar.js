
window.load = loadJQueryFile();

function loadJQueryFile() {
  var head = document.getElementsByTagName('head')[0];

  var jqueryScript = document.createElement('script');
  jqueryScript.setAttribute("type", "text/javascript");
  jqueryScript.setAttribute("src", "https://code.jquery.com/jquery-3.5.1.slim.min.js");

  jqueryScript.onreadystatechange = handler;
  jqueryScript.onload = handler;
  head.appendChild(jqueryScript);
}


function handler() {
  $(document).ready(function () {
    console.log('od-SuiteNav');
    $("body").first().prepend("<p>This site has been migrated. Please don't change anything here</p>");
    var a = $('nav[role="navigation"] ul>li[role="listitem"]>div[name="Notebook"]>a');
    a.append(`<img src="https://isvdevchat.sharepoint.com/sites/sbdev/SiteAssets/pat/BulkResizePhotos/014-replant.jpg" width="40px" height="40px"/>`);

    console.log(a);
  });
}


console.log('od-SuiteNav--end');
