import React, {useRef} from 'react';
import {Button} from 'antd';
import TableList from '@components/tableList';
import axios from 'axios';

export default () => {
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      search: true
    },
    {
      title: 'sss',
      searchIndex: 'ss',
      search: true,
    },
    {
      title: '内容',
      dataIndex: 'content',
    },
    {
      title: '状态',
      dataIndex: 'state',
    },
  ];

  const reloadList = useRef();

  return (
    <>
      <TableList
        columns={columns}
        getList={({params}) => axios.get('https://yapi.parsec.com.cn/mock/338/mgr/bulletin-caches', {params}).then(({data: {list}}) => ({list, total: list.length}))}
        reloadList={(relod) => reloadList.current = relod}
      />
      <Button onClick={() => reloadList.current()}>重新加载</Button>
    </>
  )
}
