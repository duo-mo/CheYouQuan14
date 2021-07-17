import React from 'react'
// import { Flastlist } from 'reat-native'
// 1.导入路由
import { Route, Link } from 'react-router-dom'
//2.导入组件
import Index from '../Index'
import Profile from '../Profile'
import Circle from '../Circle'
// import axios from 'axios'
//鉴权组件
// import AuthRoute from '../../components/AuthRoute'
//导入tabbar
import { TabBar } from 'antd-mobile';
import './index.css'
import icon_cyq0 from "../../assets/img/cyq0.png"
import icon_cyq01 from "../../assets/img/cyq1.png"
import icon_profile0 from "../../assets/img/my0.png"
import icon_profile1 from "../../assets/img/my1.png"
// import { API } from "../../utils/api.js"
// import SshPK from 'sshpk'

const tabItems = [{
  title: '车友圈',
  icon: icon_cyq0,
  selectedIcon: icon_cyq01,
  path: '/home'
},
{
  title: '我的',
  icon: icon_profile0,
  selectedIcon: icon_profile1,
  path: '/home/profile'
}]


export default class Home extends React.Component {

  state = {
    //默认选中菜单
    selectedTab: this.props.location.pathname,
  };


  //测试接口
  /*   handleClick() {
          API.get('/community/circle/circle_article_hot', {
            params: {
              community_id: 1,
              page: 1,
              limit: 2
            }
          }).then(res => {
            console.log(res);
          })
    } */
  //测试接口

  //渲染TabBar.Item
  renderTabBarItem() {
    return tabItems.map(item => <TabBar.Item
      title={item.title}
      key={item.title}
      icon={<div style={{
        width: '22px',
        height: '22px',
        background: `url(${item.icon}) center center /  21px 21px no-repeat`
      }} />}
      selectedIcon={<div style={{
        width: '22px',
        height: '22px',
        background: `url(${item.selectedIcon}) center center /  21px 21px no-repeat`
      }} />}
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
  render() {
    return (
      <div className='home'>

        {/* 渲染子路由 */}
        <Route exact path='/home' component={Index}></Route>
        <Route path='/home/Profile' component={Profile}></Route>
        <Route path='/Circle' component={Circle}></Route>
        {/*         <Route path='/home/circle' component={Circle}></Route>
        <Link to='../Circle'>gogogo</Link> */}

        {/* //测试接口 */}
        {/* <button onClick={this.handleClick.bind(this)}>get data</button> */}
        {/* //测试接口 */}

        {/* 采用鉴权组件 */}
        {/* <AuthRoute path='/home/Profile' component={Profile}></AuthRoute> */}

        {/* 渲染tabbar */}
        <TabBar
          tintColor="#3c423f"
          barTintColor="white"
          noRenderContent={true}
        >
          {this.renderTabBarItem()}
        </TabBar>
        <Link to='/Circle'>哈弗车圈</Link>
      </div>
    )
  }
}