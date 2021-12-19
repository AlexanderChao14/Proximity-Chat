import React from 'react';
import style from './style.css';
import { useState, useEffect } from 'react';
import Controller from '../../Controller';

const Seating = () => {
    const gridSize = [20,10];
    const [currentSeating, setCurrentSeating] = useState([4,4]);
    const [volume, setVolume] = useState(1);
    const [otherUsers, setOtherUsers] = useState([[1,5],[5,5]]);
    const controller = Controller.getInstance();

    const generateTable = (width, height) =>{
        let table = [];
        let listening = affectedByVolume(currentSeating[0], currentSeating[1]);
        for(let i = 0; i < height; i++){
            let row = [];
            for(let j = 0; j < width; j++){
                let id = "";
                if(currentSeating[0] === j && currentSeating[1] === i){
                    id += 'current-seat';
                }else if(otherUsers.some(user => user[0] === j && user[1] === i)){
                    id += 'occupied-seat';
                }else if(listening.some(user => user[0] === j && user[1] === i)){
                    id += 'listening-seat';
                }
                row.push(<div className = "seat" key = {i + j} id={id} onClick={() => {moveSeats(j, i)}}> </div>);
            }
            table.push(<div className = "row" key = {i}>{row}</div>);
        }
        return table;
    }

    const affectedByVolume = (x, y) => {
        let affected = _getAffectedSeats(x, y, volume);
        return affected;
    }

    const _getAffectedSeats = (x, y, depth) => {
        // non recursive
        let affected = [];
         for(let i = 0; i < depth; i++){
             for(let j = 0; j < depth; j++){
                 affected.push([x + i, y + j]);
             }
        }
        for(let i = 0; i < depth; i++){
            for(let j = 0; j < depth; j++){
                affected.push([x - i, y + j]);
            }
       }
        for(let i = 0; i < depth; i++){
            for(let j = 0; j < depth; j++){
                affected.push([x + i, y - j]);
            }   
        }
        for(let i = 0; i < depth; i++){
            for(let j = 0; j < depth; j++){
                affected.push([x - i, y - j]);
            }   
        }
        return affected;

    }


    const moveSeats = (y, x) => {
        if(otherUsers.some(user => user[0] === y && user[1] === x)){
            return;
        }
        const data = {
            'old': [currentSeating[0], currentSeating[1]],
            'new': [y, x]
        }
        controller.moveSeats(data);
        setCurrentSeating([y, x]);
    }

    


    return (
        <div className = "seating-container">
            <div className = "seating-table">
                {generateTable(gridSize[0], gridSize[1])}
            </div>
            <div className = "volume-container">
                <button className='volume' id = "increase-volume" onClick={() => setVolume(volume + 1)}>
                    Increase Volume
                </button>
                <p>
                    {volume}
                </p>
                <button className='volume' id = "decrease-volume" onClick={() => setVolume(volume - 1)}>
                    Decrease Volume
                </button>
            </div>
        </div>

    );



}

export default Seating;