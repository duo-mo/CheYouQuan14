import React from 'react'
import NavHeader from '../../components/NavHeader'
import styles from './index.module.css'

import NoContnet from '../../assets/img/empty_pic.png'

class MyNews extends React.Component{
    render(){
        return (
            <div>
                <NavHeader onLeftClick={() => this.props.history.go(-1)}>我的动态</NavHeader>
                <div className={styles.no_contnet_box}>
                <img src={NoContnet} alt='无内容' className={styles.content}/>
                <div>暂无内容</div>
                </div>
            </div>
        )
    }
}
export default MyNews