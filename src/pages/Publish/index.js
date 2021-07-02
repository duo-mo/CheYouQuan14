import React from 'react'
import './index.scss'
import NavHeader from '../../components/NavHeader'
import { ImagePicker } from 'antd-mobile';

// const data = [{
//   url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
//   id: '2121',
// }, {
//   url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
//   id: '2122',
// }];


export default class btn extends React.Component {
  // state = {
  //   files: data,
  // }
  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }
  render() {
    // const { files } = this.state;
    return (
      <div>
        <NavHeader>发布</NavHeader>
        <textarea style={{
          width: '100%',
          height: '200px',
          border: 'none',
          resize: 'none'
        }}></textarea>
        <ImagePicker
          // files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          // selectable={files.length < 5}
          accept="image/gif,image/jpeg,image/jpg,image/png"
        />
      </div>
    )
  }
}