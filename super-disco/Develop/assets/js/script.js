var showDateEl = document.querySelector("#currentDay");
var allTimeEl = document.querySelector("#all-time");

var schedule = {};

$(".saveTime").on("click", function(){
    var textEl =  $(this)[0].parentElement.querySelector(".time-col").getAttribute("id").replace("t-","");
    saveTask(textEl);
  });

// function to update colors based on time relative to current
var updateColors = function() {
    // shows current date
    var currentDay = moment().format("dddd, MMMM Do YYYY");
    showDateEl.textContent = currentDay;
    // current hour
    var currentHr = parseInt(moment().format("H"));

    // loop children of time container
    $(allTimeEl).children().each(function() {
        // retrieve time data from time slot
        var timeSlot = parseInt($(this).children()[1].getAttribute("id").replace("t-",""));

        // grey = past time
        if (timeSlot < currentHr) {
            $(this).find(".time-col").removeClass("green")
            $(this).find(".time-col").removeClass("red")
            $(this).find(".time-col").addClass("grey")
        // red = present time 
        } else if (timeSlot === currentHr) {
            $(this).find(".time-col").removeClass("green")
            $(this).find(".time-col").removeClass("grey")
            $(this).find(".time-col").addClass("red")
        // green = future time 
        } else {
            $(this).find(".time-col").removeClass("grey")
            $(this).find(".time-col").removeClass("red")
            $(this).find(".time-col").addClass("green")
        };
    });
};

var saveTask = function(id) {
    // saves tasks 
    var element = document. querySelector('#'+'t-'+id);
    text = element.querySelector("textarea");
    text = $(text).val();
    console.log(text);
    schedule[id] = text;
    localStorage.setItem("schedule", JSON.stringify(schedule));
};

var loadSchedule = function() {
    // loads schedule to display
    schedule = JSON.parse(localStorage.getItem("schedule"));
    if (!schedule) {
        schedule = {
            9: "",
            10: "",
            11: "",
            12: "",
            13: "",
            14: "",
            15: "",
            16: "",
            17: ""
        };
    };

    $(allTimeEl).children().each(function() {
        var timeSlot = $(this).children()[1].getAttribute("id").replace("t-","");
        var textValue = $(this).find("textarea");
        $(textValue).val(schedule[timeSlot]);
    });
};

loadSchedule();
updateColors();

// update colors each minute
setInterval(function () {
    updateColors()
}, 60000);