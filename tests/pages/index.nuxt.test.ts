import { mount, RouterLinkStub } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import index from '@/pages/index.vue';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';

vi.mock('~/stores/useUserStore', () => ({
  useUserStore: () => ({
    user: null,
    fetchUser: vi.fn().mockResolvedValue(undefined),
  }),
}));

vi.mock('~/stores/useQuestsStore', () => ({
  useQuestsStore: () => ({
    noneQuests: [],
    dailyQuests: [],
    weeklyQuests: [],
    monthlyQuests: [],
    fetchQuests: vi.fn().mockResolvedValue(undefined),
  }),
}));

vi.mock('~/stores/useAuthStore', () => ({
  useAuthStore: () => ({
    token: 'fake-token',
    loadToken: vi.fn(),
    clearToken: vi.fn(),
  }),
}));

describe('IndexPage', () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(async () => {
    wrapper = await mountSuspended(index, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
  });

  it('affiche le message de chargement lorsque userStore.user est null', () => {
    expect(wrapper.text()).toContain('Chargement du héros...');
  });

  it('affiche le bouton "+" pour ajouter une quête', () => {
    const addButton = wrapper.find('button');
    expect(addButton.exists()).toBe(true);
    expect(addButton.text()).toBe('+');
  });

  it('redirige sur "/quests/add" lors du clic sur le bouton "+"', async () => {
    mockNuxtImport('navigateTo', () => vi.fn());

    expect(navigateTo).toHaveBeenCalledTimes(0);

    const addButton = wrapper.find('button');
    await addButton.trigger('click');

    expect(navigateTo).toHaveBeenCalledWith('/quests/add');
  });
});
