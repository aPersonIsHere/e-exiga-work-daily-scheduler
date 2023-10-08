$(function () {
  var today = dayjs();
  var currentDayEl = $('#currentDay');
  var memoListEl = $('.container-lg');
  var currentHour = today.format('H');
  var saveButtonEl = $('.saveBtn');
  var hourlyMemos = [];

  function buildMemos (tempHourlyMemos) {
    if (localStorage.getItem('hourlyMemos') != null) {
      hourlyMemos = JSON.parse(localStorage.getItem('hourlyMemos'));
    } else {
      hourlyMemos = ["", "", "", "", "", "", "", "", ""];
    }
    
    for(var i = 0; i < 9; i++) {
      var ii = (i + 9);
      var iii = (ii == 12) ? 12 : (ii % 12);
      var ampm = (ii < 12) ? "AM" : "PM";
      var blockStyle = '';
      if (ii < currentHour) {
        blockStyle = "past";
      } else if (ii > currentHour) {
        blockStyle = "future";
      } else {
        blockStyle = "present";
      }
      blockText = hourlyMemos[i];

      $('.container-lg').append("<div id=\"hour-" + ii + "\" class=\"row time-block " + blockStyle + "\"><div class=\"col-2 col-md-1 hour text-center py-3\">" + iii + ampm + "</div><textarea class=\"col-8 col-md-10 description\" rows=\"3\"\">" + blockText + "</textarea><button class=\"btn saveBtn col-2 col-md-1\" aria-label=\"save\"><i class=\"fas fa-save\" aria-hidden=\"true\"></i></button></div>");
    }
    saveButtonEl = $('.saveBtn');

    return hourlyMemos;
    }

  //Hours 9 - 17 --- Index 0 - 8

  buildMemos(hourlyMemos);

  currentDayEl.text(today.format('dddd [, ] MMMM D'));

  saveButtonEl.on('click', function () { //Must always be at the END of the script
    for(var i = 0; i < 9; i++) {
      var fullId = saveButtonEl.eq(i).parent().attr("id");
      id = fullId.split('-')[1];
      if (($(this).parent().attr('id')).split('-')[1] == id) {
        hourlyMemos[i] = $(this).siblings('.description').val();
      }
    }
    localStorage.setItem("hourlyMemos", JSON.stringify(hourlyMemos));
    saveButtonEl = $('.saveBtn');
  });
});
