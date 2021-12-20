import React from 'react';
import style from './style.css';
import { useState, useEffect } from 'react';
import Controller from '../../Controller';

const Seating = () => {
    const gridSize = [20,10];
    const [currentSeating, setCurrentSeating] = useState([4,4]);
    const [volume, setVolume] = useState(1);
    const controller = Controller.getInstance();

    const generateTable = (width, height) =>{
        let table = [];
        let listening = affectedByVolume(currentSeating[0], currentSeating[1]);
        controller.range = volume;
        for(let i = 0; i < height; i++){
            let row = [];
            for(let j = 0; j < width; j++){
                let id = "";
                if(currentSeating[0] === j && currentSeating[1] === i){
                    id += 'current-seat';
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

    
    function calculateDistance(p1, p2){
        return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
    }

    const _getAffectedSeats = (x, y, depth) => {
        // go through all entries in the seating array
        let affected = [];
        for(let i = 0; i < gridSize[0]; i++){
            for(let j = 0; j < gridSize[1]; j++){
                if(calculateDistance([x,y], [i,j]) <= depth){
                    affected.push([i,j]);
                }
            }
        }  
        return affected;
    }


    const moveSeats = (y, x) => {
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