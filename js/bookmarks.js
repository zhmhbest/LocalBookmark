/**
 * 加载书签信息
 * @param $ JQuery
 * @param callback(bookmarks)
 */
function loadBookmarkConfig($, callback) {
    var bookmark_jsons = [];
    var config_total = -1;
    var config_count = 0;

    var handel = setInterval(function () {
        if (config_count === config_total) {
            clearInterval(handel);
            // 合成
            var bookmarks = [];
            for (var i=0; i<bookmark_jsons.length; i++) {
                bookmarks = bookmarks.concat(bookmark_jsons[i]);
            }
            // 回调
            callback(bookmarks)
        }
    }, 100);

    function addBookmark(data_json_name, index) {
        $.ajax({
            url: "data/" + data_json_name + ".json",
            success: function (res) {
                // console.log(res);
                bookmark_jsons[index] = res;
                config_count++;
            },
            error: function (err) {
                console.error(data_json_name);
                bookmark_jsons[index] = [];
                config_count++;
            }
        });
        // $.getJSON("data/" + data_json_name + ".json", undefined, function (res) {
        //     bookmark_jsons[index] = res;
        //     config_count++;
        // });
    }

    $.getJSON("data/__init__.json", undefined, function (res) {
        config_total = res.length;
        for (var i=0; i<config_total; i++) {
            addBookmark(res[i], i);
        }
    });
}

/**
 * 自动分配标签颜色
 */
var TagColorHolder = (function () {
    var color_map = {};

    var nextColor = (function () {
        var colors = [
            'layui-bg-orange',
            'layui-bg-green',
            'layui-bg-cyan',
            'layui-bg-blue',
            'layui-bg-black',
            'layui-bg-gray',
            'layui-bg-red'
        ];
        var index = 0;
        var bound = colors.length - 1;
        return function () {
            if(index > bound) index = 0;
            return colors[index++];
        }
    })();

    return {
        add: function (tag_name) {
            if(color_map[tag_name] === undefined) {
                // 不存在，添加
                color_map[tag_name] = nextColor();
            }
        },
        get: function (tag_name) {
            return color_map[tag_name];
        }
    }
})();


/**
 * 根据要求过滤书签
 */
function bookmarkFilter(argv, bookmarks) {
    var arg_tags = (undefined===argv['tag'] || 0===argv['tag'].length)?
        undefined: argv['tag'].split(',');
    var arg_hiding = argv['hidden'] || false;
    // console.log(arg_hiding);
    /**
     * 当前书签是否满足要求
     * @param item
     * @param must_tags
     */
    function check_tags(item, must_tags) {
        if (undefined === must_tags) return true;
        // 交集
        var intersection = item['tag'].filter(function(v){
            return must_tags.indexOf(v) > -1
        });
        return intersection.length === must_tags.length;
    }
    function check_hide(item) {
        if (undefined===item['hidden']) return true;
        if (arg_hiding) return true; //全部显示
        return !item['hidden'];
    }

    var result = [];
    for(var i=0; i<bookmarks.length; i++) {
        var bookmark = bookmarks[i];
        if (check_hide(bookmark) && check_tags(bookmark, arg_tags)) {
            result.push(bookmark);
        }
    }
    return result;
}


/**
 * 点击标签
 */
function onTagClick() {
    // alert(this.innerHTML);
    var current_hash = paramsParseHash();
    var current_hash_tag = current_hash['tag'];
    var current_tag = this.innerHTML;

    if (undefined===current_hash_tag || 0===current_hash_tag.length) {
        current_hash['tag'] = current_tag;
    } else {
        var tags = current_hash_tag.split(',');
        if (-1 === tags.indexOf(current_tag)) {
            tags.push(current_tag);
        }
        // console.log(tags, current_tag);
        current_hash['tag'] = tags.join(',')
    }
    window.location.hash = params2String(current_hash);
}


/**
 * 数据可视化
 */
function bookmark2Table(mount_table, bookmarks) {
    // tbody
    var tbody = mount_table.getElementsByTagName('tbody')[0];
    if (undefined === tbody) {
        tbody = document.createElement('tbody');
        mount_table.appendChild(tbody)
    } else {
        tbody.innerHTML = ""
    }

    var item, tr, td, tag;
    function new_td(tr, class_name, inner) {
        var td = document.createElement('td');
        class_name = class_name || "";
        td.className = class_name;
        if (typeof inner === 'string') {
            td.innerHTML = inner;
        } else if (typeof inner === 'object') {
            td.appendChild(inner);
        }
        tr.appendChild(td);
        return td;
    }
    function new_span(td, class_name, html_text) {
        var span = document.createElement('span');
        span.className = class_name;
        span.innerHTML = html_text;
        span.onclick = onTagClick;
        td.appendChild(span);
        return span;
    }
    for (var i = 0; i < bookmarks.length; i++) {
        item = bookmarks[i];
        tr = document.createElement('tr');
        //--------------------------------------------
        // title
        var a = document.createElement('a');
        a.innerHTML =
            "<img class='bm-icon' alt='' src='https://ico.kucat.cn/get.php?url=" +
            item['url'] + "'/>" +
            item['title'];
        a.href = item['url'];
        new_td(tr, "bm-title", a);

        // desc
        item['desc'] = item['desc'] || "";
        new_td(tr, "bm-desc", item['desc']);

        // tag
        td = new_td(tr, "bm-tag");
        for (var j=0; j<item['tag'].length; j++) {
            tag = item['tag'][j];
            TagColorHolder.add(tag);
            new_span(td, "bm-tag-badge layui-badge " + TagColorHolder.get(tag), tag);
            // <span class="layui-badge layui-bg-orange">橙</span>
        }
        //--------------------------------------------
        tbody.appendChild(tr)
    }
}