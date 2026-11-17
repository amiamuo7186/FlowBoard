
export async function loadCard(afficher, ressailler) {
  
  try{
    const response= await axios.get('https://flowboard-api-virid.vercel.app/cards', {
    headers: {
      'X-Workspace': 'public'
    }
  })
  afficher(response.data)
  console.log(response.data)
  }
  catch(error){
    console.log(error)
    ressailler(afficher)
  }
  
 // fetch retourne une promise 


    // .then(response => {
    //   if (!response.ok)// pour handler les erreur n'ont pas traiter par catch 
    //     throw new Error(response.status)

    //   return response.json()
    // })// retourne une promise 

    // .then(data => {
    //   console.log("api", data)
    //   afficher(data)
    // })
    // .catch(error => {

    //   console.log("Erreur :", error);
    //   ressailler(afficher)
    // });
}



export async function filter(priority, memberId) {

    // const params = new URLSearchParams();
    const objetsFilter={}
    if (priority !== "all") {
       objetsFilter.priority= priority;
    }

    if (memberId && memberId !== "all") {
        objetsFilter.assignee= memberId;
    }

   

     const response= await axios.get('https://flowboard-api-virid.vercel.app/cards', {
    headers: {
      'X-Workspace': 'public'
    },
    params:objetsFilter,
  
  } )
        /*.then(d => {
      console.log("api", d)
     
    })
        .catch(error => {
            console.error("Erreur API :", error);
            throw error;
        });*/
        return response.data
}




