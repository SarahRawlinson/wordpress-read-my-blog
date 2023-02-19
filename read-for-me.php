<?php
/*
Plugin Name: Sarah's Read For Me
Version: 1.0.0
Author: Sarah Rawlinson
Description: a simple plugin to read you blog post content.
*/



function sarah_read_aloud_add_style() {

    if (!get_option('sarah_read_aloud_option_running'))
    {
        return;
    }
    // Get the URL of the plugin directory
    $plugin_url = plugin_dir_url( __FILE__ );

    // Enqueue editor styles
    wp_enqueue_style( 'read-for-me-style', $plugin_url . 'css/read-for-me-style.css' );
}
add_action( 'wp_enqueue_scripts', 'sarah_read_aloud_add_style' );

function sarah_read_aloud_add_js_scripts() {
    if (!get_option('sarah_read_aloud_option_running'))
    {
        return;
    }
    // Get the URL of the plugin directory
    $plugin_url = plugin_dir_url( __FILE__ );

    // Enqueue script file
    wp_enqueue_script( 'read-aloud', $plugin_url . 'js/read-aloud.js', array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'sarah_read_aloud_add_js_scripts' );

function sarah_read_aloud_add_id_to_content( $the_content ): array|string
{
    if (!get_option('sarah_read_aloud_option_running'))
    {
        return $the_content;
    }
    $buttons = '<div class="row">
        <button class="read-aloud-button-play col-2" id="read-aloud-button-play">
          <span class="icon"></span>
          <span class="text">Play</span>  
        </button>
        
        <button class="read-aloud-button-pause col-2" id="read-aloud-button-pause">
          <span class="icon"></span>
          <span class="text">Pause</span>  
        </button>
        
        <button class="read-aloud-button-resume col-2" id="read-aloud-button-resume">
          <span class="icon"></span>
          <span class="text">Resume</span>  
        </button>
        
        <button class="read-aloud-button-stop col-2" id="read-aloud-button-stop">
          <span class="icon"></span>
          <span class="text">Stop</span>  
        </button>
        
//        <script>
//          const readAloudBtn = document.querySelector("#read-aloud-button-play");
//        
//          readAloudBtn.addEventListener("click", () => {
//            const selection = window.getSelection().toString().trim();
//        
//            if (selection.length > 0) {
//              // Pass the selected text to the text-to-speech API
//              // Here\'s an example using the SpeechSynthesis API
//              const utterance = new SpeechSynthesisUtterance(selection);
//              speechSynthesis.speak(utterance);
//            }
//        });
//        </script>
    </div>';
    // Add an ID attribute to the content element
    return '<div class="blog-content" id="blog-content">'.$the_content.'</div>'.$buttons;
}
add_filter( 'the_content', 'sarah_read_aloud_add_id_to_content' );

function sarah_read_aloud_theme_enqueue_bootstrap() {
    if (!get_option('sarah_read_aloud_option_running'))
    {
        return;
    }
    wp_enqueue_style( 'bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' );
    wp_enqueue_script( 'bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js', array('jquery'), '', true );
}
add_action( 'wp_enqueue_scripts', 'sarah_read_aloud_theme_enqueue_bootstrap' );




add_action('admin_menu', 'sarah_read_aloud_settings_page');

function sarah_read_aloud_settings_page() {
    add_menu_page(
        'Sarah\'s Read for Me Settings',
        'Sarah\'s Read for Me Settings',
        'manage_options',
        'sarah-read-aloud-settings',
        'sarah_read_aloud_settings_page_callback',
    );
}

function sarah_read_aloud_settings_page_callback() {
    ?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
        <form action="options.php" method="post">
            <?php
            settings_fields('sarah-read-aloud-settings');
            do_settings_sections('sarah-read-aloud-settings');
            submit_button('Save Settings');
            ?>
        </form>
    </div>
    <?php
}





add_action('admin_init', 'sarah_read_aloud_settings_init');

function sarah_read_aloud_settings_init() {
    register_setting('sarah-read-aloud-settings', 'sarah_read_aloud_option_running', array(
        'type' => 'integer', // set the option type to integer
        'sanitize_callback' => 'absint', // sanitize the input as an integer
        'default' => 0, // set the default value to 0
    ));

    add_settings_section(
        'sarah-read-aloud-section',
        'Sarah\'s Read for Me Settings',
        'sarah_read_aloud_section_callback',
        'sarah-read-aloud-settings'
    );

    add_settings_field(
        'my-plugin-field',
        'Sarah\'s Read for Me Options',
        'sarah_read_aloud_field_callback',
        'sarah-read-aloud-settings',
        'sarah-read-aloud-section'
    );
}

function sarah_read_aloud_section_callback() {
    echo 'Modify the settings for my plugin.';
}

function sarah_read_aloud_field_callback() {
    $option = get_option('sarah_read_aloud_option_running');
    ?>
    <label for="sarah_read_aloud_option_running_checkbox"></label>
    <input type="checkbox" name="sarah_read_aloud_option_running_checkbox" id="sarah_read_aloud_option_running_checkbox" value="<?php echo esc_attr( $option ); ?>" <?=$option?'checked':'' ?>>
    <input type="hidden" name="sarah_read_aloud_option_running" id="sarah_read_aloud_option_running" value="<?php echo esc_attr( $option ); ?>">
    <?php
}

function sarah_read_aloud_field_update_callback() {
    if ( isset( $_POST['sarah_read_aloud_option_running'] ) ) {
        update_option( 'sarah_read_aloud_option_running', $_POST['sarah_read_aloud_option_running'] );
    } else {
        update_option( 'sarah_read_aloud_option_running', 0 );
    }
}

add_action( 'admin_enqueue_scripts', 'sarah_read_aloud_admin_enqueue_scripts' );

//// Enqueue script to read and update the hidden field value
//function sarah_read_aloud_admin_enqueue_scripts() {
//    wp_enqueue_script( 'sarah-read-aloud-admin', plugin_dir_url( __FILE__ ) . 'js/admin_min_bar.js', array( 'jquery' ), '1.0.0', true );
//}
//
//function sarah_read_aloud_admin_bar_menu() {
//    global $wp_admin_bar;
//    $option = get_option('sarah_read_aloud_option_running');
//    $checked = $option ? 'checked="checked"' : '';
//    $wp_admin_bar->add_menu( array(
//        'id' => 'sarah_read_aloud_admin_bar_menu',
//        'parent' => 'top-secondary',
//        'title' => '<label><input type="checkbox" name="sarah_read_aloud_option_running" value="1" ' . $checked . '>' . __( 'Enable Sarah\'s Read for Me', 'sarah-read-for-me' ) . '</label>',
//        'meta' => array(
//            'class' => 'sarah-read-aloud-admin-bar-menu',
//            'onclick' => 'sarah_read_aloud_toggle_option();',
//        ),
//    ) );
//}
//add_action( 'wp_before_admin_bar_render', 'sarah_read_aloud_admin_bar_menu' );


function sarah_read_aloud_toggle_option() {
    if (isset($_POST['value'])) {
        $value = intval($_POST['value']);
        if ($value) {
            update_option('sarah_read_aloud_option_running', 1);
        } else {
            update_option('sarah_read_aloud_option_running', 0);
        }
        echo $value;
    }
    wp_die();
}
add_action( 'wp_ajax_sarah_read_aloud_toggle_option', 'sarah_read_aloud_toggle_option');

function sarah_read_aloud_admin_bar_menu() {
    global $wp_admin_bar;
    $option = get_option('sarah_read_aloud_option_running');
    $checked = $option ? 'checked="checked"' : '';

    $wp_admin_bar->add_menu( array(
        'id' => 'sarah_read_aloud_admin_bar_menu',
        'parent' => 'top-secondary',
        'title' => '<label><input id="wp-admin-bar-sarah-read-aloud-toggle-option" type="checkbox" name="sarah_read_aloud_option_running" value="1" ' . $checked . '>' . __( 'Enable Sarah\'s Read for Me', 'sarah-read-for-me' ) . '</label>',
        'meta' => array(
            'class' => 'sarah-read-aloud-admin-bar-menu',
            'onclick' => 'sarah_read_aloud_toggle_option();',
        ),
    ) );
    
    // Add a parent menu item to the admin bar
    $wp_admin_bar->add_menu( array(
        'id' => 'sarah-read-aloud-admin-bar-menu',
        'title' => 'Sarah\'s Read for Me',
        'href' => '#',
    ) );

    // Add a child menu item to toggle the option
    $wp_admin_bar->add_menu( array(
        'id' => 'wp-admin-bar-sarah-read-aloud-select-option-1',
        'parent' => 'sarah-read-aloud-admin-bar-menu',
        'title' => get_option('sarah_read_aloud_option_running') ? 'Disable Sarah\'s Read for Me' : 'Enable Sarah\'s Read for Me',
        'href' => '#',
        'meta' => array(
            'class' => 'sarah-read-aloud-toggle-option',
            'onclick' => 'sarah_read_aloud_select_option();',
        ),
    ) );
}
add_action( 'admin_bar_menu', 'sarah_read_aloud_admin_bar_menu', 999 );

function sarah_read_aloud_admin_bar_scripts() {
    wp_enqueue_script( 'sarah-read-aloud-admin-bar-scripts', plugin_dir_url( __FILE__ ) . 'js/admin_min_bar.js', array( 'jquery' ), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'sarah_read_aloud_admin_bar_scripts' );
add_action( 'admin_enqueue_scripts', 'sarah_read_aloud_admin_bar_scripts' );