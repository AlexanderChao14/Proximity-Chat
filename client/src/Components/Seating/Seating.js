import React from 'react';
import style from './style.css';
import { useState } from 'react';

const Seating = () => {
    const [currentSeating, setCurrentSeating] = useState([1,1]);
    const [volume, setVolume] = useState(0);
    const [otherUsers, setOtherUsers] = useState([[1,5],[5,5]]);

    const generateTable = (width, height) =>{
        let table = [];
        for(let i = 0; i < height; i++){
            let row = [];
            for(let j = 0; j < width; j++){
                if(currentSeating[0] === j && currentSeating[1] === i){
                    row.push(<div className = "seat" id='current-seat' key = {i + j}></div>);
                }else if(otherUsers.some(user => user[0] === j && user[1] === i)){
                    row.push(<div className = "seat" id='occupied-seat' key = {i + j}></div>);
                }else{
                    row.push(<div className = "seat" key = {i + j} onClick={() => {moveSeats(j, i)}}> </div>);
                }
            }
            table.push(<div className = "row" key = {i}>{row}</div>);
        }
        return table;
    }

    const moveSeats = (y, x) => {
        if(otherUsers.some(user => user[0] === y && user[1] === x)){
            return;
        }
        setCurrentSeating([y, x]);
    }


    return (
        <div className = "seating-container">
            <div className = "seating-table">
                {generateTable(20, 10)}
            </div>
            <div className = "volume-container">
                <button className='volume' id = "increase-volume">
                    Increase Volume
                </button>
                <button className='volume' id = "decrease-volume">
                    Decrease Volume
                </button>
            </div>
        </div>

    );



}

export default Seating;