import React from 'react';
import './App.css';
import {SortingVisualizer} from "./SortingVisualizer/SortingVisualizer";
import {BubbleSort} from "./algorithms/sort_algorithms/BubbleSort";

function App() {
  return (
    <div className="App">
      <SortingVisualizer></SortingVisualizer>
    </div>
  );
}

export default App;
