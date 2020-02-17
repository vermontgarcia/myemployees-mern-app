import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {login} from '../Services/authService'

import {Form, Icon, Input, Button, Checkbox} from 'antd';

const FormItem = Form.Item;

class LoginForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        login(values, this.props.history)
      }
    });
  }
  
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className='login-envelop'>
        <div>
          <img src='/logo192.png' alt='logo'/>
        </div>
        <div>
          <Form onSubmit={this.handleSubmit} className="form-envelop">
            <div>
              <h1>Login</h1>
            </div>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please enter your email!' }],
              })(
                <Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="name.surname@mycompany.com"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please enter your password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Your password"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
              <Link className="login-form-forgot" to='/forgot'>Forgot my password</Link>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Login
              </Button>
              Not registered yet? <Link to='/signup'>Sign up!</Link>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const Login = Form.create()(LoginForm);

export default Login;