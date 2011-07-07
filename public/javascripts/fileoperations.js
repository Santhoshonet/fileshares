$(function() {
    $('.FileMenu').live('click', function() {
        This = $(this);
        This.parents('li').eq(0).css({'background-color': '#eee'});
        if(confirm("Are you sure that you want to delete this file permanently?"))
        {
            fileid = $(this).parent().attr('fileid');
            $.ajax({
                url: "/myfiles/delete/" + fileid, //"/links/index/" + pageIndex,
                async: true,
                cache: false,
                type: 'GET',
                data: {},
                contentType: 'text/html; charset=utf-8',
                dataType: 'text/html',
                beforeSend: function() {
                    This.html("<img src='/images/loading.gif' />wait");
                },
                success: function (data) {
                    if(data == "success")
                        This.parents('li').eq(0).fadeOut(500);
                    else
                    {
                        This.html("<img src='/images/page_white_delete.png' /> Delete");
                        This.parents('li').eq(0).css({'background-color': '#fff'});
                    }
                },
                error: function (e) {
                    alert(e.message);
                    This.html("<img src='/images/page_white_delete.png' /> Delete");
                    This.parents('li').eq(0).css({'background-color': '#fff'});
                }
            });
        }
        else
            This.parents('li').eq(0).css({'background-color': '#fff'});
    });
});