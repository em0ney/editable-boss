$(init);


function init() {
    var firstFocus = new FocusCheck();
    wordSpy();
    initEditable(firstFocus);
}

function wordSpy() {
    $(".editable-boss-input").keyup(function (eventData) {
        copyPlainContent($(this).html(), ".editable-boss");
        var code = event.code || event.which;
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            var cursorPos = getCursorPos();
            repaintMarkUp();
            setCursorPos(cursorPos);
        }
}

function repaintMarkUp() {
    var list = $(".editable-boss").val().split(/\s+/);
    var i = 0;
    var offset = window.getSelection().focusOffset;
    var node = window.getSelection().focusNode;
    while (i < list.length) {
        var word = list[i];
        if (/^#/.test(word)) {
            word = "<span class='tag'>" + word + "</span>";
        } else if (/^@/.test(word)) {
            word = "<span class='alias'>" + word + "</span>";
        } else if (/[A-Za-z0-9_\-\.]+@\w+\.\w+/.test(word)) {
            word = "<span class='email'>" + word + "</span>";
        }
        list[i] = word;
        i++;
    }
    $(".editable-boss-input").html(list.join(' '));
}

function getCursorPos() {
    var focusNode = window.getSelection().focusNode;
    var focusNodeOffset = window.getSelection().extentOffset;
    var parentNode = window.getSelection().focusNode.parentNode;
    if (isHTMLSpan(parentNode)) {
        focusNode = parentNode;
        parentNode = parentNode.parentNode;  
    } 
    var i = 0;
    var offset = 0;
    var node = parentNode.childNodes[i];
    while (i < parentNode.childNodes.length && node != focusNode) {
        if (Object.prototype.toString.call(node) == "[object Text]") {
            offset += node.length;
        } else {
            offset += node.innerHTML.length;
        }
        i++;
        node = parentNode.childNodes[i];
    }
    offset += focusNodeOffset;
    return offset;
}

function isHTMLSpan(node) {
    return Object.prototype.toString.call(node) == "[object HTMLSpanElement]";
}

function setCursorPos(pos) {
    var parentNode = $(".editable-boss-input")[0];
    var i = 0;
    var currPos = 0;
    var lastPos = 0;
    while (i < parentNode.childNodes.length && currPos < pos) {
        var node = parentNode.childNodes[i];
        if (Object.prototype.toString.call(node) == "[object Text]") {
            lastPos = currPos;
            currPos += node.length;
        } else {
            lastPos = currPos;
            currPos += node.innerHTML.length;
        }
        i++;
    }
    if (currPos >= pos) {
        currPos = (pos - lastPos);
    } else {
        currPos = (currPos - lastPos);
    }
    if (isHTMLSpan(node)) {
        if (i < parentNode.childNodes.length && !isHTMLSpan(parentNode.childNodes[i])) {
            node = parentNode.childNodes[i];
        } else {
            node = document.createTextNode("");
            parentNode.appendChild(node);
        }
        currPos = 0;
    }
    var range = document.createRange();
    range.setStart(node, currPos);
    range.setEnd(node, currPos);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

function getLastWord(field) {
        var list = field.split(/\s+/);
        do {
            var word = list.pop();
        } while (word == "");
        return word;
}

function replaceLastWordWith(selector, replacement) {
    var value = $(selector).html();
    var list = value.split(/\s+/);
    do {
        var word = list.pop();
    } while (word == "");
    list.push(replacement);
    $(selector).html(list.join(" "));
}

function initEditable(focusCheck) {
    $(".editable").each(function() {
        this.contentEditable = true;
    });
    $(".editable").focus(function() {
        if (focusCheck.getVal() == false) {
            $(this).children().remove();
        }
        focusCheck.setFocused();
    });

}

function copyPlainContent(content, selector) {
    $(selector).val(content.replace(/&nbsp;/g, ' ').replace(/<[\w\/]+[^>]+>/g,''))
}

function FocusCheck() {
    var firstFocus = false;
    this.getVal = function() {
        return firstFocus;
    }
    this.setFocused = function() {
        firstFocus = true;
    }
}

