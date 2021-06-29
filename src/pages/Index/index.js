
import React from 'react'
import NavHeader from '../../components/NavHeader'
export default class Index extends React.Component{
    render(){
        const {history} = this.props
        console.log(history)
        return (
            <div>
                <NavHeader
                onLeftClick={()=>{
                    console.log("点击了左侧按钮");
                }}
                >
                   车友圈  
                </NavHeader>
                这是首页

            </div>
        )
    }
}