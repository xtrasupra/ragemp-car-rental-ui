// Browser-only feedback; entered form values are never stored or transmitted.
if (!window.mp) {
  window.__RAGEMP_DEMO__ = true;
  window.mp = { trigger(eventName) {
    const message = eventName.includes('auth:')
      ? 'Демонстрация формы. Данные никуда не отправлены.'
      : 'Действие выбрано. Игровое событие показано в деморежиме.';
    window.dispatchEvent(new CustomEvent('demo-feedback', { detail: message }));
  } };
}
