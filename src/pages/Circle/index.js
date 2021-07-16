import React from 'react'
// import { FlatList } from 'react-native'
// 1.导入路由
import { Route, Link } from 'react-router-dom'
//2.导入组件
import Index from '../Index'
import Profile from '../Profile'
import axios from 'axios'
//鉴权组件
// import AuthRoute from '../../components/AuthRoute'
//导入tabbar
import { WingBlank, TabBar, NavBar, Icon, Tabs, WhiteSpace, ListView } from 'antd-mobile';
// import { StickyContainer, Sticky } from 'react-sticky';
import './style.css'
import icon_cyq0 from "../../assets/img/cyq0.png"
import icon_cyq01 from "../../assets/img/cyq1.png"
import icon_profile0 from "../../assets/img/my0.png"
import icon_profile1 from "../../assets/img/my1.png"
import { API } from "../../utils/api.js"
import tuwen from '../../assets/img/ugc_icon_发图文.png'
import tiwen from '../../assets/img/03-发布.png'
import like from '../../assets/img/ugc_icon_like_normal_24.svg'
import liked from '../../assets/img/ugc_icon_like_selected_24.svg'
import dicuss from '../../assets/img/评论.svg'
import more from '../../assets/img/更多.png'
import Detail from '../Detail'
import time from '../../utils/time';
import AuthRoute from '../../components/AuthRoute'
import { getToken } from '../../utils/auth'
const myImg = src => <img src={src} className="am-icon-mm" alt="" />;


//Tabs标签
const tabItems = [{
  title: '图文',
  path: '/home'
},
{
  title: '问答',
  path: '/home/profile'
}]

//判断图片个数
function returnPicNum(imgarray) {
  const m = imgarray.length;
  const data1 = Array.from(new Array(m)).map(() => ({
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
  }));
  return data1
}


export default class Circle extends React.Component {
  //改变div的className
  constructor(props) {
    super(props);
    this.state = {
      display_block: 'block',
      display_none: 'none',
      //默认选中菜单
      selectedTab: this.props.location.pathname,
      tiezi: [],
      circle_info: [],
      newtz: [],
    }
  }
  del_0 = () => {
    if (this.state.display_block === 'none') {
      this.setState({
        display_block: 'block',
        display_none: 'none'
      })
    }
    if (document.getElementById('m-tab-0').className == 'selectedTab') {
      console.log('这个被选中的tab已经被选中了');
    } else {
      document.getElementById('m-tab-0').className = 'selectedTab';
      document.getElementById('m-tab-1').className = 'unselectedTab';
    }
  }
  del_1 = () => {
    if (this.state.display_block === 'block') {
      this.setState({
        display_block: 'none',
        display_none: 'block'
      })
    }
    if (document.getElementById('m-tab-1').className == 'selectedTab') {
      console.log('这个被选中的tab已经被选中了');
    } else {
      document.getElementById('m-tab-1').className = 'selectedTab';
      document.getElementById('m-tab-0').className = 'unselectedTab';
    }
  }
  //改变div的className


  //获取热门帖子信息
  async getTiezi() {
    const res = await API.get(
      '/community/circle/circle_article_hot', {
      params: {
        community_id: JSON.parse(window.localStorage.getItem('community_id')).community_id,
        page: 1,
        limit: 4,
        user_id: JSON.parse(window.localStorage.getItem('my_id'))
      }
    })
    console.log("热门帖子数据为：", res.data);
    this.setState({
      tiezi: res.data
    })
  }

  //获取最新帖子信息
  async getNewTZ() {
    const res = await API.get(
      '/community/circle/circle_article_new', {
      params: {
        community_id: JSON.parse(window.localStorage.getItem('community_id')).community_id,
        page: 1,
        limit: 4,
        user_id: JSON.parse(window.localStorage.getItem('my_id'))
      }
    })
    console.log("最新帖子数据为：", res.data);
    this.setState({
      newtz: res.data
    })
  }

  //获取车圈信息
  async getCircle() {
    const res = await API.get(
      '/community/circle/circle_info', {
      params: {
        community_id: JSON.parse(window.localStorage.getItem('community_id')).community_id
      }
    })
    console.log("圈子数据为：", res.data);
    this.setState({
      circle_info: res.data.body
    })
    console.log("数据为：", this.state.circle_info);
  }

  //获取自己的id
  async getMyID() {
    const res = await API.get(
      '/user', {
      params: {
        community_id: JSON.parse(window.localStorage.getItem('community_id')).community_id
      }
    })
  }


  //钩子函数
  componentDidMount() {
    this.getTiezi()
    this.getCircle()
    this.getNewTZ()
    this.getMyID()
  }

  //本地缓存
  turnArticle({ id }) {
    console.log(id);
    //存储到本地缓存
    localStorage.setItem('article_id', JSON.stringify({ id }))
    this.props.history.push('/Detail')
  }

  //点赞/取消点赞
  async likeArticle(article_id, article_likes) {
    console.log('当前article_id为', article_id);
    const res = await API.post(
      '/community/like_article',
      { article_id: article_id },
      { headers: { authorzation: getToken() } }
    )
    console.log("点赞数据为：", res.data.body);
    const id = 'like-' + article_id
    // console.log(document.getElementById(id));
    // console.log(res.data.body.iscancelstar);
    // if (res.data.body.iscancelstar == true) {
    //     document.getElementById(id).className = 'dislike-' + article_id
    // } else {
    //     document.getElementById(id).className = 'like-' + article_id
    // }
    this.setState({ newTZ: [], tiezi: [] })
    this.getTiezi()
    this.getNewTZ()
  }


  //加入车圈
  async joinCircle() {
    const res = await API.post(
      '/community/circle/add_community',
      { article_id: JSON.parse(window.localStorage.getItem('community_id')).community_id },
      { headers: { authorzation: getToken() } }
    )
    console.log('加入车圈', res);
  }


  //渲染车圈简介
  renderCirHead() {
    return this.state.circle_info.map(item => (
      // const { name, circle_resume } = this.state.circle_info
      <div className='carCircleIntr'>
        <div>
          <div className='carCircleIntr_name'>{item.name}</div>

          <div className='describe'>
            {item.active_user_photo.split(',').map(item => {
              return (
                <img src={item} alt='picShow'></img>)
            })
            }
            <img src={more} alt='picShow'></img>
            <div className='details'>等{item.all_num}位车友</div>
          </div>

          <div className='carCircleIntr_resume'>{item.circle_resume}</div>
        </div>
        {/* onClick={this.joinCircle()} */}
        <button id='joinButton' >加入</button>
        <img id='beijing' src={item.img_path}></img>
      </div>
    ))
  }


  async returnClass(article_id) {
    const res = await API.post(
      '/community/like_article',
      { article_id: article_id },
      { headers: { authorzation: getToken() } }
    )
    const id = 'like-' + article_id
    if (res.data.body.iscancelstar == false) {
      document.getElementById(id).className = 'dislike-' + article_id
    } else {
      document.getElementById(id).className = 'like-' + article_id
    }
  }


  //渲染热门帖子
  renderTiezi() {

    return this.state.tiezi.map(item => (
      <div key={item.id} style={{ marginTop: '10px' }}>
        <div className='TZ-body'>
          <div className='test-m' onClick={() => this.turnArticle(item)}>
            <div style={{ marginBottom: '10px', display: 'flex' }}>
              <img style={{ width: '36px', height: '36px', borderRadius: '18px', marginRight: '10px' }} src={item.author_info.user_photo}></img>
              <div >
                <div style={{ height: '14px', fontSize: '14px', color: '#333', fontWeight: '500' }}>{item.author_info.user_name}</div>
                <div style={{ height: '5px', fontSize: '5px', marginTop: '5px', color: '#999' }}> {time(item.create_time)} </div>
              </div>
            </div>
            <div className='TZ-content'>{item.content} 查看全文 </div>
            {/* <Grid data={returnPicNum({img_list})} columnNum={3} square={true} /> */}
            <div style={{ flexWrap: 'wrap', flexDirection: 'row', paddingTop: '10px' }}>
              {item.img_list.map(item => (
                <img style={{ width: '113px', height: '113px', paddingRight: '3px' }} src={item.img_path}></img>
              ))}
            </div>
          </div>
          <div className='footen'>
            <div className='discuss'>
              <span><img src={dicuss} alt="discuss" /></span>
              <span className="nums">{item.comments}</span>
            </div>
            {
              item.is_likes == 1 ?
                (
                  <div className={'like-' + item.id} id={'like-' + item.id} >
                    <span onClick={() => this.likeArticle(item.id, item.likes)}></span>
                    <span className="nums">{item.likes}</span>
                  </div>
                ) :
                (
                  <div className={'dislike-' + item.id} id={'like-' + item.id} >
                    <span onClick={() => this.likeArticle(item.id, item.likes)}></span>
                    <span className="nums">{item.likes}</span>
                  </div>
                )
            }
          </div>
        </div>
        <WhiteSpace />
      </div>
    ))
  }



  //渲染最新帖子
  renderNewTZ() {
    // return this.state.newtz.map(item => (
    //     <div key={item.id} style={{ marginTop: '10px' }}>
    //         <div className='TZ-body'>
    //             <div className='test-m' onClick={() => this.turnArticle(item)}>
    //                 <div style={{ marginBottom: '10px', display: 'flex' }}>
    //                     <img style={{ width: '36px', height: '36px', borderRadius: '18px', marginRight: '10px' }} src={item.author_info.user_photo}></img>
    //                     <div >
    //                         <div style={{ height: '14px', fontSize: '14px', color: '#333', fontWeight: '500' }}>{item.author_info.user_name}</div>
    //                         <div style={{ height: '5px', fontSize: '5px', marginTop: '5px', color: '#999' }}> {time(item.create_time)} </div>
    //                     </div>
    //                 </div>
    //                 <div>{item.content}</div>
    //                 <div style={{ flexWrap: 'wrap', flexDirection: 'row', paddingTop: '10px' }}>
    //                     {item.img_list.map(item => (
    //                         <img style={{ width: '113px', height: '113px', paddingRight: '3px' }} src={item.img_path}></img>
    //                     ))}
    //                 </div>
    //             </div>

    //             <div className='footen'>
    //                 <div className='discuss'>
    //                     <span><img src={dicuss} alt="discuss" /></span>
    //                     <span className="nums">{item.comments}</span>
    //                 </div>
    //                 {
    //                     item.is_likes == 1 ?
    //                         (
    //                             <div className={'like-' + item.id} id={'like-' + item.id} >
    //                                 <span onClick={() => this.likeArticle(item.id, item.likes)}></span>
    //                                 <span className="nums">{item.likes}</span>
    //                             </div>
    //                         ) :
    //                         (
    //                             <div className={'dislike-' + item.id} id={'like-' + item.id} >
    //                                 <span onClick={() => this.likeArticle(item.id, item.likes)}></span>
    //                                 <span className="nums">{item.likes}</span>
    //                             </div>
    //                         )
    //                 }
    //             </div>
    //         </div>
    //         <WhiteSpace />
    //     </div>
    // ))
    return this.state.newtz.map(item => (
      <div key={item.id} style={{ marginTop: '10px' }}>
        <div className='TZ-body'>
          <div className='test-m' onClick={() => this.turnArticle(item)}>
            <div style={{ marginBottom: '10px', display: 'flex' }}>
              <img style={{ width: '36px', height: '36px', borderRadius: '18px', marginRight: '10px' }} src={item.author_info.user_photo}></img>
              <div >
                <div style={{ height: '14px', fontSize: '14px', color: '#333', fontWeight: '500' }}>{item.author_info.user_name}</div>
                <div style={{ height: '5px', fontSize: '5px', marginTop: '5px', color: '#999' }}> {time(item.create_time)} </div>
              </div>
            </div>
            <div className='TZ-content'>{item.content} 查看全文 </div>
            {/* <Grid data={returnPicNum({img_list})} columnNum={3} square={true} /> */}
            <div style={{ flexWrap: 'wrap', flexDirection: 'row', paddingTop: '10px' }}>
              {item.img_list.map(item => (
                <img style={{ width: '113px', height: '113px', paddingRight: '3px' }} src={item.img_path}></img>
              ))}
            </div>
          </div>
          <div className='footen'>
            <div className='discuss'>
              <span><img src={dicuss} alt="discuss" /></span>
              <span className="nums">{item.comments}</span>
            </div>
            {
              item.is_likes == 1 ?
                (
                  <div className={'like-' + item.id} id={'like-' + item.id} >
                    <span onClick={() => this.likeArticle(item.id, item.likes)}></span>
                    <span className="nums">{item.likes}</span>
                  </div>
                ) :
                (
                  <div className={'dislike-' + item.id} id={'like-' + item.id} >
                    <span onClick={() => this.likeArticle(item.id, item.likes)}></span>
                    <span className="nums">{item.likes}</span>
                  </div>
                )
            }
          </div>
        </div>
        <WhiteSpace />
      </div>
    ))
  }

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

  returnPage() {
    console.log('1');
  }



  render() {
    return (
      <div className='home'>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
          rightContent={[
            <Icon key="1" type="ellipsis" />,
          ]}
        >车友圈</NavBar>

        {/* 车圈介绍bar */}
        <WingBlank>
          <div>{this.renderCirHead()}</div>
        </WingBlank>
        {/* 车圈介绍bar */}


        <WhiteSpace />
        <WingBlank>

          {/* 热门/最新切换Tab */}
          <div className='m-tabs' >
            <div id='m-tab-0' className='selectedTab' aria-selected={true} onClick={this.del_0}>
              <div>热门</div>
              <div></div>
            </div>
            <div id='m-tab-1' className='unselectedTab' aria-selected={false} onClick={this.del_1}>
              <div>最新</div>
              <div></div>
            </div>
          </div>
          {/* 热门/最新切换Tab */}

          {/* 渲染热门帖子 */}
          <div className='hot-TZ' style={{ display: this.state.display_block }}>{this.renderTiezi()}</div>
          {/* 渲染热门帖子 */}

          {/* 渲染最新帖子 */}
          <div className='new-TZ' style={{ display: this.state.display_none }}>{this.renderNewTZ()}</div>
          {/* 渲染最新帖子 */}

        </WingBlank>

        {/* 底部固定导航栏 */}
        <div className='hotTab'>
          <div className='hotTab-tuwen'>
            <div>{myImg(`${tuwen}`)}</div>
            <p>图文</p>
          </div>
          <div className='hotTab-wenda'>
            <div>{myImg(`${tiwen}`)}</div>
            <p>问答</p>
          </div>
        </div>
        {/* 底部固定导航栏 */}

      </div>
    )
  }
}