import React from 'react'
import NavHeader from '../../components/NavHeader'
import { Modal,List } from 'antd-mobile'
import styles from './index.module.scss'
import { API } from '../../utils/api'
import { getToken } from '../../utils/auth'
import NoContnet from '../../assets/img/empty_pic.png'
import DeletePng from '../../assets/img/delete.png'
const alert=Modal.alert
class MyNews extends React.Component{
    state = {
        //是否有内容
        isContent:false,
        info:[],
        userInfo:{
            avatar:'',
            nickname:''
        }
    }

    //在进入页面时调用
    componentDidMount(){
        this.getNews()
    }
    //跳转到详情
    turnArticle({ id }) {
        console.log(id);
        localStorage.setItem('article_id', JSON.stringify({ id }))
        this.props.history.push('/Detail')
    }

    //删除动态
    del_news({ id }){
        console.log('asdfg',id)
        alert('提示', '是否确认删除？', [
            { text: '取消', onPress: () => console.log('取消') },
            { text: '删除', onPress: async () => {
                //调用接口
                const res = await API.post('/community/del_news',
                {article_id:id,
                type:'news'
                },{
                    headers:{
                        authorzation : getToken()
                    }
                })
                console.log(res)
                console.log()
                console.log(res.data.body)
                console.log(res.data.body.status)
            if(res.data.status==200){
                this.getNews()
                
            }
            
            }}
          ])
    }

    async getNews(){
        //发送请求，获取个人资料,用作当前页面用户
        const res = await API.get('/user/my_interflow',{
            headers:{
                //表示登录的token发给服务器的
                authorzation:getToken()
            }
        })

        console.log('获取我的动态',res)
        if (res.data.status === 200){
            const {user_name,user_photo} = res.data.body[0]
            console.log('user_name',user_name)
            console.log(res.data.body[0].article_list)
            this.setState({
                isContent:res.data.body[0].article_list.length>0?true:false,
                info:res.data.body[0].article_list,
                userInfo:{
                    avatar:user_photo,
                    nickname:user_name
                }

            })
        }
    }
    

    render(){
        const {isContent,userInfo:{nickname,avatar}} = this.state

        let newsItem = this.state.info.map((item,key)=>{
            return (
                <li key={key}>
                    <div className={styles.news}  >
                        <div className={styles.news_left}> 
                        <img src={avatar} alt='用户头像' />
                        </div>
                        <div className={styles.news_right}>
                        <div className={styles.middle}>
                            <div className={styles.user_name}>{nickname}</div>
                            <div className={styles.content} onClick={() => this.turnArticle(item)}>
                              {item.content}
                            </div>
                            <div className={styles.tips}>
                                <span>{item.create_time.slice(5, 10)}</span>
                                <span>{item.comments}评论</span>
                                <img src={DeletePng} alt="删除" onClick={() => this.del_news(item)}/>
                            </div>
                        </div>
                        <div className={styles.content_img} >
                            <img src={avatar} alt="内容图片" />
                        </div>
                        
                        </div>
                        
                    </div>
                </li>
                
            )
        })
        return (
            <div>
                <NavHeader onLeftClick={() => this.props.history.go(-1)}>我的动态</NavHeader>
                {isContent?
                (
                    <ul className={styles.news_ul}>
                        {newsItem}
                    </ul>
                )
                :
                (
                <div className={styles.no_contnet_box}>
                    <img src={NoContnet} alt='无内容' className={styles.no_content}/>
                    <div>暂无内容</div>
                </div>
                )}
                
            </div>
        )
    }
}
export default MyNews