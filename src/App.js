import React from 'react';
//导入要使用的组件


import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
//导入首页和城市两个组件(页面)
import Home from './pages/Home'
import Login from './pages/Login'

import MyNews from './pages/MyNews'
import MyComment from './pages/MyComment'
import Publish from './pages/Publish'
import ChooseC from '../src/pages/Publish/ChooseC/index'
import Circle from './pages/Circle'
import Detail from './pages/Detail'
//鉴权组件
import AuthRoute from './components/AuthRoute'


function App() {
  return (
    <Router>
      <div className="App">
        {/* <Button>按钮</Button> */}

        {/* 配置路由 */}
        <Route path="/home" component={Home}></Route>
        <Route path="/Circle" component={Circle}></Route>

        {/* 默认路由重定向 */}
        <Route exact path='/' render={() => <Redirect to='/home' />}></Route>
        <Route path="/login" component={Login}></Route>
        <Route exact path="/publish" component={Publish}></Route>
        <Route path="/publish/choosec" component={ChooseC}></Route>


        {/* 登录后才能访问的 */}
        <AuthRoute path="/user/my_news" component={MyNews}></AuthRoute>
        <AuthRoute path="/user/my_comment" component={MyComment}></AuthRoute>
        <AuthRoute path='/Detail' component={Detail}></AuthRoute>


      </div>

    </Router>

  );
}

export default App;
