//CSS set bugs
fetch(`${localStorage.getItem('baseUrl')}/api/get_bugs_css/`)
  .then((resp) => resp.json())
  .then((data) => {
    for (let i of data.results) {
      let elem = document.querySelectorAll(`.${i.css_class_name}`);
      for (let b of elem) {
        b.style.cssText = `${i.style}`;
      }
    }
  });

// href rebase link
fetch(`${localStorage.getItem('baseUrl')}/api/get_bugs_link`)
  .then((resp) => resp.json())
  .then((data) => {
    for (let i of data.results) {
      let a = document.querySelector(`.${i.html_id_tag_a}`);
      a.setAttribute("href", `${i.href}`);
    }
  });
