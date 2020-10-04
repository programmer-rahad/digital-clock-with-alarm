! function () {
    "use strict";

    // Alarm Display Clock
    var alarmHours = document.querySelector('.alarm-display .alarm-hours');
    var alarmMinutes = document.querySelector('.alarm-display .alarm-minutes');
    var alarmSeconds = document.querySelector('.alarm-display .alarm-seconds');
    var alarmAmPM = document.querySelector('.alarm-display .alarm-ampm');

    // Timepicker Display
    var alarmTimpickerWrapper = document.querySelector('.alarm-timepicker-wrapper');
    var alarmTimePickerCLoseBtn = document.querySelector('.alarm-timepicker-wrapper .timepicker-close');
    var closeAlarmWrapperButton = document.querySelector('.close-alarm-wrapper-btn');
    var alarmWrapper = document.querySelector('.alarm-wrapper');
    var alarmDisplay = document.querySelector('.alarm-display');
    var alarmButton = document.querySelector('.alarm-open-btn');
    var alarmOnOffBtn = document.querySelector('.alarm-onoff-buttons');

    // Alarm Input Fields
    var alarmInputFields = document.querySelectorAll('.alarm-timepicker input');

    // Alarm Input Increment Buttons
    var hoursCountPlus = document.querySelector('.alarm-timepicker-hours .count-plus');
    var minutesCountPlus = document.querySelector('.alarm-timepicker-minutes .count-plus');
    var secondsCountPlus = document.querySelector('.alarm-timepicker-seconds .count-plus');

    // Alarm Input Decrement Buttons
    var hoursCountMinus = document.querySelector('.alarm-timepicker-hours .count-minus');
    var minuteCountMinus = document.querySelector('.alarm-timepicker-minutes .count-minus');
    var secondCountMinus = document.querySelector('.alarm-timepicker-seconds .count-minus');

    // AM PM Buttons and Input
    var ampmBtn = document.querySelectorAll('.alarm-timepicker-ampm button')
    var ampmInput = document.querySelector('.ampm-input');

    // Clock Hours Minutes Seconds AMPM
    var hoursOutput = document.querySelector('.hours');
    var minutesOutput = document.querySelector('.minutes');
    var secondsOutput = document.querySelector('.seconds');
    var ampmOutput = document.querySelector('.ampm');
    var ampm;

    // Alarm Functinality
    ! function () {

        alarmOnOffBtn.addEventListener('click', function () {
            this.classList.toggle('on');
        });
        alarmDisplay.addEventListener('click', function () {
            alarmTimpickerWrapper.classList.toggle('open-timepicker');
        });
        alarmTimePickerCLoseBtn.addEventListener('click',function() {
            alarmTimpickerWrapper.classList.remove('open-timepicker');
        });
        alarmButton.addEventListener('click', function () {
            alarmWrapper.classList.add('open-alarm');
        });
        closeAlarmWrapperButton.addEventListener('click', function () {
            alarmWrapper.classList.remove('open-alarm');
        });

        // Alarm Display Clock Function
        function alarmDisplayTime(para, value) {
            para.innerHTML = value;
        }

        // Hours Minute Second Increment Function
        function hoursMinuteSecondsPlus(max) {
            if (this.nextElementSibling.value == max) {
                this.nextElementSibling.value = 0;
            }
            this.nextElementSibling.value = Number(this.nextElementSibling.value) + 1;
            if (this.nextElementSibling.value.length == 1) {
                this.nextElementSibling.value = "0" + this.nextElementSibling.value;
            }
        }

        // Event Listeners Increment
        hoursCountPlus.addEventListener('click', function () {
            hoursMinuteSecondsPlus.call(this, 12);
            alarmDisplayTime(alarmHours, this.nextElementSibling.value)
        });
        minutesCountPlus.addEventListener('click', function () {
            hoursMinuteSecondsPlus.call(this, 60);
            if (this.nextElementSibling.value == 60) {
                this.nextElementSibling.value = "00";
            }
            alarmDisplayTime(alarmMinutes, this.nextElementSibling.value)
        });
        secondsCountPlus.addEventListener('click', function () {
            hoursMinuteSecondsPlus.call(this, 60);
            if (this.nextElementSibling.value == 60) {
                this.nextElementSibling.value = "00";
            }
            alarmDisplayTime(alarmSeconds, this.nextElementSibling.value)
        });

        // Hours Minute Second Decrement Function
        function hoursMinutesSecondsMinus(min, max) {
            if (this.previousElementSibling.value == min) {
                this.previousElementSibling.value = max;
            }
            this.previousElementSibling.value = this.previousElementSibling.value - 1;
            if (this.previousElementSibling.value.length == 1) {
                this.previousElementSibling.value = "0" + this.previousElementSibling.value;
            }
        }

        // Event Listeners Decrement
        hoursCountMinus.addEventListener('click', function () {
            hoursMinutesSecondsMinus.call(this, "01", 13);
            alarmDisplayTime(alarmHours, this.previousElementSibling.value);
        });
        minuteCountMinus.addEventListener('click', function () {
            hoursMinutesSecondsMinus.call(this, "00", 60);
            alarmDisplayTime(alarmMinutes, this.previousElementSibling.value);
        });

        secondCountMinus.addEventListener('click', function () {
            hoursMinutesSecondsMinus.call(this, "00", 60);
            alarmDisplayTime(alarmSeconds, this.previousElementSibling.value);
        });

        // Event Listener AM PM
        ampmBtn.forEach(function (ampm) {
            ampm.addEventListener('click', function () {
                if (ampmInput.innerHTML == 'AM') {
                    ampmInput.innerHTML = 'PM'
                } else {
                    ampmInput.innerHTML = 'AM';
                }
                alarmAmPM.innerHTML = ampmInput.innerHTML;
            })
        });

        // Alarm Input Form Validation
        alarmInputFields.forEach(function (input) {
            input.addEventListener('focus', function () {
                this.select();
            });
            input.addEventListener('focusout', function () {
                if (this.value == '' || this.value <= 0) {
                    if (this.classList.contains('alarm-input-hours')) {
                        this.value = '12';
                    } else if (this.classList.contains('alarm-input-minutes')) {
                        this.value = '00';
                    } else {
                        this.value = '00';
                    }
                }
                if (this.value.length == 1) {
                    this.value = '0' + this.value;
                }
                if (this.classList.contains('alarm-input-hours')) {
                    alarmDisplayTime(alarmHours, this.value);
                } else if (this.classList.contains('alarm-input-minutes')) {
                    alarmDisplayTime(alarmMinutes, this.value);
                } else {
                    alarmDisplayTime(alarmSeconds, this.value);
                }
            });
            input.addEventListener('keyup', function () {
                var thisNumber = Number(this.value);
                if (isNaN(thisNumber)) {
                    if (this.classList.contains('alarm-input-hours')) {
                        this.value = '12';
                    }
                    if (this.classList.contains('alarm-input-minutes') || this.classList.contains('alarm-input-seconds')) {
                        this.value = '00';
                    }
                } else {
                    if (this.classList.contains('alarm-input-hours') && thisNumber > 12) {
                        this.value = '12';
                    }
                    if ((this.classList.contains('alarm-input-minutes') && thisNumber > 59) || (this.classList.contains('alarm-input-seconds') && thisNumber > 59)) {
                        this.value = '00';
                    }
                    if (this.value.length > 2) {
                        if (this.classList.contains('alarm-input-hours')) {
                            this.value = '12';
                        } else {
                            this.value = '00';
                        }
                    }
                }
            });
        });

    }();

    // Digital Clock
    ! function () {

        setInterval(function () {
            var date = new Date();
            var currentHours = String(date.getHours());
            var currentMinutes = String(date.getMinutes());
            var currentSeconds = String(date.getSeconds());

            if (currentMinutes.length == 1) {
                currentMinutes = '0' + currentMinutes;
            }
            if (currentSeconds.length == 1) {
                currentSeconds = '0' + currentSeconds;
            }

            if (currentHours >= 0 && currentHours <= 11) {
                ampm = 'AM';
                if (currentHours == 0) {
                    currentHours = 12;
                }
                if (currentHours >= 1 && currentHours <= 9) {
                    currentHours = '0' + currentHours;
                }
            } else {
                ampm = 'PM';
                if (currentHours >= 13 && currentHours <= 23) {
                    currentHours = currentHours - 12;
                }
            }
            if (String(currentHours).length == 1) {
                currentHours = '0' + currentHours;
            }

            hoursOutput.innerHTML = currentHours;
            minutesOutput.innerHTML = currentMinutes;
            secondsOutput.innerHTML = currentSeconds;
            ampmOutput.innerHTML = ampm;

            if (alarmOnOffBtn.classList.contains('on') && ampmOutput.innerHTML == alarmAmPM.innerHTML && currentHours == alarmHours.innerHTML && currentMinutes == alarmMinutes.innerHTML && currentSeconds == alarmSeconds.innerHTML) {
                document.querySelector('#myAudio').play();
            }

        }, 1000);
    }();


}();