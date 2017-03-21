$(function() {

    skill = $(".appraise_star_box .star#skill").attr('appraise-data');
    attitude = $(".appraise_star_box .star#attitude").attr('appraise-data');
    timing = $(".appraise_star_box .star#timing").attr('appraise-data');

    $(".appraise_star_box .star>span.a").click(function() {
        $(this).parent().attr('appraise-data' , $(this).index());

        switch ($(this).index()) {
            case 1: $(this).parent().parent().parent().find('.appraise_desc').text('很不满意');
            	break;
            case 2: $(this).parent().parent().parent().find('.appraise_desc').text('不满意');
            	break;
            case 3: $(this).parent().parent().parent().find('.appraise_desc').text('一般');
            	break;
            case 4: $(this).parent().parent().parent().find('.appraise_desc').text('满意');
            	break;
            case 5: $(this).parent().parent().parent().find('.appraise_desc').text('很满意');
            	break;
            default: $(this).parent().parent().parent().find('.appraise_desc').text('满意');
        }

        skill = $(".appraise_star_box .star#skill").attr('appraise-data');
        attitude = $(".appraise_star_box .star#attitude").attr('appraise-data');
        timing = $(".appraise_star_box .star#timing").attr('appraise-data');

        console.log(skill+'---'+attitude+'---'+timing);
    });

    $(".appraise_star_box .star>span.a").hover(function() {
        $(this).parent().attr('appraise-data' , $(this).index());

        switch ($(this).index()) {
            case 1: $(this).parent().parent().parent().find('.appraise_desc').text('很不满意');
            	break;
            case 2: $(this).parent().parent().parent().find('.appraise_desc').text('不满意');
            	break;
            case 3: $(this).parent().parent().parent().find('.appraise_desc').text('一般');
            	break;
            case 4: $(this).parent().parent().parent().find('.appraise_desc').text('满意');
            	break;
            case 5: $(this).parent().parent().parent().find('.appraise_desc').text('很满意');
            	break;
            default: $(this).parent().parent().parent().find('.appraise_desc').text('满意');
        }

    });

    $(".appraise_star_box .star").mouseout(function() {
        $(".appraise_star_box .star#skill").attr('appraise-data' , skill);
        $(".appraise_star_box .star#attitude").attr('appraise-data' , attitude);
        $(".appraise_star_box .star#timing").attr('appraise-data' , timing);

        // console.log($(this).attr('appraise-data'));

        switch ($(this).attr('appraise-data')) {
            case '1': $(this).parent().parent().find('.appraise_desc').text('很不满意');
            	break;
            case '2': $(this).parent().parent().find('.appraise_desc').text('不满意');
            	break;
            case '3': $(this).parent().parent().find('.appraise_desc').text('一般');
            	break;
            case '4': $(this).parent().parent().find('.appraise_desc').text('满意');
            	break;
            case '5': $(this).parent().parent().find('.appraise_desc').text('很满意');
            	break;
            default: $(this).parent().parent().find('.appraise_desc').text('000000满意');
        }
    });

    // $(".appraise_star_box .star>span:nth-child(1)").click(function() {
    //     return false;
    // });
    // $(".appraise_star_box .star>span:nth-child(1)").hover(function() {
    //     return false;
    // });


});
