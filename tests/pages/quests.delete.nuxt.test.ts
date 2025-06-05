import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  mockNuxtImport,
  mountSuspended,
  registerEndpoint,
} from '@nuxt/test-utils/runtime';
import MyQuestsPage from '@/pages/quests/all-created-quests.vue'; // adapte le chemin
import { StateAlert } from '~/types/alert';
import { flushPromises } from '@vue/test-utils';

const mockFetchUser = vi.fn();
const mockFetchMyQuests = vi.fn();
const mockClearToken = vi.fn();
const mockLoadToken = vi.fn();
const navigateToMock = vi.fn();

vi.mock('~/stores/useUserStore', () => ({
  useUserStore: () => ({
    fetchUser: mockFetchUser,
  }),
}));

vi.mock('~/stores/useMyQuestsStore', () => ({
  useMyQuestsStore: () => ({
    myQuests: [
      { id: 1, title: 'Ma quête 1', frequency: 'DAILY' },
      { id: 2, title: 'Ma quête 2', frequency: 'WEEKLY' },
    ],
    fetchMyQuests: mockFetchMyQuests,
  }),
}));

vi.mock('~/stores/useAuthStore', () => ({
  useAuthStore: () => ({
    token: 'fake-token',
    loadToken: mockLoadToken,
    clearToken: mockClearToken,
  }),
}));

vi.mock('nuxt/app', async () => {
  const actual = await vi.importActual<typeof import('nuxt/app')>('nuxt/app');
  return {
    ...actual,
    navigateTo: navigateToMock,
  };
});

describe('MyQuestsPage.vue', () => {
  beforeEach(() => {
    registerEndpoint('/api/quests/delete', async (req) => {
      return { status: 'ok' };
    });

    mockFetchUser.mockClear();
    mockFetchMyQuests.mockClear();
    mockClearToken.mockClear();
    navigateToMock.mockClear();
  });

  it('affiche les quêtes groupées et permet la suppression', async () => {
    const wrapper = await mountSuspended(MyQuestsPage);

    expect(wrapper.text()).toContain('Ma quête 1');
    expect(wrapper.text()).toContain('Ma quête 2');

    const deleteButtons = wrapper.findAll('button');
    await deleteButtons[0].trigger('click');

    expect(wrapper.text()).toContain(
      'Êtes-vous sur de vouloir supprimer cette quête'
    );

    const confirmButton = wrapper
      .findComponent({ name: 'Modal' })
      .findAll('button')[1];
    await confirmButton!.trigger('click');

    expect(mockFetchMyQuests).toHaveBeenCalled();

    await flushPromises();
    await nextTick();

    expect(wrapper.text()).toContain('Quête supprimée avec succès');
  });
});
