import React from 'react'
import { API } from '../../utils/api';
import './index.scss'
import { getToken } from '../../utils/auth'
import NavHeader from '../../components/NavHeader'
// import { Toast } from 'antd-mobile';
import { Upload, Modal, message } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { Toast,Modal as Modal_mobile } from 'antd-mobile';
// import empty from '../../assets/img/empty_pic.png'
import ChooseC from './ChooseC'
import {Link} from 'react-router-dom'
// const data = [{ url: empty }];

const alert = Modal_mobile.alert

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt4M = file.size / 1024 / 1024 < 4;
  if (!isLt4M) {
    message.error('Image must smaller than 4MB!');
  }
  return isJpgOrPng && isLt4M;
}
const { confirm } = Modal;

class Publish extends React.Component {
  getChildId = (data) => {
    console.log(data);
  }
  constructor(props){
    super(props);
    this.state={
      xuanbtn: '',
      content: this.props.location.state.content,
      community_id: this.props.location.state.circle_id,
      community_name:this.props.location.state.circle_name,
      status: 1,
      img_list: this.props.location.state.img_list,
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList: [],
    }
}
  article_back = (e) => {
    alert('提示', '是否保存到草稿箱？', [
      { text: '取消', onPress: () =>{ 
        localStorage.removeItem('article_cache')
        localStorage.removeItem('article_is_cache')
        localStorage.removeItem('fileList')
        e.history.push('/home')}
      },
      {
        text: '保存', onPress: async () => {
          //保存本地缓存中
          localStorage.setItem('article_cache',JSON.stringify({content:this.state.content,
            img_list:this.state.img_list,
            circle_id:this.state.community_id,
            circle_name:this.state.community_name}))
          localStorage.setItem('fileList',JSON.stringify(this.state.fileList))
          localStorage.setItem("article_is_cache",1)
          e.history.push('/home');
        }
      }
    ])
  }

  componentDidMount() {
    this.Ifnull()
  }
  //判断空值渲染草稿
  Ifnull() {
    console.log('检查本地草稿箱', JSON.parse(window.localStorage.getItem('article_is_cache')));
    const fileList = JSON.parse(window.localStorage.getItem('fileList'))
    if (JSON.parse(localStorage.getItem("article_is_cache")) !== null) {
      const article_cache = JSON.parse(window.localStorage.getItem('article_cache'))
      const xuanquan = JSON.parse(window.localStorage.getItem('xuanquan'))
      console.log(article_cache)
      console.log(article_cache.content)
      console.log(article_cache.img_list)
      console.log(article_cache.circle_id)
      console.log(article_cache.circle_name)
      this.setState({
        content:article_cache.content,
        img_list:article_cache.img_list,
        community_id:xuanquan.qid,
        community_name:xuanquan.qname,
        fileList:fileList
      })
      console.log("清除前检查",this.state)
      
    }else{
      //这种渲染是，还未保存的情况下，防止去其他页面回来丢失
      console.log("空值渲染")
      // const xuanquan = JSON.parse(window.localStorage.getItem('xuanquan'))
      this.setState({

        fileList:fileList
      })
    }
    
  }

  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
      console.log(!file.url)
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    
    });
  };
  handleChange = ({ fileList}) => {
    console.log("handlechanghe ****",fileList)
  const img_list_new = []
  if(fileList[fileList.length-1].status==='done'){
    fileList.map(item => {
      img_list_new.push(item.response.body)
    })
  }else{
    console.log("****")
  }
    
    //上传图片后fileList缓存本地
    
    localStorage.setItem('fileList',JSON.stringify(this.state.fileList))
    // this.setState({ fileList:fileList,img_list:fileList[fileList.length-1].status==='done'?fileList[fileList.length-1].response.body:null})
    this.setState({ fileList:fileList,img_list:img_list_new})
    
    // console.log(this.state)
  };

  //输入框值：value.target.value
  //车友圈值:this.props.location.params.id
  //获取输入框内值
  getValue = (name, value) => {
    // console.log(name, value.target.value);
    localStorage.removeItem('toxuan')
    // console.log(content);
    this.setState({
      [name]: value.target.value,
      content: value.target.value
    })
    console.log('输入内容',this.state.content)

  }
  //提交数据
  submit = async () => {
    let { img_list, community_id, content, status } = this.state;
    //判断内容是否为空和是否选择车友圈
    console.log("圈子id",community_id)
    console.log("图片列表",img_list)
    console.log('content',content)
    if(content !== '' && community_id>0?true:false){
      console.log('数据校验合格')
      const res = await API.post('/community/article/upload_article', { content, community_id, status, img_list }, {
        headers: {
          //表示登录的token发给服务器的
          authorzation: getToken()
        }})
      if(res.data.status === 200){
        this.props.history.push('/home')
        //清空缓存
        localStorage.removeItem('article_is_cache')
        localStorage.removeItem('article_cache')
        localStorage.removeItem('fileList')
      }else{
        alert('提示', '发布失败？',[
          { text: '确定', onPress: () => console.log('cancel'), style: 'default' },
        ]);
      }
    }else{
      alert('提示', '请检查发布信息完整度？',[
        { text: '确定', onPress: () => console.log('cancel'), style: 'default' },
      ]);
    }
    
  }
  //弹出
  Back() {
    this.props.history.push('/home')
  }
  //存入草稿箱
  // SaveInfo() {
  //   let { content } = this.state
  //   let quanId = JSON.parse(window.localStorage.getItem('xuanquan')).qid
  //   Toast.info('存入成功', 1.5, null, true)
  //   // console.log(content);//内容success
  //   // console.log(this.props.location.params.id);//车圈idsuccess
  //   localStorage.setItem('caogaoContent', JSON.stringify({
  //     content, quanId
  //   }))

  // }
  //前往选车友圈页面
  goChoose() {
    const { content } = this.state
    localStorage.setItem('toxuan', JSON.stringify(content))
    this.props.history.push('/publish/choosec')

  }
  //车友圈反馈
  Ifxuan() {
    const { community_id } = this.state
    if (localStorage.getItem('toxuan') === null) {
      // console.log(123);
      this.setState({
        xuanbtn: '选择车圈  >'
      })
    } else {
      console.log(this.state);
      this.setState({
        xuanbtn: JSON.parse(window.localStorage.getItem('xuanquan')).qname
      })
    }
  }
  render() {
    const { content, xuanbtn } = this.state;
    const { previewVisible, previewImage, fileList, previewTitle,img_list } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <div>
        <NavHeader
          onLeftClick={() => {return this.article_back(this.props)} }
          style={{ position: 'fixed', top: '0px' }}>发布</NavHeader>
          {/* <div>{this.state.content}</div> */}
        <textarea
          value={content}
          onChange={val => this.getValue('content', val)}
          placeholder="请编辑内容" style={{
            fontFamily: 'PingFangSC-Regular',
            fontWeight: 400,
            lineHeight: '24px',
            width: '100%',
            height: '200px',
            border: 'none',
            resize: 'none',
            fontSize: '16px',
            overflow: 'hidden'
          }}></textarea>

        <>
          <Upload
            style={{ width: '33%' }}
            action="http://car-service.lichee.top/img/upload_image"
            listType="picture-card"
            beforeUpload={beforeUpload}
            fileList={fileList}
            img_list={img_list}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            {img_list.length >= 9 ? null : uploadButton}
          </Upload>
          <Modal
            style={{ width: '33%' }}
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={this.handleCancel}
          >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </>
        {/* <ImagePicker
          style={{
            width: '100%',
          }}
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 12}
          accept="image/gif,image/jpeg,image/jpg,image/png"
          length='3'
        /> */}
        <div style={{ clear: 'both' }}></div>
        <div className='footer'>
          {/* <div className='ChooseC' onClick={() => { this.goChoose() }}>
            {xuanbtn}
          </div> */}
          <Link to={{pathname:'/publish/choosec',state:{content:this.state.content,img_list:this.state.img_list}}} >{this.state.community_name?this.state.community_name:'选择车友圈'}</Link>
          <button className="subbtn" type='submit' onClick={this.submit}>提交</button>
        </div>
      </div>
    )
  }
}
export default Publish;