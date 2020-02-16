import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {signup} from '../Services/authService';


import {Form, Icon, Input, Button, Checkbox} from 'antd';


const FormItem = Form.Item;

class SignupForm extends Component {

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        signup(values, this.props.history)
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Password missmatch!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  render(){
    const {getFieldDecorator} = this.props.form;
    return(
      <div className='signup-envelop'>
        <div>
          <img src='/search.png' alt='logo'/>
        </div>
        <div>
          <Form onSubmit={this.handleSubmit}>
            <div>
              <h1>Signup</h1>
            </div>
            <FormItem>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please enter your name!', whitespace: true }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='What is your name?'/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'Please enter a valid email!',
                }, {
                  required: true, message: 'Emter your email!',
                }],
              })(
                <Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='name.surname@mycompany.com'/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('department', {
                rules: [{
                  required: true, message: 'Department is required!',
                }],
              })(
                <Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='Department'/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('position', {
                rules: [{
                  required: true, message: 'Position is required!',
                }],
              })(
                <Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='Position'/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please enter your password!',
                },{
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Your password"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('confirmPassword', {
                rules: [{
                  required: true, message: 'Please confirm your password!',
                },{
                  validator: this.compareToFirstPassword,
                }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Confirm your password"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox>He leido el <Link to='/agreement'>acuerdo</Link></Checkbox>
                )}
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Registrar
                </Button>
                Ya tienes una cuenta? <Link to='/login' >Inicia sesión</Link>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

const Signup = Form.create()(SignupForm);
export default Signup;