let speech = new SpeechSynthesisUtterance();
speech.lang = "en";

let speaking = false;
speech.onstart = () => { speaking = true; }
speech.onend = () => { speaking = false; }

let voices = [];
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];
  let voiceSelect = document.querySelector("#voices");
  voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

document.querySelector("#rate").addEventListener("input", () => {
  const rate = document.querySelector("#rate").value;
  speech.rate = rate;
  document.querySelector("#rate-label").innerHTML = rate;
});

document.querySelector("#volume").addEventListener("input", () => {
  const volume = document.querySelector("#volume").value;
  speech.volume = volume;
  document.querySelector("#volume-label").innerHTML = volume;
});

document.querySelector("#pitch").addEventListener("input", () => {
  const pitch = document.querySelector("#pitch").value;
  speech.pitch = pitch;
  document.querySelector("#pitch-label").innerHTML = pitch;
});

document.querySelector("#voices").addEventListener("change", () => {
  speech.voice = voices[document.querySelector("#voices").value];
});

document.querySelector("#start").addEventListener("click", () => {
  if (!speaking) {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
  }
});

document.querySelector("#pause").addEventListener("click", () => {
  window.speechSynthesis.pause();
});

document.querySelector("#resume").addEventListener("click", () => {
  window.speechSynthesis.resume();
});

document.querySelector("#cancel").addEventListener("click", () => {
  window.speechSynthesis.cancel();
});


//count text
var countTarget = document.querySelector("textarea");
var wordCount = document.querySelector("#word-count");
var characterCount = document.querySelector("#character-count");

var count = function () {
  var characters = countTarget.value;
  var characterLength = characters.length;

  var words = characters.split(/[\n\r\s]+/g).filter(function (word) {
    return word.length > 0;
  });

  wordCount.innerHTML = words.length;
  characterCount.innerHTML = characterLength;
};

count();

window.addEventListener(
  "input",
  function (event) {
    if (event.target.matches("textarea")) {
      count();
    }
  },
  false
);