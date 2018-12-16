class Music
{
  constructor(title, author, file)
  {
    this.title = title;
    this.author = author;
    this.file = file;
  }

  get info()
  {
    return this.title + " by " + this.author;
  }
}

class MusicController
{
  constructor()
  {
    this.playlist = [];
    this.addMusic();
    this.pointer = 0;
    this.currentFile.volume = 0;
    this.autoplay = false;
  }

  get currentMusic()
  {
    return this.playlist[this.pointer];
  }

  get currentFile()
  {
    return this.currentMusic.file;
  }

  get volume()
  {
    return this.currentFile.volume;
  }

  set volume(value)
  {
    this.currentFile.volume = value;
  }

  get isPlaying()
  {
    /*
      NOTE:
      isPlaying: returns true if audio is not stopped
      isPaused: returns true if audio is paused

      If an audio has been paused at the 1:00 mark, isPlaying returns true and isPaused returns true
    */

    return this.currentFile.currentTime !== 0;
  }

  get isPaused()
  {
    return this.currentFile.paused;
  }

  addMusic()
  {
    const playlist = this.playlist;
    //playlist[0] = new Music("Testing", "Dream", new Audio("music/testing.wav"));
    playlist[0] = new Music("Skystrike", "Hinkik", new Audio("music/skystrike_Hinkik.mp3"));
    playlist[1] = new Music("Rock thing", "Creo", new Audio("music/rock_thing_Creo.mp3"));
  }

  playMusic()
  {
    if(!this.isPlaying)
    {
      this.volume = 0;
      this.changeVolume(0.02, 0.9);
      this.currentFile.play();
    }
  }

  pauseMusic()
  {
    if(this.isPlaying)
    {
      this.currentFile.pause();
    }
  }

  continueMusic()
  {
    if(this.isPlaying)
    {
      this.currentFile.play();
    }
  }

  stopMusic()
  {
    if(this.isPlaying)
    {
      this.changeVolume(-0.05, 0);

      setTimeout(() => {
        this.currentFile.pause();
        this.currentFile.currentTime = 0;
      }, 1000);
    }
  }

  nextMusic()
  {
    if(this.pointer < this.playlist.length - 1)
    {
      this.pointer++;
    } else
    {
      this.pointer = 0;
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

  tick()
  {
    const music = this.currentFile;

    if(music.ended)
    {
      music.pause();
      music.currentTime = 0;

      if(this.autoplay)
      {
        this.nextMusic();

        setTimeout(() => {
          this.playMusic();
        }, 1000);
      }
    }
  }
}
