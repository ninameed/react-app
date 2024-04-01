import React, { useEffect, useState } from 'react'
import { createUser, getUser, updateUser } from '../services/UserService'
import { useNavigate, useParams } from 'react-router-dom'

const UserComponent = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [birthDate, setBirthDate] = useState('')

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        address: ''    
    })

    const {id} = useParams();

    const navigator = useNavigate();

    useEffect(() => {
        if(id){
            getUser(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setAddress(response.data.address);
                setPhoneNumber(response.data.phoneNumber);
                setBirthDate(response.data.birthDate);
            }).catch(err => {
                console.error(err);
            })
        }

    }, [id]);

    /* Get the value from the event object */
    function handleFirstName(e){
        setFirstName(e.target.value);
    }

    function handleLastName(e){
        setLastName(e.target.value);
    }

    function handleAddress(e){
        setAddress(e.target.value);
    }

    function handlePhoneNumber(e){
        setPhoneNumber(e.target.value);
    }

    function handleBirthDate(e){
        setBirthDate(e.target.value);
    }

    function saveOrUpdateUser(e){

        e.preventDefault();

        if(validateForm()){
            const user = {
                firstName,
                lastName,
                address,
                phoneNumber,
                birthDate
            }
            console.log(user);

            if(id){
                updateUser(id, user).then((response) => {
                    console.log(response.data)
                    navigator('/users');
                }).catch(err => {
                    console.error(err);
                })
            } else {
                createUser(user).then((response) => {
                    console.log(response.data);
                    navigator('/users');
                }).catch(err => {
                    console.error(err);
                })
            }
        }   
    }

    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors}

        if(firstName.trim()){
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'Vennligst skriv inn fornavn';
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Vennligst skriv inn etternavn';
            valid = false;
        }

        if(address.trim()){
            errorsCopy.address = '';
        } else {
            errorsCopy.address = 'Vennligst skriv inn adresse';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }


    function pageTitle(){
        if(id){
            return <h2 className='text-center mb-5'>Rediger bruker</h2>
        }
        else return <h2 className='text-center mb-5'>Legg til bruker</h2>
    }


    function nameSpelledBackwards(){
        if(id){
            var first_name = firstName;
            var last_name = lastName;
            var firstNameBackwards = "";
            var lastNameBackwards = "";

            for (var i = first_name.length - 1; i >= 0; i--) {
                firstNameBackwards += first_name[i];
            }

            for (var i = last_name.length - 1; i >= 0; i--) {
                lastNameBackwards += last_name[i];
            }

            return "Navnet baklengs: " + firstNameBackwards + "  " + lastNameBackwards;
        }
    }


    function bornInLeapYear(){
        if(birthDate % 400 === 0 || birthDate % 100 !== 0 && birthDate % 4 === 0){
            return "Født i et skuddår";
        } else {
            return "Ikke født i et skuddår";
        }
    }


    function getSumOfPhoneNumber(){
        var num = phoneNumber;
        var sum = 0;

        while (num) {
            sum += num % 10;
            num = Math.floor(num / 10);
        }
        return "Tverrsummen av telefonnummeret: " + sum;
    }


  return (
    <div className='container'>
        <br></br>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Fornavn:</label>
                            <input 
                                type='text' 
                                name='firstName' 
                                value={firstName}
                                className={`form-control ${ errors.firstName ? 'is-invalid': ''}`}
                                placeholder='Skriv inn fornavn'
                                onChange={handleFirstName}>
                            </input>
                            { errors.firstName  && <div className='invalid-feedback'>{ errors.firstName }</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Etternavn:</label>
                            <input 
                                type='text' 
                                name='lastName' 
                                value={lastName}
                                className={`form-control ${ errors.lastName ? 'is-invalid': ''}`}
                                placeholder='Skriv inn etternavn'
                                onChange={handleLastName}>
                            </input>
                            { errors.lastName  && <div className='invalid-feedback'>{ errors.lastName }</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Adresse:</label>
                            <input 
                                type='text' 
                                name='address' 
                                value={address}
                                className={`form-control ${ errors.address ? 'is-invalid': ''}`}
                                placeholder='Skriv inn adresse'
                                onChange={handleAddress}>
                            </input>
                            { errors.address  && <div className='invalid-feedback'>{ errors.address }</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Telefonnummer:</label>
                            <input 
                                type='number' 
                                name='phoneNumber' 
                                value={phoneNumber}
                                className='form-control'
                                placeholder='Skriv inn telefonnummer'
                                onChange={handlePhoneNumber}>
                            </input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Fødselsår:</label>
                            <input 
                                type='number' 
                                name='birthDate' 
                                value={birthDate}
                                className='form-control'
                                placeholder='Skriv inn fødselsår'
                                onChange={handleBirthDate}>
                            </input>
                        </div>
                        <button className='btn btn-success' onClick={saveOrUpdateUser}>Lagre</button>
                    </form>
                    <div style={{paddingTop: '40px'}}>
                        {
                            nameSpelledBackwards()
                        }
                    </div>
                    <div style={{paddingTop: '40px'}}>
                        {
                            bornInLeapYear()
                        }
                    </div>
                    <div style={{paddingTop: '40px', paddingBottom: '30px'}}>
                        {
                            getSumOfPhoneNumber()
                        }
                    </div>
                   
                </div>
            </div>
        </div>

    </div>
  )
}

export default UserComponent