import React from 'react';
import { API } from '../../../utils/api';
import { getToken } from '../../../utils/auth'

import './index.scss'
import NavHeader from '../../../components/NavHeader';



class ChooseC extends React.Component {
  componentDidMount() {
    this.getQuan();
    // this.renderQuan()
  }
  constructor(props){
    super(props);
    this.state={
      content: '',
      img_list: [],
      quan: [{
        id: 0,
        name: '',
        all_num: 0,
        community_content_num: 0,
        img_path: '',
      }]
    }
}

  // state = {
  //   quan: [{
  //     id: 0,
  //     name: '',
  //     all_num: 0,
  //     community_content_num: 0,
  //     img_path: '',
  //   }]
  // }

  async getQuan() {
    const res = await API.get('/community/get_community_choose_list', {
      params: {
        page: 1,
        limit: 3
      }, headers: {
        //表示登录的token发给服务器的
        authorzation: getToken()
      }
    }

    )
    console.log('获取圈子列表', res);
    this.setState({
      quan: res.data.body,
      content:this.props.location.state.content,
      img_list:this.props.location.state.img_list
    }
    )

    // console.log('222' + res.data.body);
  }
  返回编辑页面并传圈子id值
  handleClick(item) {
    // console.log(e.target);
    // const nnn = e.target.name
    // console.log(e.target);
    // this.props.history.push({
    //   pathname: '/publish',
    //   params: {
    //     id: e.target.id,
    //   }
    // })
    // console.log(item.id);
    
    const qid = item.id
    const qname = item.name
    // console.log(qid + qname);
    localStorage.setItem('xuanquan', JSON.stringify({ qid, qname }))
    this.props.history.push({pathname:'/publish',state:{
      circle_name:item.name,
      circle_id:item.id,
      content:this.state.content,
      img_list:this.state.img_list
    }})
  }

  render() {
    //渲染车友圈页面
    let renderQuan = this.state.quan.map(item => {
      return (
        <li>
          <div className='CqItem' onClick={() => this.handleClick(item)}>
            <span><img className='pic' src={item.img_path} alt='图裂了'></img></span>
            <span className='scrib'>
              <div className='title'>{item.name}</div>
              <div className='subtitle'>{item.all_num}人加入  {item.community_content_num}条内容</div>
            </span>
          </div>
        </li>
      )
    })
    return (
      <div>
        <NavHeader>选择车友圈</NavHeader>
        {/* <div>{this.state.content}</div>
        <div>{this.state.img_list}</div> */}
        <ul>
          
          {renderQuan}
        </ul>

      </div>
    )
  }
}
export default ChooseC;