$(function() {
    $('.btnupdatepermissions').click(function() {
        var This = $('.btnupdatepermissions');
        var updatePermission = {};
        updatePermission.folder = $('.main h3 strong').html();
        updatePermission.selectedUsers = [];
        $('.RightBox .ListOfUsers option').each(function() {
            updatePermission.selectedUsers.push($.trim($(this).text()));
        });
        $.ajax({
            url: "/controlpanel/updatefolderperm",
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