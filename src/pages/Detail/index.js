import React from 'react'
import { FlatList } from 'react-native'
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

localStorage.setItem('pid_last', JSON.stringify(0))

export default class Detail extends React.Component {
<<<<<<< HEAD
  //改变div的className
  constructor(props) {
    super(props);
    this.state = {
      tzxq: [],
      comments: [],
      subcomments: [],
      text: ""
=======
    //改变div的className
    constructor(props) {
        super(props);
        this.state = {
            tzxq: [],
            comments: [],
            subcomments: [],
            text: ""
        }
>>>>>>> feat-zhangzhen
    }
  }

<<<<<<< HEAD
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
        pid: 0
      }
    })
    console.log("帖子一级评论数据为：", res.data);
    this.setState({
      comments: res.data
    })
  }

  ////获取子评论
  async getSubComments(pid_num) {
    const res0 = await API.get(
      '/community/article/get_comment', {
      params: {
        article_id: JSON.parse(window.localStorage.getItem('article_id')).id,
        pid: pid_num
      }
    })
    console.log("帖子子评论数据为：", res0.data);
    this.setState({
      subcomments: res0.data
    })
    // window.location.reload()
    document.getElementById(JSON.parse(window.localStorage.getItem('pid_last'))).className = 'replyComment-undisplay'
    document.getElementById(JSON.parse(window.localStorage.getItem('pid'))).className = 'replyComment-display'


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
      { article_id: JSON.parse(window.localStorage.getItem('article_id')).id, pid: JSON.parse(window.localStorage.getItem('this_pid')), content: cont },
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
  //评论盖楼
  replyComment = (id, name) => {
    console.log('评论id为', id);
    document.getElementById('replybox').placeholder = '回复' + name
    localStorage.setItem('this_pid', JSON.stringify(id))
  }
  replyArticle() {
    console.log('回复帖子');
    localStorage.setItem('this_pid', JSON.stringify(0))
  }

  //渲染子评论
  // renderSubComments(id) {
  //     this.getSubComments(JSON.parse(window.localStorage.getItem('pid')))
  //         if (JSON.parse(window.localStorage.getItem('pid')) == id) {
  //             return this.state.subcomments.map(item => (
  //                 <div>
  //                     <div> {item.user.user_name} </div>
  //                     <div> {item.content} </div>
  //                 </div>
  //             ))
  //         }
  //         else {
  //             return <div></div>
  //         }
  //     }

  renderSubComments() {
    // this.getSubComments(JSON.parse(window.localStorage.getItem('pid')))

    return this.state.subcomments.map(item => (
      <div>
        <div> {item.user.user_name} </div>
        <div> {item.content} </div>
      </div>
    ))
  }

  storagePid = (e) => {
    console.log('pid', e);
    const last_id = JSON.parse(window.localStorage.getItem('pid'))
    localStorage.setItem('pid_last', JSON.stringify(last_id))
    localStorage.setItem('pid', JSON.stringify(e))
    this.getSubComments(e)
  }
  //onClick={this.getSubComments(item.id)}

  //渲染评论模块
  renderComments() {
    return this.state.comments.map(item => (
      <div key={item.id} className='comment-bar' style={{ marginTop: '10px', marginBottom: '30px' }} >
        <div style={{ position: 'relative', marginTop: '10px', marginBottom: '10px', display: 'flex' }}>
          <img style={{ width: '36px', height: '36px', borderRadius: '18px', marginRight: '10px' }} src={item.user.user_photo}></img>
          <div>
            <div style={{ height: '14px', fontSize: '14px', color: '#333', fontWeight: '500' }}>{item.user.user_name}</div>
            <div style={{ marginTop: '5px' }}>{item.content}</div>
            <div style={{ height: '5px', fontSize: '5px', color: '#999' }}> {time(item.create_time)} </div>
            <div className='reply-btn' onClick={() => this.replyComment(item.id, item.user.user_name)}>回复</div>
            <div className='look-reply-btn' onClick={() => this.storagePid(item.id)}>查看回复</div>
            {/* <div> {() => this.storagePid(item.id)} </div> */}
          </div>
        </div>
        <div id={item.id} className='replyComment-undisplay'>
          {this.state.subcomments.map(item => (
            <div>
              <div> {item.user.user_name} </div>
              <div> {item.content} </div>
            </div>
          ))}
        </div>
      </div>
    ))
  }

  handleSubmit = () => {
    console.log(this.state.text);
    if (this.state.text == "") {
      console.log("请先输入内容");
    } else {
      this.postComments(this.state.text)
      this.setState({
        text: ""
      })
      this.getComments()
    }
    // window.location.reload()
    localStorage.setItem('this_pid', JSON.stringify(0))

  }
  //回车发布评论（有误）
  enterGo(e) {
    if (e.keyCode == 13) {
      console.log('enter');
      this.handleSubmit()
=======
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
                pid: 0
            }
        })
        console.log("帖子一级评论数据为：", res.data);
        this.setState({
            comments: res.data
        })
    }

    ////获取子评论
    async getSubComments(pid_num) {
        const res0 = await API.get(
            '/community/article/get_comment', {
            params: {
                article_id: JSON.parse(window.localStorage.getItem('article_id')).id,
                pid: pid_num
            }
        })
        console.log("帖子子评论数据为：", res0.data);
        this.setState({
            subcomments: res0.data
        })
        // window.location.reload()
        const pid_last = JSON.parse(window.localStorage.getItem('pid_last'))
        const pid = JSON.parse(window.localStorage.getItem('pid'))
        if (pid_last == 0 || document.getElementById(pid_last) == null) {
            document.getElementById(JSON.parse(window.localStorage.getItem('pid'))).className = 'replyComment-display'
        } else {
            document.getElementById(pid_last).className = 'replyComment-undisplay'
            document.getElementById(pid).className = 'replyComment-display'
        }
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
            { article_id: JSON.parse(window.localStorage.getItem('article_id')).id, pid: JSON.parse(window.localStorage.getItem('this_pid')), content: cont },
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

    //滚动条触底事件
    onEndReached = () => {
        console.log("onEndReached");
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
        // const { tzxq } = this.state;
        // return (
        //     <FlatList
        //         onEndReached={this.onEndReached}
        //         onEndReachedThreshold={0.1}
        //         data={tzxq}
        //         keyExtractor={v => v.id + ""}
        //         renderItem={({ item }) => <div key={item.id}>
        //             <div style={{ marginBottom: '10px', display: 'flex' }}>
        //                 <img style={{ width: '36px', height: '36px', borderRadius: '18px', marginRight: '10px' }} src={item.author_info.user_photo}></img>
        //                 <div >
        //                     <div style={{ height: '14px', fontSize: '14px', color: '#333', fontWeight: '500' }}>{item.author_info.user_name}</div>
        //                     <div style={{ height: '5px', fontSize: '5px', marginTop: '5px', color: '#999' }}> {time(item.create_time)} </div>
        //                 </div>
        //             </div>
        //             <div>{item.content}</div>
        //             <div style={{ flexWrap: 'wrap', flexDirection: 'row', paddingTop: '10px' }}>
        //                 {item.img_list.map(item => (
        //                     <img style={{ width: '170px', height: '170px', paddingRight: '3px', paddingBottom: '3px' }} src={item.img_path}></img>
        //                 ))}
        //             </div>
        //         </div>}
        //     />
        // )
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
    //评论盖楼
    replyComment = (id, name) => {
        console.log('评论id为', id);
        document.getElementById('replybox').placeholder = '回复' + name
        localStorage.setItem('this_pid', JSON.stringify(id))
    }
    replyArticle() {
        console.log('回复帖子');
        localStorage.setItem('this_pid', JSON.stringify(0))
    }

    //渲染子评论
    // renderSubComments(id) {
    //     this.getSubComments(JSON.parse(window.localStorage.getItem('pid')))
    //         if (JSON.parse(window.localStorage.getItem('pid')) == id) {
    //             return this.state.subcomments.map(item => (
    //                 <div>
    //                     <div> {item.user.user_name} </div>
    //                     <div> {item.content} </div>
    //                 </div>
    //             ))
    //         }
    //         else {
    //             return <div></div>
    //         }
    //     }

    renderSubComments() {
        // this.getSubComments(JSON.parse(window.localStorage.getItem('pid')))

        return this.state.subcomments.map(item => (
            <div>
                <div> {item.user.user_name} </div>
                <div> {item.content} </div>
            </div>
        ))
    }

    storagePid = (e) => {
        console.log('pid', e);
        const last_id = JSON.parse(window.localStorage.getItem('pid'))
        localStorage.setItem('pid_last', JSON.stringify(last_id))
        localStorage.setItem('pid', JSON.stringify(e))
        this.getSubComments(e)
    }
    //onClick={this.getSubComments(item.id)}

    //渲染评论模块
    renderComments() {
        return this.state.comments.map(item => (
            <div key={item.id} className='comment-bar' style={{ marginTop: '10px', marginBottom: '30px' }} >
                <div style={{ position: 'relative', marginTop: '10px', marginBottom: '10px', display: 'flex' }}>
                    <img style={{ width: '36px', height: '36px', borderRadius: '18px', marginRight: '10px' }} src={item.user.user_photo}></img>
                    <div>
                        <div style={{ height: '14px', fontSize: '14px', color: '#333', fontWeight: '500' }}>{item.user.user_name}</div>
                        <div style={{ marginTop: '5px' }}>{item.content}</div>
                        <div style={{ height: '5px', fontSize: '5px', color: '#999' }}> {time(item.create_time)} </div>
                        <div className='look-reply-btn' onClick={() => this.storagePid(item.id)}>查看回复</div>
                        <div className='reply-btn' onClick={() => this.replyComment(item.id, item.user.user_name)}>回复</div>
                    </div>
                </div>
                <div id={item.id} className='replyComment-undisplay'>
                    {this.state.subcomments.map(item => (
                        <div>
                            <span> {item.user.user_name} </span>: <span>{item.content}</span>
                        </div>
                    ))}
                </div>
            </div>
        ))
>>>>>>> feat-zhangzhen
    }
  }

<<<<<<< HEAD

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
            id='replybox'
            autoHeight
            autoFocus
            placeholder="说点什么吧..."
            value={text}
            onChange={t => this.setState({ text: t })}
            onkeydown={event => this.enterGo(event)}
            // onDoubleClick={this.replyArticle()}
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
=======
    handleSubmit = () => {
        console.log(this.state.text);
        if (this.state.text == "") {
            console.log("请先输入内容");
        } else {
            this.postComments(this.state.text)
            this.setState({
                text: ""
            })
            this.getComments()
        }
        // window.location.reload()
        localStorage.setItem('this_pid', JSON.stringify(0))

    }
    //回车发布评论（有误）
    enterGo(e) {
        if (e.keyCode == 13) {
            console.log('enter');
            this.handleSubmit()
        }
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
                        id='replybox'
                        autoHeight
                        autoFocus
                        placeholder="说点什么吧..."
                        value={text}
                        onChange={t => this.setState({ text: t })}
                        onkeydown={event => this.enterGo(event)}
                        // onDoubleClick={this.replyArticle()}
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
>>>>>>> feat-zhangzhen
}