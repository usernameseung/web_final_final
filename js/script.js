const starContainer = document.getElementById("star-container");
const numberOfStars = 20; // 생성할 별의 개수
const smallStarSize = "small";
const largeStarSize = "large";

// 랜덤 위치 생성 함수
function getRandomPosition(max) {
  return Math.random() * max + "px";
}

// 별 생성 함수
function createStars() {
  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    // 두 가지 크기 중 랜덤으로 선택
    const size = Math.random() < 0.5 ? smallStarSize : largeStarSize;
    star.classList.add(size);

    // 별의 랜덤 위치 설정
    star.style.top = getRandomPosition(window.innerHeight);
    star.style.left = getRandomPosition(window.innerWidth);

    starContainer.appendChild(star);
  }
}

// 페이지 로드 시 별 생성
createStars();

document.addEventListener("DOMContentLoaded", () => {
  const arrow = document.querySelector(".arrow");
  const options = document.querySelectorAll(".menu-option");
  let selectedIndex = 0;

  // 선택된 항목을 업데이트하는 함수
  function updateSelection() {
    options.forEach((option, index) => {
      option.classList.toggle("selected", index === selectedIndex);
    });

    // 화살표 위치 업데이트
    const selectedOption = options[selectedIndex];
    arrow.style.top = `${selectedOption.offsetTop}px`;
  }

  // 초기 선택 상태 업데이트
  updateSelection();
});

$(document).ready(function () {
  const $menuOptions = $(".menu-option");
  const $arrow = $(".arrow");
  let selectedIndex = 0;
  let progress = 0; // 초기 로딩 상태
  const progressBar = $(".progress-bar");
  const loadingText = $(".loading-text");

  // 선택된 옵션 업데이트
  function updateSelection() {
    $menuOptions.removeClass("selected");
    $menuOptions.eq(selectedIndex).addClass("selected");

    // 화살표 위치 업데이트
    const offsetTop = $menuOptions.eq(selectedIndex).position().top;
    $arrow.css("top", `${offsetTop}px`);
  }

  // 로딩 바 업데이트 함수
  function updateLoading() {
    progress += 0.5; // 0.5%씩 증가
    progressBar.css("width", progress + "%");
    loadingText.text(Math.floor(progress) + "%");

    if (progress < 100) {
      setTimeout(updateLoading, 100); // 속도 조절 (10ms 간격)
    } else {
      // 100% 완료 시 페이지 3로 전환
      $(".page-2").hide();
      $(".page-3").show();
    }
  }

  // YES 선택 시 페이지 2와 로딩 바 실행
  function goToPage2() {
    $(".page-1").hide();
    $(".page-2").show();
    progress = 0; // 로딩 바 초기화
    updateLoading();
  }

  // 키 이벤트 리스너
  $(document).on("keydown", function (event) {
    if (event.key === "ArrowUp") {
      selectedIndex =
        (selectedIndex - 1 + $menuOptions.length) % $menuOptions.length;
      updateSelection();
    } else if (event.key === "ArrowDown") {
      selectedIndex = (selectedIndex + 1) % $menuOptions.length;
      updateSelection();
    } else if (event.key === "Enter") {
      const selectedOption = $menuOptions.eq(selectedIndex).attr("id");

      if (selectedOption === "yes") {
        // YES 선택 시 로딩 시작
        goToPage2();
      } else if (selectedOption === "no") {
        alert("NO를 선택했습니다. 전 페이지로 돌아갑니다.");
      }
    }
  });

  // 초기 선택 상태 설정
  updateSelection();
});

(function ($) {
  var methods = {
    init: function (options) {
      var p = $.extend(
        {
          bar_width: 18,
          bar_heigth: 11,
          row_spacing: 15,
          col_spasing: 23,
          style: "rgb(253, 255, 131)", // 막대 색상
          row: 7,
          col: 6,
          speed: 2, // 속도 (프레임 간 갱신 간격, 값이 클수록 느림)
          on: true,
        },
        options
      );

      var canvas = $(this)[0],
        ctx = canvas.getContext("2d"),
        animationFrameId,
        frameCount = 0, // 프레임 카운터
        running = false;

      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight / 2;
      ctx.fillStyle = p.style;

      var randomNumber = function (m, n) {
        return Math.floor(Math.random() * (n - m + 1)) + m;
      };

      var drawFrame = function () {
        if (!running) return;

        // 프레임 간격 조절
        frameCount++;
        if (frameCount % p.speed !== 0) {
          animationFrameId = requestAnimationFrame(drawFrame);
          return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();

        for (var col = 0; col < p.col; col++) {
          var drawblock = randomNumber(0, p.row);
          for (var row = 0; row < drawblock; row++) {
            ctx.rect(
              col * p.col_spasing,
              row * p.row_spacing,
              p.bar_width,
              p.bar_heigth
            );
          }
        }

        ctx.closePath();
        ctx.fill();

        animationFrameId = requestAnimationFrame(drawFrame);
      };

      if (p.on) {
        running = true;
        drawFrame();
      }

      // 애니메이션 정지 메서드 저장
      $(this).data("stop", function () {
        running = false;
        cancelAnimationFrame(animationFrameId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
    },

    stop: function () {
      var stopFunc = $(this).data("stop");
      if (stopFunc) stopFunc();
    },
  };

  $.fn.liEqualizer = function (method) {
    if (methods[method]) {
      return methods[method].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    }
  };
})(jQuery);

$(document).ready(function () {
  const songs = [
    {
      title: "FLY OCTO FLY",
      src: "audio/song1.mp3",
      color: "rgb(66, 249, 255)",
    },
    { title: "RIP ENTRY", src: "audio/song2.mp3", color: "rgb(197, 134, 255)" },
    {
      title: "MUCK WARFARE",
      src: "audio/song3.mp3",
      color: "rgb(255, 251, 8)",
    },
  ];

  let currentSongIndex = 0;
  let isPlaying = false;

  const audio = $("#audio-player")[0];
  const songTitle = $("#song-title");
  const equalizer = $("#equalizer");

  function startEqualizer() {
    equalizer.liEqualizer({
      row: 13,
      col: Math.round(window.innerWidth / 22),
      speed: 20,
      style: songs[currentSongIndex].color, // 노래 색상 적용
      on: true,
    });
  }

  function stopEqualizer() {
    equalizer.liEqualizer("stop");
  }

  function updateSong() {
    const currentSong = songs[currentSongIndex];
    audio.src = currentSong.src;
    songTitle.text(currentSong.title);
    startEqualizer(); // 노래의 색상에 맞는 Equalizer 시작
    if (isPlaying) {
      audio.play();
    } else {
      stopEqualizer();
    }
  }

  $("#play-pause").on("click", () => {
    if (isPlaying) {
      audio.pause();
      stopEqualizer();
      $("#play-pause").text("PLAY");
    } else {
      audio.play();
      startEqualizer();
      $("#play-pause").text("PAUSE");
    }
    isPlaying = !isPlaying;
  });

  // Forward 버튼
  $("#forward").on("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSong();
  });

  // Back 버튼
  $("#back").on("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateSong();
  });

  // 볼륨 조절 버튼
  $("#volume-up").on("click", () => {
    audio.volume = Math.min(1, audio.volume + 0.1);
    console.log(`Volume: ${audio.volume}`);
  });

  $("#volume-down").on("click", () => {
    audio.volume = Math.max(0, audio.volume - 0.1);
    console.log(`Volume: ${audio.volume}`);
  });

  // 10초 뒤로 버튼
  $("#seek-backward").on("click", () => {
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  });

  // 10초 앞으로 버튼
  $("#seek-forward").on("click", () => {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
  });

  // Mute 버튼
  $("#mute").on("click", () => {
    audio.muted = !audio.muted;

    // 이미지 변경
    const muteIcon = $("#mute-icon");
    if (audio.muted) {
      muteIcon.attr("src", "img/mute_on.png"); // 음소거 이미지
    } else {
      muteIcon.attr("src", "img/mute_off.png"); // 음소거 해제 이미지
    }
  });

  // Restart 버튼
  $("#restart").on("click", () => location.reload());

  // 페이지 로드 시 첫 번째 노래 업데이트
  updateSong();
});

//3페이지 타이틀 작용
document.addEventListener("DOMContentLoaded", () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  document.querySelector("h2").onmouseover = (event) => {
    let iterations = 0;

    const interval = setInterval(() => {
      event.target.innerText = event.target.dataset.value
        .split("")
        .map((letter, index) => {
          if (index < iterations) {
            return event.target.dataset.value[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iterations >= event.target.dataset.value.length) {
        clearInterval(interval);
      }

      iterations += 1 / 3;
    }, 30);
  };
});
