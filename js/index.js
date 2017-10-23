var songName = document.getElementById('songSearch').value;
var songs = [];
var stream;
var currentId = ""
var list = document.getElementById('list')
SC.initialize({
  client_id: 'fd4e76fc67798bfa742089ed619084a6'
});
var playing = false
var player = document.getElementById('player')
var songArray = [{}];
var firstTrack;
var id = 290;
var noInput = "dont";
var firstPlay = false;
// stream track id 293


function next() {
  console.log(id)

  id++
  console.log(id)

  SC.stream('/tracks/' + id).then(function(player) {
    player.play();
  });
}

function playNow() {
  if (playing == false) {
    audio.src = songs[index].file

    audio.play()
    play.classList.remove('navButton')
    play.classList.add('pause')
    playing = true
    var update = document.getElementById(index)
    update.classList.remove('list')
    update.classList.add('list2')
  } else {
    play.classList.remove('pause')
    play.classList.add('navButton')
    audio.pause()
    playing = false

  }
}

function playNew(selected) {
  if (currentId !== "") {

    var current = document.getElementById(currentId)
    if (current !== null){
    if (current.classList.contains('list2')) {
      current.classList.remove('list2')
      current.classList.add('list')
    }
}
  }
  if (playing == false) {

    player.classList.remove('navButton')
    player.classList.add('pause')
    playing = true
  }
  event.preventDefault();

  console.log(selected);
if (firstPlay == true){

  SC.stream('/tracks/' + id).then(function(player) {
    stream = player
    stream.play();
    currentId = id
    var update = document.getElementById(id)
    update.classList.remove('list')
    update.classList.add('list2')
    firstPlay = false
  });

}else{
  id = selected;

  SC.stream('/tracks/' + id).then(function(player) {
    stream = player
    stream.play();
    currentId = id
    var update = document.getElementById(id)
    update.classList.remove('list')
    update.classList.add('list2')
  });
}
}
function search() {
  songName = document.getElementById('songSearch').value;
  if (songName == ""){
    firstPlay = true
    songArray = [];
    songName = document.getElementById('songSearch').value;
    console.log(songName)

    SC.get('/tracks', {
      q: noInput,
      limit: 20
    }).then(function(tracks) {
      songs = tracks
      firstTrack = tracks[0]
      id = firstTrack.id

      list.innerHTML = ""
      for (i = 0; i < tracks.length; i++) {
        list.innerHTML += ("<ul class = 'largerDiv'><div class = 'songList' style='background-image: url(" + tracks[i].artwork_url + ")'><div class='small'></div><button class = 'playIn'  onclick = 'playNew(this.id)' class = 'list' id = '" + tracks[i].id + "'></button></div><button onclick = 'playNew(this.id)' class = 'list' id = '" + tracks[i].id + "'>" + tracks[i].title + "</button><a href = '" + tracks[i].user.permalink_url + "' target='_blank'>---" + tracks[i].user.username + "---</a><a href = '" + tracks[i].permalink_url + "'target='_blank'>---see on soundcloud---</a></ul>");

        songArray.push({
          name: tracks[i].title,
          id: tracks[i].id
        })
        console.log(tracks[i]);
        playNew()
      }


    });
  } else{
    firstPlay = true
    songArray = [];
    songName = document.getElementById('songSearch').value;
    console.log(noInput)

    SC.get('/tracks', {
      q: songName,
      limit: 20
    }).then(function(tracks) {
      songs = tracks
      firstTrack = tracks[0]
      id = firstTrack.id

      list.innerHTML = ""
      for (i = 0; i < tracks.length; i++) {
        list.innerHTML += "<ul class = 'largerDiv'><div class = 'songList' style='background-image: url(" + tracks[i].artwork_url + ")'><div class='small'></div><button class = 'playIn' onclick = 'playNew(this.id)' class = 'list' id = '" + tracks[i].id + "'></button></div><button onclick = 'playNew(this.id)' class = 'list' id = '" + tracks[i].id + "'>" + tracks[i].title + "</button><a href = '" + tracks[i].user.permalink_url + "' target='_blank'>---" + tracks[i].user.username + "---</ul>";

        songArray.push({
          name: tracks[i].title,
          id: tracks[i].id
        })
        console.log(tracks[i]);
        playNew()
      }


    });
  }

}

function pause() {
  if (playing == true) {
    if (stream) {
      stream.pause();
      playing = false
      player.classList.remove('pause')
      player.classList.add('navButton')
    }
    console.log(id);

  } else {
    stream.play()
    playing = true
    player.classList.remove('navButton')
    player.classList.add('pause')



  }
}

search()
