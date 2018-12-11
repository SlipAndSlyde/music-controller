class ButtonManager
{
  constructor()
  {
    this.list = {};
    this.getButtons();
  }

  getButtons()
  {
    const list = this.list;
    list.play = document.getElementById("play");
    list.pause = document.getElementById("pause");
    list.continue = document.getElementById("continue");
    list.stop = document.getElementById("stop");
    list.autoplay = document.getElementById("autoplay");
  }

  setButtonsStatus(music)
  {
    const list = this.list;
    list.play.disabled = music.isPlaying;
    list.pause.disabled = music.isPaused;
    list.continue.disabled = !music.isPlaying || !music.isPaused;
    list.stop.disabled = !music.isPlaying;

    if(music.autoplay)
    {
      list.autoplay.innerText = "Autoplay: ON";
    } else
    {
      list.autoplay.innerText = "Autoplay: OFF";
    }
  }
}

class MainController
{
  constructor()
  {
    this.buttons = new ButtonManager();
    this.music = new MusicController();
  }

  runProgram()
  {
    const buttons = this.buttons.list;
    const music = this.music;

    buttons.play.onclick = () => {
      music.playMusic();
    }

    buttons.pause.onclick = () => {
      music.pauseMusic();
    }

    buttons.continue.onclick = () => {
      music.continueMusic();
    }

    buttons.stop.onclick = () => {
      music.stopMusic();
    }

    buttons.autoplay.onclick = () => {
      music.autoplay = !music.autoplay;
    }

    this.tick();
  }

  tick()
  {
    const buttonManager = this.buttons;
    const music = this.music;

    buttonManager.setButtonsStatus(music);
    music.tick();

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}

window.onload = () => {
  console.log("Hello world!");
  console.log("Bug: event handler is attached to the first file only");

  const mainController = new MainController();
  mainController.runProgram();
}
