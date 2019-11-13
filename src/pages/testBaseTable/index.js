import React from 'react';
import BaseTable from '@components/baseTable'
import axios from 'axios';
import Mock from 'mockjs';

export default () => {
  Mock.mock('/list', {
    'list|1-10': [{
        'id|+1': 1,
        'name': 'xyj',
        'age': 121,
        'address': '重庆'
    }]
  })

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return <BaseTable columns={columns} getList={() => axios.get('/list').then((res) => ({list: res.data.list, total: res.data.list.length}))} />
}
