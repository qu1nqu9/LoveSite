document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
    }
});

const messages = [
"Если готова, то нажми в любое место)",
"Ой",
"Какая ты умничка у меня" , 
"На самом деле я хотел тебе кое-что сказать",  
"Что-то очень важное..",
"Ты правда готова это услышать?",
"Ну хорошо",
"Тогда попробуй нажать еще раз",
"Нажми еще",
"И еще..",
"Давай, не сдавайся, нажимай)",
"Обещаю, это последний раз",
"Ну правда",
"Может нажмешь еще разок?",
"Ххыхыхыхыхы",
"Ты наверное уже злишься",
"В этот раз точно последний",
"Или же нет?",
"))",
"Хорошо",
"Больше не буду мучать",
"На самом деле..",
"Я просто хотел сказать..",
"Ты самая лучшая женщина на планете",
"Да-да, именно ты. И я не шучу. Я безумно рад, что ты есть в моей жизни",
"Трудно передать словами, как много ты для меня значишь. Кажется, что до нашей встречи я потерял себя, жил без цели в жизни и думал, что этим все и закончится",
"Но с твоим появлением моя жизнь обрела краски. Твоя любовь - это свет, который рассеивает все мои сомнения и страхи",
"Ты освещаешь мой путь, указываешь мне дорогу к счастью, помогаешь преодолевать трудности и находить в себе силы идти дальше",
"Раньше я не представлял, насколько прекрасной может быть жизнь, насколько глубокими могут быть чувства. Теперь я не представляю своей жизни без тебя",
"Ты - моя вселенная, моя опора, моя любовь. Спасибо тебе за то, что ты есть",
"Я люблю тебя.. больше всего на свете!❤️",
"Попробуй нажать кнопку внизу 💝"
];

let currentPage = 0;
let isLastPage = false;

function showMessage() {
    $('.message').text(messages[currentPage]);
    
    isLastPage = currentPage === messages.length - 1;
    
    if (isLastPage) {
        $('.next-button').show();
        $('.bg_heart').css('cursor', 'default');
    } else {
        $('.next-button').hide();
        $('.bg_heart').css('cursor', 'pointer');
    }
}

$('.bg_heart').on('click', function() {
    if (!isLastPage) {
        currentPage++;
        showMessage();
    }
});

var love = setInterval(function() {
    var r_num = Math.floor(Math.random() * 40) + 1;
    var r_size = Math.floor(Math.random() * 65) + 10;
    var r_left = Math.floor(Math.random() * 100) + 1;
    var r_bg = Math.floor(Math.random() * 25) + 100;
    var r_time = Math.floor(Math.random() * 5) + 5;
    
    $('.bg_heart').append("<div class='heart' style='width:" + r_size + "px;height:" + r_size + "px;left:" + r_left + "%;background:rgba(255," + (r_bg - 25) + "," + r_bg + ",1);animation:love " + r_time + "s ease'></div>");
    
    $('.bg_heart').append("<div class='heart' style='width:" + (r_size - 10) + "px;height:" + (r_size - 10) + "px;left:" + (r_left + r_num) + "%;background:rgba(255," + (r_bg - 25) + "," + (r_bg + 25) + ",1);animation:love " + (r_time + 5) + "s ease'></div>");
    
    $('.heart').each(function() {
        var top = parseFloat($(this).css("top"));
        var width = parseFloat($(this).css("width"));
        if (top <= -100 || width >= 150) {
            $(this).remove();
        }
    });
}, 500);

showMessage();

function clearMusicState() {
    localStorage.removeItem('musicPlaying');
    localStorage.removeItem('musicCurrentTime');
}

window.onload = function() {
    clearMusicState(); 
}

function setupMusic() {
    const music = document.getElementById('backgroundMusic');
    
    if (!localStorage.getItem('initialLoad')) {
        clearMusicState();
        localStorage.setItem('initialLoad', 'true');
        music.currentTime = 0;
    }

    const isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';
    const musicCurrentTime = localStorage.getItem('musicCurrentTime') || 0;

    if (isMusicPlaying) {
        music.currentTime = parseFloat(musicCurrentTime);
        music.play().catch(error => console.log('Playback failed', error));
    }

    music.addEventListener('play', () => {
        localStorage.setItem('musicPlaying', 'true');
    });

    music.addEventListener('pause', () => {
        localStorage.setItem('musicPlaying', 'false');
    });

    setInterval(() => {
        localStorage.setItem('musicCurrentTime', music.currentTime);
    }, 1000);

    document.addEventListener('click', function startMusic() {
        music.play().catch(error => {
            console.log('Autoplay prevented', error);
        });
        document.removeEventListener('click', startMusic);
    });
}

document.addEventListener('DOMContentLoaded', setupMusic);
