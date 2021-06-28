import React from 'react'
import NavHeader from '../../components/NavHeader'
import { List, InputItem, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';

class MyNews extends React.Component{
    state = {
        hasError: false,
        value: '',
        viewpwd:false
      }
    onChange = (value) => {
      let len=value.replace(/^[a-zA-Z_\d]$/,'').length
      if (len<5||len>12) {
          console.log(value)
        this.setState({
        hasError: true,
        });
    } else {
        this.setState({
        hasError: false,
        });
    }
    this.setState({
        value,
    });
    }
    componentDidMount() {
        this.autoFocusInst.focus();
      }
      handleClick = () => {

        this.inputRef.focus();
      }
      handleChange=()=>{
          
        this.setState({
            viewpwd: this.state.viewpwd?false:true
        })
    }
    render(){
        const { getFieldProps } = this.props;
        return (
            <div>
                <NavHeader onLeftClick={() => this.props.history.go(-1)}>我的动态</NavHeader>
                <InputItem
                        onChange={this.onChange}
                        clear
                        placeholder="请输入您的用户名"
                        ref={el => this.autoFocusInst = el}
                    >用户名</InputItem>

                    <InputItem
                        type={this.state.viewpwd?'password':'text'}
                        placeholder="请输入您的密码"
                        ref={el => this.autoFocusInst = el}
                        onBlur={this.inputOnBlur }
                        onFocus={this.inputOnFocus }
                    >密码</InputItem>
                    <span onClick={this.handleChange}>asdasd</span>
                
            </div>
        )
    }
}
export default MyNews