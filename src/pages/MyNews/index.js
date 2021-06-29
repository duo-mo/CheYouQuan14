import React from 'react'
import NavHeader from '../../components/NavHeader'
class MyNews extends React.Component{
    render(){
        return (
            <div>
                <NavHeader onLeftClick={() => this.props.history.go(-1)}>我的动态</NavHeader>
                我的动态页面
            </div>
        )
    }
}
export default MyNews