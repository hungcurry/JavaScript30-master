const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('.skip')
const ranges = player.querySelectorAll('.player__slider')

function togglePlay() {
  /* 
  video.paused : 媒體元素是否暫停 回傳 true / false
  video.play() : 播放
  video.pause() : 暫停
  */
  // if(video.paused){
  //   console.log('播放')
  //   video.play()
  // }else{
  //   video.pause()
  //   console.log('暫停')
  // }

  // 進階
  const method = video.paused ? 'play' : 'pause'
  video[method]()
}
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚'
  console.log(icon)
  toggle.textContent = icon
}

// skip 時間快慢轉
function skip() {
  console.log(video.currentTime)
  console.log(this.dataset.skip)
  // this.dataset.skip 出來是字串 要轉型
  video.currentTime += parseInt(this.dataset.skip)
}

// 音量 速度
function handleRangeUpdate() {
  // console.log(this.value);
  // video.volume 聲音
  // video.playbackRate 速率
  video[this.name] = this.value
}

// video.currentTime 現在播放時間
// video.duration 總時間
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

// 進度條拖動和點擊
function scrub(e) {
  // console.log(e.offsetX)
  // console.log(progress.offsetWidth)
  const timePercent = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = timePercent
}

/* 影片播放 */
video.addEventListener('click', togglePlay)
toggle.addEventListener('click', togglePlay)
video.addEventListener('timeupdate', handleProgress)

// video 觸發後 會有 play ／ pause 2個事件
// 解耦: 影片播放後, 讓影片去觸發更新 play / pause 2個事件
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)

// skip 時間
skipButtons.forEach((button) => button.addEventListener('click', skip))

// 音量 速度
ranges.forEach((range) => range.addEventListener('change', handleRangeUpdate))
ranges.forEach((range) => range.addEventListener('mousemove', handleRangeUpdate))

// 進度條拖動和點擊
let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousedown', () => (mousedown = true))
progress.addEventListener('mouseup', () => (mousedown = false))

// 原本
// progress.addEventListener('mousemove', function(e){
//   if(mousedown){
//     scrub(e)
//   }
// })
progress.addEventListener('mousemove', (e) => 
/* 
  xxx && OOO 優先回傳 false  ／ 如果是xxx true ,就會往後做
  xxx || OOO 優先回傳 true  ／  如果是xxx false ,就會往後做
*/
  mousedown && scrub(e)
)
