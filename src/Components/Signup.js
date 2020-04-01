import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {signup} from '../Services/authService';
import {Form, Icon, Input, Button, Checkbox} from 'antd';

const FormItem = Form.Item;

class SignupForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
  }

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
          <h1>My Company</h1>
        </div>
        <div>
          <img src='/logo192.png' alt='logo'/>
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
                  prefix={<Icon type="user" className="input-icon-color" />}
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
                  prefix={<Icon type="mail" className="input-icon-color" />}
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
                  prefix={<Icon type="apartment" className="input-icon-color" />}
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
                  prefix={<Icon type="team" className="input-icon-color" />}
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
                  prefix={<Icon type="lock" className="input-icon-color" />}
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
                  prefix={<Icon type="lock" className="input-icon-color" />}
                  type="password"
                  placeholder="Confirm your password"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox>I have read the <Link to='/agreement'>agreement</Link></Checkbox>
                )}
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Register
                </Button>
                Already have an account? <Link to='/login' >Login</Link>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

const Signup = Form.create()(SignupForm);
export default Signup;