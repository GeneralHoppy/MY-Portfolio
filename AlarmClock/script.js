// JavaScript for handling the Alarm Clock functionality
document.addEventListener("DOMContentLoaded", () => {
  const currentTimeEl = document.getElementById("current-time");
  const alarmTimeInput = document.getElementById("alarm-time");
  const setAlarmBtn = document.getElementById("set-alarm-btn");
  const alarmSoundInput = document.getElementById("alarm-sound");
  const alarmAudio = document.getElementById("alarm-audio");
  const statusEl = document.getElementById("status");

  let alarmTime = null;
  let alarmSet = false;

  // Function to update the current time every second
  const updateTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    currentTimeEl.textContent = `${hours}:${minutes}:${seconds}`;

    // Check if it's time for the alarm
    if (alarmSet && `${hours}:${minutes}` === alarmTime) {
      alarmAudio.play();
      statusEl.textContent = "Alarm is ringing!";
      alarmSet = false; // Reset after alarm rings
    }
  };

  // Function to set the alarm
  const setAlarm = () => {
    const alarmValue = alarmTimeInput.value;
    if (!alarmValue) {
      alert("Please set an alarm time.");
      return;
    }

    alarmTime = alarmValue;
    alarmSet = true;
    statusEl.textContent = `Alarm set for ${alarmTime}`;

    // Load the selected alarm sound
    const soundFile = alarmSoundInput.files[0];
    if (soundFile) {
      const soundURL = URL.createObjectURL(soundFile);
      alarmAudio.src = soundURL;
    } else {
      alert("Please select an alarm sound.");
    }
  };

  // Update the time every second
  setInterval(updateTime, 1000);

  // Event listener for the "Set Alarm" button
  setAlarmBtn.addEventListener("click", setAlarm);
});
