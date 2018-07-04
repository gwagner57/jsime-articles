/**
 * Create a table of contents as a nested list within the nav#toc element.
 * 
 * TODO: Instead of using the section title as id/href, better use a unique number/code
 * 
 * @method 
 * @author Gerd Wagner
 */
function createTableOfContents() {
  var tocNavEl = document.getElementById("toc"),
      tblOfContEl=null, headingEl=null,
      topLevelSectElems = document.querySelectorAll("main > section"),
      topLevelSectListEl=null;
	
  function createOneLevelSectionList( sectEl, sectHierarchySelector, listEl) {
    var headingEl=null, el=null,
        nextLevelListEl=null, listItemEl=null,
        subsubSectElems=[],
        subsectElems = sectEl.querySelectorAll( sectHierarchySelector);
    for (let subsectEl of subsectElems) {
      headingEl = subsectEl.querySelector("h1");
      subsectEl.id = headingEl.textContent;
      listItemEl = document.createElement("li");
      el = document.createElement("a");
      el.innerHTML = headingEl.innerHTML;
      el.href = "#" + headingEl.textContent;
      listItemEl.appendChild( el);
      listEl.appendChild( listItemEl);
      subsubSectElems = subsectEl.querySelectorAll( sectHierarchySelector + ">section");
      if (subsubSectElems.length > 0) {
        nextLevelListEl = document.createElement("ul");
        listItemEl.appendChild( nextLevelListEl);
        createOneLevelSectionList( subsectEl, sectHierarchySelector + ">section", nextLevelListEl);
      }
    }
  }

  if (tocNavEl) {
    tblOfContEl = tocNavEl.lastElementChild;
    tblOfContEl.innerHTML = "";
  } else {
    tocNavEl =  document.createElement("nav");
    tocNavEl.id = "toc";
    headingEl = document.createElement("h1");
    headingEl.textContent = "Contents";
    tocNavEl.appendChild( headingEl);
    tblOfContEl = document.createElement("ul");
    tocNavEl.appendChild( tblOfContEl);
    document.body.appendChild( tocNavEl);
  }
  for (let topLevelSectEl of topLevelSectElems) {
    headingEl = document.createElement("h1");
    headingEl.textContent = "Contents";
    tocNavEl.appendChild( headingEl);
    if (topLevelSectElems.length > 0) {
      topLevelSectListEl = document.createElement("ul");
      partTocItemEl.appendChild( topLevelSectListEl);
      createOneLevelSectionList( partEl, "main > section", topLevelSectListEl);
    }
  }
}