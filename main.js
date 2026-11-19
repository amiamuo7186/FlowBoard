import {
  afficher,
  masquer,
  ressailler,
  ValiderText,
  ValideList,
  valideDate,
  dialog,
  ObjectA,
  Convertir,
} from "./ui.js";
import {
  loadCard,
  filter,
  recupre_data,
  MOdifierCarte,
  glissement,
  Delete,
} from "./service/api.js";
let cards = null;
const dialog2 = document.getElementById("search");
const resultat = document.getElementById("resultat");
const inputCHercher = document.getElementById("chercher");
const btnChercher = document.getElementById("cherche");
const btnAjouter = document.getElementById("new");
const btnRess = document.getElementById("ressailler");
const btnUpdate = document.getElementById("modif");
const btnAjout = document.getElementById("btnajout");
const form = document.getElementById("form_Saisie");

const datae = await loadCard();

afficher(datae);
const BTNMODIFY = document.querySelectorAll("[data-id]"); // avant affichage reste node vide
const BTNDELETE = document.querySelectorAll("[data-idd]");
console.log(BTNDELETE);
document.addEventListener("click", async function (e) {
  const next = e.target.closest("[data-idn]");
  if (next) {
    const id = Number(next.dataset.idn);
    const card = datae.find((c) => c.id === id);
    if (!card) return;
    let newStatus;
    if (card.status === "todo") {
      newStatus = "in-progress";
    } else if (card.status === "in-progress") {
      newStatus = "done";
    }

    if (newStatus) {
      await glissement(id, newStatus);
      card.status = newStatus;
      afficher(datae);
    }
  }
  const previous = e.target.closest("[data-idp]");
  if (previous) {
    const id = Number(previous.dataset.idp);
    const card = datae.find((c) => c.id === id);
    if (!card) return;
    let newStatus;
    if (card.status === "done") {
      newStatus = "in-progress";
    } else if (card.status === "in-progress") {
      newStatus = "todo";
    }

    if (newStatus) {
      await glissement(id, newStatus);
      card.status = newStatus;
      const datae = await loadCard();
      afficher(datae);
    }
  }
});
BTNMODIFY.forEach((element) => {
  element.addEventListener("click", async function () {
    btnAjout.hidden = true;
    btnUpdate.hidden = false;
    dialog.showModal();
    let { data } = await recupre_data(element.dataset.id);
    btnUpdate.setAttribute("data-id", element.dataset.id);

    document.querySelector('[name="title"]').value = data.title;
    document.querySelector('[name="description"]').value = data.description;
    document.querySelector('[name="assignee"]').value = data.assignee;
    document.querySelector('[name="status"]').value = data.status;
    document.querySelector('[name="priority"]').value = data.priority;
    document.querySelector('[name="dueDate"]').value = data.dueDate;
    document.querySelector('[name="tags"]').value = data.tags;
  });
});
BTNDELETE.forEach((d) => {
  d.addEventListener("click", async function () {
    let idDeltete = d.dataset.idd;
    Swal.fire({
      title: "vous etre sur ",
      text: "voulez vous suprimer la tache ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui,suprime",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Votre tache etait suprimée.",
          icon: "success",
        });
        await Delete(idDeltete);
        const datae = await loadCard();
        afficher(datae);
      }
    });
  });
});
btnRess.addEventListener("click", () => ressailler(afficher, masquer));
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    dialog.close();
  }
});
btnAjouter.addEventListener("click", function () {
  dialog.showModal();
  btnAjout.hidden = false;
  btnUpdate.hidden = true;
});
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const titre = document.getElementById("titre");
  const assignee = document.getElementById("assign");
  const Tags = document.getElementById("tags");
  const status = document.getElementById("status");
  const priority = document.getElementById("priority");
  const description = document.getElementById("desc");
  const dueDate = document.getElementById("Dudate");
  const msg = document.createElement("small");
  if (!ValiderText(titre, assignee, Tags)) {
    msg.remove();
    console.log(invalides);
    invalides.forEach((input) => {
      console.log(input.parentElement);
      msg.style.color = "red";
      input.style.borderColor = "red";
      msg.textContent = "Veuillez remplir le champ avec un format valide.";
      const parent = input.parentElement;
      parent.insertBefore(msg, input.nextSibling);
    });
    console.log("faux");
  } else {
    msg.remove();
    console.log("vrai");
  }
  if (ValideList(status)) {
    ObjectA.status = status.value;
  }
  if (ValideList(priority)) {
    ObjectA.priority = priority.value;
  }
  if (valideDate(dueDate)) {
    ObjectA.dueDate = dueDate.value;
  }
  if (
    ValiderText(titre, assignee, Tags) &&
    ValideList(status) &&
    ValideList(priority) &&
    valideDate(dueDate)
  ) {
    ObjectA.title = titre.value;
    ObjectA.assignee = assignee.value;
    if (description.value !== null) {
      ObjectA.description = description.value;
    }
    let array_tag = Convertir(Tags.value);
    ObjectA.tags = array_tag;
    console.log(ObjectA);
    datae.push(ObjectA);
    // // cards.push(ObjectA);
    // // console.log(cards);
    // afficher(cards);
    afficher(datae);
    form.reset();
    dialog.close();
  }

  // const donnees = Object.fromEntries(new FormData(form));
  // console.log(donnees)
});
btnChercher.addEventListener("click", function () {
  dialog2.showModal();
});
dialog2.addEventListener("click", (e) => {
  if (e.target === dialog2) {
    // console.log(e.target)
    dialog2.close();
  }
});
inputCHercher.addEventListener("input", function () {
  const valeur = inputCHercher.value.toLowerCase();

  let cardsDemande = cards.filter((c) =>
    c.title.toLowerCase().includes(valeur),
  );

  resultat.innerHTML = "";
  if (valeur == "") {
    cardsDemande = [];
    resultat.innerHTML = "<p>Choisir un choix</p>";
  }
  cardsDemande.forEach((c) => {
    resultat.innerHTML += `<h2 class="cards"> <strong >Titre:</strong>${c.title}</h2> ===> <h2 class="cards"><strong >Assigne:</strong >${c.assignee}
      <p><strong>Description:</strong> ${c.description}</p>
      <p><strong>Priority:</strong>${c.priority}</p>
      <p><strong>DueDate:</strong> ${c.dueDate}</p>
      <p>****************************************************************</p>`;
  });
});

const filterMember = document.getElementById("filterMember");
const filterPriority = document.getElementById("filrepriority");
function appliquerFiltres() {
  const valeurMembre = filterMember.value;
  const valeurPriority = filterPriority.value;

  filter(valeurPriority, valeurMembre);
  const tabFilter = filter(valeurPriority, valeurMembre)
    .then((tasks) => {
      console.log(tasks);
      afficher(tasks);
    })
    .catch((error) => {
      console.log("Impossible de filtrer les tâches :", error);
    });
  console.log(tabFilter);
}

filterMember.addEventListener("input", appliquerFiltres);
filterPriority.addEventListener("change", appliquerFiltres);

// modification
let data_update = {};

// console.log(btnUpdate);
btnUpdate.addEventListener("click", async function () {
  console.log(btnUpdate);
  let idModify = btnUpdate.dataset.id;
  console.log(idModify);

  data_update = {
    title: document.querySelector('[name="title"]').value,
    status: document.querySelector('[name="status"]').value,
    description: document.querySelector('[name="description"]').value,
    priority: document.getElementById("priority").value,
    assignee: document.querySelector('[name="assignee"]').value,
    dueDate: document.querySelector('[name="dueDate"]').value,
    tags: Convertir(document.querySelector('[name="tags"]').value),
  };
  console.log(data_update);
  await MOdifierCarte(idModify, data_update);
  const datae = await loadCard();
  afficher(datae);
});
