
import React, { useEffect } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';


import styles from "./auth.module.css";
import { adminLoginThunk, getAdminLoginErrorMessages } from '../../store/slices/auth/login';

const Auth= () => {
  const dispatch = useDispatch();
  const errorMessages = useSelector(getAdminLoginErrorMessages);

  const onFinish = (values) => { 
    dispatch(adminLoginThunk(values));
  };
  
  return (
    <Row className={styles.authRow}>
      <Col span={12} className={styles.formContainer}>
       
        {/* <p className="error">{errorMessages ? t(_.toUpper(`AUTH.${errorMessages}`)) : null}</p> */}
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600, margin: "0 auto" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}        
          autoComplete="off"
        >
          <Form.Item
            name="login"
            rules={[{ required: true, message: "Login is required" }]}
          >
            <Input placeholder="Login" className={styles.authFields} data-testId = "login"/>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password placeholder="Password" className={styles.authFields} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.authFields}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
};

export default Auth;