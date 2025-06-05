import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import Menu from '@/components/layout/BurgerMenu.vue';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';

vi.mock('~/stores/useAuthStore', () => ({
  useAuthStore: () => ({
    clearToken: vi.fn(),
  }),
}));

vi.mock('~/stores/useUserStore', () => ({
  useUserStore: () => ({
    user: { id: 1 },
  }),
}));

describe('Menu.vue', () => {
  let wrapper: Awaited<ReturnType<typeof mountSuspended>>;

  beforeEach(async () => {
    wrapper = await mountSuspended(Menu);
  });

  it('menu est fermé par défaut', () => {
    expect(wrapper.html()).not.toContain('RealQuest');
  });

  it('ouvre le menu au clic sur le bouton', async () => {
    await wrapper.find('button').trigger('click');
    expect(wrapper.html()).toContain('RealQuest');
  });

  it('ferme le menu au clic sur le fond noir', async () => {
    await wrapper.find('button').trigger('click');
    const overlay = wrapper.find('.bg-black\\/40');
    await overlay.trigger('click');
    expect(wrapper.html()).not.toContain('RealQuest');
  });

  it('ferme le menu au clic sur le bouton "fermer"', async () => {
    await wrapper.find('button').trigger('click');
    const closeButton = wrapper.findAll('button')[1];
    await closeButton.trigger('click');
    expect(wrapper.html()).not.toContain('RealQuest');
  });

  it('ferme le menu au clic sur un lien (Accueil)', async () => {
    await wrapper.find('button').trigger('click');
    const link = wrapper.find('a[href="/"]');
    await link.trigger('click');
    expect(wrapper.html()).not.toContain('RealQuest');
  });

  it('déconnecte et redirige au clic sur "Se déconnecter"', async () => {
    mockNuxtImport('navigateTo', () => vi.fn());

    await wrapper.find('button').trigger('click');

    const logoutLink = wrapper.findAll('a').at(-1)!;
    logoutLink.trigger('click');

    expect(navigateTo).toHaveBeenCalledWith('/login');
  });
});
