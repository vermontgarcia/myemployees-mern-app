import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Icon, Avatar, Drawer, Divider} from 'antd';

class Nav extends Component {

  constructor(){
    super();
    this.state = {
      visible: false,
      placement: 'left'
    }
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  }

  onClose = () => {
    this.setState({
      visible: false
    });
  }

  render(){
    const {user} = this.props
    return (
      <nav className="nav">
        <div className="mouseHover" >
          <Icon onClick={this.showDrawer} type='menu' className="icon-nav" />
        </div>
        <div>
          <NavLink to='/' >
            <span className='nav-logo'>
              <i className="fas fa-search"></i>
            </span>
          </NavLink>
        </div>
        <div>
          {user ? <NavLink to='/'><Avatar src={user.profilePicture === 'avatar' ? '/avatar.png' : user.profilePicture} /></NavLink> : null}
        </div>
        <Drawer
          placement={this.state.placement}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          className='drawer-wrapper'
        >
          <div><Link to='/' ><Icon type="home" /> Home</Link></div>
          <Divider />
          <div><Link to='/chart' ><Icon type="file-search" /> Log Char</Link></div>
          <div><Link to='/' ><Icon type="file-done" /> Employees</Link></div>
          <Divider />
          <div><Link to='/' ><Icon type="user" /> Mi Profile</Link></div>
          <div><Link to='/' ><Icon type="setting" /> Settings</Link></div>
          <Divider />
          <div onClick={this.props.handleLogOut} ><Link to=''><Icon type="logout" /> Log out</Link></div>
        </Drawer>


      </nav>
    )
  }

}

export default Nav;