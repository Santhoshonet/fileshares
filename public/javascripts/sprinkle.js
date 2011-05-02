$(document).ready(function () {
    $('#download').hide();
    // Hide flash info
    function hideflash()
    {
        $('.FlashInfo').fadeOut(500);
    };
    setTimeout(hideflash,1000);
    var clip = null;
    function init() {
        clip = new ZeroClipboard.Client();
        clip.setHandCursor(true);
        clip.addEventListener('load', function (client) {
        });
        clip.addEventListener('mouseOver', function (client) {
            var ClipboardData = "";
            $('.uploadedfilelist ul li a').each(function () {
                ClipboardData += $(this).attr('href');
            });
            clip.setText(ClipboardData);
        });
        clip.addEventListener('complete', function (client, text) {
            ShowMessage("Copied to clipboard");
        });
        if ($('#CopyLinkstoClip').size() > 0) {
            clip.glue('CopyLinkstoClip', 'copytoclipboard');
        }
    };
    var IsFilesAlreadyLoaded = false;
    $('#downloadfiles').click(function () {
        if (!IsFilesAlreadyLoaded) {
            loadfiles('forward');
            IsFilesAlreadyLoaded = true;
            sendTabID("downloadfiles");
        }
    });
    function loadfiles(direction) {
        var index = $('#download').attr('index');
        $('#download').html('<img src="/images/loading.gif" alt="" /> loading files.....');
        $('#download').load("/FilesManager/Download?StartIndex=" + index + "&dir=" + direction + "&rnd=" + Math.random(), function () {
            LoginScripts();
            FileNavigationScripts();
        });
    };
    init();
    $('#Uploader').uploadify({
        'multi': true,
        'auto': true,
        'script': 'receivefile',
        'uploader': '/uploadify.swf',
        'folder': '',
        'cancelImg': '../../images/cancel.png',
        'scriptData': { 'selected_folder': $.trim($('.foldername').html()) ,'authenticity_token': $.trim($('.token').html())},
        onComplete: function (event, queueID, fileObj, response, data) {
            IsFilesAlreadyLoaded = false;
            if ($('#hiddenfilelistdiv').size() == 0)
                $('body').append("<div id='hiddenfilelistdiv' style='display:none;'></div>");
            $('#hiddenfilelistdiv').html('');
            $('#hiddenfilelistdiv').append(response);
            //$('.uploadedfilelist').show();
            $('.UploadedFilesPath ul li').each(function() {
                $('.uploadedfilelist ul').append("<li><a href='" + $(this).html() + "'>" + fileObj.name + "</a></li>");
            });
            if (data.fileCount == 0)
                //$('#downloadfiles').show();
            setTimeout(function () {
                if (clip == null)
                    init();
                else
                    clip.glue('CopyLinkstoClip', 'copytoclipboard');
            }, 2000);
        },
        onSelectOnce: function (event, data) {
            $('.uploadedfilelist').hide();
            $('.uploadedfilelist ul').html('');
            $('#downloadfiles').hide();
        },
        onError: function (event, queueID, fileObj, errorObj) {
            if (d.status == 404)
                alert('Could not find upload script. Use a path relative to: ' + '<?= getcwd() ?>');
            else if (d.type === "HTTP")
                alert('error ' + d.type + ": " + d.status);
            else if (d.type === "File Size")
                alert(c.name + ' ' + d.type + ' Limit: ' + Math.round(d.sizeLimit / 1024) + 'KB');
            else
                alert('error ' + d.type + ": " + d.text);
            $('#downloadfiles').show();
        },
        onCancel: function (event, queueID, fileObj, data) {
            //if (data.fileCount == 0)
              //  $('#downloadfiles').show();
        }
    });
    function LoginScripts() {
        $('#SignUpText').click(function () {
            $('#download').html('<img src="/images/loading.gif" alt="" /> loading.....');
            $('#download').load("/Authentication/Signup", function () {
                RegisterScripts();
            });
        });
        $('#LoginForm').submit(function () {
            var Error = "Input Email and password";
            var text = $('#Email').val();
            if (text == null || text == "") {
                $('#ErrorInfo').text(Error);
                return false;
            }
            text = $('#Password').val();
            if (text == null || text == "") {
                $('#ErrorInfo').text(Error);
                return false;
            }
            var b = $('#Email').val();
            var d = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!b.match(d)) {
                $('#ErrorInfo').text("Input Valid Email!");
                return false;
            }
            $.ajax({
                url: "/Authentication/Login?email=" + $('#Email').val() + "&password=" + $('#Password').val(),
                timeout: 10000,
                datatype: 'json',
                cache: false,
                data: '{}',
                type: "POST",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#BtnSubmit').val('Wait....');
                    $('#BtnSubmit')[0].disabled = true;
                },
                success: function (data) {
                    if (data == "True" || data == "") {
                        var index = $('#download').attr('index');
                        $('#download').html('<img src="/images/loading.gif" alt="" /> Registration completed successfully. loading file list.....');
                        $('#download').load("/FilesManager/Download?StartIndex=" + index + "&dir=forward", function () {
                            FileNavigationScripts();
                        });
                    }
                    else {
                        $('#ErrorInfo').text(data);
                        $('#BtnSubmit')[0].disabled = false;
                        $('#BtnSubmit').val('Sign In');
                    }
                },
                error: function () { }
            });
            return false;
        });
    };
    function RegisterScripts() {
        $('#CancelText').click(function () {
            $('#download').html('<img src="/images/loading.gif" alt="" /> loading.....');
            $('#download').load("/Authentication/Login", function () {
                LoginScripts();
            });
        });
        $('#RegisterForm').submit(function () {
            var Error = "Input field values.";
            var text = $('#Username').val();
            if (text == null || text == "") {
                $('#ErrorInfo').text(Error);
                return false;
            }
            text = $('#Email').val();
            if (text == null || text == "") {
                $('#ErrorInfo').text(Error);
                return false;
            }
            text = $('#Password').val();
            if (text == null || text == "") {
                $('#ErrorInfo').text(Error);
                return false;
            }
            text = $('#ConfirmPassword').val();
            if (text == null || text == "") {
                $('#ErrorInfo').text(Error);
                return false;
            }
            if ($('#Password').val() != $('#ConfirmPassword').val()) {
                $('#ErrorInfo').text("Password not matched.");
                return false;
            }
            var b = $('#Email').val();
            var d = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!b.match(d)) {
                $('#ErrorInfo').text("Input Valid Email!");
                return false;
            }
            $.ajax({
                url: "/Authentication/Register?email=" + $('#Email').val() + "&username=" + $('#Username').val() + "&password=" + $('#Password').val(),
                timeout: 10000,
                datatype: 'json',
                cache: false,
                data: '{}',
                type: "POST",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#BtnSubmit').val('Wait....');
                    $('#BtnSubmit')[0].disabled = true;
                },
                success: function (data) {
                    if (data == "True") {
                        var index = $('#download').attr('index');
                        $('#download').html('<img src="../../images/loading.gif" alt="" /> Registration completed successfully. loading file list.....');
                        $('#download').load("/FilesManager/Download?StartIndex=" + index + "&dir=forward", function () {
                            FileNavigationScripts();
                        });
                    }
                    else {
                        $('#ErrorInfo').text(data);
                        $('#BtnSubmit')[0].disabled = false;
                        $('#BtnSubmit').val('Register');
                    }
                },
                error: function () { }
            });
            return false;
        });
    };
    function FileNavigationScripts() {
        var StatusIndex = $('#download').find('#StatusIndex').val();
        $('#download').attr('index', StatusIndex);
        $('#downloadnext').click(function () {
            loadfiles("forward");
        });
        $('#downloadPrev').click(function () {
            loadfiles("backword");
        });
    };
    function KeepSessionAlive() {
        /*$.post("/KeepSessionAlive", null, function () {
            setTimeout(KeepSessionAlive, 10000);
        });*/
    };
    setTimeout(KeepSessionAlive, 10000);
    function ShowMessage(text) {
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