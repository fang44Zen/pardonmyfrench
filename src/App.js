import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/navigation-bar/navbar.component";
import HomePage from "./routes/home/home-page";
import Exercices from "./routes/exercices/exercices";
import CreateExo from "./routes/create-exercice/create-exercice";
import CreateQuestion from "./components/create-question/create-questions";
import AuthPage from "./routes/authentification-pages/auth-page";
import SignIn from "./components/authentification/sign-in/sign-in";
import SignUp from "./components/authentification/sign-up/sign-up";

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
          <Route exact path="/login-page" element={<AuthPage />}>
            <Route index element={<SignIn />} />
            <Route path="/login-page/signup" element={<SignUp />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
