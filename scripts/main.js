
var mediaRecorder
var recordedBlobs
var booth = document.getElementById('booth')
var player = document.getElementById('player')
var start = document.getElementById('start')
var record = document.getElementById('record')
var play = document.getElementById('play')

start.addEventListener('click', async function (event) {
  var options = { audio: true, video: true }
  try {
    var stream = await navigator.mediaDevices.getUserMedia(options)
    record.disabled = false
    window.stream = stream
    booth.srcObject = stream
  } catch (error) {
    console.log(error)
  }
})

record.addEventListener('click', async function (event) {
  if (record.textContent == 'Stop') return stopRecording()
  if (record.textContent == 'Record') return startRecording()
})

function startRecording () {
  recordedBlobs = []
  record.textContent = 'Stop'
  play.disabled = true
  var options = {mimeType: ''}
  try {
    mediaRecorder = new MediaRecorder(window.stream, options)
    mediaRecorder.ondataavailable = function (event) {
      if (event.data && event.data.size > 0) recordedBlobs.push(event.data)
    }
    mediaRecorder.start()
  } catch (error) {
    console.log(error)
  }
}

function stopRecording () {
  record.textContent = 'Record'
  play.disabled = false
  mediaRecorder.stop()
}

play.addEventListener('click', function (event) {
  var superBuffer = new Blob(recordedBlobs, {type: 'video/webm'})
  player.src = null
  player.srcObject = null
  player.src = window.URL.createObjectURL(superBuffer)
  player.controls = true
  player.play()
})

