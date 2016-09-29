/**
 * Created by apple on 16/9/22.
 */
$(document).ready(function () {
    var ss = $("#second_score");
    var st = $("#second_timer");
    var fp = $("#first_person");
    var sp = $("#second_person");
    var sp_child_all = $("#second_person *");
    var single = $("#single");
    var double = $("#double");
    var timeTypeLi = $("#time_type li");

    single.click(function () {
        ss.addClass('hidden');
        st.addClass('hidden');
        sp.addClass('disabled');
        sp_child_all.attr('disabled', 'disabled');
    });

    double.click(function () {
        ss.removeClass('hidden');
        st.removeClass('hidden');
        sp.removeClass('disabled');
        sp_child_all.removeAttr('disabled');
    });

    var timer_first, timer_second;

    timeTypeLi.click(function () {
        var mode = this.innerHTML;
        timer_first = new Timer('#timer_first', '#status_first', parseInt(mode));
        if (!$("#second_timer").hasClass("hidden")) {
            timer_second = new Timer('#timer_second', '#status_second', parseInt(mode))
        }
    });

    fp.click(function (e) {
        if ($("#timer_first").html() == '--') {
            alert('请选择mode!');
            return ;
        }
        if (e.target.innerHTML == 'START') {
            timer_first.start();
        } else if (e.target.innerHTML == 'SUSPEND') {
            timer_first.suspend();
        } else if (e.target.innerHTML == 'RESET') {
            timer_first.reset();
        }
    });

    sp.click(function (e) {
        if ($("#timer_second").html() == '--') {
            alert('请选择mode!');
            return ;
        }
        if (e.target.innerHTML == 'START') {
            timer_second.start();
        } else if (e.target.innerHTML == 'SUSPEND') {
            timer_second.suspend();
        } else if (e.target.innerHTML == 'RESET') {
            timer_second.reset();
        }
    });
});