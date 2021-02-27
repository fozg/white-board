import "./App.css";
import Board from "./components/Board";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import { AuthorizedAppWrap, StyleProvider } from "@fozg/fozg-ui-elements";

function App() {
  return (
    <AuthorizedAppWrap>
      <StyleProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/new" component={Board} exact />
            <Route path="/" component={Home} exact />
          </Switch>
        </BrowserRouter>
      </StyleProvider>
    </AuthorizedAppWrap>
  );
}

export default App;
