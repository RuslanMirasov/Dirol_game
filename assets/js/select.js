export const initSelectFields = () => {
  const allSelectEl = document.querySelectorAll('[data-select]');

  if (allSelectEl.length === 0) return;

  allSelectEl.forEach(select => {
    new Choices(select, {
      searchEnabled: false,
      shouldSort: false,
    });
  });
};
