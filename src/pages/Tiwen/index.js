import React from 'react'
import { API } from '../../utils/api';
import './index.scss'
import { getToken } from '../../utils/auth'
import NavHeader from '../../components/NavHeader'
// import { Toast } from 'antd-mobile';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Toast } from 'antd-mobile';
// import empty from '../../assets/img/empty_pic.png'

// const data = [{ url: empty }];
// const alert = Modal.alert;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


export default class btn extends React.Component {
  getChildId = (data) => {
    console.log(data);
  }
  //图片选择器
  state = {
    // files: data,
    xuanbtn: '选择车圈  >',
    content: '',
    community_id: 0,
    status: 1,
    img_list: [],
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
    type: 'tw',
  }

  componentDidMount() {
    this.Ifnull()
    this.Ifxuan()
  }
  //判断空值渲染草稿
  Ifnull() {
    // console.log(123);
    if (localStorage.getItem("caogaoContent") != null) {
      const caogaotext = JSON.parse(window.localStorage.getItem('caogaoContent')).content
      const caogaoquanId = JSON.parse(window.localStorage.getItem('caogaoContent')).quanId
      // console.log(caogaotext);
      // console.log(caogaoquanId);
      this.setState({
        content: caogaotext,
        community_id: caogaoquanId
      })
    } else {
      this.setState({
        content: JSON.parse(window.localStorage.getItem('toxuan'))
      })
    }
  }
  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList }
  );

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

  }
  //提交数据
  submit = async () => {
    let { img_list, fileList, community_id, content, type, status } = this.state;
    //判断内容是否为空和是否选择车友圈
    if (content !== '' || community_id !== 0) {
      fileList.map(item => {
        img_list.push(item.response.body)
      })
      // content = value.target.value
      community_id = JSON.parse(window.localStorage.getItem('xuanquan')).qid
      // console.log(img_list);
      // console.log(content);
      console.log(community_id);
      //post
      const res = await API.post('/community/article/upload_article', { content, community_id, status, img_list, type }, {
        headers: {
          //表示登录的token发给服务器的
          authorzation: getToken()
        }
      })

      Toast.info('发布成功', 1, null, false)
      this.props.history.push('/user/my_news')
      localStorage.removeItem('caogaoContent')
    } else {
      Toast.info('请确认是否选择车圈和输入内容不能为空', 2, null, true)

    }

    // console.log(res);
    // console.log(content);

  }
  //弹出
  Back() {
    this.props.history.push('/home')
  }
  //存入草稿箱
  SaveInfo() {
    let { content } = this.state
    let quanId = JSON.parse(window.localStorage.getItem('xuanquan')).qid
    Toast.info('存入成功', 1.5, null, true)
    // console.log(content);//内容success
    // console.log(this.props.location.params.id);//车圈idsuccess
    localStorage.setItem('caogaoContent', JSON.stringify({
      content, quanId
    }))

  }
  //前往选车友圈页面
  goChoose() {
    const { content } = this.state
    localStorage.setItem('toxuan', JSON.stringify(content))
    this.props.history.push('/publish/choosec')

  }
  //车友圈反馈
  Ifxuan() {
    const { community_id } = this.state
    if (community_id === '0') {
      // console.log(123);
      this.setState({
        xuanbtn: '选择车圈  >'
      })

    } else {
      console.log(123);
      this.setState({
        xuanbtn: JSON.parse(window.localStorage.getItem('xuanquan')).qname
      })
    }
  }
  render() {
    const { content, xuanbtn } = this.state;
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <div>
        <NavHeader
          onLeftClick={() => { this.Back() }}
          style={{ position: 'fixed', top: '0px' }}>发布</NavHeader>
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
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            {fileList.length >= 9 ? null : uploadButton}
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
          <div className='ChooseC' onClick={() => { this.goChoose() }}>
            {xuanbtn}
          </div>
          <button className='saveInfo' onClick={() => this.SaveInfo()}>
            存入草稿箱
          </button>
          <button className="subbtn" type='submit' onClick={this.submit}>提交</button>
        </div>
      </div>
    )
  }
}