$(function() {
// Hide flash info
    function hideflash()
    {
        $('.FlashInfo').fadeOut(500);
    };
    setTimeout(hideflash,1000);
    $('.submitbutton').click(function() {
        $('form').submit();
    });
});