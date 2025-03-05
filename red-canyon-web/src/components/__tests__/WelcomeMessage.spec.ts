import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import WelcomeMessage from '../WelcomeMessage.vue'

describe('WelcomeMessage', () => {
  it('renders properly', () => {
    const wrapper = mount(WelcomeMessage, { props: { msg: 'Hello Vitest', subtitle: 'Subtitle msg' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
