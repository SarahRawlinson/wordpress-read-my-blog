jQuery(document).ready(function($) {
    console.log("sarah's read for me admin js loaded");
    let checkbox = $('#sarah_read_aloud_option_running_checkbox');
    let hidden = $('#sarah_read_aloud_option_running');

    // Update the hidden field value when the checkbox is clicked
    checkbox.on( 'change', function() {
        if ( checkbox.prop( 'checked' ) ) {
            hidden.val(1);
            console.log("sarah's read for me admin js: hidden set to 1");
        } else {
            hidden.val(0);
            console.log("sarah's read for me admin js: hidden set to 0");
        }
    });
});