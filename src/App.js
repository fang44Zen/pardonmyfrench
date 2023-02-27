import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/navigation-bar/navbar.component";
import HomePage from "./routes/home/home-page";
import Exercices from "./routes/exercices/exercices";
import CreateExo from "./routes/create-exercice/create-exercice";
import CreateQuestion from "./routes/create-exercice/create-question/create-questions";
import SignIn from "./routes/sign-in/sign-in";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="/exercices" element={<Exercices />} />
          <Route path="/create-exo" element={<CreateExo />} />
          <Route
            path="/create-exo/questions-creator"
            element={<CreateQuestion />}
          />
          <Route path="/login-page" element={<SignIn />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
