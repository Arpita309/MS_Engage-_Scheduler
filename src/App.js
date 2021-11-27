import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login  from "./components/login/login";
import SignUp  from "./components/signup/signup";
import Home from "./components/homePage/homePage";
import SubmitList from "./components/submitList/submitList";
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<SignUp/>}/>
        <Route exact path="/chooseForms" element={<SubmitList/>}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
