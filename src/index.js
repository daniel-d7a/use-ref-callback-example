import React from "react";
import ReactDOM from "react-dom";
import { useRef, useEffect } from "react";
import { useImmer } from "use-immer";

import "./styles.css";

const items = [1, 2, 3, 4, 5, 6];

function App() {
  const myRef = useRef([]);
  const [myItems, setMyItems] = useImmer(items);

  // remove comment if you want to log the items of the ref
  // useEffect(() => {
  //   if (myRef.current) {
  //     console.log(myRef.current);
  //   }
  // });

  return (
    <div className="App">
      {/* numbers */}
      <div className="container">
        {myItems.map((item) => (
          <p
            key={item}
            ref={(node) => {
              if (node) {
                myRef.current.push(node);
              } else {
                myRef.current.pop();
              }
            }}
          >
            {item}
          </p>
        ))}
      </div>

      {/* number buttons */}
      <div className="container-row">
        {myItems.map((item) => (
          <button
            key={item}
            onClick={() => {
              myRef.current.forEach((element) => {
                element.classList.remove("on");
              });
              myRef.current[item - 1].classList.add("on");
            }}
          >
            focus item {item}
          </button>
        ))}
      </div>

      {/* add and remove buttons */}
      <div className="container-row" style={{ marginTop: "16px" }}>
        <button
          onClick={() => {
            setMyItems((draft) => {
              draft.push(draft.length + 1);
            });
          }}
        >
          add item
        </button>
        <button
          onClick={() => {
            setMyItems((draft) => {
              draft.pop();
            });
          }}
        >
          remove item
        </button>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
