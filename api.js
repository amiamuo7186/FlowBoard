
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



export function filter(priority, memberId) {
const API_TASKS = 'https://flowboard-api-virid.vercel.app/members'
    const params = new URLSearchParams();
    if (priority !== "all") {
        params.append("priority", priority);
    }

    if (memberId !== "all") {
        params.append("assignee", memberId);
    }

    const url = `${API_TASKS}?${params.toString()}`;

     return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors du chargement des tâches");
            }
             
            return response.json();
        })
        .then(d => {
      console.log("api", d)
     
    })
        .catch(error => {
            console.error("Erreur API :", error);
            throw error;
        });
}




