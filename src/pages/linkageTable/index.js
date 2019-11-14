import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import TableList from '@components/tableList'
import request from '@utils/request'
import useForm from 'rc-form-hooks'

const { Option } = Select

export default () => {
  const form = useForm()
  // 选中的第一个下拉框的值,将其作为第二个下拉框的参数
  const [oneValue, setOneValue] = useState()

  const [oneList, setOneList] = useState([])
  useEffect(() => {
    request.get('/mgr/users').then(({ data: { list } }) => {
      setOneList(list)
    })
  }, [])

  const [twoList, setTwoList] = useState([])
  useEffect(() => {
    if (oneValue) {
      request.get('/mgr/users/online', { params: { title: oneValue } }).then(({ data: { list } }) => {
        setTwoList(list)
      })
    }
  }, [oneValue])

  let columns = [
    {
      title: '一级',
      dataIndex: 'title',
      search: (
        <Select
          placeholder={'请选择'}
          onChange={value => {
            console.log(11111111)
            setOneValue(value)
            form.resetFields(['state'])
          }}
        >
          {oneList.map(item => {
            return (
              <Option value={item.id} key={item.id}>
                {item.userName}
              </Option>
            )
          })}
        </Select>
      ),
    },
    {
      title: '二级',
      dataIndex: 'state',
      search: (
        <Select placeholder={'请选择'} disabled={!oneValue} style={{ width: '100%' }}>
          {twoList.map(item => {
            return (
              <Option value={item.userId} key={item.userId}>
                {item.loginName}
              </Option>
            )
          })}
        </Select>
      ),
    },
  ]

  // 根据下拉动态改变筛选项和表单项
  columns = oneValue ? [
    ...columns,
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '额外的',
      searchIndex: 'test',
      search: true
    }
  ] : columns

  return (
    <>
      <TableList
        form={form}
        columns={columns}
        getList={({ params, pagination: { current } }) => {
          return request
            .get('/mgr/bulletin-caches', { params: { page: current, ...params } })
            .then(({ data: { list } }) => ({ list, total: list.length }))
        }}
        resetFilter={() => {
          setOneValue()
        }}
      />
    </>
  )
}
