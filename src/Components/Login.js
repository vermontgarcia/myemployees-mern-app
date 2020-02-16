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
          <img src='/search.png' alt='logo'/>
        </div>
        <div>
          <Form onSubmit={this.handleSubmit} className="form-envelop">
            <div>
              <h1>Login</h1>
            </div>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Por favor ingresa tu email!' }],
              })(
                <Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="user@compareit.com"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Ingresa tu contraseña!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Tu contraseña"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Recuédame en este dispositivo</Checkbox>
              )}
              <Link className="login-form-forgot" to='/forgot'>Olvidé mi contraseña</Link>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Iniciar sesión
              </Button>
              ¿No tienes una cuenta aún? <Link to='/signup'>Registrate ahora!</Link>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const Login = Form.create()(LoginForm);

/*

const Login = () => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err){
        login(values, this.props.history)
      }
    });
  }

  const {getFieldDecorator} = this.props.form;

  return (
    <div>
      Login
    </div>
  )


}

*/

export default Login;