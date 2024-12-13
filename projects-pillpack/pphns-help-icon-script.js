document.querySelectorAll('.help-icon').forEach(icon => {
    const helpText = icon.querySelector('.help-text');

    icon.addEventListener('mouseenter', function () {
        if (!helpText.classList.contains('active')) {
            helpText.style.visibility = 'visible';
            helpText.style.opacity = '1';
        }

        const rect = helpText.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
            helpText.style.left = 'auto';
            helpText.style.right = '100%';
            helpText.style.marginLeft = '0';
        }
    });

    icon.addEventListener('mouseleave', function () {
        if (!helpText.classList.contains('active')) {
            resetTooltipPosition(helpText);
        }
    });

    icon.addEventListener('click', function (event) {
        event.stopPropagation();

        if (helpText.classList.contains('active')) {
            helpText.classList.remove('active');
            resetTooltipPosition(helpText);
        } else {
            helpText.classList.add('active');
            helpText.style.visibility = 'visible';
            helpText.style.opacity = '1';
        }
    });

    document.addEventListener('click', function (event) {
        if (!icon.contains(event.target)) {
            helpText.classList.remove('active');
            resetTooltipPosition(helpText);
        }
    });

    function resetTooltipPosition(helpText) {
        helpText.style.visibility = 'hidden';
        helpText.style.opacity = '0';
        helpText.style.left = '100%';
        helpText.style.right = 'auto';
        helpText.style.marginLeft = '-10px';
    }
});