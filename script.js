const btnAjouter=document.getElementById("new")
const dialog=document.getElementById("search")
const cards=[];
const card={};
dialog.addEventListener("click",  (e) => { 
    if (e.target === dialog) {
        console.log(e.target)
    dialog.close();
  }
})
btnAjouter.addEventListener("click",function(){
      dialog.showModal()
})
fetch('https://flowboard-api-virid.vercel.app/cards', {
  headers: {
    'X-Workspace': 'public'
  }
})// fetch retourne une promise 
.then(response => response.json())// retourne une promise 
.then(data => {
  console.log("hi")
    cards.push(...data);

    console.log(cards);
})
.catch(error => {
    console.log("Erreur :", error);
});