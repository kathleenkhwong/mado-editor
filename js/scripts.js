function initializeEditor() {

  var source = ace.edit("source");
  source.setTheme("ace/theme/twilight");
  source.session.setMode("ace/mode/matlab");
  source.session.setTabSize(2);
  source.session.setUseSoftTabs(true);
  source.setFontSize(14);

  var target = ace.edit("target");
  target.setTheme("ace/theme/twilight");
  target.session.setMode("ace/mode/matlab");
  target.session.setTabSize(2);
  target.session.setUseSoftTabs(true);
  target.setReadOnly(true);
  target.setFontSize(14);

  shortcut.add("Ctrl+Enter", differentiate);
}

function differentiate(){

  var source = ace.edit("source");

  var target = ace.edit("target");

  ai = document.getElementById("active-in").value;

  ao = document.getElementById("active-out").value;

  mode = document.getElementById("mode").value;

  server = document.getElementById("server").value;
  
  code = source.getValue();

  $.ajax({
      type: "POST",
      url: server,
      data: JSON.stringify({ 
        "active_in": ai, "active_out": ao, "mode": mode, "code": code
      })
  }).done(function (result) {
      target.setValue(result);
      target.gotoLine(0,0,false);
      source.focus();
  });
}

function activateTab(tabId) {

  // there should be exactly one active tab-content pair.

  var active_tab = document.getElementsByClassName("active-tab")[0];

  var active_content = document.getElementsByClassName("active-content")[0];

  if (tabId == active_tab.id)
    return;

  active_tab.className = "inactive-tab";

  active_content.className = "inactive-content";

  active_tab = document.getElementById(tabId);

  active_content = document.getElementById(tabId.replace("tab","content"));

  active_tab.className = "active-tab";

  active_content.className = "active-content";
}
