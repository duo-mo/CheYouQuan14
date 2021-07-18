import React from 'react'
import { NavBar } from 'antd-mobile'

import { withRouter } from 'react-router'
import PropsTypes from 'prop-types'

import  './index.scss'


function NavHeader({children,history,onLeftClick}){
  //默认点击行为
  const defaultHandler = ()=>history.go(-1)
  return(
    <NavBar
        
        className="navbar"
        mode="light"
        icon={<i className="iconfont icon-back" />}
        onLeftClick={onLeftClick||defaultHandler}
      >
        {children}
    </NavBar>
  )
}
 //添加props校验
 NavHeader.prototypes={
  children:PropsTypes.string.isRequired,
  onLeftClick:PropsTypes.fun
}
export default withRouter(NavHeader)