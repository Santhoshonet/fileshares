$(function () {
    $('#simpletab > ul').tabs({ fx: { height: 'toggle', opacity: 'toggle'} });
    $('#newfolderlink').click(function () {
        createFolder();
    });
    $('#Txtnewfolder').keypress(function (e) {
        if (e.which == 13)
            createFolder();
    });
    function createFolder() {
        var TextBox = $('#Txtnewfolder');
        var foldername = TextBox.val();
        foldername = $.trim(foldername);
        if (foldername != null && foldername != "") {
            $.ajax({
                url: "/CreateFolder/" + foldername,
                timeout: -1,
                datatype: 'json',
                cache: false,
                data: null,
                type: "GET",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    TextBox.val("Please Wait ............");
                    TextBox[0].disabled = true;
                },
                success: function (data) {
                    if (data.toString().indexOf('true') > 0) {
                        var url = data.toString().substr(data.toString().indexOf("folderurl#") + 10);
                        //url = url.toString().substr(0,url.toString().indexOf("#folderurl"));
                        //alert(url);
                        TextBox.parents('ul').eq(0).append('<li><img src="../../images/fileicons/folder.jpg" alt="" /><a href="' + url +  '">' + foldername + '</a><span><img src="../../images/page_white_edit.png" alt="" style="height: auto; width: auto;" /><a href="#" class="EditDirectory">Edit</a><img src="../../images/page_white_delete.png" alt="" style="height: auto; width: auto;margin-left:20px;" /><a href="#" style="margin-right:20px;" class="DeleteDirectory">Delete</a> 0 files</span></li>');
                        folderoperations();
                    }
                    else {
                        Showerror("unable to create the folder due to " + data);
                    }
                    $('.HiddenDiv').html('');
                    TextBox.val("");
                    TextBox[0].disabled = false;
                    TextBox.focus();
                },
                error: function (e) {
                    Showerror(e);
                    TextBox.val("");
                    TextBox[0].disabled = false;
                    TextBox.focus();
                 }
            });
        }
        else
            TextBox.focus();
    };
    folderoperations();
    function folderoperations() {
        $('.EditDirectory').click(function() {
                var el = $(this);
                var lielement = el.parents('li');
                var dname = lielement.find('a').html();
                dname = $.trim(dname);
                lielement.attr('url', lielement.find('a').attr('src'));
                lielement.attr('domain', dname);
                lielement.find('a').eq(0).remove();
                lielement.find('img').eq(0).after('<input type="text" class="Txtupdate" value="' + dname + '" />&nbsp;&nbsp;<a href="#" class="editdomain">edit</a>&nbsp;&nbsp;&nbsp;<a href="#" class="canceledit">cancel</a>');
                lielement.find('input').focus();
                editoperations();
        });

        $('.DeleteDirectory').click(function() {
                var lielement = $(this).parents('li');
                var dname = lielement.find('a').eq(0).html();
                dname = $.trim(dname);
                $.ajax({
                    url: "/DeleteFolder/" + dname,
                    timeout: -1,
                    datatype: 'json',
                    cache: false,
                    data: null,
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function () {
                        lielement.find('a').eq(0).after('<label class="deleteinfo">&nbsp;&nbsp;&nbsp;deleting .......</label>');
                    },
                    success: function (data) {
                        if (data.toString().indexOf('true') > 0) {
                            lielement.remove();
                        }
                        else {
                            Showerror("unable to delete the folder due to " + data);
                        }
                        lielement.find('.deleteinfo').remove();
                    },
                    error: function (e) {
                        Showerror(e);
                        lielement.find('.deleteinfo').remove();
                    }
                });
    });
    };
    function editoperations()
    {
        $('.canceledit').click(function () {
            var lielement = $(this).parents('li');
            var domain = lielement.find('input').val();
            domain = $.trim(domain);
            lielement.find('input').remove();
            lielement.find('.editdomain').remove();
            $(this).remove();
            lielement.find('img').eq(0).after('<a href=' + lielement.attr('url') + '>' + domain + '</a>');
        });
        $('.editdomain').click(function () {
            var lielement = $(this).parents('li');
            var txtbox = lielement.find('input');
            var domain = txtbox.val();
            domain = $.trim(domain);
            var This = $(this);
            if (domain != null && domain != "") {
                $.ajax({
                    url: "/ModifyFolder/" + domain + "/" + lielement.attr('domain'),
                    timeout: 10000,
                    datatype: 'json',
                    cache: false,
                    data: null,
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function () {
                        txtbox.val("Please Wait ............");
                        txtbox[0].disabled = true;
                        lielement.find('.canceledit')[0].disabled = true;
                    },
                    success: function (data) {
                         if (data.toString().indexOf('true') > 0) {
                            var url = data.toString().substr(data.toString().indexOf("folderurl#") + 10);
                            //url = url.toString().substr(0,url.toString().indexOf("#folderurl"));
                            lielement.find('img').eq(0).after('<a href=' + url + '>' + domain + '</a>');
                        }
                        else {
                            lielement.find('img').eq(0).after('<a href=' + lielement.attr('url') + '>' + lielement.attr('domain') + '</a>');
                            Showerror("unable to modify the folder due to " + data);
                        }
                        $('.HiddenDiv').html('');
                        lielement.find('input').remove();
                        lielement.find('.canceledit').remove();
                        This.remove();
                        txtbox.val("")
                        txtbox[0].disabled = false;
                        txtbox.focus();
                    },
                    error: function (e) {
                        lielement.find('img').eq(0).after('<a href=' + lielement.attr('url') + '>' + lielement.attr('domain') + '</a>');
                        Showerror(e);
                        lielement.find('input').remove();
                        lielement.find('.canceledit').remove();
                        This.remove();
                        txtbox.val("")
                        txtbox[0].disabled = false;
                        txtbox.focus();
                    }
                });
            }
            else
                txtbox.focus();
        });
    };

    // User section starts here
    $('#newuserlink').click(function () {
        createUser();
    });
    $('#Txtnewuser').keypress(function (e) {
        if (e.which == 13)
            createUser();
    });
    function createUser() {
        var TextBox = $('#Txtnewuser');
        var username = TextBox.val();
        username = $.trim(username);
        if (username != null && username != "") {
            $.ajax({
                url: "/CreateUser/" + username,
                timeout: -1,
                datatype: 'json',
                cache: false,
                data: null,
                type: "GET",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    TextBox.val("Please Wait ............");
                    TextBox[0].disabled = true;
                },
                success: function (data) {
                    if (data.toString().indexOf('true') > -1) {
                        var url = data.toString().substr(data.toString().indexOf("url#") + 4);
                        //url = url.toString().substr(0,url.toString().indexOf("#url"));
                        TextBox.parents('ul').eq(0).append('<li><img src="../../images/avatar.png" alt="" /><a href="' + url + '" >' + username + '</a> <span><input type="checkbox" class="chkadmin" /><label class="lbladmin">Admin</label><input type="checkbox" class="chkupload" /><label class="lblupload">Upload</label><input type="checkbox" class="chkdownload" /><label class="lbldownload">Download</label><input type="checkbox" class="chkdelete" /><label class="lbldelete">Delete</label><input type="checkbox" class="chkrename" /><label class="lblrename">Rename</label><img src="../../images/page_white_edit.png" alt="" style="height: auto; width: auto;" /><a href="#" class="UpdateUser">Update</a><img src="../../images/page_white_delete.png" alt="" style="height: auto; width: auto;margin-left:20px;" /><a href="#" style="margin-right:20px;" class="DeleteUser">Delete</a></span> </li>');
                        useroperations();
                    }
                    else {
                        Showerror("unable to create user due to " + data);
                    }
                    $('.HiddenDiv').html('');
                    TextBox.val("")
                    TextBox[0].disabled = false;
                    TextBox.focus();
                },
                error: function (e) {
                    Showerror(e);
                    TextBox.val("")
                    TextBox[0].disabled = false;
                    TextBox.focus();
                 }
            });
        }
        else
            TextBox.focus();
    };

    useroperations();
    function useroperations() {
        $('.UpdateUser').click(function() {
            var el = $(this);
            var lielement = el.parents('li');
            var username = lielement.find('a').eq(0).html();
            var isadmin = lielement.find('.chkadmin')[0].checked;
            var isupload = lielement.find('.chkupload')[0].checked;
            var isdownload = lielement.find('.chkdownload')[0].checked;
            var isdelete = lielement.find('.chkdelete')[0].checked;
            var isrename = lielement.find('.chkrename')[0].checked;
            $.ajax({
                    url: "/UpdateUser?username=" + username + "&isadmin=" + isadmin + "&isupload=" + isupload + "&isdownload=" + isdownload + "&isdelete=" + isdelete + "&isrename=" + isrename,
                    timeout: -1,
                    datatype: 'json',
                    cache: false,
                    data: null,
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function () {
                        lielement.find('a').eq(0).after('<label class="deleteinfo">&nbsp;&nbsp;&nbsp;updating...</label>');
                    },
                    success: function (data) {
                        if (data.toString().indexOf('true') > 0) {
                            lielement.find('.deleteinfo').html('&nbsp;&nbsp;&nbsp;updated.');
                        }
                        else {
                            Showerror("unable to update the user due to " + data);
                        }
                        lielement.find('.deleteinfo').delay(3000).remove();
                    },
                    error: function (e) {
                        Showerror(e);
                        lielement.find('.deleteinfo').remove();
                    }
                });
        });

        $('.DeleteUser').click(function() {
                var lielement = $(this).parents('li');
                var dname = lielement.find('a').eq(0).html();
                dname = $.trim(dname);
                $.ajax({
                    url: "/DeleteUser/" + dname,
                    timeout: -1,
                    datatype: 'json',
                    cache: false,
                    data: null,
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function () {
                        lielement.find('a').eq(0).after('<label class="deleteinfo">&nbsp;&nbsp;&nbsp;deleting .......</label>');
                    },
                    success: function (data) {
                        if (data.toString().indexOf('true') > 0) {
                            lielement.remove();
                        }
                        else {
                            Showerror("unable to delete the folder due to " + data);
                            lielement.find('.deleteinfo').remove();
                        }
                    },
                    error: function (e) {
                        Showerror(e);
                        lielement.find('.deleteinfo').remove();
                    }
                });
        });
    };

    function Showerror(text) {
        var PageScroll = __getPageScroll();
        var PageSize = __getPageSize();
        $('.statusmessage').css({ 'top': PageScroll[0] + 10, 'left': (PageSize[2] - 960) / 2 }).fadeIn(500);
        $('.statusmessage').find('span').html('').html(text);
        setTimeout(function () {
            $('.statusmessage').fadeOut(500);
        }, 2500);
    };
    function __getPageScroll() {
        var xScr, yScr;
        var d = document;
        if (self.pageYOffset) {
            yScr = self.pageYOffset;
            xScr = self.pageXOffset;
        } else if (d.documentElement && d.documentElement.scrollTop) {
            yScr = d.documentElement.scrollTop;
            xScr = d.documentElement.scrollLeft;
        } else if (d.body) {
            yScr = d.body.scrollTop;
            xScr = d.body.scrollLeft;
        }
        arrayPageScroll = new Array(xScr, yScr);
        return arrayPageScroll;
    };
    function __getPageSize() {
        var xScr, yScr;
        var w = window;
        var d = document;
        if (w.innerHeight && w.scrollMaxY) {
            xScr = w.innerWidth + w.scrollMaxX;
            yScr = w.innerHeight + w.scrollMaxY;
        } else if (d.body.scrollHeight > document.body.offsetHeight) {
            xScr = document.body.scrollWidth;
            yScr = document.body.scrollHeight;
        } else {
            xScr = d.body.offsetWidth;
            yScr = d.body.offsetHeight;
        }
        var wW, wH;
        if (self.innerHeight) {
            if (d.documentElement.clientWidth) {
                wW = d.documentElement.clientWidth;
            } else {
                wW = self.innerWidth;
            }
            wH = self.innerHeight;
        } else if (d.documentElement && d.documentElement.clientHeight) {
            wW = d.documentElement.clientWidth;
            wH = d.documentElement.clientHeight;
        } else if (d.body) {
            wW = d.body.clientWidth;
            wH = d.body.clientHeight;
        }
        if (yScr < wH) {
            pageHeight = wH;
        } else {
            pageHeight = yScr;
        }
        if (xScr < wW) {
            pageWidth = xScr;
        } else {
            pageWidth = wW;
        }
        arrayPageSize = new Array(pageWidth, pageHeight, wW, wH);
        return arrayPageSize;
    };
});