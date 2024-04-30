var shareButton = document.getElementById( "share-this" );
var shareLinkList = document.querySelector( "ul.links" );
var canonicalUrlLinkElem = document.querySelector( "link[rel=canonical]" );
var pageUrl = canonicalUrlLinkElem ? canonicalUrlLinkElem.href : document.URL;
var title = document.querySelector( "meta[property='og:title']" )
  .getAttribute( "content" );
var description = document.querySelector( "meta[property='og:description']" )
  .getAttribute( "content" );

/** */
function setShareLinks() {
  var emailLinkEl = document.querySelector( ".share.email > a" );
  var elements = document.querySelectorAll( ".share.facebook" );
  Array.prototype.forEach.call( elements, function ( el ) {
    el.addEventListener( "click", function () {
      var url = "https://www.facebook.com/sharer.php?u=" + pageUrl;
      window.open( url, "NewWindow", "" );
    } );
  } );
  elements = document.querySelectorAll( ".share.twitter" );
  Array.prototype.forEach.call( elements, function ( el ) {
    el.addEventListener( "click", function () {
      var url = "https://twitter.com/intent/tweet?url=" + pageUrl + "&text=" +
        title;
      window.open( url, "NewWindow" );
    } );
  } );
  elements = document.querySelectorAll( ".share.linkedin" );
  Array.prototype.forEach.call( elements, function ( el ) {
    el.addEventListener( "click", function () {
      var url = "https://www.linkedin.com/shareArticle?mini=true&url=" +
        pageUrl;
      window.open( url, "NewWindow" );
    } );
  } );
  emailLinkEl.href = "mailto:?subject=" + title + "&body=" + description +
    "%0A%0A" + pageUrl;
}
if ( navigator.share ) {
  shareButton.style.display = "inline"
  shareButton.addEventListener( "click", function () {
    navigator.share( {
      title: title,
      url: pageUrl,
      text: description
    } ).then( function () {
      console.log( "Thanks for sharing!" );
    } )
      .catch( console.error );
  } );
} else {
  shareLinkList.style.display = "inline-block";
  setShareLinks();
}
/**
 * Replace Footnote content
 */
function replaceFootnote(num) {
    var fn = document.getElementById( "fn_pointer_ftn".concat(num) );
    return fn.title.substring(11 + num.length);
}
Prince.addScriptFunc("replaceFootnote", replaceFootnote);
