/**
 * Create a table of contents as a nested list within the nav#toc element.
 * 
 * TODO: Instead of using the section title as id/href, better use a unique number/code
 * 
 * @method 
 * @author Gerd Wagner
 */
function createTableOfContents() {
  var sectCtr=0,
      topLevelSectElems = document.querySelectorAll("main > section:not([role='doc-abstract'])");
  if (!document.getElementById("toc")) {
    let tocNavEl =  document.createElement("nav");
    let headingEl = document.createElement("h1");
    let tblOfContEl = document.createElement("ol");
    headingEl.textContent = "Table of Contents";
    tocNavEl.id = "toc";
    tocNavEl.appendChild( headingEl);
    tocNavEl.appendChild( tblOfContEl);
    document.body.appendChild( tocNavEl);

    for (let topLevelSectEl of topLevelSectElems) {
      let headingEl = topLevelSectEl.querySelector("h1");
      let tocEntryEl = document.createElement("li");
      let el = document.createElement("a");
      topLevelSectEl.id = "sect" + String( sectCtr++);
      el.innerHTML = headingEl.innerHTML;
      el.href = "#" + topLevelSectEl.id;
      tocEntryEl.appendChild( el);
      tblOfContEl.appendChild( tocEntryEl);
    }
  }
}
window.addEventListener("load", createTableOfContents);
