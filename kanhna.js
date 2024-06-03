

const cmdInput = document.getElementById('cmdInput');
const output = document.getElementById('output');
const userInfo = document.querySelector('.userInfo');
const stopex = document.getElementById('stopex');



var activeAudio = null;

let mouseSoundEnabled = localStorage.getItem('mouseSoundEnabled')  === 'true';
let typingSoundEnabled = localStorage.getItem('typingSoundEnabled') === 'true';

function playMouseoverSound() {
  if (mouseSoundEnabled) {
    var mouseoverSound = document.getElementById("mouseoverSound");
    mouseoverSound.currentTime = 0;
    mouseoverSound.play();
  }
}

var mouseTimeout; 

document.addEventListener("mousemove", function() {
  clearTimeout(mouseTimeout);
  mouseTimeout = setTimeout(function() {
      playMouseoverSound();
  }, 50); 
});

function playTypingSound() {
  if (typingSoundEnabled) {
    var typingSound = document.getElementById("typingSound");
    typingSound.currentTime = 0;
    typingSound.play();
  }
}

function playyametikrassahi() {
    stopaudio(); 
    var Vyametikrassahi = document.getElementById("yametikrassahi");
    Vyametikrassahi.currentTime = 0;
    Vyametikrassahi.play();
    activeAudio = Vyametikrassahi;
}

function playLazwa() {
    stopaudio(); // Arrêter le son en cours de lecture s'il y en a un
    var playLazwa = document.getElementById("playLazwa");
    playLazwa.currentTime = 0;
    playLazwa.play();
    activeAudio = playLazwa;
}

function playflossi() {
    stopaudio(); // Arrêter le son en cours de lecture s'il y en a un
    var playflossi = document.getElementById("playflossi");
    playflossi.currentTime = 0;
    playflossi.play();
    activeAudio = playflossi;
}

// Écouter les événements de frappe du clavier
document.addEventListener("keydown", function(event) {
    playTypingSound();
});

function cmdInputvaluechange(valu){
  const choice = valu;
  cmdInput.value= choice;
  const  modalbuttonclose = document.getElementById('modalbuttonclose');

  modalbuttonclose.click();
  FocusOnInput();
}

let shuffledCommands = [];

cmdInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    const command = cmdInput.value.trim();
    if (command === 'stop' || command === 'Stop') {
      stopaudio();
      clearOutput();
    } else if(command === 'aginan' || command === 'Aginan'){
      playyametikrassahi();
    } else if(command === 'chklat' || command === 'Chklat'){
      playLazwa();
    } else if(command === 'random sound' || command === 'Random sound'){
      toggleMusic();
    } else if(command === 'doc' || command === 'Doc'){
      modalbuttonopen();
    } else if(command === 'flossi' || command === 'Flossi'){
      playflossi();
    } else if (command === 'enable mouse sound') {
      mouseSoundEnabled = true;
      localStorage.setItem('mouseSoundEnabled', true);
      console.log('Mouse sound enabled');
    } else if (command === 'disable mouse sound') {
      mouseSoundEnabled = false;
      localStorage.setItem('mouseSoundEnabled', false);
      console.log('Mouse sound disabled');
    } else if (command === 'enable typing sound') {
      typingSoundEnabled = true;
      localStorage.setItem('typingSoundEnabled', true);
      console.log('Typing sound enabled');
    } else if (command === 'disable typing sound') {
      typingSoundEnabled = false;
      localStorage.setItem('typingSoundEnabled', false);
      console.log('Typing sound disabled');
    } else {
      stopex.style.display = 'inline';
      toggleMusic();
      executeRandomCommands();
      displayDeviceInfo();
      displayUserEmail();
    }

    cmdInput.value = '';
  }
});

var audioFiles = [
  "alarm-6786.mp3",
  "rajollbariya.mp3",
  "sabaholkhair.mp3",
  "Chka-dir-nta-tema.mp3",
  "halabilkhamiss.mp3"
];

var playedAudios = []; 

function getRandomAudio() {
    var availableAudios = audioFiles.filter(function(audio) {
        return !playedAudios.includes(audio);
    });

    if (availableAudios.length === 0) {
        playedAudios = [];
        availableAudios = audioFiles.slice(); 
    }

    var randomIndex = Math.floor(Math.random() * availableAudios.length);
    return availableAudios[randomIndex];
}

function modalbuttonopen(){
  const  modalbutton = document.getElementById('modalbutton');
  modalbutton.click();
}

function toggleMusic() {
  stopaudio(); 
  var audio = document.getElementById("backgroundMusic");
  var musicSource = document.getElementById("musicSource");

  var randomAudioFile = getRandomAudio();

  musicSource.src = randomAudioFile;
  audio.load();

  playedAudios.push(randomAudioFile);

  audio.play();
  activeAudio = audio;
}





function musicFunc(srcMusic) {
  stopaudio(); 
  var audio = document.getElementById("backgroundMusic");
  var musicSource = document.getElementById("musicSource");

  musicSource.src = srcMusic;
  audio.load();
  audio.play();
  activeAudio = audio;
}


document.addEventListener('DOMContentLoaded', fetchMusic);

const clientId = 'fc638d3b'; // Replace with your actual client_id
const musicList = document.getElementById('musicList');

function fetchMusic() {
    const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=80`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMusic(data.results);
        })
        .catch(error => {
            console.error('Error fetching music:', error);
            const listItem = document.createElement('li');
            listItem.textContent = 'Failed to load tracks';
            musicList.appendChild(listItem);
        });
}

function displayMusic(musicTracks) {
    if (musicTracks.length === 0) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <a href="#" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                <span class="flex-1 ms-3 whitespace-nowrap">No music available</span>
            </a>
        `;
        musicList.appendChild(listItem);
    } else {
        musicTracks.forEach(track => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <a onclick="cmdInputvaluechangeZ('${track.audio}');" href="#" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
            <i class="fas fa-play mr-3"></i>
            <span class="flex-1 ms-3 whitespace-nowrap">${track.name} by ${track.artist_name}</span>
            </a>
            `;
            listItem.addEventListener('click', () => musicFunc(track.audio));
            musicList.appendChild(listItem);
        });
    }
}

function cmdInputvaluechangeZ(srcMusic) {
    musicFunc(srcMusic);
}

function stopaudio() {
    if (activeAudio) {
        activeAudio.pause();
        activeAudio.currentTime = 0;
    }
}

function musicFunc(srcMusic) {
    stopaudio(); 
    const audio = document.getElementById("backgroundMusic");
    const musicSource = document.getElementById("musicSource");

    musicSource.src = srcMusic;
    audio.load();
    audio.play();
    activeAudio = audio;
}



// Autres fonctions existantes telles que playyametikrassahi, playLazwa, etc.


function stopaudio() {
    if (activeAudio) {
        activeAudio.pause();
        activeAudio.currentTime = 0;
        activeAudio = null;
    }
}

function stop() {
    stopaudio();
}

// Autres fonctions restantes ...



function displayUserEmail() {
  // Vérification de la disponibilité de l'API Credential Management
  if (navigator.credentials && navigator.credentials.getEmail) {
    navigator.credentials.getEmail().then(function(credential) {
      if (credential) {
        const email = credential.id;
        userInfo.textContent += `Adresse e-mail: ${email}\n`;
        userInfo.textContent += `User Agent: ${navigator.userAgent}\n`;
        userInfo.textContent += `Langue du navigateur: ${navigator.language}\n`;

      } else {
        userInfo.textContent += 'Aucune adresse e-mail trouvée.\n';
      }
    }).catch(function(error) {
      console.error('Erreur lors de la récupération de l\'adresse e-mail:', error);
      userInfo.textContent += 'Erreur lors de la récupération de l\'adresse e-mail.\n';
    });
  } else {
    userInfo.textContent += 'L\'API Credential Management n\'est pas disponible sur ce navigateur.\n';
  }
}




function displayDeviceInfo() {
  // Afficher les informations du navigateur
  userInfo.textContent += `User Agent: ${navigator.userAgent}\n`;
  userInfo.textContent += `Langue du navigateur: ${navigator.language}\n`;
  userInfo.textContent += `Résolution de l'écran: ${screen.width}x${screen.height}\n`;
  userInfo.textContent += `Profondeur de couleur: ${screen.colorDepth} bits\n`;
  userInfo.textContent += `Plate-forme du système d'exploitation: ${navigator.platform}\n`;

  // Récupérer et afficher l'adresse IP publique
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      const publicIP = data.ip;
      userInfo.textContent += `Adresse IP : ${publicIP}\n`;
    })
    .catch(error => {
      console.error('Erreur lors de la récupération de l\'adresse IP publique:', error);
      userInfo.textContent += 'Erreur lors de la récupération de l\'adresse IP publique.\n';
    });

  // Récupérer et afficher l'emplacement de l'utilisateur


  // Récupérer et afficher l'adresse e-mail de l'utilisateur
  if (navigator.credentials && navigator.credentials.getEmail) {
    navigator.credentials.getEmail().then(function(credential) {
      if (credential) {
        const email = credential.id;
        userInfo.textContent += `Adresse e-mail: ${email}\n`;
      } else {
        userInfo.textContent += 'Aucune adresse e-mail trouvée.\n';
      }
    }).catch(function(error) {
      console.error('Erreur lors de la récupération de l\'adresse e-mail:', error);
      userInfo.textContent += 'Erreur lors de la récupération de l\'adresse e-mail.\n';
    });
  } else {
    userInfo.textContent += 'L\'API Credential Management n\'est pas disponible sur ce navigateur.\n';
  }

  const cookies = document.cookie.split(';');
  let userInfoText = 'Informations du navigateur :\n';
  let ipAddress = null;
  
  cookies.forEach(cookie => {
    const [key, value] = cookie.split('=');
    const trimmedKey = key.trim();
    const trimmedValue = decodeURIComponent(value.trim());
    userInfoText += `${trimmedKey}: ${trimmedValue}\n`;

    if (trimmedKey.toLowerCase() === 'ip_address') {
      ipAddress = trimmedValue;
    }
  });

  if (ipAddress) {
    userInfoText += `Adresse IP: ${ipAddress}\n`;
  } else {
    userInfoText += `Adresse IP saved.\n`;
  }

  userInfo.textContent += userInfoText;
}


  




function FocusOnInput()
{
 document.getElementById("cmdInput").focus();
}










function executeRandomCommands() {
  isExecutingCommands = true;
  const commands = [
    "Checking access permission...",
    "Access permission granted!",
    "Retrieving user data...",
    "User data retrieved successfully!",
    "Verifying user credentials...",
    "User credentials verified!",
    "Initializing secure connection...",
    "Secure connection established!",
    "Downloading encrypted files...",
    "Encrypted files downloaded successfully!",
    "Decrypting files...",
    "Files decrypted successfully!",
    "Analyzing system logs...",
    "System logs analyzed!",
    "Checking for security vulnerabilities...",
    "No security vulnerabilities found!",
    "Installing package...",
    "Package installed successfully!",
    "Running diagnostic...",
    "Diagnostic complete!",
    "Hacking into the mainframe...",
    "Mainframe accessed!",
    "Decrypting firewall...",
    "Firewall decrypted!",
    "Downloading data...",
    "Data downloaded successfully!",
    "Uploading virus...",
    "Virus uploaded successfully!",
    "Cracking password...",
    "Password cracked!",
    "Initiating self-destruct sequence...",
    "Self-destruct sequence initiated!",
    "Performing security scan...",
    "Security scan complete!",
    "Initializing hacking protocols...",
    "Hacking protocols initialized!",
    "Scanning for vulnerabilities...",
    "Vulnerabilities found: 3",
    "Launching exploit...",
    "Exploit successful!",
    "Cracking encryption...",
    "Encryption cracked!",
    "Downloading confidential files...",
    "Confidential files downloaded successfully!",
    "Scanning for backdoors...",
    "No backdoors found!",
    "Disabling security measures...",
    "Security measures disabled!",
    "Injecting malware...",
    "Malware injected!",
    "Establishing remote access...",
    "Remote access established!",
    "Creating fake credentials...",
    "Fake credentials created!",
    "Bypassing firewall...",
    "Firewall bypassed!",
    "Stealing user credentials...",
    "User credentials stolen!",
    "Encrypting communication...",
    "Communication encrypted!",
    "Intercepting network traffic...",
    "Network traffic intercepted!",
    "Brute forcing password...",
    "Password brute forced!",
    "Elevating privileges...",
    "Privileges elevated!",
    "Crashing system...",
    "System crashed!",
    "Escaping sandbox...",
    "Sandbox escaped!",
    "Hiding traces...",
    "Traces hidden!",
    "Corrupting data...",
    "Data corrupted!",
    "Scrambling IP address...",
    "IP address scrambled!",
    "Redirecting traffic...",
    "Traffic redirected!",
    "Initializing rootkit...",
    "Rootkit initialized!",
    "Analyzing encryption algorithm...",
    "Encryption algorithm analyzed!",
    "Spoofing MAC address...",
    "MAC address spoofed!",
    "Compromising DNS server...",
    "DNS server compromised!",
    "Injecting payload...",
    "Payload injected!",
    "Setting up keylogger...",
    "Keylogger set up!",
    "Hiding in plain sight...",
    "Hidden in plain sight!",
    "Planting backdoor...",
    "Backdoor planted!",
    "Executing denial-of-service attack...",
    "Denial-of-service attack executed!",
    "Cracking two-factor authentication...",
    "Two-factor authentication cracked!",
    "Cloning authentication token...",
    "Authentication token cloned!",
    "Extracting sensitive information...",
    "Sensitive information extracted!",
    "Deleting logs...",
    "Logs deleted!",
    "Pivoting to internal network...",
    "Internal network pivoted!",
    "Dumping memory...",
    "Memory dumped!",
    "Crafting phishing email...",
    "Phishing email crafted!",
    "Executing social engineering attack...",
    "Social engineering attack executed!",
    "Exploiting zero-day vulnerability...",
    "Zero-day vulnerability exploited!",
    "Concealing identity...",
    "Identity concealed!",
    "Initializing crypto mining...",
    "Crypto mining initialized!",
    "Leaking confidential data...",
    "Confidential data leaked!",
    "Evading antivirus detection...",
    "Antivirus detection evaded!",
    "Cracking biometric security...",
    "Biometric security cracked!",
    "Scraping web for information...",
    "Web scraped for information!",
    "Decrypting hashed passwords...",
    "Hashed passwords decrypted!",
    "Analyzing network topology...",
    "Network topology analyzed!",
    "Sniffing network traffic...",
    "Network traffic sniffed!",
    "Phreaking phone lines...",
    "Phone lines phreaked!",
    "Generating fake SSL certificate...",
    "Fake SSL certificate generated!",
    "Manipulating DNS records...",
    "DNS records manipulated!",
    "Establishing rogue access point...",
    "Rogue access point established!",
    "Falsifying digital signatures...",
    "Digital signatures falsified!",
    "Exploiting race conditions...",
    "Race conditions exploited!",
    "Overloading server...",
    "Server overloaded!",
    "Spoofing GPS location...",
    "GPS location spoofed!",
    "Cracking wireless encryption...",
    "Wireless encryption cracked!",
    "Unpacking malware payload...",
    "Malware payload unpacked!",
    "Initializing root exploit...",
    "Root exploit initialized!",
    "Escalating to kernel mode...",
    "Kernel mode escalated!",
    "Scanning for open ports...",
    "Open ports scanned!",
    "Impersonating administrator...",
    "Administrator impersonated!",
    "Abusing cross-site scripting...",
    "Cross-site scripting abused!",
    "Crafting buffer overflow attack...",
    "Buffer overflow attack crafted!",
    "Evading intrusion detection...",
    "Intrusion detection evaded!",
    "Forging digital certificates...",
    "Digital certificates forged!", 
    "Spoofing email headers...",
    "Email headers spoofed!",
    "Decrypting SSL traffic...",
    "SSL traffic decrypted!",
    "Cracking disk encryption...",
    "Disk encryption cracked!",
    "Sniffing Bluetooth traffic...",
    "Bluetooth traffic sniffed!",
    "Creating ransomware payload...",
    "Ransomware payload created!",
    "Disabling security cameras...",
    "Security cameras disabled!",
    "Faking biometric authentication...",
    "Biometric authentication faked!",
    "Cloning RFID access card...",
    "RFID access card cloned!",
    "Executing man-in-the-middle attack...",
    "Man-in-the-middle attack executed!",
    "Analyzing blockchain transactions...",
    "Blockchain transactions analyzed!",
    "Crafting exploit for IoT devices...",
    "IoT device exploit crafted!"
  ];

  shuffledCommands = shuffleArray(commands);
  executeNextCommand(shuffledCommands, 0);
  
}


const inputIndicator = document.getElementById('inputIndicator');



cmdInput.addEventListener('input', () => {
  if(cmdInput.value < 1){
  inputIndicator.style.display = 'inline';
  }
});

cmdInput.addEventListener('input', () => {
  inputIndicator.style.display = 'none';
});





function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
let isExecutingCommands = true;

function executeNextCommand(commands, index) {
  if (index < commands.length && isExecutingCommands) {
    outputCommandResult(commands[index]);
    if ((index + 1) % 10 === 0) {
      setTimeout(function() {
        executeNextCommand(commands, index + 1);
      }, 2000); 
    } else {
      setTimeout(function() {
        executeNextCommand(commands, index + 1);
      }, Math.random() * 50 + 10); 
    }
  }
  setTimeout(function() {
    function randomIntFromInterval(min, max) { 
      return Math.floor(Math.random() * (max - min + 1) + min)
      }
  }, Math.random() * 10000); 

}

function outputCommandResult(result) {
  output.textContent += result + '\n';
  output.scrollTop = output.scrollHeight;
}

function clearOutput() {
  stopex.style.display = 'none';
  isExecutingCommands = false;
  output.textContent = '';
}





const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
window.addEventListener('resize', function (e) {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
});
let hueCol = 0;
const mouse = {
x: undefined,
y: undefined,
}
canvas.addEventListener('click', function (e) {
mouse.x = e.x;
mouse.y = e.y;
for (let i = 0; i < 5; i++) {
particles.push(new Particle);
}
})
canvas.addEventListener('mousemove', function (e) {
mouse.x = e.x;
mouse.y = e.y;
for (let i = 0; i < 5; i++) {
particles.push(new Particle);
}
})
class Particle {
constructor() {
this.x = mouse.x;
this.y = mouse.y;
this.speedX = Math.random() * 3 - 1.5;
this.speedY = Math.random() * 3 - 1.5;
this.color = 'hsl(' + hueCol + ', 100%, 50%)';
this.size = Math.random() * 5 + 1;
}
update() {
this.x += this.speedX;
this.y += this.speedY;
this.size -= 0.1;
}
draw() {
ctx.fillStyle = this.color;
ctx.beginPath();
ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
ctx.fill();
}
}
function handleParticles() {
for (var i = 0; i < particles.length; i++) {
particles[i].update();
particles[i].draw();
for (var j = i + 1; j < particles.length; j++) {
  const dx = particles[j].x - particles[i].x;
  const dy = particles[j].y - particles[i].y;
  const distance = dx * dx + dy * dy;
  if (distance < 1000) {
    ctx.beginPath();
    ctx.strokeStyle = particles[i].color;
    ctx.lineWidth = 0.4;
    ctx.moveTo(particles[i].x, particles[i].y);
    ctx.lineTo(particles[j].x, particles[j].y);
    ctx.stroke();
  }
}
if (particles.size < 0.3) {
  particles.splice(i, 1);
  i--;
}
}
}
function animate() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = 'rgba(0, 0, 0, 0.0)';
ctx.fillRect(0, 0, canvas.width, canvas.height);
handleParticles();
hueCol +=6;
requestAnimationFrame(animate);
}
animate();


