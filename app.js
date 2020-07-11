class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
  }
  activePad() {
    this.classList.toggle("active");
  }

  repeat() {
    // create a loop = step 0-8 and index infinite "currently"
    let step = this.index % 8;
    // console.log(`step ${step} and index ${this.index}`);
    const activeBars = document.querySelectorAll(`.b${step}`);
    //console.log(step);
    this.index++;
  }
  start() {
    // set speed - need to multiple by 1000 due to milliseconds
    const interval = (60 / this.bpm) * 1000;
    // important to use arrow function, otherwise this keyword reassign to window!
    setInterval(() => {
      this.repeat();
    }, interval);
  }
}

// new instance of object
const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
});

// you cannot simply use drumKit.start as argument (this would be the btn)
// - need to use callback function // (due to reassigning this keyword)
// - preferably arrow function!
drumKit.playBtn.addEventListener("click", () => {
  drumKit.start();
});
