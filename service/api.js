
export async function loadCard() {
  
  try{
    const response= await axios.get('https://flowboard-api-virid.vercel.app/cards', {
    headers: {
      'X-Workspace': 'public'
    }
  })
   return response.data
  }
  catch(error){
    return error
  }

}
export async function filter(priority, memberId) {
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

        return response.data
}
export async function recupre_data(id) {
  return  await axios.get('https://flowboard-api-virid.vercel.app/cards/'+id )
}

//PUT Modifier La carte

export async function  MOdifierCarte(id,cards){

const options = {
  method: 'PUT',
  url: 'https://flowboard-api-virid.vercel.app/cards/'+id+'?password=1234',
  headers: {
    'X-Workspace': 'public',
    'Content-Type': 'application/json'
  },
  data: cards
}

try {
  const { data } = await axios.request(options)
  return data
} catch (error) {
  console.error(error)
  throw error

}
}
export async function glissement (id,status) {
  return await axios.patch('https://flowboard-api-virid.vercel.app/cards/'+id+'?password=1234',{status})
  
}
export async function Delete(id){
  return await axios.delete('https://flowboard-api-virid.vercel.app/cards/'+id+'?password=1234')
}

