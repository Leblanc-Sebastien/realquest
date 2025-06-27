import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  mockNuxtImport,
  mountSuspended,
  registerEndpoint,
} from '@nuxt/test-utils/runtime';
import AddQuestPage from '~/pages/quests/add.vue';
import { flushPromises } from '@vue/test-utils';

vi.mock('~/stores/useAuthStore', () => ({
  useAuthStore: () => ({
    token: 'fake-token',
    loadToken: vi.fn(),
  }),
}));

vi.mock('~/stores/useUserStore', () => ({
  useUserStore: () => ({
    fetchUser: vi.fn(),
  }),
}));

const navigateToMock = vi.fn();
vi.mock('nuxt/app', async () => {
  const actual = await vi.importActual<typeof import('nuxt/app')>('nuxt/app');
  return {
    ...actual,
    navigateTo: navigateToMock,
  };
});

describe('AddQuestPage.vue', () => {
  beforeEach(() => {
    registerEndpoint('/api/quests/add', async () => {
      return { status: 'ok' };
    });
  });

  it('soumet le formulaire avec succès et redirige', async () => {
    const wrapper = await mountSuspended(AddQuestPage);

    await wrapper.find('input[placeholder="Titre"]').setValue('Créer une app');
    await wrapper
      .find('input[placeholder="Description"]')
      .setValue('Créer une app en Nuxt 3');
    await wrapper.find('select').setValue('DAILY');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    expect(wrapper.text()).toContain('Quête créée !');

    mockNuxtImport('navigateTo', () => vi.fn());
    expect(navigateTo).toHaveBeenCalledTimes(0);

    await new Promise((resolve) => setTimeout(resolve, 1100));
    expect(navigateTo).toHaveBeenCalledWith('/');
  });

  it("affiche un message d'erreur si le POST échoue", async () => {
    registerEndpoint('/api/quests/add', async () => {
      throw {
        data: { statusMessage: 'Votre titre est manquant !' },
      };
    });
    const wrapper = await mountSuspended(AddQuestPage);
    await wrapper
      .find('input[placeholder="Description"]')
      .setValue('Créer une app en Nuxt 3');
    await wrapper.find('select').setValue('DAILY');

    await wrapper.find('form').trigger('submit.prevent');

    await flushPromises();
    expect(wrapper.text()).toContain('Votre titre est manquant !');
  });
});
