import React from 'react'
import NavHeader from '../../components/NavHeader'
import { Modal, List } from 'antd-mobile'
// import { BASE_URL } from '../../utils/url'
import { API } from '../../utils/api'
import { isAuth, getToken, removeToken } from '../../utils/auth'

import styles from './index.module.css'
import AuthRoute from '../../components/AuthRoute'
import MyNews from '../MyNews'
import MyComment from '../MyComment'

import Editicoon from '../../assets/img/edit.png'
import Newsicon from '../../assets/img/star.png'
import Commentsicon from '../../assets/img/comments.png'


const DEFAULT_AVATAR = 'https://img.lichee.top/img/img_header_default.png'
const alert = Modal.alert
const Item = List.Item;

export default class Profile extends React.Component {
  state = {
    //是否登陆
    isLogin: isAuth(),
    //用户信息
    userInfo: {
      avatar: '',
      nickname: '',
      resume: ''
    }
  }

  //在进入页面时调用
  componentDidMount() {
    this.getUserInfo()
  }
  //退出
  logout = () => {
    alert('提示', '是否确认退出？', [
      { text: '取消', onPress: () => console.log('取消') },
      {
        text: '退出', onPress: async () => {
          //调用接口
          const res = await API.post('/user/logout', null, {
            headers: {
              authorzation: getToken()
            }
          })
          console.log('getUserInfo', res)

          //移除本地token
          removeToken();
          localStorage.clear(); 
          this.setState({
            isLogin: false,
            userInfo: {
              avatar: '',
              nickname: ''
            }
          })
        }
      }
    ])
  }
  async getUserInfo() {
    console.log('还没登录')
    if (!this.state.isLogin) {
      // 未登录
      return
    }
    //发送请求，获取个人资料
    const res = await API.get('/user', {
      headers: {
        //表示登录的token发给服务器的
        authorzation: getToken()
      }
    })
    localStorage.setItem('my_id', JSON.stringify(res.data.body.id))
    console.log('个人信息页面请求获取', res)
    if (res.data.status === 200) {
      const { avatar, nickname, resume } = res.data.body
      console.log(avatar)
      this.setState({
        userInfo: {
          // avatar:BASE_URL + avatar,
          avatar: avatar,
          nickname,
          resume

        }
      })
    } else {
      //token失效，isLogin设置为失效
      this.setState({
        isLogin: false
      })
    }
  }



  render() {
    const { history } = this.props
    const { isLogin, userInfo: { avatar, nickname, resume } } = this.state
    console.log(resume);
    return (

      <div className={styles.root}>
        <AuthRoute path="/user/my_news" component={MyNews}></AuthRoute>
        <AuthRoute path="/user/my_Comment" component={MyComment}></AuthRoute>
        <NavHeader>
          我的
        </NavHeader>
        <div className={styles.title}>
          {/* 头像 */}
          <div className={styles.myIcon} >
            <img className={styles.avatar} src={avatar || DEFAULT_AVATAR} alt="icon" />
          </div>
          {/* 昵称与简介信息 */}
          <div className={styles.info}>
            <div className={styles.user}>
              <div className={styles.name}>{nickname || '游客'}</div>
              {/* 游客登录后显示 */}
              {isLogin ? (<><div className={styles.resume}>{resume}<img src={Editicoon} className={styles.editicon} alt="icon" /></div></>) : (
                <span></span>
              )}
            </div>
          </div>

        </div>
        <div>
          {isLogin ? (
            <div className={styles.my_list}>
              <List className="my-list">
                <Item
                  arrow="horizontal"
                  thumb={Newsicon}
                  multipleLine
                  onClick={() => history.push('/user/my_news')}
                >
                  我的动态
                </Item>
                <Item
                  arrow="horizontal"
                  thumb={Commentsicon}
                  multipleLine
                  onClick={() => history.push('/user/my_comment')}
                >
                  我的评论
                </Item>
              </List>
            </div>) : (<>

            </>)
          }
        </div>
        <div >
          {isLogin ? (
            <>
              <div className={styles.auth} >
                <div onClick={this.logout}>切换账号</div>
              </div>
            </>
          ) : (<div className={styles.auth} onClick={() => history.push('/login')}>
            去登陆
          </div>)
          }
        </div>
      </div>
    )
  }
}