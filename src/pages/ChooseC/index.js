import React from 'react';
import './index.scss'
import NavHeader from '../../components/NavHeader';
import defautle from '../../assets/img/defautle.png'

export default class Choosec extends React.Component {
  render() {
    return (
      <div>
        <NavHeader>选择车友圈</NavHeader>
        <div className='CqItem'>
          <span><img className='pic' src={defautle} alt='图裂了'></img></span>
          <span className='scrib'>
            <div className='title'>特斯拉 Model S</div>
            <div className='subtitle'>6722人加入  519条内容</div>
          </span>
        </div>
        <div className='CqItem'>
          <span><img className='pic' src={defautle} alt='图裂了'></img></span>
          <span className='scrib'>
            <div className='title'>Huracán</div>
            <div className='subtitle'>671人加入  88条内容</div>
          </span>
        </div>
        <div className='CqItem'>
          <span><img className='pic' src={defautle} alt='图裂了'></img></span>
          <span className='scrib'>
            <div className='title'>哈弗H6</div>
            <div className='subtitle'>2092人加入  1259条内容</div>
          </span>
        </div>
        <div className='CqItem'>
          <span><img className='pic' src={defautle} alt='图裂了'></img></span>
          <span className='scrib'>
            <div className='title'>传祺M8</div>
            <div className='subtitle'>62人加入  59条内容</div>
          </span>
        </div>
      </div>
    )
  }
}