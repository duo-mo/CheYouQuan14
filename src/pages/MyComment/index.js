import React from 'react'
import NavHeader from '../../components/NavHeader'
import { Modal } from 'antd-mobile'
import NoContnet from '../../assets/img/empty_pic.png'
import { API } from '../../utils/api'
import { getToken } from '../../utils/auth'
import DeletePng from '../../assets/img/delete.png'
import styles from './index.module.scss'
const alert=Modal.alert
class MyComment extends React.Component{
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
        turnArticle({ id,article_id }) {
            console.log(article_id)
            localStorage.setItem('article_id', JSON.stringify({id:article_id}))
            this.props.history.push('/Detail')
        }

    //删除评论
    del_news({ id }){
        console.log('asdfg',id)
        alert('提示', '是否确认删除？', [
            { text: '取消', onPress: () => console.log('取消') },
            { text: '删除', onPress: async () => {
                //调用接口
                const res = await API.post('/community/del_comments',
                {article_id:id,
                type:'commrnts'
                },{
                    headers:{
                        authorzation : getToken()
                    }
                })
                console.log(res)
                console.log()
                console.log(res.data.body)
                console.log(res.data.body.status)
            if(res.data.status===200){
                this.getNews()
                
            }
            
            }}
            ])
    }
    async getNews(){
        //发送请求，获取个人资料,用作当前页面用户
        const res = await API.get('/user/my_comments',{
            headers:{
                //表示登录的token发给服务器的
                authorzation:getToken()
            }
        })

        console.log('获取我的动态',res)
        if (res.data.status === 200){
            this.setState({
                isContent:res.data.body.length>0?true:false,
                info:res.data.body
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
                        <img src={item.user.user_photo} alt='用户头像' />
                        </div>
                        <div className={styles.news_right}>
                        <div className={styles.middle}>
                            <div className={styles.user_name}>{item.user.user_name}</div>
                            <div className={styles.content} onClick={() => this.turnArticle(item)}>
                              {item.content}
                            </div>
                            <div className={styles.tips}>
                                <span>{item.create_time.slice(5, 10)}</span>
                              
                                <img src={DeletePng} alt="删除" onClick={() => this.del_news(item)}/>
                            </div>
                        </div>

                        
                        </div>
                        
                    </div>
                </li>
                
            )
        })
        return (

            <div>
                <NavHeader onLeftClick={() => this.props.history.go(-1)}>我的评论</NavHeader>
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
export default MyComment
