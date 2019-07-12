<?php
setcookie("passCode","",time()-3600);
header("Location: ./index.php");
?>