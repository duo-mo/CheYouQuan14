import React from 'react'
import NavHeader from '../../components/NavHeader'
class MyComment extends React.Component{
    render(){
        return (
            <div>
                {/* <NavHeader
                onLeftClick={()=>{
                    console.log("点击了左侧按钮");
                }}
                >
                   我的动态  
                </NavHeader> */}
                <NavHeader onLeftClick={() => this.props.history.go(-1)}>我的评论</NavHeader>
                我的评论页面
            </div>
        )
    }
}
export default MyComment