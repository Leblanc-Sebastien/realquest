// @vitest-environment nuxt

import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import Modal from '@/components/common/Modal.vue';

describe('Modal.vue', () => {
  it('affiche le titre, le contenu et le texte de confirmation', async () => {
    const wrapper = await mountSuspended(Modal, {
      props: {
        show: true,
        title: 'Titre du test',
        confirmText: 'OK',
      },
      slots: {
        default: '<p>Contenu du test</p>',
      },
    });

    expect(wrapper.text()).toContain('Titre du test');
    expect(wrapper.text()).toContain('Contenu du test');
    expect(wrapper.text()).toContain('OK');
  });

  it("n'affiche rien si show est false", async () => {
    const wrapper = await mountSuspended(Modal, {
      props: {
        show: false,
        title: 'Titre',
        confirmText: 'OK',
      },
    });

    expect(wrapper.find('.fixed').exists()).toBe(false);
  });

  it('émet "cancel" quand on clique sur Annuler', async () => {
    const wrapper = await mountSuspended(Modal, {
      props: {
        show: true,
        title: 'Titre',
        confirmText: 'OK',
      },
    });

    await wrapper.find('button.text-gray-500').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('cancel');
  });

  it('émet "confirm" quand on clique sur le bouton de confirmation', async () => {
    const wrapper = await mountSuspended(Modal, {
      props: {
        show: true,
        title: 'Titre',
        confirmText: 'OK',
      },
    });

    await wrapper.find('button.bg-green-600').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('confirm');
  });
});
