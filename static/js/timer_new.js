/**
 * Created by apple on 16/9/22.
 */
$(document).ready(function () {
    var ss = $("#second_score");
    var st = $("#second_timer");
    var sp = $("#second_person");
    var spb = $("#second_person *");
    var single = $("#single");
    var double = $("#double");

    single.click(function () {
        ss.addClass('hidden');
        st.addClass('hidden');
        sp.addClass('disabled');
        spb.attr('disabled', 'disabled');
    });

    double.click(function () {
        ss.removeClass('hidden');
        st.removeClass('hidden');
        sp.removeClass('disabled');
        spb.removeAttr('disabled');
    });
});