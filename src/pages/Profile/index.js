import React from 'react'
import NavHeader from '../../components/NavHeader'
import {Link} from 'react-router-dom'
import { Modal,List } from 'antd-mobile'
import { BASE_URL } from '../../utils/url'
import { API } from '../../utils/api'
import { isAuth, getToken, removeToken } from '../../utils/auth'
import styles from './index.module.css'
import Editicoon from '../../assets/img/edit.png'
import Newsicon from '../../assets/img/star.png'
import Commentsicon from '../../assets/img/comments.png'
const DEFAULT_AVATAR = BASE_URL+'/img/profile/img/defautle.png'
const alert=Modal.alert
const Item = List.Item;
const Brief = Item.Brief;

export default class Profile extends React.Component{
    state = {
        //是否登陆
        isLogin:isAuth(),
        //用户信息
        userInfo:{
            avatar:'',
            nickname:'',
            resume:''
        }
    }

    //在进入页面时调用
    componentDidMount(){
        this.getUserInfo()
    }
    //退出
    logout=()=>{
        alert('提示', '是否确认退出？', [
            { text: '取消', onPress: () => console.log('取消') },
            { text: '退出', onPress: async () => {
                //调用接口
                const res = await API.post('/user/logout',null,{
                    headers:{
                        authorzation : getToken()
                    }
                })
            console.log(res)

            //移除本地token
            removeToken()
            this.setState({
                isLogin:false,
                userInfo:{
                    avatar:'',
                    nickname:''
                }
            })
            }}
          ])
    }
    async getUserInfo(){
        if(!this.state.isLogin){
            // 未登录
            return
        }
        //发送请求，获取个人资料
        const res = await API.get('/user',{
            headers:{
                //表示登录的token发给服务器的
                authorzation:getToken()
            }
        })

        console.log(res)
        if (res.data.status === 200){
            const {avatar,nickname} = res.data.body
            this.setState({
                userInfo:{
                    avatar:BASE_URL+avatar,
                    nickname
                }
            })
        }
    }

    render(){
        const {history} = this.props
        const {isLogin,userInfo:{avatar,nickname}} = this.state
        return (
            <div className={styles.root}>
                <NavHeader>
                   我的  
                </NavHeader>
                <div className={styles.title}>
                    
                    {/* 头像 */}
                    <div className={styles.myIcon}>
                        <img className={styles.avatar} src={ avatar ||DEFAULT_AVATAR} alt="icon" />
                    </div>
                   {/* 昵称与简介信息 */}
                    <div className={styles.info}>
                        <div className={styles.user}>
                            <div className={styles.name}>{nickname || '游客'}</div>
                            {/* 游客登录后显示 */}
                            {isLogin ?(<><div className={styles.resume}>简介简介简介简介简介简介简介简介简介简介简介简介简介简介<img src={Editicoon} className={styles.editicon}/></div></>):(
                                <span></span>
                            )}
                        </div>
                    </div>
                    
                </div>
                <div>
                {isLogin ?(
                        <div className={styles.my_list}>
                        <List  className="my-list">
                            <Item
                            arrow="horizontal"
                            thumb= {Newsicon}
                            multipleLine
                            onClick={() => {}}
                            >
                            我的动态
                            </Item>
                            <Item
                            arrow="horizontal"
                            thumb={Commentsicon}
                            multipleLine
                            onClick={() => {}}
                            >
                            我的评论
                            </Item>
                        </List>
                            </div>):(<>
                            
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
                        ):(<div className={styles.auth} onClick={()=>history.push('/login')}>
                                去登陆
                        </div>)
                        }
                    </div>
            </div>
        )
    }
} 