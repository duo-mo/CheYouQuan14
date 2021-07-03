import React from 'react'
import './index.scss'
import { Input } from 'antd'
import NavHeader from '../../components/NavHeader'
import { ImagePicker } from 'antd-mobile';
import empty from '../../assets/img/empty_pic.png'

const data = [{ url: empty }];
const { TextArea } = Input

export default class btn extends React.Component {
  //图片选择器
  state = {
    files: data,
  }

  onChange = (files, type, index) => {
    // console.log(files, type, index);
    // const Islen = files.length;
    // console.log(Islen)
    // if (Islen % 2 === 0) {
    //   this.setState({
    //     files,
    //   })
    // }
    this.setState({
      files,
    });
  }
  render() {
    const [textValue, setTextValue] = useState < string > ('')
    const { files } = this.state;
    return (
      <div>
        <NavHeader>发布</NavHeader>
        <TextArea><textarea
          onChange={(event) => { setTextValue(event.target.value) }}
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
          }}></textarea></TextArea>
        <span className="remian_words">{300 - textValue.length}</span>

        <ImagePicker
          style={{
            width: '100%',
          }}
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 12}
          accept="image/gif,image/jpeg,image/jpg,image/png"
          length='3'
        />
        <div style={{ clear: 'both' }}></div>
        <div className='footer'>
          <div className='ChooseC'>
            选择车圈 &gt;

          </div>
        </div>
      </div>
    )
  }
}