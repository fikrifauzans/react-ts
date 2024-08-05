import React from 'react';


interface Detail {
  name: string;
  age?: number; // age adalah opsional
}


const Greeting: React.FC<Detail> = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>You are {age} years old.</p>}
    </div>
  );
};

export default Greeting;
