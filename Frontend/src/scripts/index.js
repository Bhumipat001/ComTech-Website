document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const logo = document.querySelector('.logo');
    const navLinks = document.querySelectorAll('nav a');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    logo.addEventListener('click', function(event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var informationLink = document.querySelector('.nav-menu li a[href="Information"]');
    
    informationLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.scrollTo({
            top: 750,
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var informationLink = document.querySelector('.nav-menu li a[href="News"]');
    
    informationLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.scrollTo({
            top: 1550,
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var informationLink = document.querySelector('.nav-menu li a[href="Contact"]');
    
    informationLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    });
});
import { indexDataBase } from './config.js';
function decryptBase64(encoded) {
  return atob(encoded);
}
const DataBase = decryptBase64(indexDataBase);
document.addEventListener("DOMContentLoaded", function() {
  const loadingScreen = document.getElementById('loadingScreen');
  const progressBar = document.querySelector('.progress');

  function showLoadingScreen() {
    loadingScreen.style.display = 'flex';
    let progress = 0;
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 2) + 1;
      progress += increment;
      if (progress > 100) progress = 100;
      progressBar.style.width = `${progress}%`;
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, Math.floor(Math.random() * 0) + 0);
  }

  function hideLoadingScreen() {
    loadingScreen.classList.add('hidden');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500);
  }

  async function fetchData() {
    showLoadingScreen();
    try {
      await new Promise(resolve => setTimeout(resolve, 0));
      const url = `${DataBase}?referer=${window.location.origin}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      const links = {
        fromLink: data.values[1][1],
        instagramLink: data.values[2][1],
        facebookLink: data.values[3][1],
        youtubeLink: data.values[4][1],
        youtubeVideoLink: data.values[5][1]
      };
      links.youtubeVideoLink = convertToEmbedLink(links.youtubeVideoLink);
      updateVideoID(links.youtubeVideoLink);
      useLinks(links);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      hideLoadingScreen();
    }
  }
  fetchData();

  const instagramButton_icon = document.getElementById('instagramButton_icon');
  const facebookButton_icon = document.getElementById('facebookButton_icon');
  const youtubeButton_icon = document.getElementById('youtubeButton_icon');

  if (instagramButton_icon) {
    instagramButton_icon.onclick = function(event) {
      event.preventDefault();
      window.location.href = links.instagramLink;
    };
  }

  if (facebookButton_icon) {
    facebookButton_icon.onclick = function(event) {
      event.preventDefault();
      window.location.href = links.facebookLink;
    };
  }

  if (youtubeButton_icon) {
    youtubeButton_icon.onclick = function(event) {
      event.preventDefault();
      window.location.href = links.youtubeLink;
    };
  }
});

function convertToEmbedLink(shareLink) {
  const videoID = shareLink.match(/(?:\/|%3D|v=|vi=)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/)[1];
  return `https://www.youtube.com/embed/${videoID}`;
}

function updateVideoID(embedLink) {
  var iframe = document.getElementById('youtube-video');
  iframe.src = embedLink;
}

function useLinks(links) {
  const applyButton = document.getElementById('applyButton');
  const instagramButton = document.getElementById('Instragram');
  const instagramButton_icon = document.querySelector('a.button.instagram');
  const facebookButton_icon = document.querySelector('a.button.facebook');
  const youtubeButton_icon = document.querySelector('a.button.youtube');

  if (applyButton) {
    applyButton.onclick = function() {
      window.location.href = links.fromLink;
    };
  }

  if (instagramButton) {
    instagramButton.onclick = function() {
      window.location.href = links.instagramLink;
    };
  }

  if (instagramButton_icon) {
    instagramButton_icon.onclick = function(event) {
      event.preventDefault();
      window.location.href = links.instagramLink;
    };
  }

  if (facebookButton_icon) {
    facebookButton_icon.onclick = function(event) {
      event.preventDefault();
      window.location.href = links.facebookLink;
    };
  }

  if (youtubeButton_icon) {
    youtubeButton_icon.onclick = function(event) {
      event.preventDefault();
      window.location.href = links.youtubeLink;
    };
  }
}