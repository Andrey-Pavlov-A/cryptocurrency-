import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import CoinMarketPage from "./Components/CoinMarketPage/CoinMarketPage";
import NavBar from "./Components/NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import MetaDataPageContainer from "./Components/MetaData/MetaDataPage";
import { connect } from "react-redux";
function App(props) {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="content">
        <Switch>
          <Route exact path="/coins" render={() => <CoinMarketPage />} />
          <Route
            path="/coins/metadata"
            render={() => <MetaDataPageContainer />}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return{
    currentPage: state.coinsPage.currentPage
  }
}

const AppContainer = connect(mapStateToProps, {})(App)

export default App;
