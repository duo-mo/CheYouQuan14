import React from "react";
import {
  InputItem,
  List,
} from "antd-mobile";
import "antd-mobile/dist/antd-mobile.min.css";
import styles from './index.module.css'
const MyInputItem = props => (
  <div className={styles.view}>
  <InputItem
      clear={props.clear}
      type={props.type}
      name={props.name}
      onChange={value => props.onChange(value)}
      onBlur={props.onBlur}
      value={props.value}
      extra={props.extra}
    >
      {props.label}
    </InputItem>
  </div>
  
  
);

const SubmitButton = props => (
  <button className="my-submit-button" type="submit" disabled={props.disabled}>
    {props.children}
  </button>
);

const MyErrorItem = props =>
  props.touched && props.errors ? (
    <List.Item style={{ backgroundColor: "#eee" }}>
      <span style={{ color: "red", fontSize: ".7rem" }}>* {props.errors}</span>
    </List.Item>
  ) : null;

// HOC ERROR IN COMPONENT
function HOCErrorInItem(NormalComponent, ErrorComponent) {
  return class HOC extends React.Component {
    render() {
      return (
        <div>
          <NormalComponent {...this.props} />
          <ErrorComponent
            touched={this.props.touched}
            errors={this.props.errors}
          />
        </div>
      );
    }
  };
}

const InputWithError = HOCErrorInItem(MyInputItem, MyErrorItem);


export {
  InputWithError,
  SubmitButton
};
