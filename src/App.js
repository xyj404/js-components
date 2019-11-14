import React from 'react'
import SimpleTable from '@pages/simpleTable'
import { Tabs } from 'antd'
import styled from 'styled-components'

const TabPane = Tabs.TabPane

function App() {
  return (
    <Wrap>
      <Tabs>
        <TabPane tab={'简单表格'} key={'1'}>
          <SimpleTable />
        </TabPane>
        <TabPane tab={'筛选可联动'} key={'2'}>
          <div></div>
        </TabPane>
      </Tabs>
    </Wrap>
  )
}

const Wrap = styled.div`
  padding: 24px;
`

export default App
