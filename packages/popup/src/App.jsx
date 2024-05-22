import './App.css'
import { useState, useEffect } from 'react'
import { getMode, saveMode, openOptionsPage } from '@uproxy/common/openHandler.js'
import { directMode, systemMode, fixedMode, pacMode } from '@uproxy/common/proxyHandler.js'
import { FIXED, DIRECT, SYSTEM, PAC } from '@uproxy/common/proxyType.js'

import { Radio, Space, Button, Divider } from 'antd';

function onDirectMode() {
  directMode()
}
function onSystemMode() {
  systemMode()
}
function onFixedMode() {
  fixedMode()
}
function onPacMode() {
  pacMode()
}

const itemArr = [
  { type: DIRECT, text: '直连模式', action: onDirectMode },
  { type: SYSTEM, text: '系统代理', action: onSystemMode },
  { type: FIXED, text: '代理模式', action: onFixedMode },
  { type: PAC, text: 'PAC模式', action: onPacMode }
]

function onSelect({ key }) {
  const eventMap = {}
  itemArr.forEach(i => {
    eventMap[i.type] = i.action
  })
  const handler = eventMap[key]
  if (handler) handler()
  saveMode(key)
}

function toOptions() {
  return openOptionsPage()
}

function App() {
  const [value, setValue] = useState('');
  useEffect(() => {
    getMode(m => {
      setValue(m)
    })
  }, []);
  const [modes] = useState(itemArr)
  const onChange = (e) => {
    const type = e.target.value
    setValue(e.target.value);
    onSelect({ key: type })
  };
  return (
    <div className="flex-center">
      <Radio.Group onChange={onChange} value={value} style={{ alignSelf: 'center' }}>
        <Space direction="vertical" className="flex-center">
          {
            modes.map(item => (<Radio style={{width: '100%'}} value={item.type} key={item.type}>{item.text}</Radio>))
          }
        </Space>
      </Radio.Group>
      <Divider style={{margin: '5px 0'}}></Divider>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button type="text" onClick={toOptions} style={{ width: '100%' }}>选项</Button>
      </div>
    </div>
  )
}

export default App
