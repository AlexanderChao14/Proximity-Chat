import React from 'react';
import Controller from '../../Controller';
import style from '../UserName/style.css';

const UserNameInput = () => {
    const controller = Controller.getInstance();

    const submitUserName = (e) => {
        e.preventDefault();
        const username = document.getElementById('UserName').value;
        controller.setUsername(username);
        console.log(controller.username);
        
        document.getElementById('UserName').value='';
    }



    return (
        <div className="UserNameInput">
            <h1 id="userNameHeader">
                Enter your Username
            </h1>   
            <form onSubmit={submitUserName}>
                <input id="UserName" type="text" autocomplete="off"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UserNameInput;