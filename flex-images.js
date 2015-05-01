/*
    JavaScript flexImages v1.0.0
    Copyright (c) 2014 Simon Steinberger / Pixabay
    GitHub: https://github.com/Pixabay/jQuery-flexImages
    License: http://www.opensource.org/licenses/mit-license.php

    Vanilla JS version of jQuery-flexImages
    Works with Chrome, Firefox, and Internet Explorer 8+.

    Example init:
    new flexImages({selector: '#demo1', rowHeight: 140});
    "selector" can be a CSS selector string or a DOM node.
    To reload a modified set of images or to change grid options, flexImages can be called multiple times on the same DOM element.
*/

(function(){
    function elWidth(el, outerw, innerw) {
        var width = el.offsetWidth, style = window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle;
        if (outerw) width += (parseInt(style.marginLeft) || 0) + (parseInt(style.marginRight) || 0);
        else if (innerw) width -= (parseInt(style.borderLeftWidth) || 0) + (parseInt(style.borderRightWidth) || 0);
        return width
    }

    this.flexImages = function(){
        var o = { selector: 0, container: '.item', object: 'img', rowHeight: 180, maxRows: 0, truncate: 0 };
        for (var k in arguments[0]) { if (Object.prototype.hasOwnProperty.call(arguments[0], k)) o[k]=arguments[0][k]; }
        var grids = typeof o.selector == 'object' ? [o.selector] : document.querySelectorAll(o.selector);

        for (var i=0;i<grids.length;i++) {
            var grid = grids[i], containers = grid.querySelectorAll(o.container), items = [], t = new Date().getTime();
            if (!containers.length) continue;
            o.margin = elWidth(containers[0], true) - elWidth(containers[0], false, true);
            for (j=0;j<containers.length;j++) {
                var c = containers[j],
                    w = parseInt(c.getAttribute('data-w')),
                    h = parseInt(c.getAttribute('data-h')),
                    norm_w = w*(o.rowHeight/h), // normalized width
                    obj = c.querySelector(o.object);
                items.push([c, w, h, norm_w, obj, obj.getAttribute('data-src')]);
            }
            makeGrid(grid, items, o);
            tempf = function() { makeGrid(grid, items, o); };
            if (document.addEventListener) {
                window['flexImages_listener'+t] = tempf;
                window.removeEventListener('resize', window['flexImages_listener'+grid.getAttribute('data-flex-t')]);
                window.addEventListener('resize', window['flexImages_listener'+t]);
            } else
                grid.onresize = tempf;
            grid.setAttribute('data-flex-t', t)
        }
    }

    function makeGrid(grid, items, o, noresize){
        var x, new_w, ratio = 1, rows = 1, max_w = elWidth(grid, false, true), row = [], row_width = 0, row_h = o.rowHeight;

        // define inside makeGrid to access variables in scope
        function _helper(lastRow){
            if (o.maxRows && rows > o.maxRows || o.truncate && lastRow && rows > 1) row[x][0].style.display = 'none';
            else {
                if (row[x][5]) { row[x][4].setAttribute('src', row[x][5]); row[x][5] = ''; }
                row[x][0].style.width = new_w+'px';
                row[x][0].style.height = row_h+'px';
                row[x][0].style.display = 'block';
            }
        }

        for (var i=0; i<items.length; i++) {
            row.push(items[i]);
            row_width += items[i][3] + o.margin;
            if (row_width >= max_w) {
                ratio = max_w / row_width, row_h = Math.ceil(o.rowHeight*ratio), exact_w = 0, new_w;
                for (x=0; x<row.length; x++) {
                    new_w = Math.ceil(row[x][3]*ratio);
                    exact_w += new_w + o.margin;
                    if (exact_w > max_w) new_w -= exact_w - max_w + 1;
                    _helper();
                }
                // reset for next row
                row = [], row_width = 0;
                rows++;
            }
        }
        // layout last row - match height of last row to previous row
        for (x=0; x<row.length; x++) {
            new_w = Math.floor(row[x][3]*ratio), h = Math.floor(o.rowHeight*ratio);
            _helper(true);
        }

        // scroll bars added or removed during rendering new layout?
        if (!noresize && max_w != elWidth(grid, false, true)) makeGrid(grid, items, o, true);
    }
}());
