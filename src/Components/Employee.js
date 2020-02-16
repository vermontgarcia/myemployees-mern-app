import React from 'react';
import { Card } from 'antd';

const {Meta} = Card;

const Employee = ({employee}) => (
  <div>
    <Card
      hoverable
      className="employee-card"
      cover={<img alt="Test" src={employee.profilePicture === 'avatar' ? '/avatar.png' : employee.profilePicture} />}
    >
      <Meta
        title={employee.name}
        description={employee.position}
      />

    </Card>
  </div>
)

export default Employee;