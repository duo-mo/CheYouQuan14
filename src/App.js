import React from 'react';


//导入要使用的组件
// import {Button} from 'antd-mobile'

import {BrowserRouter as Router,Route,Link,Redirect} from 'react-router-dom'
//导入首页和城市两个组件(页面)
import Home from './pages/Home'
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
      {/* <Button>按钮</Button> */}
      
      {/* 配置路由 */}
      <Route path="/home" component={Home}></Route>
      {/* 默认路由重定向 */}
      <Route exact path='/' render={()=><Redirect to='/home' />}></Route>
      <Route path="/login" component={Login}></Route>

    </div>

    </Router>
    
  );
}

export default App;
