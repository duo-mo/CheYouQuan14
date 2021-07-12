import React from 'react'
import { WingBlank, TabBar, NavBar, Icon, Tabs, WhiteSpace, Grid, List, TextareaItem } from 'antd-mobile'
import { createForm } from 'rc-form';
import { API } from "../../utils/api.js"
import { getToken } from '../../utils/auth'
import time from '../../utils/time';
import NoContnet from '../../assets/img/empty_pic.png'
import styles from '../MyComment/index.module.css'
import './index.css'

const data1 = Array.from(new Array(9)).map(() => ({
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
}));



export default class Detail extends React.Component {
    //改变div的className
    constructor(props) {
        super(props);
        this.state = {
            tzxq: [],
            comments: [],
            text: ""
        }
    }

    //获取帖子详情
    async getTzxq() {
        const res = await API.get(
            '/community/article', {
            params: {
                article_id: JSON.parse(window.localStorage.getItem('article_id')).id,
            }
        })
        console.log("帖子数据为：", res.data);
        this.setState({
            tzxq: res.data
        })
        // console.log(JSON.parse(window.localStorage.getItem('article_id')).id);
    }
    //获取帖子评论
    async getComments() {
        const res = await API.get(
            '/community/article/get_comment', {
            params: {
                article_id: JSON.parse(window.localStorage.getItem('article_id')).id,
            }
        })
        console.log("帖子评论数据为：", res.data);
        this.setState({
            comments: res.data
        })
    }
    //发布评论
    async postComments(cont) {
        // console.log("发布评论为：", cont);
        // console.log("Token为：", getToken());
        // console.log("article_id为：", JSON.parse(window.localStorage.getItem('article_id')).id);

        // console.log('article_id类型：', typeof (JSON.parse(window.localStorage.getItem('article_id')).id));
        // console.log('content类型：', typeof (cont));
        const res = await API.post(
            '/community/article/comment',
            { article_id: JSON.parse(window.localStorage.getItem('article_id')).id, pid: 0, content: cont },
            { headers: { authorzation: getToken() } }
        )

        // this.setState({
        //     comments: res.data
        // })
    }
    componentDidMount() {
        this.getTzxq()
        this.getComments()
    }

    //渲染帖子
    renderArticle() {
        return this.state.tzxq.map(item => (
            <div key={item.id}>
                <div style={{ marginBottom: '10px', display: 'flex' }}>
                    <img style={{ width: '36px', height: '36px', borderRadius: '18px', marginRight: '10px' }} src={item.author_info.user_photo}></img>
                    <div >
                        <div style={{ height: '14px', fontSize: '14px', color: '#333', fontWeight: '500' }}>{item.author_info.user_name}</div>
                        <div style={{ height: '5px', fontSize: '5px', marginTop: '5px', color: '#999' }}> {time(item.create_time)} </div>
                    </div>
                </div>
                <div>{item.content}</div>
                <div style={{ flexWrap: 'wrap', flexDirection: 'row', paddingTop: '10px' }}>
                    {item.img_list.map(item => (
                        <img style={{ width: '170px', height: '170px', paddingRight: '3px', paddingBottom: '3px' }} src={item.img_path}></img>
                    ))}
                </div>
            </div>
        ))
    }
    //渲染暂无评论模块
    rendernoComment() {
        return this.state.tzxq.map(item => (
            item.comments == '0' ? <div className={styles.no_contnet_box}>
                <img src={NoContnet} alt='无内容' className={styles.content} />
                <div style={{ paddingBottom: '35px' }}>暂无评论</div>
            </div> : <div className='noMore'>没有更多了</div>
        ))
    }
    //渲染评论模块
    renderComments() {
        return this.state.comments.map(item => (
            <div key={item.id} style={{ marginTop: '10px', marginBottom: '18px' }}>
                <div style={{ marginTop: '10px', marginBottom: '10px', display: 'flex' }}>
                    <img style={{ width: '36px', height: '36px', borderRadius: '18px', marginRight: '10px' }} src={item.user.user_photo}></img>
                    <div>
                        <div style={{ height: '14px', fontSize: '14px', color: '#333', fontWeight: '500' }}>{item.user.user_name}</div>
                        <div style={{ marginTop: '5px' }}>{item.content}</div>
                        <div style={{ height: '5px', fontSize: '5px', color: '#999' }}> {time(item.create_time)} </div>
                    </div>
                </div>

            </div>
        ))
    }

    handleSubmit = () => {
        console.log(this.state.text);
        this.postComments(this.state.text)
        this.setState({
            text: ""
        })
        this.getComments()

    }


    render() {
        const { text } = this.state;
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}
                    rightContent={[
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >帖子详情</NavBar>


                <WingBlank>
                    <div className='article-details'>{this.renderArticle()}</div>
                </WingBlank>
                <WhiteSpace />

                {/* <Grid data={data1} columnNum={2} square={true} /> */}
                <WingBlank>
                    <div style={{ marginTop: '10px' }}>
                        <div>评论</div>
                        <div >{this.renderComments()}</div>
                    </div>

                    <div style={{ paddingBottom: '38px' }}>{this.rendernoComment()}</div>
                </WingBlank>

                {/* 发布评论模块 */}
                <div
                    style={{ display: 'flex', backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', position: 'fixed', width: '100%', bottom: 0 }}>
                    <TextareaItem
                        autoHeight
                        autoFocus
                        placeholder="说点什么吧..."
                        value={text}
                        onChange={t => this.setState({ text: t })}
                        style={{
                            background: '#F4F5F6', fontSize: '14px',
                            border: '0 solid #E6E6E6', felx: 5, lineHeight: '32px', borderRadius: '16px', width: '300px', paddingLeft: '10px'
                        }}>
                    </TextareaItem>
                    <div onClick={this.handleSubmit} style={{ felx: 1, paddingLeft: '10px', textAlign: 'center', color: '#3296FA' }}>发布</div>
                </div>


            </div >
        )
    }
}