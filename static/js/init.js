// consts
const MODES = [240, 120, 100, 80, 60, 40, 20, 10];

// init global args
var mode = null;
var timer = { '1': null, '2': null }


function move(e) {
  body = $(document.body);
  e.css({
    'position': 'absolute',
    'top': e.position().top,
    'left': (body.width() - e.width()) / 2
  }, 500);
}

function moveBack(e) {
  body = $(document.body);
  e.css({
    'position': 'relative',
    'top': 0,
    'left': 0
  }, 500);
}

function setPlayers(n) {
  var pos1 = $('#timer-1').offset();
  switch (n) {
  case 1:
    $('#btn-group-2 > button').prop('disabled', true);
    $('#score').hide();
    $('#sep').hide();
    $('#timer-2').hide();
    move($('#timer-1'));
    break;
  case 2:
    moveBack($('#timer-1'));
    $('#btn-group-2 > button').prop('disabled', false);
    $('#score').show();
    $('#sep').show();
    $('#timer-2').show();
    break;
  default:
    alert("选手数只能为1或2！");
  }
}

function initScoreTable() {
  $('.score').each(function() {
    $(this).html('<select>'
                 + '<option></option>'
                 + '<option value="0">0</option>'
                 + '<option value="1">1</option>'
                 + '<option value="2">2</option>'
                 + '</select>');
  });
}

function initSelect() {
  opts = '<option value="MODE">MODE</option>';
  MODES.forEach(function(m) {
    opts += '<option value="' + m + '">' + m + ' secs</option>';
  });
  $('#select-mode').html(opts);
}

$(document).ready(function() {
  // add event listeners
  $('#players-1').click(function() { setPlayers(1); });
  $('#players-2').click(function() { setPlayers(2); });
  $('div#ctrl-pane > div > div > button').click(function () {
    var parsed = $(this).text().split(' ');
    return timer[parsed[0]][parsed[1].toLowerCase()]();
  });
  initScoreTable();
  initSelect();
  $('#select-mode').on('change', function(e) {
    if (this.value != 'MODE') {
      timer['1'] = new Timer(1, parseInt(this.value));
      timer['2'] = new Timer(2, parseInt(this.value));
    }
  });
  // init the env
  $('#players-1').click();
});
