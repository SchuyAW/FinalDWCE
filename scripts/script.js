document.addEventListener('DOMContentLoaded', function() {
    console.log("page loaded");

    // Handle accordion chevron rotation
    document.querySelectorAll('#impactAccordion .btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var chevron = this.querySelector('.arrow');
            if (chevron) {
                chevron.classList.toggle('rotate');
            }
        });
    });

    // Ensure only the background is greyed out when the contact modal is opened
    $('#contactModal').on('show.bs.modal', function () {
        setTimeout(function () {
            $('.modal-backdrop').css('z-index', '1040'); // Adjust z-index to ensure modal is above the backdrop
            $('#contactModal').css('z-index', '1050');  // Adjust z-index to ensure modal is above the backdrop
        }, 0);
    });
});
