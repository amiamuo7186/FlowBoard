import { loadCard } from "./api.js"
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
let cards = null

const RejexText = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;

// *********affichage et gestion d'erreur 
document.addEventListener("DOMContentLoaded", () => {
  loadCard((data) => {
        cards = data;
        console.log(cards)
        afficher(cards)},masquer)
})
console.log(cards)// il reste vide 
function afficher(tab) {

  ress.hidden = true;
  menu.hidden = false;
  let counttoDo = 0
  let countProg = 0
  let countDone = 0

  for (let i = 0; i < tab.length; i++) {
    // console.log(tab[i].status)

    if (tab[i].status == "todo") {
      counttoDo++
      // console.log(tab[i].title)
      toDo.innerHTML += `<h2 class="cards"> <strong >Titre:</strong>${tab[i].title}</h2> ===> <h2 class="cards"><strong >Assigne:</strong >${tab[i].assignee}
      <p><strong>Description:</strong> ${tab[i].description}</p>
      <p><strong>Priority:</strong>${tab[i].priority}</p>
      <p><strong>DueDate:</strong> ${tab[i].dueDate}</p>
      <p>****************************************************************</p>

       `
    }
    else if (tab[i].status == "in-progress") {
      countProg++
      // console.log(tab[i].title)
      prog.innerHTML += `<h2 class="cards"> <strong >Titre:</strong>${tab[i].title}</h2> ===> <h2 class="cards"><strong >Assigne:</strong >${tab[i].assignee}
      <p><strong>Description:</strong> ${tab[i].description}</p>
      <p><strong>Priority:</strong>${tab[i].priority}</p>
      <p>****************************************************************</p>

       `
    }
    else {
      countDone++
      // console.log(tab[i].title)
      don.innerHTML += `<h2 class="cards"> <strong >Titre:</strong>${tab[i].title}</h2> ===> <h2 class="cards"><strong >Assigne:</strong >${tab[i].assignee}
      <p><strong>Description:</strong> ${tab[i].description}</p>
      <p><strong>Priority:</strong>${tab[i].priority}</p>
      <p>****************************************************************</p>

       `
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
  const DueDate = document.getElementById("Dudate")
  const Tags = document.getElementById("tags")
  const valeurTitre = titre.value
  const valeurAssignee = assignee.value
  const valeurtags = Tags.value
  const valeurDueDate = DueDate.value
  if (!ValiderText(valeurTitre, valeurAssignee, valeurtags)) {

  }
  else {
    console.log("vrai")
  }

})
function ValiderText(...values) {
  return values.every(value => RejexText.test(value));
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
  console.log(valeur)


})

