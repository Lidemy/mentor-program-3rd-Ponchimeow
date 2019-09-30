<?php
require_once 'sql.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');
header('Access-Control-Content-Type: application/json,charset=utf-8');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Max-Age: 86400'); // 1 day

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            get($conn, $_GET['id']);
        } else {
            getALL($conn);
        }
        break;
    case 'POST':
        create($conn, $_POST['content']);
        break;
    case 'DELETE':
        if (isset($_GET['id'])) {
            del($conn, $_GET['id']);
        }
        break;
    case 'PATCH':
        $res = array();
        $data = file_get_contents('php://input');
        parse_str($data, $res);
        extract($res);
        var_dump($res);
        if ($case === 'edit') {
            update($conn, $id, $content);
        }
        if ($case === 'status') {
            switchStatus($conn, $id);
        }
        break;
    case 'OPTIONS':
        header("HTTP/1.1 200 OK");
        break;
    default:
        header('HTTP/1.0 404 Not Found');
        break;
}
