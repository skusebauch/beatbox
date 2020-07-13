class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.currentKick = "./sounds/kick-classic.mp4";
    this.currentSnare = "./sounds/snare-acoustic01.mp4";
    this.currentHihat = "./sounds/hihat-acoustic01.mp4";
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
  }

  // class Methods - prototypes
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    // create a loop = step 0-8 and index infinite "currently"
    let step = this.index % 8;
    // console.log(`step ${step} and index ${this.index}`);
    const activeBars = document.querySelectorAll(`.b${step}`);
    // console.log(step);
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      // check if pads are active
      if (bar.classList.contains("active")) {
        // check each sound
        if (bar.classList.contains("kick-pad")) {
          // restart audiotrack to 0
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }
  start() {
    // set speed - need to multiple by 1000 due to milliseconds
    const interval = (60 / this.bpm) * 1000;
    // important to use arrow function, otherwise this keyword reassign to window!
    // check if it is playing
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      // clear the interval - Stop and set it back to 0
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }
  changeSound(event) {
    const selectionName = event.target.name;
    console.log(selectionName);
    const selectionValue = event.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
    }
  }
}

// new instance of object
const drumKit = new DrumKit();

// Event Listeners

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

// you cannot simply use drumKit.start as argument (this would be the btn)
// - need to use callback function // (due to reassigning this keyword)
// - preferably arrow function!
drumKit.playBtn.addEventListener("click", () => {
  drumKit.updateBtn();
  drumKit.start();
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (event) {
    drumKit.changeSound(event);
  });
});
