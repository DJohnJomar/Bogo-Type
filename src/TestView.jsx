import "./assets/styles/TestView.css"
import { useState } from "react";

function TestView() {
  const[typedCharacters, setTypedCharacters] = useState(Array(0));
  
  return (
    <div className="TestView">
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis
        sint iste atque facere sit, magni quasi at harum blanditiis velit
        facilis! Sequi vel ipsum voluptatibus optio voluptate laborum neque
        quibusdam?
      </p>
    </div>
  );
}

export default TestView;
