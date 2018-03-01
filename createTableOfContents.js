/**
 * Create a table of contents as a nested list within the nav#toc element.
 * 
 * TODO: Instead of using the section title as id/href, better use a unique number/code
 * 
 * @method 
 * @author Gerd Wagner
 */
function createTableOfContents() {
  var navEl = document.querySelector("body>header>nav"),
      tblOfCont=null, headingEl=null, chapterElems=[], chapterListEl=null, 
      partEl=null, partElems=[], partTocItemEl=null;
	
  function createOneLevelSectionList( sectEl, sectionHierarchySelector, listEl) {
    var headingEl=null, el=null, i=0,
        nextLevelListEl=null, listItemEl=null,
        subsectionEl=null, subsubSectionElems=[],
        subsectionElems = sectEl.querySelectorAll( sectionHierarchySelector);
    for (i=0; i < subsectionElems.length; i++) {
      subsectionEl = subsectionElems[i];	
      headingEl = subsectionEl.querySelector("h1");
      subsectionEl.id = headingEl.textContent;
      listItemEl = document.createElement("li");
      el = document.createElement("a");
      el.innerHTML = headingEl.innerHTML;
      el.href = "#" + headingEl.textContent;
      listItemEl.appendChild( el);
      listEl.appendChild( listItemEl);
      subsubSectionElems = subsectionEl.querySelectorAll( sectionHierarchySelector + ">section");
      if (subsubSectionElems.length > 0) {
        nextLevelListEl = document.createElement("ul");
        listItemEl.appendChild( nextLevelListEl);
        createOneLevelSectionList( subsectionEl, sectionHierarchySelector + ">section", nextLevelListEl);
      }
    }
  }

  if (navEl) {
    tblOfCont = navEl.lastElementChild;
    tblOfCont.innerHTML = "";
  } else {
    navEl =  document.createElement("nav");
    headingEl = document.createElement("h1");
    headingEl.textContent = "Contents";
    navEl.appendChild( headingEl);
    tblOfCont = document.createElement("ul");
    navEl.appendChild( tblOfCont);
    document.querySelector("body>header").appendChild( navEl);
  }
  partElems = document.querySelectorAll("body>div.part");
  if (partElems) {
    for (i=0; i < partElems.length; i++) {
      partEl = partElems[i];  
      partTocItemEl = document.createElement("li");
      partTocItemEl.innerHTML = "Part "+ (i+1) +" "+ 
          partEl.querySelector("h1").innerHTML;
      tblOfCont.appendChild( partTocItemEl);
      chapterElems = partEl.querySelectorAll("body>div.part>section.chapter");
      if (chapterElems.length > 0) {
        chapterListEl = document.createElement("ul");
        partTocItemEl.appendChild( chapterListEl);
        createOneLevelSectionList( partEl, "body>div.part>section.chapter", chapterListEl);
      }
    }    
  }
}