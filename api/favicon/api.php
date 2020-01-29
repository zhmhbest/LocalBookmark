<?php
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

/**
 * 判断字符串是否为域名
 * @param $strurl 目标url地址
 * @return
 */
function isURL($strurl) {
    return preg_match('/^http[s]?:\/\/'.
        '(([0-9]{1,3}\.){3}[0-9]{1,3}'. // IP形式的URL- 199.194.52.184
        '|'. // 允许IP和DOMAIN（域名）
        '([0-9a-z_!~*\'()-]+\.)*'. // 三级域验证- www.
        '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.'. // 二级域验证
        '[a-z]{2,6})'.  // 顶级域验证.com or .museum
        '(:[0-9]{1,4})?'.  // 端口- :80
        '((\/\?)|'.  // 如果含有文件对文件部分进行校验
        '(\/[0-9a-zA-Z_!~\*\'\(\)\.;\?:@&=\+\$,%#-\/]*)?)$/',
        $strurl) == 1;
}

/**
 * 获取GET或POST过来的参数
 * @param $key 键值
 * @param $default 默认值
 * @return 获取到的内容（没有则为默认值）
 */
function getParam($key,$default='') {
    return
        trim(
            ($key && is_string($key)) ?
                (isset($_POST[$key]) ? $_POST[$key] : (isset($_GET[$key]) ? $_GET[$key] : $default)) :
                $default
        );
}

/**
 * curl获取数据
 * @param $bbb 目标url地址
 * @return ['exec'] 获取的内容
 * @return ['getinfo'] 返回的状态码
 */
function get_url_content($url, $cookie='', $cookiejar='', $data = '', $refere='') {
    $curl = curl_init();
        $options = array (
            CURLOPT_RETURNTRANSFER => true,     //以文件流的形式返回
            CURLOPT_FOLLOWLOCATION => true,     //服务器返回的"Location: "放在header中递归的返回给服务器
            CURLOPT_MAXREDIRS => 10,            //重定向的数量
            CURLOPT_AUTOREFERER => true,        //自动设置header中的Referer:信息
            CURLOPT_ENCODING => "",             //发送所有支持的编码类型
            CURLOPT_CONNECTTIMEOUT_MS => 2000,  //超时时间
            CURLOPT_TIMEOUT => 2,
            CURLOPT_HEADER => true,
            //URL
            CURLOPT_URL => $url,
            //User-Agent
            //CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
            //证书
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_SSL_VERIFYHOST => 2,
            //header
            CURLOPT_HTTPHEADER => array(
                'Connection: keep-alive',
                'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
                'HTTP_ACCEPT_LANGUAGE: zh-CN,zh-HK;q=0.9,zh;q=0.8,en-US;q=0.7,en;q=0.6,ja-JP;q=0.5,ja;q=0.4',
                'HTTP_ACCEPT_ENCODING: gzip, deflate, br'
            ),
        );
        curl_setopt_array($curl, $options);
        //请求数据
        if($data) {
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        }
        //请求Cookie
        if(!empty($cookie)) {
            curl_setopt($curl, CURLOPT_COOKIE, $cookie);
        } else if($cookiejar) {
            curl_setopt($curl, CURLOPT_COOKIEFILE, $cookiejar); //包含Cookie数据的文件名
        }
        //保存Cookie
        if($cookiejar) {
            curl_setopt($curl, CURLOPT_COOKIEJAR, $cookiejar);  //结束后保存Cookie信息的文件
        }
        //引用地址
        if($refere) {
            curl_setopt ($curl, CURLOPT_REFERER, $refere);
        }
        $response = curl_exec($curl);
        $info = curl_getinfo($curl); //MimeType
        $content['info'] = $info;
        if ($response === false) {
            $content['head'] = '';
            $content['file'] = '';
        } else {
            $content['head'] = substr($response, 0, $info['header_size']);
            $content['file'] = substr($response, $info['header_size']);
        }
    curl_close($curl);
    return $content;
}
/*
function get_url_content($url) {
   $ch = curl_init();
   $timeout = 1000;  //超时时间
   curl_setopt ($ch, CURLOPT_URL, $url);
   //curl_setopt($curl, CURLOPT_HEADER, false);
   //curl_setopt($curl, CURLOPT_NOBODY, false);
   curl_setopt ($ch, CURLOPT_RETURNTRANSFER, true);
   curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT_MS, $timeout);
   curl_setopt ($ch, CURLOPT_SSL_VERIFYPEER, FALSE); // https请求 不验证证书和hosts
   curl_setopt ($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
   curl_setopt ($ch, CURLOPT_ENCODING, 'gzip'); //取消gzip压缩(代表：网易邮箱)
   $content['file']= curl_exec($ch);
   $content['info'] = curl_getinfo($ch); //判断状态 有的情况下无法正确判断ico是否存在
   curl_close($ch);
   return $content;
}
*/


//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

/**
 * 输出最终的favion图标（需要先设置header）
 * @param $path 图标保存路径
 * @param $file 图标文件
 */
function printPicture($local = '', $contents = '') {
    if($contents == '') {
        //默认的图标
        header('Content-Type: image/x-icon;');
        $contents = file_get_contents('./icons/null.ico');
    }
    if($local != '') {
        //保存文件
        file_put_contents($local, $contents);
    }
    die($contents);
}

/**
 * 尝试检查缓存输出favion图标
 * @param $saved 图标被保存路径（不含扩展名）
 */
function printCachePicture($domain) {
    global $fav_cache;
    global $fav_icons;

    $filepic = $fav_cache.fav_DOF.$domain.".ico";
    if(file_exists($filepic)) {
        header('Content-Type: image/x-icon;');
        die(file_get_contents($filepic));
    }
    $filepic = $fav_cache.fav_DOF.$domain.".png";
    if(file_exists($filepic)) {
        header('Content-Type: image/png;');
        die(file_get_contents($filepic));
    }

    $filepic = $fav_icons.fav_DOF.$domain.".ico";
    if(file_exists($filepic)) {
        header('Content-Type: image/x-icon;');
        die(file_get_contents($filepic));
    }

    $filepic = $fav_icons.fav_DOF.$domain.".png";
    if(file_exists($filepic)) {
        header('Content-Type: image/png;');
        die(file_get_contents($filepic));
    }
}

/**
 * 获取favion图标
 * @param $url_pic 目标url
 * @param $saved   保存路径
 */
function printDownloadPicture($url_pic, $saved) {

    $curl = get_url_content($url_pic);
    $file = $curl['file'];          //获取到的文件
    $info = $curl['info'];       //状态
    $type = $info['content_type'];  //MimeType

    /*
    echo $url_pic.'<br>';
    echo $info['http_code'].'<br>';
    echo $info['content_type'].'<br>';
    */

    //有文件，并且返回状态为200
    if( $file && '200' == $info['http_code'] ) {
        if($type == 'image/x-icon') {
            header('Content-Type: image/x-icon;');
            printPicture($saved, $file);
        } else if($type == 'image/vnd.microsoft.icon') {
            //维基百科是这个类型
            header('Content-Type: image/x-icon;');
            printPicture($saved, $file);
        } else if($type == 'image/png') {
            header('Content-Type: image/png;');
            printPicture($saved, $file);
        } else if($type == 'application/x-png') {
            header('Content-Type: image/png;');
            printPicture($saved, $file);
        } else {
            //echo 'url_pic:'.$url_pic.'<br>';
            //echo 'type:'.$type.'<br>';
        }
    } else if('0' == $info['http_code']) {
        //科学网站 或反应延迟
    }
}

/**
 * 重新获取favion图标地址
 * @param $fav_https
 * @param $url_html
 */
function regetFaviconURL($fav_https, $fav_domain, $url_html) {
    $tmp_curl = get_url_content($url_html);
    $tmp_page = $tmp_curl['file'];

    /*if(strlen($tmp_page) < 32) {
        $opts = array (
            'http' => array (
                'method'=>"GET",
                'timeout'=>1, //单位秒
            )
        );
        $tmp_page = @file_get_contents($url_html, false, stream_context_create($opts));
    }*/

    if(!$tmp_page) {
        printPicture();
        return '';
    }

    //preg_match('|(?<=href=[\"\']).*\.ico(?=[\"\'\?])|',$tmp_page, $tmp_matcharr);
    preg_match('/(?<=href=[\"\']).*\.(ico|png)(?=[\"\'\?])/',$tmp_page, $tmp_matcharr);
    if(0==count($tmp_matcharr)) {
        return '';
    }
    $tmp_favurl = $tmp_matcharr[0];
    if(substr($tmp_favurl, 0, 2) == '//')   {
        $tmp_favurl = $fav_https.substr($tmp_favurl, 2);
    }
    else if (substr($tmp_favurl, 0, 1) == '/')   {
        $tmp_favurl = $fav_https.$fav_domain.$tmp_favurl;
    } elseif(substr($tmp_favurl, 0, 2) == './')  {
        $tmp_favurl = $fav_https.$fav_domain.substr($tmp_favurl, 1);
    } elseif(substr($tmp_favurl, 0, 3) == '../') {
        $tmp_favurl = $fav_https.$fav_domain.substr($tmp_favurl, 2);
    }
    return $tmp_favurl;
}

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

    (function() {
        //判断服务环境
        if(strtoupper(substr(PHP_OS,0,3))==='WIN') { define('fav_DOF', '\\'); } else { define('fav_DOF', '/'); }

        global $fav_cache;
        global $fav_icons;

        //创建缓存目录（可以删除）
        $fav_cache = './cache'; //$fav_cache = __DIR__ . fav_DOF . 'cache';
            if(!is_dir($fav_cache)) mkdir($fav_cache,0777,true) or printPicture();

        //创建备用图标目录（不可删除）
        $fav_icons = './icons'; //$fav_icons = __DIR__ . fav_DOF . 'icons';
            if(!is_dir($fav_icons)) mkdir($fav_icons,0777,true) or printPicture();

        global $fav_https;
        global $fav_url;
        global $fav_domain;
        $fav_https = '';
        $fav_url = getParam('url');
            if(!$fav_url) printPicture();
            if(substr($fav_url, 0, 4) != 'http') {
                $fav_url = 'http://' . $fav_url;
            }
            if(substr($fav_url, 0, 5) == 'https') {
                //如果是https头，传到后面取图标时加上。防止出现302重定向
                $fav_https = 'https://';
            }
            if(isURL($fav_url) != '1') printPicture();

        //分解域名
        $tmp_urlarr  = parse_url($fav_url);          //分解目标域名
        $fav_domain  = $tmp_urlarr['host'];          //没有头和尾的裸域名

    })();

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
?>