
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
function onTagClick(e) {
    /**
     * 改变hash值
     * @param current_tag: 当前点击标签的值
     * @param mode: 0:单标签 | 1:加选 |2:减选
     */
    function change_hash(current_tag, mode) {
        var current_hash = paramsParseHash();

        if (0===mode) {
            // 单标签
            current_hash['tag'] = current_tag;
        } else {
            var tags = (undefined===current_hash['tag'] || 0===current_hash['tag'].length) ?
                [] : current_hash['tag'].split(',');
            if (1===mode) {
                // 加选
                if (-1 === tags.indexOf(current_tag)) {tags.push(current_tag);}
            } else if (2===mode) {
                // 减选
                var index = tags.indexOf(current_tag);
                if (-1 !== index) {tags.splice(index, 1);}
            }
            current_hash['tag'] = tags.join(',')
        }
        window.location.hash = params2String(current_hash);
    }
    var current_tag = this.innerHTML;
    // console.log(e);
    if (e.ctrlKey) {
        // 按住Ctrl 标签加选模式
        change_hash(current_tag, 1)
    } else if (e.altKey) {
        // 按住Alt 标签减选模式
        change_hash(current_tag, 2)
    } else {
        change_hash(current_tag, 0)
    }
}


/**
 * 数据可视化
 */
function bookmark2Table(mount_table, bookmarks) {
    var API_GET_FAVICON = "https://ico.kucat.cn/get.php";
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
            "<img class='bm-icon' alt='' src='" + API_GET_FAVICON + "?url=" + item['url'] + "'/>" +
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