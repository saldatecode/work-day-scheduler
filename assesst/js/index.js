

//<p> element for day
var dayEl = $('#day');
//target containter <div>
var containerEl = $('.container');
//get current time in hA format
var currentHour = moment().hour();
//array is created that lists hours
var workHours = [
    moment().hour(9).format ('hA'),
    moment().hour(10).format('hA'),
    moment().hour(11).format('hA'),
    moment().hour(12).format('hA'),
    moment().hour(13).format('hA'),
    moment().hour(14).format('hA'),
    moment().hour(15).format('hA'),
    moment().hour(16).format('hA'),
    moment().hour(17).format('hA')
];



var day = moment().format('dddd, MMMM Do');
dayEl.text(day);


var task = $('.description')


var timeBlock = $('col-1 hour')


// function to load tasks
function loadTask() {

    //loop to get task for each hour
    
    //task is created in <p>

    for (var i = 0; i < workHours.length; i++) {
        let task = localStorage.getItem(workHours[i])

        if (task) {
            $('#' + (i + 9)).siblings().first().children().text(task);
        }
    }
}

function auditTimeBlock(timeBlockEvent) {


    var currentTime = moment($(timeBlock).text().trim(), 'hA').hour();

    //remove class of 'past present future
    $(timeBlockEvent).removeClass('past present future');

    //conditional to add correct color background to time block depending on time
    if (currentTime > currentHour) {
        $(timeBlockEvent).addClass('future');
    }
    else if (currentTime === currentHour) {
        $(timeBlockEvent).addClass('present');
    }
    else {
        $(timeBlockEvent).addClass('past');
    }
}


// create function to save task
function saveTask(hour, task) {
    localStorage.setItem(hour, task);
}

//add time blocks for each hour (3 columns in 9 rows: 9AM to 5PM) format for 9AM is hA
for (var i = 0; i < workHours.length; i++) {
    //add div with class row
    var timeBlockRow = $('<div>')
        .addClass('row time-block')
        .attr({
            id: 'row-' + (i + 9)
        })

    // add 1 div class hour
    var timeBlock = $('<div>')
        .addClass('col-1 hour')
        .text(workHours[i])
        .attr({
            id: i + 9
        })

    // add 1 div class
    var timeBlockEvent = $('<div>')
        .addClass('col-10')
        .attr({
            id: 'time-block-' + (i + 9)
        })

    // add p class of description
    var userInput = $('<p>')
        .addClass('description')
        .text(' ')
        .attr({
            id: 'Hour-' + (i + 9)
        });

    //check time
    auditTimeBlock(timeBlockEvent);

    // add button saveBtn
    var saveBtn = $('<button>')
        .addClass('col-1 saveBtn')
        .attr({
            id: 'save-button-' + (i + 9),
            type: 'button',
        })
        .on('click', function () {
            // retrieve the hour of the timeblock
            var hour = $(this).siblings().first().text();
            // retrieve the value in <p> element
            var task = $(this).siblings().last().text();

            //save to local storage
            saveTask(hour, task)

        })

    // add save icon from fontawesome
    var saveIcon = $('<i>')
        .addClass('fas fa-save');

    
    $(containerEl).append(timeBlockRow);
    
    $(timeBlockRow).append(timeBlock);
    
    $(timeBlockRow).append(timeBlockEvent);
    
    $(timeBlockEvent).append(userInput);
    
    $(timeBlockRow).append(saveBtn);
    
    $(saveBtn).append(saveIcon);
}

// add functionality so when user clicks into time block:
// edit the text content on focus
$('.col-10').on('click', 'p', function () {

    var text = $(this)
        .text()
        .trim()

    var textInput = $('<textarea>')
        .addClass('form-control')
        .val(text);

    $(this).replaceWith(textInput);

    textInput.trigger('focus');
});


$('.col-10').on('blur', 'textarea', function () {
   
    var text = $(this)
        .val()
        .trim();

   
    var userTextP = $("<p>")
        .addClass("description")
        .text(text);


    
    $(this).replaceWith(userTextP);
})



loadTask();