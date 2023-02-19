jQuery(document).ready(function($) {
    console.log("sarah's read for me admin js loaded v1");
    let checkbox = $('#sarah_read_aloud_option_running_checkbox');
    let hidden = $('#sarah_read_aloud_option_running');

    // // Set initial state of the checkbox based on the hidden field value
    // if ( hidden.val() === 'yes' ) {
    //     checkbox.val( 1 );
    //     console.log("sarah's read for me admin js: checkbox set to true");
    // } else {
    //     checkbox.val( 0 );
    //     console.log("sarah's read for me admin js: checkbox set to false");
    //    
    // }

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