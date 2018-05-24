Prince.addScriptFunc("replaceFootnote", function( content ) {
  var fnEl = document.getElementsByClassName("fn");
  var stop = false, i = 0, aEl = "", value = "", str ="";
  
  while ( (i < fnEl.length) && (!stop) ) {
    aEl = fnEl[i].getElementsByTagName("a")[0];
    if ( aEl.textContent === content ) {
      str = aEl.getAttributeNode("title").value;
      value = str.split(":")[1].trim();
      stop = true;
    }
    i += 1;
  }
  
  return value;
});