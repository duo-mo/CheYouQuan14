
import React from 'react'
import NavHeader from '../../components/NavHeader'
import { Popover, NavBar } from 'antd-mobile';
import tuwen from '../../assets/img/ugc_icon_发图文.png'
import tiwen from '../../assets/img/03-发布.png'
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
                boxShadow: '0 2px 8px 0'
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
    </div>);
  }
}