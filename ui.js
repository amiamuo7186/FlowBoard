const ress = document.getElementById("error");
const menu = document.getElementById("cards");
const toDo = document.getElementById("todo-list");
const prog = document.getElementById("progress-list");
const don = document.getElementById("done-list");
export const dialog = document.getElementById("add");
export let ObjectA = {};
let invalides = [];
const RejexText = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;
export function afficher(tab) {
  ress.hidden = true;
  menu.hidden = false;
  let counttoDo = 0;
  let countProg = 0;
  let countDone = 0;
  toDo.textContent = "";
  prog.textContent = "";
  don.textContent = "";
  for (let i = 0; i < tab.length; i++) {
    const btnNext = document.createElement("button");
    const btnPreviuos = document.createElement("button");
    btnNext.setAttribute("data-idn", tab[i].id);
    btnPreviuos.setAttribute("data-idp", tab[i].id);
    btnNext.textContent = "➡️";
    btnPreviuos.textContent = "⬅️";
    const btnModify = document.createElement("button");
    btnModify.textContent = "Modifier";
    btnModify.className = "bg-gray-100";
    if (tab[i].status == "todo") {
      counttoDo++;
      toDo.innerHTML += `
        <h2 class="cards">
        <strong>Titre:</strong>${tab[i].title}
        ===> <strong>Assigne:</strong>${tab[i].assignee}
       </h2>

        <p><strong>Description:</strong> ${tab[i].description}</p>
        <p><strong>Priority:</strong> ${tab[i].priority}</p>
        <p><strong>DueDate:</strong> ${tab[i].dueDate}</p>`;

      tab[i].tags.forEach((o) => {
        const p = document.createElement("span");

        p.className =
          "inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md mr-2 mb-2";
        p.textContent = `#${o}`;

        toDo.appendChild(p);
      });

      btnModify.setAttribute("data-id", tab[i].id);

      toDo.appendChild(btnModify);
     

      console.log(btnNext);
      toDo.appendChild(btnNext);

      toDo.innerHTML += `
      <p>****************************************************************</p>`;
    } else if (tab[i].status == "in-progress") {
      countProg++;
      prog.innerHTML += `
       <h2 class="cards">
        <strong>Titre:</strong> ${tab[i].title}
        ===> <strong>Assigne:</strong> ${tab[i].assignee}
       </h2>

       <p><strong>Description:</strong> ${tab[i].description}</p>
       <p><strong>Priority:</strong> ${tab[i].priority}</p>
       <p><strong>DueDate:</strong> ${tab[i].dueDate}</p>`;
      prog.appendChild(btnPreviuos);
      

      console.log(btnPreviuos);
      tab[i].tags.forEach((o) => {
        const p = document.createElement("span");

        p.className =
          "inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md mr-2 mb-2";

        p.textContent = `#${o}`;

        prog.appendChild(p);
      });

      btnModify.setAttribute("data-id", tab[i].id);

      prog.appendChild(btnModify);

      prog.appendChild(btnNext);
     

      console.log(btnNext);
      prog.innerHTML += `
       <p>****************************************************************</p>`;
    } else {
      countDone++;
      don.innerHTML += `
        <h2 class="cards">
        <strong>Titre:</strong> ${tab[i].title}
        ===> <strong>Assigne:</strong> ${tab[i].assignee}
        </h2>

        <p><strong>Description:</strong> ${tab[i].description}</p>
        <p><strong>Priority:</strong> ${tab[i].priority}</p>
        <p><strong>DueDate:</strong> ${tab[i].dueDate}</p>`;
      don.appendChild(btnPreviuos);
      

      console.log(btnPreviuos);
      tab[i].tags.forEach((o) => {
        const p = document.createElement("span");

        p.className =
          "inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md mr-2 mb-2";

        p.textContent = `#${o}`;

        don.appendChild(p);
      });

      btnModify.setAttribute("data-id", tab[i].id);

      don.innerHTML += `
      <p>****************************************************************</p>
`;
    }
  }

  const counter1 = document.getElementById("conteurToDo");
  const counter2 = document.getElementById("conteurpro");
  const counter3 = document.getElementById("conteurDone");
  counter1.textContent = counttoDo;
  counter1.classList.add("extremite");
  counter2.textContent = countProg;
  counter2.classList.add("extremite");
  counter3.textContent = countDone;
  counter3.classList.add("extremite");
}
export function masquer() {
  console.log("hi ");
  ress.hidden = false;
  menu.hidden = true;
}
export function ressailler(afficher) {
  console.log("Nouvelle tentative...");
  loadCard(afficher, masquer);
}
export function ValiderText(...values) {
  console.log(values);
  invalides = [];
  let ok = true;
  for (let i = 0; i < values.length; i++) {
    if (!RejexText.test(values[i].value)) {
      ok = false;
      invalides.push(values[i]);
    } else {
      ObjectA[values[i].dataset.name] = values[i].value;
    }
  }
  console.log(ObjectA);
  return ok;
}
export function ValideList(val) {
  if (val.value == "") {
    val.style.borderColor = "red";

    return false;
  } else {
    val.style.borderColor = "green";

    return true;
  }
}
export function valideDate(val) {
  if (val.value == null) {
    val.style.borderColor = "red";
    return false;
  } else {
    return true;
  }
}
export function Convertir(str) {
  const tab = str.split(",");
  return tab;
}
