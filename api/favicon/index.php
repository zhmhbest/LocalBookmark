<?php
    require_once("api.php");

    /*
    echo $fav_cache."<br>";
    echo $fav_icons."<br>";
    echo $fav_url."<br>";
    echo $fav_https."<br>";
    echo $fav_domain."<br>";
    die();
    */

    //【方法0】缓存的图标
    printCachePicture($fav_domain);

    //【方法1】直接尝试站点根目录下的favion.ico文件  (通用方法)
    $fav_pic_ico = $fav_cache.fav_DOF.$fav_domain.'.ico';
    $fav_pic_png = $fav_cache.fav_DOF.$fav_domain.'.png';
    $fav_pic_url = $fav_https.$fav_domain."/favicon.ico";
    printDownloadPicture($fav_pic_url, $fav_pic_ico);

    //【方法2】获取HTML代码匹配favion.ico
    $fav_pic_url = regetFaviconURL($fav_https, $fav_domain, $fav_url);
    $fav_pic_type = substr($fav_pic_url, -3);

    if("png" == $fav_pic_type) {
        header('Content-Type: image/png;');
        printDownloadPicture($fav_pic_url, $fav_pic_png);
    } else if("ico" == $fav_pic_type) {
        header('Content-Type: image/x-icon;');
        printDownloadPicture($fav_pic_url, $fav_pic_ico);
    }

    printPicture();
?>