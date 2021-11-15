# Check video containers for issues

# Install
```
npm install
```

# Quickstart
```
node --require ts-node/register index.ts video_vp9_audio_opus.json

> video pts jump 33366 + 26633 != 66733 (expected 59999)
  video pts jump 66733 + 13266 != 100100 (expected 79999)
  video pts jump 100100 + 19900 != 133466 (expected 120000)
  video pts jump 133466 + 26533 != 166833 (expected 159999)
  video pts jump 166833 + 13166 != 200200 (expected 179999)
  video pts jump 200200 + 19800 != 233566 (expected 220000)
  video pts jump 233566 + 26433 != 266933 (expected 259999)
  video pts jump 266933 + 13066 != 300300 (expected 279999)
  video pts jump 300300 + 19700 != 333666 (expected 320000)
  video pts jump 333666 + 26333 != 367033 (expected 359999)
  video pts jump 367033 + 12966 != 400400 (expected 379999)
  video pts jump 400400 + 19600 != 433766 (expected 420000)
  video pts jump 433766 + 26233 != 467133 (expected 459999)

```


# Usage

```
ffprobe -hide_banner -print_format json -show_packets video.mp4 >ffprobe.json
node --require ts-node/register index.ts ffprobe.json
```
