import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import LogoTopLayout from '@/components/layout/LogoTopLayout.vue';

describe('LogoTopLayout.vue', () => {
  it('affiche le logo, le titre, et le contenu du slot', async () => {
    const wrapper = await mountSuspended(LogoTopLayout, {
      props: {
        title: 'Bienvenue sur RealQuest',
      },
      slots: {
        content: '<p class="slot-content">Ceci est un contenu de test</p>',
      },
    });

    const logo = wrapper.find('img');
    expect(logo.exists()).toBe(true);
    expect(logo.attributes('src')).toBe('/logos/realquest_logo.png');

    const title = wrapper.find('h3');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe('Bienvenue sur RealQuest');

    const slotContent = wrapper.find('.slot-content');
    expect(slotContent.exists()).toBe(true);
    expect(slotContent.text()).toBe('Ceci est un contenu de test');
  });
});
