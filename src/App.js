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
import { useEffect, useState } from "react";
import LoadingPage from "./components/loading-page/loading-page";
import ListQuestion from "./components/questions-area/list-questions";

const App = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const handleRefresh = () => {
      setIsDataLoaded(false);
    };

    window.addEventListener("beforeunload", handleRefresh);

    return () => {
      window.removeEventListener("beforeunload", handleRefresh);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDataLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {isDataLoaded ? (
        <Routes>
          <Route path="pardonmyfrench" element={<Navbar />}>
            <Route index element={<HomePage />} />
            <Route path="/pardonmyfrench/exercices" element={<Exercices />} />
            <Route path="/pardonmyfrench/create-exo" element={<CreateExo />} />
            <Route
              path="/pardonmyfrench/create-exo/questions-creator"
              element={<CreateQuestion />}
            />
            <Route
              path="/pardonmyfrench/exercices/list-questions"
              element={<ListQuestion />}
            />
            <Route
              exact
              path="/pardonmyfrench/login-page"
              element={<AuthPage />}
            >
              <Route index element={<SignIn />} />
              <Route
                path="/pardonmyfrench/login-page/signup"
                element={<SignUp />}
              />
            </Route>
          </Route>
        </Routes>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

export default App;
