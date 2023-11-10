import React, { useState } from 'react';

const TileIndex = () => {
  //If at any point there are 3 consecutive letters that are the same, replace them with an underscore.
  //For example, if A, B, C, F, F, F, G is clicked in that order, 
  //the string that appears in outputString would be ABC_G. 
  //If 6 of the same letter appears after, for example, clicking A six times followed by a B, then outputString would be __B.
  const [outputString, setOutputString] = useState('');

  const handleLetterClick = (letter) => {
    const newOutputString = outputString + letter;
    const lastThreeLetters = newOutputString.slice(-3);
    console.log(newOutputString)
    console.log(lastThreeLetters)

    if (lastThreeLetters.length === 3 && lastThreeLetters.match(/(.)\1{2}/)) {
      // Replace the last three letters with an underscore
      setOutputString(newOutputString.slice(0, -3) + '_');
    } else {
      setOutputString(newOutputString);
    }
  };

  return (
    <div>
      <button onClick={() => handleLetterClick('A')}>A</button>
      <button onClick={() => handleLetterClick('B')}>B</button>
      <button onClick={() => handleLetterClick('C')}>C</button>
      <button onClick={() => handleLetterClick('F')}>F</button>
      <button onClick={() => handleLetterClick('G')}>G</button>

      {/* <p>Output String: {outputString}</p> */}
    </div>
  );
};

export default TileIndex;