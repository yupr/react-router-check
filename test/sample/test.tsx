import { useState } from "react";

function Test() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>React Testing Demo</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Test;
