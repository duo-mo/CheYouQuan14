import React from 'react'
import NavHeader from '../../components/NavHeader'
import NoContnet from '../../assets/img/empty_pic.png'
import styles from './index.module.css'


class MyComment extends React.Component{
    render(){
        return (
            <div>
                <NavHeader onLeftClick={() => this.props.history.go(-1)}>我的评论</NavHeader>
                <div className={styles.no_contnet_box}>
                <img src={NoContnet} alt='无内容' className={styles.content}/>
                <div>暂无内容</div>
                </div>
                
            </div>
        )
    }
}
export default MyComment