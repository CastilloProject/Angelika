const faqButtons = document.querySelectorAll('.faq-item');

faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const currentlyActive = document.querySelector('.faq-item.active');
    if (currentlyActive && currentlyActive !== button) {
      currentlyActive.classList.remove('active');
      const panel = currentlyActive.nextElementSibling;
      if (panel) panel.style.display = 'none';
    }

    const panel = button.nextElementSibling;
    const isActive = button.classList.toggle('active');
    if (panel) panel.style.display = isActive ? 'block' : 'none';
  });
});
