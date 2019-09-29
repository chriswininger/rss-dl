## rss-dll

This is a simple script for archiving the mp3s pointed to by an RSS feed.

One of my favorite pod casts, [Coder Radio](https://coder.show/) called it quits after seven years.

It was making meesa so sad; so, I wrote this script to archive the back catalog.

The awesome network that created Coder Radio continues and is full of other great shows!
Check out [Jupiter Broadcasting](https://www.jupiterbroadcasting.com/)

### System Dependencies

I ran this using node v8.12.0. If you don't already have node installed, I highly recommend using
[Node Version Manager](https://github.com/nvm-sh/nvm) to install it.

### Directions

```
git clone https://github.com/chriswininger/rss-dl.git
cd ./rss-dl
npm install
node ./index.js https://feeds.fireside.fm/coder/rss ./coderRadioArchive
```

### Disclaimer

I have not tested this on anything other than the above RSS feed. This was hacked together in about an hour.
It will definitely help you archive Coder Radio and all its Jar Jar goodness, but if you put this in production you are
a crazy person.

Also I am in no way affiliated with Jupiter Broadcasting. I just like to hoard media and had too much free time on a
Sunday morning.
