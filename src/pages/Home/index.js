import React from 'react'
// 1.导入路由
import {BrowserRouter as Router,Route,Link, Redirect} from 'react-router-dom'
//2.导入组件
import Index from '../Index'
import Profile from '../Profile'
//鉴权组件
import AuthRoute from '../../components/AuthRoute'
//导入tabbar
import { TabBar } from 'antd-mobile';
import './index.css'
import Item from 'antd-mobile/lib/popover/Item'

import icon_cyq0 from "../../assets/img/cyq0.png"
import icon_cyq01 from "../../assets/img/cyq1.png"
import icon_profile0 from "../../assets/img/my0.png"
import icon_profile1 from "../../assets/img/my1.png"

const tabItems = [{
  title: '车友圈',
  icon: icon_cyq0,
  selectedIcon: icon_cyq01,
  path: '/home'
},
{
  title: '我的',
  icon: icon_profile0,
  selectedIcon:icon_profile1,
  path: '/home/profile'
}]


export default class Home extends React.Component{
    state = {
        //默认选中菜单
        selectedTab: this.props.location.pathname
      };
    //渲染TabBar.Item
    renderTabBarItem() {
      return tabItems.map(item => <TabBar.Item
        title={item.title}
        key={item.title}
        icon={<div   style={{
          width: '22px',
          height: '22px',
          background: `url(${item.icon}) center center /  21px 21px no-repeat` }} />}
        selectedIcon={<div   style={{
          width: '22px',
          height: '22px',
          background: `url(${item.selectedIcon}) center center /  21px 21px no-repeat` }} />}
        selected={this.state.selectedTab === item.path}
        
        onPress={() => {
        this.setState({
            selectedTab: item.path,
        });
        //路由切换
        this.props.history.push(item.path)
        }}
    />)
    }  

    render(){
        return (
            <div className='home'>
               
                {/* 渲染子路由 */}
                <Route exact path='/home' component={Index}></Route>
                {/* <Route path='/home/Profile' component={Profile}></Route> */}
                <AuthRoute path='/home/Profile' component={Profile}></AuthRoute>


                {/* 渲染tabbar */}
                
                    <TabBar
                    
                    tintColor="#3c423f"
                    barTintColor="white"
                    noRenderContent={true}
                    >
                      {this.renderTabBarItem()}
                    </TabBar>
                
            </div>
        )
    }
}