// @vitest-environment nuxt

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Dummy from '@/components/common/Dummy.vue';

describe('DummyComponent', () => {
  it('render the component', () => {
    const wrapper = mount(Dummy);
    expect(wrapper.exists()).toBe(true);
  });
});
