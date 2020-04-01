
import React, {useState, useEffect} from 'react';
import {logHistory} from '../Services/logService';
import {isLoggedIn, logout} from '../Services/authService';
import { Layout, List, Avatar, Button, Skeleton, BackTop, Icon } from 'antd';
import FooterInfo from './FooterInfo';
import Nav from './Nav';

const { Header, Footer, Content } = Layout;

//Pagination settings 20 records per page.

let count = 20;
let page = 1;

export default function Logs(props) {
  
  const [logs, setLogs] = useState([]);
  const [user, setUser] = useState({});
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const  handleLogOut = () => {
    logout(props.history)
  }

  const handleLoggedIn = () => {
    const token = localStorage.getItem('token');
    token ? isLoggedIn(props.history) : props.history.push('/login');
    const user = JSON.parse(localStorage.getItem('user'))
    user ? setUser(user) : props.history.push('/login');
  }

  const handleRequest = () => {
    if (initLoading){page=1}
    let pagination = {
      page: page,
      size: count,
    }
    logHistory(pagination)
    .then(res => {
      page++;
      let logs = data.concat(res.data.logs);
      logs.forEach(log => {
        let logDate = new Date (log.created_at)
        let date = [...log.created_at ].slice(5,10).join("");
        let hour = logDate.getHours()
        log.date = date;
        log.hour = hour;
      });
      setLogs(logs);
      setData(logs);
      setList(logs);
      setLoading(false);
    })
    .then(()=>{
      setInitLoading (false);
    })
    .catch(err => {
      console.log('ERROR =====> ',err)
    })
  }

  useEffect(() => {
    handleLoggedIn();
    handleRequest();
  }, [])
  
  const onLoadMore = () => {
    setLoading(true);
    let newData = data.concat([...new Array(count)].map(() => ({ 
      loading: true, 
      userId: { 
        profilePicture: 'avatar',
        name: ''
      },
      employeeId: {
        profilePicture: 'avatar',
        name: ''
      },
      logName: '',
      created_at: '' 
    })));
    setList(newData)
    handleRequest();
  };

  const loadMore =
    !initLoading && !loading ? (
      <div className='load-more'>
        <Button onClick={onLoadMore}>Load More</Button>
      </div>
    ) : null;

  return (
    <div>
      <Layout>
        <Header>
          <Nav user={user} handleLogOut={handleLogOut} />
        </Header>
        <Content>
          <h2>Logs History</h2>
          <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={item => (
              <List.Item
            actions={
              item.logName === 'Employee consult' ?
              [<Avatar src={item.employeeId.profilePicture} />] :
              [<Avatar src={item.userId.profilePicture} />] }
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={item.userId.profilePicture} />
                    }
                    title={`User "${item.userId.name}" generated a historical record"`}
                    description={`Log Type: "${item.logName}" at "${item.created_at}"`}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </Content>
        <Footer>
          <FooterInfo/>
        </Footer>
      </Layout>
      <div>
          <BackTop id="back-top-custom">
            <div className="ant-back-top-inner"><Icon type="to-top" /></div>
          </BackTop>
        </div>
    </div>
  )
}