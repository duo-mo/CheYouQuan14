import React,{Component} from 'react'
import {List, InputItem ,Flex, WingBlank, WhiteSpace,Toast} from 'antd-mobile'
import { createForm } from 'rc-form';
import {CloseCircleFilled,EyeInvisibleOutlined,EyeOutlined} from '@ant-design/icons'
import { withFormik, Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {API} from "../../utils/api.js"

import NavHeader from '../../components/NavHeader'
import styles from './index.module.css'

const REG_UNAME=/^[a-zA-Z_\d]{5,8}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
    state={
        viewPwd:false
    }
    handlePwd=()=>{
        this.setState({
            viewPwd: this.state.viewPwd?false:true
        })
        console.log()
    }
    handleClear=()=>{
        // 清空dom值
        //清空formik中的值
        this.props.values.username=''
    }
    render(){
        const {values}=this.props
        return (
            <div className={styles.root}>
                <NavHeader className={styles.NavHeader}>登录</NavHeader>
                
                <WhiteSpace size='xl' />
                
                {/* 登录表单 */}
                <WingBlank >
                    <div className={styles.title}>登录车友圈</div> 
                    <WhiteSpace size='x1' />
                    <Form >
                        <div className={styles.formItem}>
                            <div className={styles.tip}>用户名</div> 
                            <Field className={styles.input} name="username" placeholder="请输入您的用户名" ></Field>
                            
                            {values.username?(<button onClick={this.handleClear} className={styles.clear}><CloseCircleFilled /></button>):(<></>)}
                        </div>
                        <ErrorMessage className={styles.errors} name="username" component='div'></ErrorMessage>
                        
                        <div className={styles.formItem}>
                        <div className={styles.tip}>密码</div> 
                        <Field className={styles.input} name="password" placeholder="请输入您的密码" type={this.state.viewPwd?'text':'password'} ></Field>
                            {this.props.values.password?(<div onClick={this.handlePwd} className={styles.clear}>{this.state.viewPwd?(<EyeOutlined />):(<EyeInvisibleOutlined />)}</div>):(<></>)}
                        </div>
                        <ErrorMessage className={styles.errors} name="password" component='div'></ErrorMessage>
                        
                        <div className={styles.formSubmit}>
                            <button className={styles.submit} type="submit">
                                确认
                            </button>
                        </div>
                    </Form>
                    <Flex className={styles.backHome}>
                        <Flex.Item>
                            <span>未注册用户会自动注册并登录</span>
                        </Flex.Item>
                    </Flex>
                </WingBlank>

            </div>
            
        )
    }
}
// 使用withformik
Login = withFormik({
    //提供状态
    mapPropsToValues:()=>({username:'',password:''}),
    //添加表单验证规则
    validationSchema:Yup.object().shape({
        // username:Yup.string().required('账号为必填项').matches(REG_UNAME,'长度为5-8位，只能出现字母数字下划线'),
        username:Yup.string().required('账号为必填项'),
        password:Yup.string().required('密码为必填项'),
    }),
    

    //表单提交事件
    handleSubmit:async (values,{props})=>{
        // console.log(values)
        const {username,password} = values
        const res = await API.post('/user/login',{
            username,
            password
        })
        console.log("登录结果：",res);
        const {status,body,description} = res.data
        if (status===200){
            //登陆成功
            localStorage.setItem('hkzf_token',body.token)
            console.log(props)
            if(!props.location.state){
                props.history.go(-1)
            }else{
                //push返回会回到登录页面，所以用replace
                props.history.replace(props.location.state.from.pathname)
            }  
        }else{
            //登录失败
            Toast.info(description,2,null,false)
        }
    }
})(Login)


export default Login