import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'

function Users() {

  const [users, setUsers] = useState([])

  useEffect(() => { 
    axios.get('https://api.escuelajs.co/api/v1/users')
      .then(response => {
        // console.log(response.data)
        setUsers(response.data)
      })
      .catch(error => {
        console.error('Error fetching users:', error)
      })
  }, [])

  console.log(users);
  return (
    <div className='container'>
      <h1>Users</h1>
      <div className='d-flex flex-lg-row flex-sm-column p-5'>
        {
          users.length > 0 ? (
            users.map(user => (
              <Card key={user.id} className='p-5 m-3'>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                  <div className='d-flex justify-content-center'><img src={user.avatar} className='rounded-circle' alt="" /></div>
                  <h1>{user.name}</h1>
                  <h4>{user.email}</h4>
                </div>
              </Card>
            ))
          ) : (
            <p>Loading users...</p>
          )
        }
      </div>
    </div>
  )
}

export default Users