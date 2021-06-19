import React from 'react'
import { shallow } from 'enzyme'

import App from './App'
import toJson from 'enzyme-to-json'

it('App contains h1', () => {
  const wrapper = shallow(<App />)
  const header = <h1>Sekardayu Hana Pradiani</h1>

  expect(wrapper.contains(header)).toEqual(true)
})

it('Snapshot test', () => {
  const tree = shallow(<App />)
  expect(toJson(tree)).toMatchSnapshot()
})