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
  }

  setButtonsStatus(isPlaying, isPaused)
  {
    const list = this.list;
    list.play.disabled = isPlaying;
    list.pause.disabled = isPaused;
    list.continue.disabled = !isPlaying || !isPaused;
    list.stop.disabled = !isPlaying;
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

    music.eventHandler();

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

    this.tick();
  }

  tick()
  {
    const buttonManager = this.buttons;
    const music = this.music;

    buttonManager.setButtonsStatus(music.isPlaying, music.isPaused);

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}

window.onload = () => {
  console.log("Hello world!");

  const mainController = new MainController();
  mainController.runProgram();
}
