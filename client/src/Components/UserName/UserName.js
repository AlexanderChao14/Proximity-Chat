import React from 'react';
import Controller from '../../Controller';

const UserNameInput = () => {
    const controller = Controller.getInstance();

    const submitUserName = (e) => {
        e.preventDefault();
        const username = document.getElementById('UserName').value;
        controller.setUsername(username);
        console.log(controller.username);

    }

    return (
        <div className="UserNameInput">
            <form onSubmit={submitUserName}>
                <input id="UserName" type="text" autocomplete="off"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UserNameInput;