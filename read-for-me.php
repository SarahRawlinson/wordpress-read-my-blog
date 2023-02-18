<?php
/*
Plugin Name: Sarah's Read For Me
Version: 1.0.0
Author: Sarah Rawlinson
Description: a simple plugin to read you blog post content.
*/

function add_style() {
    // Get the URL of the plugin directory
    $plugin_url = plugin_dir_url( __FILE__ );

    // Enqueue editor styles
    wp_enqueue_style( 'read-for-me-style', $plugin_url . 'css/read-for-me-style.css' );
}
add_action( 'wp_enqueue_scripts', 'add_style' );

function my_scripts() {
    // Get the URL of the plugin directory
    $plugin_url = plugin_dir_url( __FILE__ );

    // Enqueue script file
    wp_enqueue_script( 'read-aloud', $plugin_url . 'js/read-aloud.js', array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'my_scripts' );

function add_id_to_content( $the_content ): array|string
{
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
    </div>';
    // Add an ID attribute to the content element
    return '<div class="blog-content" id="blog-content">'.$the_content.'</div>'.$buttons;
}
add_filter( 'the_content', 'add_id_to_content' );

function my_theme_enqueue_bootstrap() {
    wp_enqueue_style( 'bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' );
    wp_enqueue_script( 'bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js', array('jquery'), '', true );
}
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_bootstrap' );