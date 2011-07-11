$(function() {
    $('.btnupdatepermissions').click(function() {
        var This = $('.btnupdatepermissions');
        var updatePermission = {};
        updatePermission.user = $('.main h3 strong').html();
        updatePermission.selectedFolders = [];
        $('.RightBox .ListOfUsers option').each(function() {
            updatePermission.selectedFolders.push($.trim($(this).text()));
        });
        $.ajax({
            url: "/controlpanel/updateuserperm",
            async: true,
            cache: false,
            type: 'POST',
            data: JSON.stringify(updatePermission),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            beforeSend: function() {
                This.unbind('click');
                This.html("Please Wait........");
            },
            success: function (data) {
                window.location = "/controlpanel/admin";
            },
            error: function (e) {
                if(e.status != 200)
                    alert("Unable to update the permission due to some technical problem.");
                window.location = "/controlpanel/admin";
            }
        });
    });
});