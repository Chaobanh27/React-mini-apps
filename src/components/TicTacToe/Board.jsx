import React, { useState } from "react";
import { Square } from "./Square";
import "./TicTacToe.css"
import { Button } from "react-bootstrap";

export const Board = () => {
  const [xIsNext,setXIsNext] = useState(true)
  //squares có giá trị ban đầu là một mảng có 9 phần tử có giá trị là null
  const [squares,setSquares] = useState(Array(9).fill(null))

  const winner  = calculateWinner(squares)
  //console.log(winner)
  let status
  if(winner){
    status = "winner is : " + winner
  }
  else{
    status = "Next player : " + (xIsNext ? "X" : "O")
  }

  const handleClick = (i) => {
    if(squares[i] || calculateWinner(squares)){
      return
    }
    const nextSquares = squares.slice()
    if(xIsNext){
      nextSquares[i] = "X"
    }
    else{
      nextSquares[i] = "O"
    }
    setXIsNext(!xIsNext)
    setSquares(nextSquares)
  }

  function calculateWinner(squares){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for(let i = 0; i < lines.length; i++){
      //dùng destructuring gán giá trị của các mảng con trong lines cho a b và c
      const [a,b,c] = lines[i]
      //vdu với điều kiện nếu các ô squares[0], squares[4], và squares[8] có cùng giá trị (X hoặc O) 
      //và không phải null, hàm sẽ trả về giá trị của ô đó
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        //trả về X hoặc O
        return squares[a]
      }
    }
    return null
  }

  return (
    <>
    <div className="status">{status}</div>
    <Button className="resetBtn mb-3 " onClick={() => setSquares([])}>Reset</Button>
    <div className="board">
    <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </div>

    </>
  );
};
