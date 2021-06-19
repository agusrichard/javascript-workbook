import { mount } from 'enzyme'
import Account from './Account'
import toJson from "enzyme-to-json"

describe('Test Account component props', () => {
  it('access user props', () => {
    const user = {
      name: 'Sekardayu',
      age: 23,
      email: 'sekardayu@example.com'
    }

    const wrapper = mount(<Account user={user} />)
    expect(wrapper.props().user).toEqual(user)
  })
})