document.querySelectorAll('.help-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        const helpText = this.querySelector('.help-text');
        const rect = helpText.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
            helpText.style.left = 'auto';
            helpText.style.right = '100%';
            helpText.style.marginLeft = '0';
        }
    });
    icon.addEventListener('mouseleave', function() {
        const helpText = this.querySelector('.help-text');
        helpText.style.left = '100%';
        helpText.style.right = 'auto';
        helpText.style.marginLeft = '-10px';
    });
});
