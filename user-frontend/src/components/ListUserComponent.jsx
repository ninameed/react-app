import React, {useEffect, useState} from 'react'
import { listUsers, deleteUser } from '../services/UserService'
import { useNavigate } from 'react-router-dom'

export const ListUserComponent = () => {

    // useState hook allows us to define and use state variables in a funtional component
    // users = state variable
    // setUsers = function that updates the state variable
    const [users, setUsers] = useState([])

    const navigator = useNavigate();

    // Get the response of the REST-API and store the data in a 'users' state variable
    useEffect(() => {
        getAllUsers();
    }, [])

    function getAllUsers(){
        listUsers().then((response) => {
            setUsers(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    function addNewUser(){
        navigator('/add-user')
    }

    function updateUser(id){
        navigator(`/edit-user/${id}`)
    }

    function removeUser(id){
        console.log(id);
        deleteUser(id).then((response) => {
            getAllUsers();
        }).catch(err => {
            console.error(err);
        })
    }
    
    function getAverageLengthOfFirstNames(){
       let names = users.map(element => element.firstName);
       return names.reduce((accumulator, name, i, array) => accumulator + name.length / array.length, 0);
    }

    function getAverageLengthOfLastNames(){
        let names = users.map(element => element.lastName)
        return names.reduce((accumulator, name, i, array) => accumulator + name.length / array.length, 0);
    }

    function getNumberOfPeopleBornInLeapYear(){
        let birthYears = users.map(element => element.birthDate);
        var numberOfPeople = 0;
        birthYears.forEach(year => {
            if(year % 100 === 0 ? year % 400 === 0 : year % 4 === 0){
                numberOfPeople++;
            }
        });
        return numberOfPeople;
    }
    
    return (
    <div className='container'>
        <h2 style={{paddingTop: '40px'}}> Liste over brukere</h2>
       <button className='btn btn-primary mb-2' onClick={addNewUser}>Ny bruker</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Fornavn</th>
                    <th>Etternavn</th>
                    <th>Adresse</th>
                    <th>Telefonnummer</th>
                    <th>Fødselsår</th>
                    <th>Handlinger</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.slice(0, 20).map(user => 
                    <tr key={user.id}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.address}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.birthDate}</td>
                        <td>
                            <button className='btn btn-info' onClick={() => updateUser(user.id)}>Oppdater</button>
                            <button className='btn btn-danger' onClick={() => removeUser(user.id)}
                            style={{marginLeft: '10px'}}>Slett</button>
                        </td>
                    </tr>)    
                }
            </tbody>
        </table>
        <div style={{paddingTop: '20px'}}>Antall brukere: {users.length}</div>
        <div style={{paddingTop: '20px'}}>Gjennomsnittlig lengde på fornavn - antall bokstaver: {getAverageLengthOfFirstNames()}</div>
        <div style={{paddingTop: '20px'}}>Gjennomsnittlig lengde på etternavn - antall bokstaver: {getAverageLengthOfLastNames()}</div>
        <div style={{paddingTop: '20px', paddingBottom: '30px'}}>Antall personer født i skuddår: {getNumberOfPeopleBornInLeapYear()}</div>
    </div>
  )
}
