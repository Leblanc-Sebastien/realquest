import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import QuestsCard from '@/components/quest/QuestsCard.vue';
import type { Frequency } from '~/types/quest';

describe('QuestChecklist.vue', () => {
  const quests = [
    {
      id: 1,
      title: 'Lire 10 pages',
      frequency: 'DAILY' as Frequency,
      description: 'quest description',
      repeat: true,
      createdAt: '',
      userId: 1,
      logs: [],
    },
    {
      id: 2,
      title: 'Marcher 5km',
      frequency: 'DAILY' as Frequency,
      description: 'quest description',
      repeat: true,
      createdAt: '',
      userId: 1,
      logs: [],
    },
  ];

  const createWrapper = (
    declinaison: number,
    checked: Record<number, boolean> = {}
  ) =>
    mountSuspended(QuestsCard, {
      props: {
        declinaison,
        quests,
        checkedQuests: { ...checked },
      },
    });

  it('affiche le bon titre selon la déclinaison', async () => {
    const wrapper = await createWrapper(2);
    expect(wrapper.text()).toContain('Quêtes quotidiennes');

    const wrapper2 = await createWrapper(4);
    expect(wrapper2.text()).toContain('Quêtes mensuelles');
  });

  it('affiche toutes les quêtes passées en props', async () => {
    const wrapper = await createWrapper(1);
    quests.forEach((quest) => {
      expect(wrapper.text()).toContain(quest.title);
    });
  });

  it('coche une quête', async () => {
    const wrapper = await createWrapper(1);

    const checkboxes = wrapper.findAll('input[type="checkbox"]');
    expect(checkboxes.length).toBe(2);
  });

  it('initialise les quêtes déjà cochées', async () => {
    const wrapper = await createWrapper(1, { 2: true });

    const secondCheck = wrapper.findAll('svg');
    expect(secondCheck.length).toBe(1);
  });
});
