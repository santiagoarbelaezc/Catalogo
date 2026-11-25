<?php
/**
 * Laravel Front Controller para Hostinger
 * Ubicación en servidor: public_html/laravel-index.php
 *
 * Estructura real en servidor Hostinger:
 *   /home/u870397049/domains/catalogoplaxtilineas.com/
 *       backend/        ← Laravel app (privado, fuera de web root)
 *       public_html/    ← dominio apunta aquí (web root)
 *           laravel-index.php  ← este archivo
 *           index.html         ← Angular SPA
 *           .htaccess
 *
 * dirname(__DIR__) desde public_html/ = /home/u870397049/domains/catalogoplaxtilineas.com/
 * dirname(__DIR__) . '/backend'       = /home/u870397049/domains/catalogoplaxtilineas.com/backend ✓
 */

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Ruta absoluta al directorio backend/ (hermano de public_html/)
$laravelBase = dirname(__DIR__) . '/backend';

// Verificación de seguridad: el directorio debe existir
if (!is_dir($laravelBase)) {
    header('Content-Type: application/json; charset=UTF-8');
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error de configuración: directorio backend no encontrado en ' . $laravelBase,
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

// Modo mantenimiento de Laravel
if (file_exists($maintenance = $laravelBase . '/storage/framework/maintenance.php')) {
    require $maintenance;
}

// Autoloader de Composer
require $laravelBase . '/vendor/autoload.php';

// Bootstrap de Laravel y manejo de la petición
/** @var Application $app */
$app = require_once $laravelBase . '/bootstrap/app.php';

$app->handleRequest(Request::capture());
