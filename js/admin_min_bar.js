
const menu_toggle = document.getElementById('wp-admin-bar-sarah-read-aloud-toggle-option');
const menu_select = document.getElementById('wp-admin-bar-wp-admin-bar-sarah-read-aloud-select-option-1');


function sarah_read_aloud_toggle_option() {
    var checkbox = document.querySelector('.sarah-read-aloud-admin-bar-menu input[type="checkbox"]');
    // var menu_select = document.querySelector('.sarah-read-aloud-admin-bar-menu input[id="wp-admin-bar-wp-admin-bar-sarah-read-aloud-select-option-1"]');
    console.log(menu_select);
    var checked = checkbox.checked ? 1 : 0;
    var data = {
        action: 'sarah_read_aloud_toggle_option',
        value: checked,
    };
    jQuery.post(sarah_read_aloud_ajax_object.ajax_url, data, function(response) {
        console.log(response);
        checkbox.checked = response == '1';
    });
    if ( checkbox.checked ) {
        menu_select.setAttribute('title', 'Disable Sarah\'s Read for Me');
        menu_select.querySelector('a').textContent = 'Disable Sarah\'s Read for Me';
    } else {
        menu_select.setAttribute('title', 'Enable Sarah\'s Read for Me');
        menu_select.querySelector('a').textContent = 'Enable Sarah\'s Read for Me';
    }
}

function sarah_read_aloud_select_option() {
    menu_toggle.checked = !menu_toggle.checked;
    sarah_read_aloud_toggle_option();
}

