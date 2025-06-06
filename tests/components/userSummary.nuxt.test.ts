import { describe, it, expect, vi } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import UserSummary from '~/components/user/UserSummary.vue';
import type { Title, UserTitle } from '~/types/User';

vi.mock('~/stores/useUserStore', () => ({
  useUserStore: () => ({
    user: { xp: 150 },
  }),
}));

vi.mock('~/utils/getXpProgress', () => ({
  getXpProgress: (xp: number) => ({
    percentage: 75,
    current: xp,
    needed: 200,
  }),
}));

describe('UserSummary.vue', () => {
  const mockUser = {
    id: 1,
    userName: 'John Doe',
    title: 'NOOB' as Title,
    xp: 150,
    createdAt: '',
    mail: '',
    level: 1,
    quests: [],
    logs: [],
  };

  it("affiche le nom, le titre, et l'avatar de l'utilisateur", async () => {
    const wrapper = await mountSuspended(UserSummary, {
      props: {
        user: mockUser,
      },
    });

    expect(wrapper.text()).toContain(mockUser.userName);

    const slug = 'noob';
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe(`/avatars/${slug}.png`);

    // Titre affiché depuis l'enum
    expect(wrapper.text()).toContain('Noob');
  });

  it('affiche correctement la progression XP', async () => {
    const wrapper = await mountSuspended(UserSummary, {
      props: {
        user: mockUser,
      },
    });

    const progressBar = wrapper.find('.bg-bar');
    expect(progressBar.exists()).toBe(true);
    expect(progressBar.attributes('style')).toContain('width: 75%');

    expect(wrapper.text()).toContain('150 / 200 XP');
  });
});
