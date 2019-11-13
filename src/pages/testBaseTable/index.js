import React, { useRef } from 'react'
import { Button } from 'antd'
import TableList from '@components/tableList'
import axios from 'axios'
import styled from 'styled-components'

export default () => {
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      search: true,
    },
    {
      title: '额外的搜索',
      searchIndex: 'other',
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
    {
      title: '开始时间',
      dataIndex: 'createdAt',
      search: true
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      search: true
    }
  ]

  const reloadList = useRef()

  return (
    <Wrap>
      <TableList
        columns={columns}
        getList={({ params, pagination: { current } }) =>
          axios
            .get('https://yapi.parsec.com.cn/mock/338/mgr/bulletin-caches', {params: {page: current, ...params }})
            .then(({ data: { list } }) => ({ list, total: list.length }))
        }
        reloadList={relod => (reloadList.current = relod)}
        action={<Button>新建</Button>}
      />
      <Button onClick={() => reloadList.current()}>重新加载</Button>
    </Wrap>
  )
}

const Wrap = styled.div`
  padding: 24px;
`
