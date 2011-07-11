$(function() {
    function moveitemLR()
    {
        $('.LeftBox .ListOfUsers option:selected').each(function() {
            $('.RightBox .ListOfUsers').append("<option>" + $(this).text() + "</option>");
            $(this).remove();
        });
    }
    function moveitemRL()
    {
        $('.RightBox .ListOfUsers option:selected').each(function() {
            $('.LeftBox .ListOfUsers').append("<option>" + $(this).text() + "</option>");
            $(this).remove();
        });
    }
    function moveallitemLR()
    {
        $('.LeftBox .ListOfUsers option').each(function() {
            $('.RightBox .ListOfUsers').append("<option>" + $(this).text() + "</option>");
            $(this).remove();
        });
    }
    function moveallitemRL()
    {
        $('.RightBox .ListOfUsers option').each(function() {
            $('.LeftBox .ListOfUsers').append("<option>" + $(this).text() + "</option>");
            $(this).remove();
        });
    }
    $('.btnright').click(function() { moveitemLR(); });
    $('.btnrightall').click(function() { moveallitemLR(); });
    $('.btnleft').click(function() { moveitemRL(); });
    $('.btnleftall').click(function() { moveallitemRL(); });
});