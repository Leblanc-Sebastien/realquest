import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import QuestCard from '~/components/quest/QuestCard.vue';
import type { Frequency } from '~/types/quest';

describe('QuestCard.vue', () => {
  const quest = {
    id: 42,
    title: 'Finir le projet CDA',
    frequency: 'DAILY' as Frequency,
    description: 'quest description',
    repeat: true,
    createdAt: '',
    userId: 1,
    logs: [],
  };

  it('affiche le titre et la fréquence de la quête', async () => {
    const wrapper = await mountSuspended(QuestCard, {
      props: { quest },
    });

    expect(wrapper.text()).toContain(quest.title);
    expect(wrapper.text()).toContain(quest.frequency);
  });

  it('émet "openModal" avec l’ID de la quête au clic sur le bouton', async () => {
    const wrapper = await mountSuspended(QuestCard, {
      props: { quest },
    });

    const button = wrapper.find('button');
    await button.trigger('click');

    expect(wrapper.emitted('openModal')).toBeTruthy();
    expect(wrapper.emitted('openModal')![0]).toEqual([quest.id]);
  });
});
