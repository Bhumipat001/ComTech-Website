const defaultPicture = new URL('../images/logo_background.png', import.meta.url).href;
function showLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  const progressBar = document.querySelector('.progress');
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
  }, Math.floor(Math.random() * 2) + 9);
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  loadingScreen.classList.add('hidden');
  setTimeout(() => {
    loadingScreen.style.display = 'none';
  }, 500);
}
import { membersDataBase } from './config.js';
function decrypt(encoded) {
  return atob(encoded);
}
const DataBase = decrypt(membersDataBase);
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
    const groups = {};

    Object.entries(data).forEach(([group, membersList]) => {
      membersList.forEach(member => {
        if (member["KUS"] !== undefined) {
          const ctcGroup = `CTC${member["KUS"] - 38}`;
          if (!groups[ctcGroup]) {
            groups[ctcGroup] = [];
          }
          groups[ctcGroup].push({
            name: member["Display Name"],
            role: member["Display Role"],
            picture: member["Picture"] || defaultPicture,
            backgroundImage: member["Card Background"] || "",
            textColor: member["Text Color"] || "#FFFFFF",
            kus: member["KUS"]
          });
        } else {
          if (!groups[group]) {
            groups[group] = [];
          }
          groups[group].push({
            name: member["Display Name"],
            role: member["Display Role"],
            picture: member["Picture"] || defaultPicture,
            backgroundImage: member["Card Background"] || "",
            textColor: member["Text Color"] || "#FFFFFF",
            kus: null
          });
        }
      });
    });

    displayCards(groups);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    hideLoadingScreen();
  }
}

function displayCards(groups) {
  const container = document.getElementById('grouped-cards');
  container.innerHTML = "";

  const sortedGroupNames = Object.keys(groups)
    .filter(group => groups[group].length > 0)
    .sort((a, b) => {
      if (a === "Supervisors") return -1;
      if (b === "Supervisors") return 1;
      if (a === "President & Vice president") return -1;
      if (b === "President & Vice president") return 1;

      const numA = parseInt(a.replace("CTC", ""), 10);
      const numB = parseInt(b.replace("CTC", ""), 10);
      return numB - numA;
    });

  sortedGroupNames.forEach(group => {
    const groupContainer = document.createElement('div');
    groupContainer.className = 'group-container';

    const groupTitle = document.createElement('div');
    groupTitle.className = 'group-title';
    groupTitle.innerText = group;
    groupContainer.appendChild(groupTitle);

    groups[group].forEach(member => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.backgroundImage = `url(${member.backgroundImage})`;

      card.innerHTML = `
        <img src="${member.picture}" alt="${member.name}">
        <h3 style="color:${member.textColor};">${member.name}</h3>
        <p style="color:${member.textColor};">${member.role}</p>
      `;
      groupContainer.appendChild(card);
    });

    container.appendChild(groupContainer);
  });
}

fetchData();