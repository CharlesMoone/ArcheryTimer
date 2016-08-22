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
  opts = '<option value="MODE" style="margin-left:10px">MODE</option>';
  MODES.forEach(function(m) {
    opts += '<option value="' + m + '">' + m + ' secs</option>';
  });
  $('#select-mode').html(opts);

}

function new_selector(){
  var out = "";
  var show = false;
  d3.select("#select-mode")
    .style({
      'margin-left': '10px',
      'padding-left': '10px'
    })
    .on("mouseover", function(){
      if(!show){
        d3.select("div.options")
        .style({
          position: "absolute",
          width: "200px",
          bottom: "20px"
        })
        .style("opacity","0")
        .on("mouseout", function(){
          if (out == "mode"){
            
          }
        })
        .selectAll("li")
        .data(MODES)
        .enter()
        .append("li")
        .append("button")
        .style({
          width:"100px",
          height:"20px"
        })
        .attr("value", function(d){ return d})
        .text(function(d){ 
          show = true;
          return d;
        })
        .on("click", function(){
          if (this.value != 'MODE') {
            timer['1'] = new Timer(1, parseInt(this.value));
            timer['2'] = new Timer(2, parseInt(this.value));
          }
        });  

        d3.select("div.options")
          .attr("z-index", 33)
          .transition()
          .duration(800)
          .style("opacity",1)
          .transition()
          .style("bottom", "80px");

      }
      


        // .style("bottom")

    })
    .on("mouseout", function(){
      out = "mode"
      setTimeout(function(){
        d3.select("div.options").selectAll("li")
          .transition()
          .duration(550)
          .style("bottom", "0px")
          .transition()
          .style("opacity", "0")
          .transition()
          .remove(); 
          show = false;
      }, 14500)  
      
    })
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
