import React,{Component} from 'react'
import NavHeader from '../../components/NavHeader'
import { withFormik } from "formik";
import { List, WhiteSpace ,WingBlank,Flex,Toast} from 'antd-mobile'
import {EyeInvisibleOutlined,EyeOutlined} from '@ant-design/icons'
import {API} from "../../utils/api.js"

import {
    InputWithError,
    SubmitButton,
  } from "./formCompontents";
import styles from './index.module.css'

class Login extends Component{
  render (){
    const {
      values,
      errors,
      touched,
      setFieldValue,
      setFieldTouched,
      handleSubmit,
      isSubmitting
      }=this.props;
    return (
      <div className={styles.root}>
        <NavHeader>登录</NavHeader>
        <div className={styles.title}>登录车友圈</div>
          <form onSubmit={handleSubmit}>
          <WingBlank>
              <List>
              <InputWithError
                  name="username"
                  label="用户名"
                  clear={true}
                  onChange={value => setFieldValue("username", value)}
                  onBlur={() => setFieldTouched("username", true)}
                  value={values.username}
                  touched={touched.username}
                  errors={errors.username}
              />
              <InputWithError
                  type={values.viewpwd?'password':'text'}
                  name="Password"
                  label="密码"
                  onChange={value => setFieldValue("password", value)}
                  onBlur={() => setFieldTouched("password", true)}
                  value={values.password}
                  touched={touched.password}
                  errors={errors.password}
                  extra = {values.password?(<span onClick={value=>setFieldValue("viewpwd",values.viewpwd?false:true)} className={styles.clear}>{values.viewpwd?(<EyeInvisibleOutlined />):(<EyeOutlined />)}</span>):(<></>)}
              />
              </List>
              <WhiteSpace />
              
              
              <SubmitButton disabled={isSubmitting} className={styles.button}>确认</SubmitButton>
          </WingBlank>
          </form>
        <Flex className={styles.reg}>
            <Flex.Item>
                <span>未注册用户会自动注册并登录</span>
            </Flex.Item>
        </Flex>
      </div>
    )
  }
}
// 使用withformik
Login = withFormik({
  //提供状态
  mapPropsToValues:()=>({username:'',password:'',viewpwd:true}),

  //添加表单验证规则
  // validationSchema:Yup.object().shape({
  //     username:Yup.string().required('账号为必填项'),
  //     password:Yup.string().required('密码为必填项')
  // }),
  validate: (values, props) => {
    const errors = {};
    if (!values.username) {
      errors.username = "用户名不能为空";
    }
    if (!values.password) {
      errors.password = "必填项";
    }
    return errors;
  },
  //表单提交事件
  handleSubmit:async (values,{props})=>{
      console.log(values)
      console.log(props)
      //
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
          //无法在该方法中通过this来获取路由信息，第二个对象参数有props
          props.history.go(-1)
      }else{
          //登录失败
          Toast.info(description,2,null,false)
      }
  }
})(Login)
// const InnerForm = ({
//     values,
//     errors,
//     touched,
//     setFieldValue,
//     setFieldTouched,
//     handleSubmit,
//     isSubmitting
//   }) => (
//         <form onSubmit={handleSubmit}>
//         <WingBlank>
//             <List>
//             <InputWithError
//                 name="username"
//                 label="用户名"
//                 clear={true}
//                 onChange={value => setFieldValue("username", value)}
//                 onBlur={() => setFieldTouched("username", true)}
//                 value={values.username}
//                 touched={touched.username}
//                 errors={errors.username}
//             />
//             <InputWithError
//                 type={values.viewpwd?'password':'text'}
//                 name="Password"
//                 label="密码"
//                 onChange={value => setFieldValue("password", value)}
//                 onBlur={() => setFieldTouched("password", true)}
//                 value={values.password}
//                 touched={touched.password}
//                 errors={errors.password}
//                 extra = {values.password?(<span onClick={value=>setFieldValue("viewpwd",values.viewpwd?false:true)} className={styles.clear}>{values.viewpwd?(<EyeInvisibleOutlined />):(<EyeOutlined />)}</span>):(<></>)}
//             />
//             </List>
//             <WhiteSpace />
            
//             <SubmitButton disabled={isSubmitting} className={styles.button}>确认</SubmitButton>
//         </WingBlank>
//         </form>
//   );
//   //Wrap our form with the using withFormik HoC
//   const MyForm = withFormik({
//   // Transform outer props into form values
//   mapPropsToValues: () => ({
//     username: "",
//     password: "",
//     viewpwd:true
//   }),
//   // Add a custom validation function (this can be async too!)
//   validate: (values, props) => {
//     const errors = {};
//     if (!values.username) {
//       errors.username = "用户名不能为空";
//     }
//     if (!values.password) {
//       errors.password = "必填项";
//     }
//     return errors;
//   },
//   // Submission handler
//   handleSubmit:async (values,{props})=>{
//         console.log(values)
//         console.log('propos',props)

//         const {username,password} = values
//         const res = await API.post('/user/login',{
//             username,
//             password
//         })
//         console.log("登录结果：",res);
//         const {status,body,description} = res.data
//         if (status===200){
//             //登陆成功
//             localStorage.setItem('hkzf_token',body.token)
//             console.log(props)
//             if(!props.location.state){
//                 props.history.go(-1)
//             }else{
//                 //push返回会回到登录页面，所以用replace
//                 props.history.replace(props.location.state.from.pathname)
//             }  
//         }else{
//             //登录失败
//             Toast.info(description,2,null,false)
//         }
//     }
// })(InnerForm);

// Use <MyForm /> anywhere
// const Login = () => (
//   <div>
//     <NavHeader>登录</NavHeader>
//     <div className={styles.title}>登录车友圈</div>
//     <MyForm  />
//     <Flex className={styles.reg}>
//         <Flex.Item>
//             <span>未注册用户会自动注册并登录</span>
//         </Flex.Item>
//     </Flex>
//   </div>
// );


export default Login;
