const btnAjouter = document.getElementById("new")
const dialog = document.getElementById("add")
let cards = null;
const card = {};
const toDo = document.getElementById("todo-list")
const prog = document.getElementById("progress-list")
const don = document.getElementById("done-list")
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    console.log(e.target)
    dialog.close();
  }
})
btnAjouter.addEventListener("click", function () {
  dialog.showModal()
})
fetch('https://flowboard-api-virid.vercel.app/cards', {
  headers: {
    'X-Workspace': 'public'
  }
})// fetch retourne une promise 
  .then(response => response.json())// retourne une promise 
  .then(data => {
    cards = data;
    console.log(cards);
    afficher(cards)
  })
  .catch(error => {
    console.log("Erreur :", error);
  });
function afficher(tab) {
  let counttoDo = 0
  let countProg = 0
  let countDone = 0
  
  for (let i = 0; i < tab.length; i++) {
    console.log(tab[i].status)

    if (tab[i].status == "todo") {
      counttoDo++
      console.log(tab[i].title)
      toDo.innerHTML += `<h2 class="cards"> <strong >Titre:</strong>${tab[i].title}</h2> ===> <h2 class="cards"><strong >Assigne:</strong >${tab[i].assignee}
      <p><strong>Description:</strong> ${tab[i].description}</p>
      <p><strong>Priority:</strong>${tab[i].priority}</p>
      <p><strong>DueDate:</strong> ${tab[i].dueDate}</p>
      <p>****************************************************************</p>

       `
    }
    else if (tab[i].status == "in-progress") {
      countProg++
      console.log(tab[i].title)
      prog.innerHTML += `<h2 class="cards"> <strong >Titre:</strong>${tab[i].title}</h2> ===> <h2 class="cards"><strong >Assigne:</strong >${tab[i].assignee}
      <p><strong>Description:</strong> ${tab[i].description}</p>
      <p><strong>Priority:</strong>${tab[i].priority}</p>
      <p>****************************************************************</p>

       `
    }
    else {
      countDone++
      console.log(tab[i].title)
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