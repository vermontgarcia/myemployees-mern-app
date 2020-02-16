import React from 'react';
import { Card } from 'antd';

const {Meta} = Card;

const Employee = ({employee, handleLog}) => (
  <div onClick={handleLog.bind(null, employee._id)}>
    <Card
      hoverable
      className="employee-card"
      cover={<img alt={employee.name} src={employee.profilePicture === 'avatar' ? '/avatar.png' : employee.profilePicture} />}
    >
      <Meta
        title={employee.name}
        description={employee.position}
      />

    </Card>
  </div>
)

export default Employee;