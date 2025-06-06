import { describe, it, expect, vi } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import Alert from '@/components/common/ShowAlerts.vue';
import { StateAlert } from '@/types/alert';

describe('ShowAlerts', () => {
  it("affiche le message pour l'état success", async () => {
    const wrapper = await mountSuspended(Alert, {
      props: {
        message: 'Succès !',
        state: StateAlert.success,
      },
    });

    expect(wrapper.text()).toContain('Succès !');
    expect(wrapper.find('div').classes()).toContain('bg-success');
  });

  it("affiche le message pour l'état fail", async () => {
    const wrapper = await mountSuspended(Alert, {
      props: {
        message: 'Erreur !',
        state: StateAlert.fail,
      },
    });

    expect(wrapper.text()).toContain('Erreur !');
    expect(wrapper.find('div').classes()).toContain('bg-danger');
  });

  it("affiche l'alerte pendant 2 secondes puis la masque", async () => {
    vi.useFakeTimers();
    const wrapper = await mountSuspended(Alert, {
      props: {
        message: 'Message temporaire',
        state: StateAlert.success,
      },
    });

    expect(wrapper.find('div').exists()).toBe(true);

    vi.advanceTimersByTime(2000);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('div').exists()).toBe(false);

    vi.useRealTimers();
  });
});
