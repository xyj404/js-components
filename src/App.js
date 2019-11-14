import React from 'react'
import { Tabs } from 'antd'
import styled from 'styled-components'

import SimpleTable from '@pages/simpleTable'
import LinkageTable from '@pages/linkageTable'

const TabPane = Tabs.TabPane

function App() {
  return (
    <Wrap>
      <Tabs defaultActiveKey={'2'}>
        <TabPane tab={'简单表格'} key={'1'}>
          <SimpleTable />
        </TabPane>
        <TabPane tab={'筛选可联动'} key={'2'}>
          <LinkageTable />
        </TabPane>
      </Tabs>
    </Wrap>
  )
}

const Wrap = styled.div`
  padding: 24px;
`

export default App
