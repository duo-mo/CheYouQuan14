import React from 'react'
import { API } from '../../utils/api'
import { getToken, isAuth } from '../../utils/auth'
import time from '../../utils/time'
import './index.scss'
import { Toast } from 'antd-mobile';
import NavHeader from '../../components/NavHeader'
import { Popover, NavBar } from 'antd-mobile';
import tuwen from '../../assets/img/ugc_icon_发图文.png'
import tiwen from '../../assets/img/03-发布.png'
import like from '../../assets/img/ugc_icon_like_normal_24.svg'
import liked from '../../assets/img/ugc_icon_like_selected_24.svg'
import chequan from '../../assets/img/2-车友圈.png'
import dicuss from '../../assets/img/评论.svg'
// import picShow from '../../assets/img/defautle.png'
// import profile from '../../assets/img/Mask.png'
import more from '../../assets/img/更多.png'
// import { getToken } from '../../utils/auth';
const Item = Popover.Item;
const myImg = src => <img src={src} className="am-icon am-icon-xs" alt="" />;


export default class Index extends React.Component {
  state = {
    visible: false,
    selected: '',
    isLogin: isAuth(),
    hotquan: [{
      name: '',
      hot_circle_img: '',
      active_user_photo: '',
      active_num: 0,
      isLogin: 0,

    }],
    home_list: [{
      content: '',
      likes: 0,
      views: 0,
      comments: 0,
      status: '',
      create_time: '',
      img_list: [],
      author_info: {
        uuid: '',
        user_name: '',
        user_photo: '',
        resume: ''
      },
    }]

  };
  componentDidMount() {
    this.getHotQuan();
    this.geCommunityHomeList();
  }
  //获取热门车友圈数据
  async getHotQuan() {
    if (!this.state.isLogin) {
      let res1 = await API.get('/community/get_community_hot', {
        params: {
          page: 3,
          isLogin: 0
        },
        headers: {
          authorzation: getToken()
        }
      })
      console.log('unlogin', res1)
      this.setState({
        hotquan: res1.data.body
      })
    } else {
      let res2 = await API.get('/community/get_community_hot1', {
        params: {
          page: 1,
          isLogin: 1
        },
        headers: {
          authorzation: getToken()
        }
      })
      console.log('login', res2)
      this.setState({
        hotquan: res2.data.body
      })
    }

  }
  //获取首页列表数据
  async geCommunityHomeList() {
    const res2 = await API.get('/community/get_community_home_list', {
      params: {
        page: 1,
        limit: 3
      }
    })
    console.log(res2)
    this.setState({
      home_list: res2.data.body
    })
  }
  onSelect = (opt) => {
    // console.log(opt.props.value);
    this.setState({
      visible: false,
      selected: opt.props.value,

    });
    this.props.history.push('/' + opt.props.value)

  };
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };
  //热门车友圈详情
  QuanDetails(item) {
    const community_id = item.id;
    console.log(community_id);
    localStorage.setItem('community_id', JSON.stringify({ community_id }))
    this.props.history.push('/Circle')
  }
  //动态详情
  ListDetails(item) {
    const list_id = item.id;
    // console.log(list_id);
    localStorage.setItem('list_id', JSON.stringify({ list_id }))
    this.props.history.push('/Detail')
  }
  //加入圈子函数
  joinQ() {
    Toast.info('加入成功', 1, null, false)

  }
  //点赞函数
  dianzan() {
    Toast.info('点赞成功', 1, null, false)
  }
  //关注函数
  async concern() {
    const res = await API.post('/user/follow_user', {
      headers: {
        authorzation: getToken()
      },
      params: {
        author_id: 1,
      }
    })
    console.log(res);
    Toast.info('关注成功', 1, null, false)

  }

  render() {
    //渲染热门车友圈数据
    let renderquancard = this.state.hotquan.map(item => {
      return (
        <div className='card' key={item} onClick={() => this.QuanDetails(item)}>
          <div className='title'>{item.name}</div>
          <div className='picShow'>
            {
              item.hot_circle_img.split(',').map(item => {
                return (
                  <img className='pics' src={item} alt='picShow'></img>
                )
              })
            }
          </div>
          <div className='describe'>
            {item.active_user_photo.split(',').map(item => {
              return (
                <img src={item} alt='picShow'></img>)
            })
            }
            {/* <img src={item.active_user_photo[1]} alt='picShow'></img>
                <img src={item.active_user_photo[2]} alt='picShow'></img> */}
            <img src={more} alt='picShow'></img>
            <div className='details'>{item.active_num}位活跃车友</div>
            <div className='button'>
              <div className='join' onClick={this.joinQ}>加入</div>
            </div>
          </div>
        </div>
      )
    })
    //渲染首页列表数据
    let renderhome_list = this.state.home_list.map(item => {
      let times = time(item.create_time)
      return (
        <div className='trend'>
          <div className='user'>
            <div className='user_pro'>
              <img src={item.author_info.user_photo} alt='user-pro'></img>
            </div>
            <div className='user_name'>
              <div className='user_id'>{item.author_info.user_name}</div>
              <div className='user_time'>{times}</div>
            </div>
            <div className='concern' onClick={this.concern}>关注</div>
          </div>
          <div className='contents' onClick={() => this.ListDetails(item)} key={item}>
            <div className='content'>{item.content}</div>
            <div className='picshow'>
              {item.img_list.map(item => {
                return (
                  item.img_path.split(',').map(item => {
                    return (
                      <img src={item} alt='pic'></img>
                    )
                  })
                )
              })}
            </div>
          </div>
          <div className='footen'>
            <div className='discuss'>
              <span><img src={dicuss} alt="discuss" /></span>
              <span className="nums">{item.comments}</span>
            </div>
            <div className='like' onClick={this.dianzan}>
              <span><img src={like} alt="like" /></span>
              <span className="nums">{item.likes}</span>
            </div>
          </div>
          <div>&nbsp;</div>
        </div>
      )
    })
    return (<div>
      <NavHeader>
        {/* 发布按钮 */}
        <NavBar
          mode="light"
          rightContent={
            <Popover mask
              overlayClassName="fortest"
              overlayStyle={{ color: 'currentColor' }}
              visible={this.state.visible}
              overlay={[
                (<Item key="4" value="publish" icon={myImg(`${tuwen}`)} data-seed="logId">发图文</Item>),
                (<Item key="5" value="tiwen" icon={myImg(`${tiwen}`)} style={{ whiteSpace: 'nowrap' }}>提问</Item>),
              ]}
              placement={'topRight'}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-10, 0],
              }}
              onVisibleChange={this.handleVisibleChange}
              onSelect={this.onSelect}
            >
              <div style={{
                position: 'fixed',
                zIndex: '999',
                background: '#FFE100',
                borderradius: '30px',
                top: '75%',
                right: '5%',
                height: '50px',
                width: '50px',
                alignItems: 'center',
                textAlign: 'center',
                color: '#333333',
                borderRadius: '50px',
                lineHeight: '50px',
                boxShadow: '0 2px 8px 0',
                fontFamily: 'PingFang - SC - Medium',
                fontSize: '16px'
              }}
              >
                {/* <Icon type="ellipsis" /> */}
                发布
              </div>
            </Popover>
          }
        >
        </NavBar>
        车友圈
      </NavHeader>
      <div className='home'>
        {/* 头部文字 */}
        <nav className='nav'>
          <span><img className='cqpic' src={chequan} alt='chequan'></img></span>
          <span>热门车友圈</span>
        </nav>
        {/* 车友圈卡片 */}
        {/* <ul> */}
        <div className='Cciecle'>
          {renderquancard}
        </div>
        {/* 分割线 */}
        <div className='fenge'></div>
        {/* 动态卡片 */}
        {/* <div className='trend'>
          <div className='user'>
            <div className='user_pro'>
              <img src={profile} alt='user-pro'></img>
            </div>
            <div className='user_name'>
              <div className='user_id'>九牧林131</div>
              <div className='user_time'>6小时前</div>
            </div>
          </div>
          <div className='contents'>
            <div className='content'>马自达昂克赛拉 过年回家需要一辆实用的汽车不仅要大气还要能拉货的，年货准备充足，过年了，再多的年货我也装得下</div>
            <div>
              <img src={picShow} alt='pic'></img>
              <img src={picShow} alt='pic'></img>
            </div>
          </div>
          <div className='footen'>
            <div className='discuss'>
              <span><img src={dicuss} alt="discuss" /></span>
              <span className="nums">2312</span>
            </div>
            <div className='like'>
              <span><img src={like} alt="like" /></span>
              <span className="nums">2314</span>
            </div>
          </div>
          <div>&nbsp;</div>
        </div>
        <div className='trend'>
          <div className='user'>
            <div className='user_pro'>
              <img src={profile} alt='user-pro'></img>
            </div>
            <div className='user_name'>
              <div className='user_id'>九牧林131</div>
              <div className='user_time'>6小时前</div>
            </div>
          </div>
          <div className='contents'>
            <div className='content'>马自达昂克赛拉 过年回家需要一辆实用的汽车不仅要大气还要能拉货的，年货准备充足，过年了，再多的年货我也装得下</div>
            <div>
              <img src={picShow} alt='pic'></img>
              <img src={picShow} alt='pic'></img>
            </div>
          </div>
        </div>
        <div className='trend'>
          <div className='user'>
            <div className='user_pro'>
              <img src={profile} alt='user-pro'></img>
            </div>
            <div className='user_name'>
              <div className='user_id'>九牧林131</div>
              <div className='user_time'>6小时前</div>
            </div>
          </div>
          <div className='contents'>
            <div className='content'>马自达昂克赛拉 过年回家需要一辆实用的汽车不仅要大气还要能拉货的，年货准备充足，过年了，再多的年货我也装得下</div>
            <div>
              <img src={picShow} alt='pic'></img>
              <img src={picShow} alt='pic'></img>
            </div>
          </div>
        </div> */}
        {renderhome_list}
      </div>

    </div >);
  }
}