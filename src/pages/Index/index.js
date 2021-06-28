import { Button } from 'antd-mobile';
import React from 'react'
import NavHeader from '../../components/NavHeader'
export default class Index extends React.Component{
    render(){
        const {history} = this.props
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