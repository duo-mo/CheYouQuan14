import React from 'react';
import { API } from '../../../utils/api';
import { getToken } from '../../../utils/auth'

import './index.scss'
import NavHeader from '../../../components/NavHeader';



export default class ChooseC extends React.Component {
  componentDidMount() {
    this.getQuan();
    // this.renderQuan()
  }

  state = {
    quan: [{
      id: 0,
      name: '',
      all_num: 0,
      community_content_num: 0,
      img_path: '',
    }]
  }

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
    // console.log('222', res);
    this.setState({
      quan: res.data.body,
    }
    )

    // console.log('222' + res.data.body);
  }
  //返回编辑页面并传圈子id值
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
    this.props.history.push('/publish')
  }



  render() {
    //渲染车友圈页面
    let renderQuan = this.state.quan.map(item => {
      // console.log('111', item);
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
        <ul>
          {renderQuan}
        </ul>

      </div>
    )
  }
}