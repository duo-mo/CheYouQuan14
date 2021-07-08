
import React from 'react'
import './index.scss'
import NavHeader from '../../components/NavHeader'
import { Popover, NavBar } from 'antd-mobile';
import tuwen from '../../assets/img/ugc_icon_发图文.png'
import tiwen from '../../assets/img/03-发布.png'
import chequan from '../../assets/img/2-车友圈.png'
import picShow from '../../assets/img/defautle.png'
import profile from '../../assets/img/Mask.png'
import more from '../../assets/img/更多.png'
const Item = Popover.Item;
const myImg = src => <img src={src} className="am-icon am-icon-xs" alt="" />;

export default class Index extends React.Component {
  state = {
    visible: false,
    selected: '',
  };
  onSelect = (opt) => {
    // console.log(opt.props.value);
    this.setState({
      visible: false,
      selected: opt.props.value,

    });
    this.props.history.push('/' + opt.props.value)

  };
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };
  render() {
    return (<div>
      <NavHeader>
        {/* 发布按钮 */}
        <NavBar
          mode="light"
          rightContent={
            <Popover mask
              overlayClassName="fortest"
              overlayStyle={{ color: 'currentColor' }}
              visible={this.state.visible}
              overlay={[
                (<Item key="4" value="publish" icon={myImg(`${tuwen}`)} data-seed="logId">发图文</Item>),
                (<Item key="5" value="tiwen" icon={myImg(`${tiwen}`)} style={{ whiteSpace: 'nowrap' }}>提问</Item>),
              ]}
              placement={'topRight'}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-10, 0],
              }}
              onVisibleChange={this.handleVisibleChange}
              onSelect={this.onSelect}
            >
              <div style={{
                position: 'fixed',
                background: '#FFE100',
                borderradius: '30px',
                top: '400px',
                right: '30px',
                height: '50px',
                width: '50px',
                alignItems: 'center',
                textAlign: 'center',
                color: '#333333',
                borderRadius: '50px',
                lineHeight: '50px',
                boxShadow: '0 2px 8px 0',
                fontFamily: 'PingFang - SC - Medium',
                fontSize: '16px'
              }}
              >
                {/* <Icon type="ellipsis" /> */}
                发布
              </div>
            </Popover>
          }
        >
        </NavBar>
        车友圈
      </NavHeader>
      <div className='home'>
        {/* 头部文字 */}
        <nav className='nav'>
          <span><img className='cqpic' src={chequan} alt='chequan'></img></span>
          <span>热门车友圈</span>
        </nav>
        {/* 车友圈卡片 */}
        <nav className='Cciecle'>
          <div className='card'>
            <div className='title'>奥迪A4L奥迪A4L车友圈</div>
            <div className='picShow'>
              <img className='pics' src={picShow} alt='picShow'></img>
              <img className='pics' src={picShow} alt='picShow'></img>
              <img className='pics' src={picShow} alt='picShow'></img>
            </div>
            <div className='describe'>
              <img src={profile} alt='picShow'></img>
              <img src={profile} alt='picShow'></img>
              <img src={profile} alt='picShow'></img>
              <img src={more} alt='picShow'></img>
              <div className='details'>30402位活跃车友</div>
              <div className='button'>
                <div className='join'>加入</div>
              </div>
            </div>
          </div>
        </nav>
        {/* 分割线 */}
        <div className='fenge'></div>
        {/* 动态卡片 */}
        <div className='trend'>
          <div className='user'>
            <div className='user_pro'>
              <img src={profile} alt='user-pro'></img>
            </div>
            <div className='user_name'>
              <div className='user_id'>九牧林131</div>
              <div className='user_time'>6小时前</div>
            </div>
          </div>
          <div className='contents'>
            <div className='content'>马自达昂克赛拉 过年回家需要一辆实用的汽车不仅要大气还要能拉货的，年货准备充足，过年了，再多的年货我也装得下</div>
            <div>
              <img src={picShow} alt='pic'></img>
              <img src={picShow} alt='pic'></img>
            </div>
          </div>
        </div>
        <div className='trend'>
          <div className='user'>
            <div className='user_pro'>
              <img src={profile} alt='user-pro'></img>
            </div>
            <div className='user_name'>
              <div className='user_id'>九牧林131</div>
              <div className='user_time'>6小时前</div>
            </div>
          </div>
          <div className='contents'>
            <div className='content'>马自达昂克赛拉 过年回家需要一辆实用的汽车不仅要大气还要能拉货的，年货准备充足，过年了，再多的年货我也装得下</div>
            <div>
              <img src={picShow} alt='pic'></img>
              <img src={picShow} alt='pic'></img>
            </div>
          </div>
        </div>
        <div className='trend'>
          <div className='user'>
            <div className='user_pro'>
              <img src={profile} alt='user-pro'></img>
            </div>
            <div className='user_name'>
              <div className='user_id'>九牧林131</div>
              <div className='user_time'>6小时前</div>
            </div>
          </div>
          <div className='contents'>
            <div className='content'>马自达昂克赛拉 过年回家需要一辆实用的汽车不仅要大气还要能拉货的，年货准备充足，过年了，再多的年货我也装得下</div>
            <div>
              <img src={picShow} alt='pic'></img>
              <img src={picShow} alt='pic'></img>
            </div>
          </div>
        </div>
      </div>

    </div >);
  }
}