document.addEventListener('DOMContentLoaded', function() {
    // Select all accordion buttons
    const accordionButtons = document.querySelectorAll('#impactAccordion .btn-link');

    accordionButtons.forEach(button => {
        // Add click event listener to each button
        button.addEventListener('click', function() {
            // Get the chevron icon within the clicked button
            const chevron = this.querySelector('.arrow');
            // Toggle the 'rotate' class on the chevron icon
            if (chevron) {
                chevron.classList.toggle('rotate', this.getAttribute('aria-expanded') === 'true');
            }
        });
    });

    // Initialize all collapsible elements as collapsed
    const collapses = document.querySelectorAll('#impactAccordion .collapse');
    collapses.forEach(collapse => {
        collapse.addEventListener('show.bs.collapse', function() {
            const button = document.querySelector(`[data-target="#${this.id}"]`);
            if (button) {
                const chevron = button.querySelector('.arrow');
                if (chevron) {
                    chevron.classList.add('rotate');
                }
            }
        });

        collapse.addEventListener('hide.bs.collapse', function() {
            const button = document.querySelector(`[data-target="#${this.id}"]`);
            if (button) {
                const chevron = button.querySelector('.arrow');
                if (chevron) {
                    chevron.classList.remove('rotate');
                }
            }
        });
    });
});
