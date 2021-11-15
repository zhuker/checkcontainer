import * as fs from "fs"
import * as proc from "process"
import * as rxjs from "rxjs"
import {fromEvent, mergeMap, map, Observable, groupBy, filter, bufferCount} from "rxjs"
import * as assert from "assert";


if (proc.argv.length < 3) {
  console.log("usage: checkcontainer ffprobe.json")
  proc.exit(1);
}

interface FfPacket {
  codec_type: string,
  stream_index: number,
  pts: number,
  pts_time: number,
  dts: number,
  dts_time: number,
  duration: number,
  duration_time: number,
  size: number,
  pos: number,
  flags: string
}

interface Ffprobe {
  packets: FfPacket[]
}

let buffer = fs.readFileSync(proc.argv[2], 'utf8');
let ffp: Ffprobe = JSON.parse(buffer)
console.log(ffp.packets.length)
rxjs.from(ffp.packets).pipe(
  groupBy(p => p.codec_type + "_" + p.stream_index),
  mergeMap(group => group.pipe(
    bufferCount(2, 1),
    filter(b => b.length == 2)
  ))
).subscribe(x => {
  let [prev, curr] = x;
  let k = prev.codec_type;
  // console.log(x)
  let expected = prev.pts + prev.duration;
  let actual = curr.pts;
  if (expected != actual) {
    console.error(`${k} pts jump ${prev.pts} + ${prev.duration} != ${curr.pts} (expected ${prev.pts + prev.duration}) `)
  }
})


// fs.readSync()