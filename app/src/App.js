import React, { Component } from 'react'
import './App.css'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/home'
import FindBrewery from './pages/find-brewery'
import SearchResults from './pages/search-results'
import Favorites from './pages/favorites'
import CouponWallet from './pages/coupon-wallet'
import ViewBrewery from './pages/view-brewery'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/find-brewery" component={FindBrewery} />
          <Route exact path="/search-results" component={SearchResults} />
          <Route exact path="/search-results/:id" component={ViewBrewery} />
          <Route exact path="/favorites" component={Favorites} />
          <Route exact path="/coupon-wallet" component={CouponWallet} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
