import React, { useRef, useState, useEffect } from 'react'
import { Button, DatePicker, Select, Radio } from 'antd'
import TableList from '@components/tableList'
import request from '@utils/request'
import moment from 'moment'

const { RangePicker } = DatePicker
const { Option } = Select

export default () => {
  // select数据从接口取
  const [selectData, setSelectData] = useState([])
  useEffect(() => {
    request.get('/mgr/users/online').then(({ data: { list } }) => {
      setSelectData(list)
    })
  }, [])

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      search: true,
    },
    {
      title: '额外的搜索',
      searchIndex: 'other',
      search: (
        <Select placeholder={'请选择'}>
          {selectData.map(item => {
            return <Option value={item.userId}>{item.loginName}</Option>
          })}
        </Select>
      ),
    },
    {
      title: '状态',
      dataIndex: 'state',
      search: (
        <Radio.Group>
          <Radio.Button value='small'>Small</Radio.Button>
          <Radio.Button value='default'>Default</Radio.Button>
          <Radio.Button value='large'>Large</Radio.Button>
        </Radio.Group>
      ),
    },
    {
      title: '时间范围',
      dataIndex: 'createdAt',
      search: <RangePicker />,
    },
  ]

  // 获取重新加载表格的方法
  const reloadList = useRef()

  return (
    <>
      <TableList
        columns={columns}
        getList={({ params, pagination: { current } }) => {
          // 在请求前，可在这修改筛选表单的数据
          if (params.createdAt && params.createdAt[0]) {
            params.startTime = moment(params.createdAt[0]).format('YYYY-MM-DD')
            params.endTime = moment(params.createdAt[1]).format('YYYY-MM-DD')
            delete params.createdAt
          }
          return request
            .get('/mgr/bulletin-caches', { params: { page: current, ...params } })
            .then(({ data: { list } }) => ({ list, total: list.length }))
        }}
        reloadList={relod => (reloadList.current = relod)}
      />
      <Button onClick={() => reloadList.current()}>重新加载</Button>
    </>
  )
}
