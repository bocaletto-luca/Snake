<?php
header('Content-Type: application/json');

$jsonFile = 'record.json';

$name  = isset($_POST['name']) ? trim($_POST['name']) : '';
$score = isset($_POST['score']) ? intval($_POST['score']) : 0;
$level = isset($_POST['level']) ? intval($_POST['level']) : 0;

if($name === '' || $score < 0 || $level < 0){
    echo json_encode(["message" => "Dati non validi."]);
    exit;
}

if(!file_exists($jsonFile)){
    file_put_contents($jsonFile, json_encode([]));
}

$data = json_decode(file_get_contents($jsonFile), true);
if($data === null){
    $data = [];
}

// Salviamo solo il record finale (non duplicato)
$datetime = date('Y-m-d H:i:s');
$newRecord = array(
    "name" => $name,
    "score" => $score,
    "level" => $level,
    "datetime" => $datetime
);

// Per ogni partita viene aggiunto un unico record
$data[] = $newRecord;

if(file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT)) !== false){
    echo json_encode(["message" => "Record salvato con successo!", "record" => $newRecord]);
} else {
    echo json_encode(["message" => "Errore nel salvataggio del record."]);
}
?>
