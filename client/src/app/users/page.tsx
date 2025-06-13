import axios from 'axios'
import React from 'react'

const Users = async () => {
    const {data} =  await axios.get('http://localhost:8000/users')
  return (  
    <div>{data.map((item)=>{
      return(
        <div key={item.id} className="p-4 border rounded-lg mb-4">
          <h2 className="text-lg font-bold">{item.name}</h2>
          <p>Email: {item.email}</p>
          <p>Password: {item.password}</p>
        </div>
      )
    })}</div>
  )
}
export default Users