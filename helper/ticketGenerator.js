

const generateTicket = ()=>{
    return new Date().getTime().toString(36).slice(0,3).toUpperCase() + Math.random().toString().slice(2)
}
