import { useEffect, useState } from "react";
import "./App.css";
import StudyRecord from "./StudyRecord";
import { getAllTodos } from "./utils/supabaseFuntion";

function App() {
  return <StudyRecord />;
}

export default App;
