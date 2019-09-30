<?php
require_once "conn.php";

function echoJson($str)
{
    echo json_encode($str, JSON_PRETTY_PRINT ^ JSON_UNESCAPED_UNICODE);
}

function getALL($conn)
{
    $sql = "SELECT * FROM todolist";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res->num_rows > 0) {
        $arr = [];
        while ($row = $res->fetch_assoc()) {
            $tmp = (object) [
                'id' => $row['id'],
                'content' => htmlspecialchars($row['content']),
                'status' => $row['status'],
                'create_at' => $row['create_at'],
            ];
            array_push($arr, $tmp);
        }
    }
    http_response_code(200);
    echoJson($arr);
}

function get($conn, $id)
{
    $sql = "SELECT * FROM todolist WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
    if ($stmt->execute()) {
        $res = $stmt->get_result();
        while ($row = $res->fetch_assoc()) {
            echoJson((object) [
                'id' => $row['id'],
                'content' => htmlspecialchars($row['content']),
                'status' => $row['status'],
                'create_at' => $row['create_at'],
            ]);
        }
    } else {
        echoJson(array("message" => "ID " . $id . " not found"));
    }
}

function del($conn, $id)
{
    $sql = "DELETE FROM todolist WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    if ($conn->affected_rows) {
        echoJson(array("message" => "delete " . $id . " sucess"));
    } else {
        echoJson(array("message" => "Failed to delete, ID " . $id . " not found"));
    }
}

function create($conn, $content)
{
    $sql = "INSERT INTO todolist(content) VALUE(?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $content);
    if ($content !== '') {
        $stmt->execute();
    }
}

function update($conn, $id, $content)
{
    $sql = "UPDATE todolist SET content= ? WHERE id = ? ";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $content, $id);
    if ($content !== '') {
        $stmt->execute();
    }
}

function switchStatus($conn, $id)
{
    $sql = "UPDATE todolist
            SET status = (
            CASE
            WHEN (
            ( SELECT tmp.status FROM ( SELECT * FROM todolist ) as tmp WHERE tmp.id = ? ) = 0 )
            THEN 1
            ELSE 0
            END )
            WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $id, $id);
    $stmt->execute();
}
