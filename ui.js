import { loadCard, filter } from "./api.js"
const inputCHercher = document.getElementById("chercher")
const btnAjouter = document.getElementById("new")
const dialog = document.getElementById("add")
const ress = document.getElementById("error")
const btnRess = document.getElementById("ressailler")
const menu = document.getElementById("cards")
const dialog2 = document.getElementById("search")
const btnChercher = document.getElementById("cherche")
const toDo = document.getElementById("todo-list")
const prog = document.getElementById("progress-list")
const don = document.getElementById("done-list")
const form = document.querySelector("form")
const resultat = document.getElementById("resultat")
let cards = null
let ObjectA = {}
const RejexText = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;
loadCard((data) => {
  cards = data;
  console.log(cards)
  afficher(cards)
}, masquer)
console.log(cards)// il reste vide 
function afficher(tab) {

  ress.hidden = true;
  menu.hidden = false;
  let counttoDo = 0
  let countProg = 0
  let countDone = 0
  toDo.textContent = ""
  prog.textContent = ""
  don.textContent = ""
  for (let i = 0; i < tab.length; i++) {

    if (tab[i].status == "todo") {
      const affichetags=document.getElementById("affichetags")
      
      counttoDo++
      // console.log(tab[i].title)
 toDo.innerHTML += `
    <h2 class="cards">
        <strong>Titre:</strong>${tab[i].title}
        ===> <strong>Assigne:</strong>${tab[i].assignee}
    </h2>

    <p><strong>Description:</strong> ${tab[i].description}</p>
    <p><strong>Priority:</strong> ${tab[i].priority}</p>
    <p><strong>DueDate:</strong> ${tab[i].dueDate}</p>
`;

tab[i].tags.forEach((o) => {
    const p = document.createElement("span");

    p.className = "inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md mr-2 mb-2";
    p.textContent = `#${o}`;

    toDo.appendChild(p);
});


toDo.innerHTML += `
    <p>****************************************************************</p>
`;
    }
    else if (tab[i].status == "in-progress") {
      countProg++
      // console.log(tab[i].title)

prog.innerHTML += `
    <h2 class="cards">
        <strong>Titre:</strong> ${tab[i].title}
        ===> <strong>Assigne:</strong> ${tab[i].assignee}
    </h2>

    <p><strong>Description:</strong> ${tab[i].description}</p>
    <p><strong>Priority:</strong> ${tab[i].priority}</p>
    <p><strong>DueDate:</strong> ${tab[i].dueDate}</p>
`;

tab[i].tags.forEach((o) => {

    const p = document.createElement("span");

    p.className = "inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md mr-2 mb-2";

    p.textContent = `#${o}`;

    prog.appendChild(p);

});

prog.innerHTML += `
    <p>****************************************************************</p>
`;
    }
    else {
      countDone++
      // console.log(tab[i].title)

   don.innerHTML += `
    <h2 class="cards">
        <strong>Titre:</strong> ${tab[i].title}
        ===> <strong>Assigne:</strong> ${tab[i].assignee}
    </h2>

    <p><strong>Description:</strong> ${tab[i].description}</p>
    <p><strong>Priority:</strong> ${tab[i].priority}</p>
    <p><strong>DueDate:</strong> ${tab[i].dueDate}</p>
`;

// Afficher les tags
tab[i].tags.forEach((o) => {

    const p = document.createElement("span");

    p.className = "inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md mr-2 mb-2";

    p.textContent = `#${o}`;

    don.appendChild(p);

});

// Séparateur après les tags
don.innerHTML += `
    <p>****************************************************************</p>
`;

    }

  }
  const counter1 = document.getElementById("conteurToDo")
  const counter2 = document.getElementById("conteurpro")
  const counter3 = document.getElementById("conteurDone")
  counter1.textContent = counttoDo;
  counter1.classList.add("extremite")
  counter2.textContent = countProg;
  counter2.classList.add("extremite")
  counter3.textContent = countDone;
  counter3.classList.add("extremite")

}
function masquer() {
  console.log("hi ")
  ress.hidden = false
  menu.hidden = true
}
function ressailler(afficher) {

  console.log("Nouvelle tentative...");
  loadCard(afficher, masquer);
}
btnRess.addEventListener("click", () => ressailler(afficher, masquer))

// **************ajout d'un element
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    // console.log(e.target)
    dialog.close();
  }
})
btnAjouter.addEventListener("click", function () {
  dialog.showModal()

})
form.addEventListener("submit", function (event) {
  event.preventDefault()
  const titre = document.getElementById("titre")
  const assignee = document.getElementById("assign")
  const Tags = document.getElementById("tags")
  const status = document.getElementById("status")
  const priority = document.getElementById("priority")
  const description = document.getElementById("desc")
  const dueDate = document.getElementById("Dudate")
  const msg = document.createElement("small");
  if (!ValiderText(titre, assignee, Tags)) {
    msg.remove()
    console.log(invalides)
    invalides.forEach(input => {
      console.log(input.parentElement)
      msg.style.color = "red";
      input.style.borderColor = "red"
      msg.textContent = "Veuillez remplir le champ avec un format valide.";
      const parent = input.parentElement
      parent.insertBefore(msg, input.nextSibling)

    });
    console.log("faux")
  }
  else {

    msg.remove();
    console.log("vrai")
  }
  if (ValideList(status)) {
    ObjectA.status = status.value
  }
  if (ValideList(priority)) {
    ObjectA.priority = priority.value

  }
  if (valideDate(dueDate)) {
    ObjectA.dueDate = dueDate.value
  }
  if (ValiderText(titre, assignee, Tags) && ValideList(status) && ValideList(priority) && valideDate(dueDate)) {
    if (description.value !== null) {
      ObjectA.description = description.value
    }

    cards.push(ObjectA)
    console.log(cards)
    afficher(cards)
    form.reset()
    dialog.close()

  }
  // const donnees = Object.fromEntries(new FormData(form));
  // console.log(donnees)
})
let invalides = [];
function ValiderText(...values) {
  console.log(values)
  invalides = []
  let ok = true
  for (let i = 0; i < values.length; i++) {
    if (!RejexText.test(values[i].value)) {
      ok = false
      invalides.push(values[i]);
    }
    else {
      ObjectA[values[i].dataset.name] = values[i].value
    }
  }
  console.log(ObjectA)
  return ok
}
function ValideList(val) {
  if (val.value == "") {
    val.style.borderColor = "red"

    return false
  }
  else {
    val.style.borderColor = "green"

    return true
  }
}
function valideDate(val) {
  if (val.value == null) {
    val.style.borderColor = "red";
    return false
  }
  else {
    return true
  }
}
//************ live search 
btnChercher.addEventListener("click", function () {
  dialog2.showModal()
})
dialog2.addEventListener("click", (e) => {
  if (e.target === dialog2) {
    // console.log(e.target)
    dialog2.close();
  }
})
inputCHercher.addEventListener("input", function () {
  const valeur = inputCHercher.value.toLowerCase()

  let cardsDemande = cards.filter(c => c.title.toLowerCase().includes(valeur))

  resultat.innerHTML = ""
  if (valeur == "") {
    cardsDemande = []
    resultat.innerHTML = "<p>Choisir un choix</p>"
  }
  cardsDemande.forEach(c => {
    resultat.innerHTML += `<h2 class="cards"> <strong >Titre:</strong>${c.title}</h2> ===> <h2 class="cards"><strong >Assigne:</strong >${c.assignee}
      <p><strong>Description:</strong> ${c.description}</p>
      <p><strong>Priority:</strong>${c.priority}</p>
      <p><strong>DueDate:</strong> ${c.dueDate}</p>
      <p>****************************************************************</p>`
  });

})

const filterMember = document.getElementById("filterMember");
const filterPriority = document.getElementById("filrepriority");
function appliquerFiltres() {

  const valeurMembre = filterMember.value;
  const valeurPriority = filterPriority.value;

  filter(valeurPriority, valeurMembre)
  const tabFilter = filter(valeurPriority, valeurMembre)

    .then(tasks => {
      console.log(tasks)
      afficher(tasks)
    })
    .catch(error => {
      console.log("Impossible de filtrer les tâches :", error);
    });
  console.log(tabFilter)

}

filterMember.addEventListener("input", appliquerFiltres)


filterPriority.addEventListener("change", appliquerFiltres)
console.log("hi")
  ;
