<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://andynguyen.io
 * @since             1.0.0
 * @package           Infinity_Gallery
 *
 * @wordpress-plugin
 * Plugin Name:       Infinity Gallery
 * Plugin URI:        https://compulse.com/infinity
 * Description:       Flexible gallery system that allows users to add as many images as they want and will allow custom sort and search filters.
 * Version:           1.0.0
 * Author:            Andy Nguyen
 * Author URI:        https://andynguyen.io
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       infinity-gallery
 * Domain Path:       /languages
 */
namespace Infinity;

use Infinity\Gallery;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Current plugin version.
 */
define( 'INFINITY_GALLERY_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-infinity-gallery-activator.php
 */
function activate_infinity_gallery() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-infinity-gallery-activator.php';
	Infinity_Gallery_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-infinity-gallery-deactivator.php
 */
function deactivate_infinity_gallery() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-infinity-gallery-deactivator.php';
	Infinity_Gallery_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_infinity_gallery' );
register_deactivation_hook( __FILE__, 'deactivate_infinity_gallery' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-infinity-gallery.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_infinity_gallery() {

	$plugin = new Gallery();
	$plugin->run();

}
run_infinity_gallery();
