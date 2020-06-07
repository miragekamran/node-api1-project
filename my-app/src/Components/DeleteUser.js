import React, {useState, useEffect} from 'react'
import axiosWithAuth from '../Utils/axiosWithAuth';
import styled from 'styled-components';
import {Button} from '@material-ui/core';

export default function DeleteUser() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosWithAuth()
            .get('/users')
            .then(res => {
                setUsers(res.data)
            })
    }, []);

    function deleteUser(e, id) {
        e.preventDefault();
        console.log('deleting')
        axiosWithAuth()
            .delete(`users/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
            .finally(() => window.location.reload());
    }

    return (
        <div>
            <h3>Users</h3>
            {users
        ? users.map((user) => (
            <UserContainer key={user.id}>
              <p>
                Name: {user.name}
                <br />
                Bio: {user.bio}
              </p>
              <Button
                onClick={(e) => deleteUser(e, user.id)}
                variant="contained"
                color="primary"
              >
                delete user
              </Button>
            </UserContainer>
          ))
        : "loading"}
        </div>
    )
}

const UserContainer = styled.div`
  padding: 15px;
  margin: 15px;
  background-color: smokewhite;
  border: black 1px solid;
  text-align: center;
`;
