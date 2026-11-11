 export let data=[]
export function loadCard(afficher, ressailler) {
  fetch('https://flowboard-api-virid.vercel.app/cards', {
    headers: {
      'X-Workspace': 'public'
    }
  })// fetch retourne une promise 


    .then(response => {
      if (!response.ok)// pour handler les erreur n'ont pas traiter par catch 
        throw new Error(response.status)

      return response.json()
    })// retourne une promise 

    .then(data => {
       console.log("api", data)
      afficher(data)
    })
    .catch(error => {

      console.log("Erreur :", error);
      ressailler(afficher)
    });
}



