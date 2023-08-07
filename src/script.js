fetch(`http://api.weatherapi.com/v1/current.json?key=0c20e1795e634f7db3e201027230308&q=boquim`)
.then((response)=>{
   return response.json()
})
.then((response) => console.log(response))

