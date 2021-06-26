import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const First = () => <p>Yemianyideneirong</p>
const App = () => (
  <Router>
    <div>
      <h1>react路由基础</h1>
      <Link to="/first">yemianyi</Link>
      <Route path="/first" component={First}></Route>
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))