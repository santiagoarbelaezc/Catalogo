<?php
/**
 * Puente Público Seguro (Front Controller Gateway)
 * Ubicación en servidor: public_html/api-bridge.php
 *
 * Este archivo NO contiene credenciales, lógica de negocio ni configuración.
 * Su única función es delegar la ejecución a la carpeta privada "backend php"
 * ubicada FUERA de public_html (inaccesible directamente desde internet).
 */

$baseDirs = array_values(array_unique(array_filter([
    dirname(__DIR__), // 1 nivel arriba de public_html (ej: /home/u870397049/domains/catalogoplaxtilineas.com)
    !empty($_SERVER['DOCUMENT_ROOT']) ? dirname(rtrim($_SERVER['DOCUMENT_ROOT'], '/\\')) : null, // 1 nivel arriba de DOCUMENT_ROOT (ej: /home/u870397049)
    dirname(__DIR__, 2), // 2 niveles arriba (soporta subcarpetas o symlinks de Hostinger)
    dirname(__DIR__, 3), // 3 niveles arriba (raíz de usuario en Hostinger cuando public_html está en domains/<dominio>/public_html)
])));

$folderNames = [
    'backend php',
    'backend_php',
    'backend-php',
    'api',
];

$backendEntry = null;

// Priorizar siempre la carpeta privada "backend php" sobre cualquier otra en todos los niveles superiores
foreach ($folderNames as $folder) {
    foreach ($baseDirs as $baseDir) {
        $candidate = $baseDir . DIRECTORY_SEPARATOR . $folder . DIRECTORY_SEPARATOR . 'index.php';
        if (@is_file($candidate)) {
            $backendEntry = $candidate;
            break 2;
        }
    }
}

if ($backendEntry === null) {
    header('Content-Type: application/json; charset=UTF-8');
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error de configuración: No se encontró el directorio privado "backend php" fuera de public_html.'
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

// Cambiar el directorio de trabajo al directorio privado antes de cargar el router
chdir(dirname($backendEntry));
require_once $backendEntry;
