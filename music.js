class MusicController
{
  constructor()
  {
    this.playlist = {};
    this.addMusic();
    this.currentMusic = this.playlist.rock_thing;
    this.currentMusic.volume = 0;
    this.isPaused = true;
  }

  get volume()
  {
    return this.currentMusic.volume;
  }

  set volume(value)
  {
    this.currentMusic.volume = value;
  }

  get isPlaying()
  {
    /*
      NOTE:
      isPlaying: returns true if audio is not stopped
      isPaused: returns true if audio is paused

      If an audio has been paused at the 1:00 mark, isPlaying returns true and isPaused returns true
    */

    return this.currentMusic.currentTime !== 0;
  }

  addMusic()
  {
    const playlist = this.playlist;
    playlist.skystrike = new Audio("music/skystrike_Hinkik.mp3");
    playlist.rock_thing = new Audio("music/rock_thing_Creo.mp3");
  }

  playMusic()
  {
    if(!this.isPlaying)
    {
      this.volume = 0;
      this.changeVolume(0.02, 0.9);
      this.currentMusic.play();
    }
  }

  pauseMusic()
  {
    if(this.isPlaying)
    {
      this.currentMusic.pause();
    }
  }

  continueMusic()
  {
    if(this.isPlaying)
    {
      this.currentMusic.play();
    }
  }

  stopMusic()
  {
    if(this.isPlaying)
    {
      this.changeVolume(-0.05, 0);

      setTimeout(() => {
        this.currentMusic.pause();
        this.currentMusic.currentTime = 0;
      }, 1000);
    }
  }

  changeVolume(speed, destination, subroutine)
  {
    try
    {
      this.volume += speed;
    } catch (e)
    {
      this.volume = 0;
    }

    if(speed > 0)
    {
      if(this.volume < destination)
      {
        window.requestAnimationFrame(() => {
          this.changeVolume(speed, destination);
        });
      }
    } else
    {
      if(this.volume > destination)
      {
        window.requestAnimationFrame(() => {
          this.changeVolume(speed, destination);
        });
      }
    }
  }

  eventHandler()
  {
    const music = this.currentMusic;

    music.onplay = () => {
      this.isPaused = false;
    }

    music.onpause = () => {
      this.isPaused = true;
    }
  }
}
