let userAnswers = [];
let currentQuestion = 0;
let totalSeconds = 60 * 60;
let submitted = false;

// Listening audio control
let audioPlayCounts = {};
let audioCurrentKey = null;
let audioIsPlayingAttempt = false;
let audioPlayingNow = false;

function setNavigationLock(lock){
  audioPlayingNow = lock;

  const nextBtn = document.getElementById("nextBtn");
  const backBtn = document.getElementById("backBtn");
  const finishBtn = document.querySelector(".finish");

  if(nextBtn) nextBtn.disabled = lock;
  if(backBtn) backBtn.disabled = lock;
  if(finishBtn) finishBtn.disabled = lock;

  document.querySelectorAll(".qbtn").forEach(btn => {
    btn.style.pointerEvents = lock ? "none" : "auto";
    btn.style.opacity = lock ? "0.5" : "1";
  });
}

function getLanguageEnglish(q){
  if(q.type === "double" && q.question){
    return q.question;
  }
  if(q.instruction){
    return q.instruction;
  }
  if(q.question){
    return q.question;
  }
  return "Look at the question and choose the correct answer.";
}

function getLanguageNepali(text){
  const translations = {
    "Look at the information and answer the following questions": "तल दिइएको जानकारी हेरेर प्रश्नहरूको उत्तर दिनुहोस्।",
    "Read the Passage and Answer the Following Questions": "अनुच्छेद पढेर तलका प्रश्नहरूको उत्तर दिनुहोस्।",
    "Read the passage and answer the following questions.": "अनुच्छेद पढेर तलका प्रश्नहरूको उत्तर दिनुहोस्।",
    "Look at the illustration and choose the correct word": "चित्र हेरेर सही शब्द छान्नुहोस्।",
    "Look at the illustration and choose the correct word.": "चित्र हेरेर सही शब्द छान्नुहोस्।",
    "Read the sentance and choose the word that fits in( )the most.": "वाक्य पढेर खाली ठाउँमा मिल्ने सही शब्द छान्नुहोस्।",
    "Read the sentance and choose the kanji that fits in( )the most.": "वाक्य पढेर खाली ठाउँमा मिल्ने सही कान्जी छान्नुहोस्।",
    "How do you write the underlined kanji word in hiragana?": "रेखांकित कान्जी शब्दलाई हिरागानामा कसरी लेखिन्छ?",
    "How do you write the underlined hiragana word in kanji?": "रेखांकित हिरागाना शब्दलाई कान्जीमा कसरी लेखिन्छ?",
    "Read the dialog and choose the phrase that fits the most.": "संवाद पढेर सबैभन्दा मिल्ने वाक्यांश छान्नुहोस्।",
    "次の会話を聞いて、質問に答えてください。": "अर्को संवाद सुनेर प्रश्नहरूको उत्तर दिनुहोस्।"
  };

  return translations[text] || "यो प्रश्न पढेर सही उत्तर छान्नुहोस्।";
}

function stripHtml(text){
  return String(text || "").replace(/<[^>]*>/g, "");
}


function getSectionName(){
  if(currentQuestion < 12) return "Script and Vocabulary";
  if(currentQuestion < 24) return "Conversation and Expression";
  if(currentQuestion < 33) return "Listening";
  return "Reading";
}

function getSectionStart(){
  if(currentQuestion < 12) return 0;
  if(currentQuestion < 24) return 12;
  if(currentQuestion < 33) return 24;
  return 33;
}

function getSectionEnd(){
  if(currentQuestion < 12) return 12;
  if(currentQuestion < 24) return 24;
  if(currentQuestion < 33) return 33;
  return questions.length;
}

function getSectionQuestionNumber(){
  return currentQuestion - getSectionStart() + 1;
}

function updateSectionHighlight(){
  document.querySelectorAll(".sec").forEach(sec => sec.classList.remove("activeSec"));

  if(currentQuestion < 12) document.getElementById("sec1").classList.add("activeSec");
  else if(currentQuestion < 24) document.getElementById("sec2").classList.add("activeSec");
  else if(currentQuestion < 33) document.getElementById("sec3").classList.add("activeSec");
  else document.getElementById("sec4").classList.add("activeSec");
}

function loadQuestion(){
  const q = questions[currentQuestion];

  document.getElementById("questionInfo").innerHTML =
    `<b>Question: ${getSectionQuestionNumber()}</b><br><b>Section: ${getSectionName()}</b>`;

  let html = "";

  if(q.instruction){
    html += `<div class="instruction">${q.instruction}</div>`;
  }

  if(q.subtitle){
    html += `<div class="subtitle">${q.subtitle}</div>`;
  }

  // Normal question: show main question here
  if(q.question && q.type !== "dialog" && q.type !== "double"){
    html += `<div class="mainQuestion">${q.question}</div>`;
  }

  // Double question: show instruction/title only here
  if(q.type === "double" && q.question){
    html += `<div class="instruction">${q.question}</div>`;
  }

  document.getElementById("questionText").innerHTML = html;

  const imgBox = document.querySelector(".image");
  const img = document.getElementById("questionImage");

  if(q.image && q.type !== "dialog"){
    img.src = q.image;
    imgBox.style.display = "block";
  }else{
    img.src = "";
    imgBox.style.display = "none";
  }

  const audioBox = document.getElementById("audioBox");
  const audioPlayer = document.getElementById("audioPlayer");
  const audioSource = document.getElementById("audioSource");

  if(q.audio){
    audioCurrentKey = String(currentQuestion);
    audioIsPlayingAttempt = false;
    setNavigationLock(false);

    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    audioSource.src = q.audio;
    audioPlayer.load();
    audioBox.style.display = "block";

    const oldMsg = document.getElementById("audioLimitMsg");
    if(oldMsg) oldMsg.remove();

    const played = audioPlayCounts[audioCurrentKey] || 0;

    if(played >= 2){
      audioPlayer.controls = false;

      const msg = document.createElement("div");
      msg.id = "audioLimitMsg";
      msg.innerHTML = "<b style='color:red;font-size:16px;'>Audio can be played only 2 times.</b>";
      audioBox.appendChild(msg);
    }else{
      audioPlayer.controls = true;

      const msg = document.createElement("div");
      msg.id = "audioLimitMsg";
      msg.innerHTML = "<span style='font-size:14px;color:#555;'>Audio plays left: " + (2 - played) + "</span>";
      audioBox.appendChild(msg);
    }

  }else{
    audioCurrentKey = null;
    audioIsPlayingAttempt = false;
    setNavigationLock(false);

    audioPlayer.pause();
    audioSource.src = "";
    audioPlayer.load();
    audioBox.style.display = "none";

    const oldMsg = document.getElementById("audioLimitMsg");
    if(oldMsg) oldMsg.remove();
  }

  const speakerBox = document.getElementById("speakerBox");
  const speakerImg = document.getElementById("speakerImg");

  if(q.speakerImage){
    speakerImg.src = q.speakerImage;
    speakerBox.style.display = "block";
  }else{
    speakerImg.src = "";
    speakerBox.style.display = "none";
  }

  if(q.type === "dialog"){
    loadDialogQuestion(q);
  }else if(q.type === "double"){
    loadDoubleQuestion(q);
  }else{
    loadSingleQuestion(q);
  }

  updateSectionHighlight();
  makePalette();
}

function loadSingleQuestion(q){
  const container = document.getElementById("optionContainer");
  container.innerHTML = "";

  const hasImageOptions = q.options.some(item => typeof item === "object" && item.image);

  if(hasImageOptions){
    container.className = "imageOptions";
  }else{
    container.className = "";
  }

  q.options.forEach((item, index) => {
    const option = document.createElement("div");
    option.className = hasImageOptions ? "option imageOption" : "option";

    if(typeof item === "string"){
      option.innerText = item;
    }else{
      if(item.image){
        option.innerHTML += `<img src="${item.image}" alt="">`;
      }

      if(item.text){
        option.innerHTML += `<div style="text-align:center;">${item.text}</div>`;
      }
    }

    if(userAnswers[currentQuestion] === index){
      option.classList.add("selected");
    }

    option.onclick = function(){
      selectSingleAnswer(index);
    };

    container.appendChild(option);
  });
}

function loadDialogQuestion(q){
  const container = document.getElementById("optionContainer");
  container.innerHTML = "";
  container.className = "";

  const dialogWrap = document.createElement("div");
  dialogWrap.className = "dialogWrap";

  const dialogText = document.createElement("div");
  dialogText.className = "dialogText";
  dialogText.innerHTML = q.dialog || "";
  dialogText.style.whiteSpace = "pre-line";
  dialogText.style.lineHeight = "1.4";
  dialogWrap.appendChild(dialogText);

  if(q.sideImage){
    const sideImg = document.createElement("img");
    sideImg.className = "dialogImage";
    sideImg.src = q.sideImage;
    sideImg.alt = "";
    dialogWrap.appendChild(sideImg);
  }

  container.appendChild(dialogWrap);

  q.options.forEach((item, index) => {
    const option = document.createElement("div");
    option.className = "option";

    if(typeof item === "string"){
      option.innerText = item;
    }else{
      if(item.image){
        option.innerHTML += `<img src="${item.image}" alt="">`;
      }

      if(item.text){
        option.innerHTML += `<div style="text-align:center;">${item.text}</div>`;
      }
    }

    if(userAnswers[currentQuestion] === index){
      option.classList.add("selected");
    }

    option.onclick = function(){
      selectSingleAnswer(index);
    };

    container.appendChild(option);
  });
}

function loadDoubleQuestion(q){
  const container = document.getElementById("optionContainer");
  container.innerHTML = "";
  container.className = "";

  if(!userAnswers[currentQuestion]){
    userAnswers[currentQuestion] = {};
  }

  // Passage appears under "Your Language" and above (a)
  // Reading passage font-size is controlled here.
  if(q.passage){
    const passageBox = document.createElement("div");
    passageBox.className = "readingPassage";
    passageBox.style.fontSize = "24px";
    passageBox.style.lineHeight = "1.7";
    passageBox.style.fontWeight = "500";
    passageBox.style.marginBottom = "20px";
    passageBox.style.whiteSpace = "pre-wrap";
    passageBox.style.textAlign = "left";
    passageBox.innerHTML = q.passage;
    container.appendChild(passageBox);
  }

  q.parts.forEach((part, partIndex) => {
    const partBox = document.createElement("div");
    partBox.className = "partBox";

    const title = document.createElement("div");
    title.className = "partTitle";
    title.innerHTML = part.title || part.question || "";
    partBox.appendChild(title);

    const row = document.createElement("div");
    const hasImageOption = part.options.some(item => typeof item === "object" && item.image);

    if(hasImageOption){
      row.className = "doubleOptionRow";
    }else{
      row.className = "doubleOptionRow verticalOptions";
    }

    part.options.forEach((item, optionIndex) => {
      const option = document.createElement("div");
      option.className = "option doubleOption";

      if(typeof item === "string"){
        option.innerHTML = item;
      }else{
        if(item.image){
          option.innerHTML += `<img src="${item.image}" alt="">`;
        }

        if(item.text){
          option.innerHTML += `<div style="text-align:center;">${item.text}</div>`;
        }
      }

      if(userAnswers[currentQuestion][partIndex] === optionIndex){
        option.classList.add("selected");
      }

      option.onclick = function(){
        selectDoubleAnswer(partIndex, optionIndex);
      };

      row.appendChild(option);
    });

    partBox.appendChild(row);
    container.appendChild(partBox);
  });
}

function selectSingleAnswer(index){
  userAnswers[currentQuestion] = index;
  loadQuestion();
}

function selectDoubleAnswer(partIndex, optionIndex){
  if(!userAnswers[currentQuestion]){
    userAnswers[currentQuestion] = {};
  }

  userAnswers[currentQuestion][partIndex] = optionIndex;
  loadQuestion();
}

function makePalette(){
  const palette = document.getElementById("palette");
  palette.innerHTML = "";

  let start = getSectionStart();
  let end = getSectionEnd();

  for(let i = start; i < end; i++){
    const btn = document.createElement("div");
    btn.className = "qbtn";
    btn.innerText = i - start + 1;

    if(i === currentQuestion) btn.classList.add("active");

    btn.onclick = function(){
      if(audioPlayingNow) return;
      currentQuestion = i;
      loadQuestion();
    };

    palette.appendChild(btn);
  }
}

function submitTest(){
  if(submitted) return;
  closeSubmitConfirm();
  submitted = true;

  let correct = 0;
  let wrong = 0;
  let unanswered = 0;
  let totalMarks = 0;

  for(let i = 0; i < questions.length; i++){
    const q = questions[i];

    if(q.type === "double"){
      q.parts.forEach((part, partIndex) => {
        totalMarks++;

        if(!userAnswers[i] || userAnswers[i][partIndex] === undefined){
          unanswered++;
        }else if(userAnswers[i][partIndex] === part.answer){
          correct++;
        }else{
          wrong++;
        }
      });
    }else{
      totalMarks++;

      if(userAnswers[i] === undefined){
        unanswered++;
      }else if(userAnswers[i] === q.answer){
        correct++;
      }else{
        wrong++;
      }
    }
  }
  let finalScore = Math.round((correct / totalMarks) * 250);
let status = finalScore >= 200 ? "PASS" : "FAIL";
  let percent = Math.round((correct / totalMarks) * 100);

  document.getElementById("scoreText").innerHTML =
  `<b>Total Score:</b> ${finalScore} / 250`;

document.getElementById("correctText").innerHTML =
  `<b>Correct:</b> ${correct} / ${totalMarks}`;

document.getElementById("wrongText").innerHTML =
  `<b>Wrong:</b> ${wrong}`;

document.getElementById("unansweredText").innerHTML =
  `<b>Unanswered:</b> ${unanswered}`;

document.getElementById("percentText").innerHTML =
  `<b>Percentage:</b> ${percent}%<br><br>
   <b>Result:</b>
   <span style="font-size:30px;font-weight:bold;color:${status === "PASS" ? "green" : "red"}">
     ${status}
   </span>`;

 // Hide Test Screen
document.querySelector(".top").style.display = "none";
document.querySelector(".green").style.display = "none";
document.querySelector(".main").style.display = "none";
document.querySelector(".footer").style.display = "none";

// Show Result Screen
document.getElementById("resultPage").style.display = "block";

  // Result page ko Finish/Exit/Done button click garda full Test Feedback page kholne
  setupResultFinishButton();
}

function closeResult(){
  document.getElementById("resultBox").style.display = "none";
}

function openLanguage1(){
  const q = questions[currentQuestion];
  const english = stripHtml(getLanguageEnglish(q));
  const nepali = getLanguageNepali(english);

  const modal = document.getElementById("langModal1");
  const table = modal.querySelector("table");

  if(table){
    table.innerHTML = `
      <tr>
        <td><b>English</b></td>
        <td>${english}</td>
      </tr>
      <tr>
        <td><b>Nepali</b></td>
        <td>${nepali}</td>
      </tr>
    `;
  }

  modal.style.display = "block";
}

function closeLanguage1(){
  document.getElementById("langModal1").style.display = "none";
}

document.getElementById("nextBtn").onclick = function(){
  if(audioPlayingNow) return;

  if(currentQuestion < questions.length - 1){
    currentQuestion++;
    loadQuestion();
  }else{
    openSubmitConfirm();
  }
};

function openSubmitConfirm(){
  const box = document.getElementById("submitConfirmBox");
  if(box){
    box.style.display = "block";
  }else{
    submitTest();
  }
}

function closeSubmitConfirm(){
  const box = document.getElementById("submitConfirmBox");
  if(box){
    box.style.display = "none";
  }
}
function isListeningQuestion(index){
  return questions[index] && questions[index].section === "Listening";
}

document.getElementById("backBtn").onclick = function(){

  // Listening section bhitra back jana namilne
  if(isListeningQuestion(currentQuestion)){
    return;
  }

  // Reading bata Listening ma back jana pani namilne
  if(isListeningQuestion(currentQuestion - 1)){
    return;
  }

  if(currentQuestion > 0){
    currentQuestion--;
    loadQuestion();
  }
};

document.querySelector(".finish").onclick = function(){
  if(audioPlayingNow) return;
  submitTest();
};

function updateTimer(){
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  document.getElementById("time").innerText =
    String(minutes).padStart(2,"0") + ":" +
    String(seconds).padStart(2,"0");

  if(totalSeconds > 0){
    totalSeconds--;
  }else{
    submitTest();
  }
}


// Audio play limit + full lock while playing
const limitedAudioPlayer = document.getElementById("audioPlayer");

limitedAudioPlayer.addEventListener("play", function(){
  if(audioCurrentKey === null) return;

  const played = audioPlayCounts[audioCurrentKey] || 0;

  if(played >= 2){
    limitedAudioPlayer.pause();
    limitedAudioPlayer.currentTime = 0;
    limitedAudioPlayer.controls = false;
    setNavigationLock(false);
    alert("Audio can be played only 2 times.");
    return;
  }

  // Lock navigation and hide audio controls while audio is playing.
  // This stops students from pausing, replaying, seeking, or pressing buttons.
  setNavigationLock(true);
  limitedAudioPlayer.controls = false;

  if(!audioIsPlayingAttempt){
    audioPlayCounts[audioCurrentKey] = played + 1;
    audioIsPlayingAttempt = true;

    const msg = document.getElementById("audioLimitMsg");
    if(msg){
      const left = 2 - audioPlayCounts[audioCurrentKey];
      msg.innerHTML = "<b style='color:#333;font-size:15px;'>Audio is playing. Please wait...</b><br><span style='font-size:14px;color:#555;'>Audio plays left after this: " + left + "</span>";
    }
  }
});

limitedAudioPlayer.addEventListener("ended", function(){
  audioIsPlayingAttempt = false;
  setNavigationLock(false);

  if(audioCurrentKey === null) return;

  const played = audioPlayCounts[audioCurrentKey] || 0;
  const msg = document.getElementById("audioLimitMsg");

  if(played >= 2){
    limitedAudioPlayer.controls = false;
    if(msg){
      msg.innerHTML = "<b style='color:red;font-size:16px;'>Audio can be played only 2 times.</b>";
    }
  }else{
    limitedAudioPlayer.controls = true;
    if(msg){
      msg.innerHTML = "<span style='font-size:14px;color:#555;'>Audio plays left: " + (2 - played) + "</span>";
    }
  }
});

// Prevent seeking/dragging audio progress
limitedAudioPlayer.addEventListener("seeking", function(){
  if(audioPlayingNow){
    limitedAudioPlayer.currentTime = limitedAudioPlayer.currentTime;
  }
});


// =========================================================
// FINAL FULL TEST FEEDBACK PAGE
// Submit Result -> Pass/Fail Result -> Finish -> All feedback
// This version shows every question item, including double parts.
// =========================================================

function setupResultFinishButton(){
  const resultPage = document.getElementById("resultPage");
  if(!resultPage) return;

  // Avoid duplicate listener
  if(!resultPage.dataset.fullFeedbackHandler){
    resultPage.addEventListener("click", function(e){
      const btn = e.target.closest("button, input[type='button'], input[type='submit'], .finish, .resultFinishBtn");
      if(!btn) return;

      const text = ((btn.innerText || btn.value || btn.textContent || "") + " " + (btn.className || "")).toLowerCase();

      if(
        text.includes("finish") ||
        text.includes("exit") ||
        text.includes("done") ||
        text.includes("終了") ||
        text.includes("完了") ||
        btn.classList.contains("finish") ||
        btn.classList.contains("resultFinishBtn")
      ){
        e.preventDefault();
        e.stopPropagation();
        if(typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
        showTestFeedbackPage();
        return false;
      }
    }, true);

    resultPage.dataset.fullFeedbackHandler = "1";
  }

  // Result page ma Finish button chaina bhane automatic add garne
  const hasFinishButton = Array.from(resultPage.querySelectorAll("button, input[type='button'], input[type='submit'], .finish, .resultFinishBtn"))
    .some(btn => {
      const text = ((btn.innerText || btn.value || btn.textContent || "") + " " + (btn.className || "")).toLowerCase();
      return text.includes("finish") || text.includes("exit") || text.includes("done") || text.includes("終了") || text.includes("完了") || btn.classList.contains("finish");
    });

  if(!hasFinishButton && !document.getElementById("resultFeedbackFinishBtn")){
    const wrap = document.createElement("div");
    wrap.style.textAlign = "center";
    wrap.style.margin = "25px 0";

    const btn = document.createElement("button");
    btn.id = "resultFeedbackFinishBtn";
    btn.className = "resultFinishBtn";
    btn.type = "button";
    btn.innerText = "Finish";
    btn.onclick = function(e){
      if(e) e.preventDefault();
      showTestFeedbackPage();
      return false;
    };

    wrap.appendChild(btn);
    resultPage.appendChild(wrap);
  }
}

function ensureFeedbackStyle(){
  let style = document.getElementById("feedbackPageStyle");
  if(style) style.remove();

  style = document.createElement("style");
  style.id = "feedbackPageStyle";
  style.innerHTML = `
    html, body{
      height:auto !important;
      min-height:100% !important;
      overflow-y:auto !important;
      overflow-x:auto !important;
      margin:0;
      padding:0;
    }

    body{
      background:#f4f4f4 !important;
      font-family:Arial, Helvetica, sans-serif;
      color:#000;
    }

    #feedbackPage{
      display:block !important;
      background:#f4f4f4;
      min-height:100vh;
      height:auto !important;
      overflow:visible !important;
      position:static !important;
      width:100%;
    }

    .feedback-top{
      background:#000;
      color:#fff;
      padding:10px 16px;
      display:flex;
      align-items:center;
      justify-content:space-between;
      position:sticky;
      top:0;
      z-index:50;
    }

    .feedback-top h2{
      margin:0;
      font-size:18px;
      font-weight:700;
    }

    .exit-test-btn,
    .resultFinishBtn{
      background:#ffdc95;
      color:#111;
      border:none;
      border-radius:4px;
      padding:9px 28px;
      font-weight:700;
      cursor:pointer;
      box-shadow:0 1px 2px rgba(0,0,0,0.25);
    }

    .feedback-green-line{
      height:18px;
      background:#5b922b;
    }

    .feedback-box{
      width:92%;
      margin:18px auto 35px;
      background:#fff;
      border:1px solid #cfcfcf;
      border-radius:12px 12px 0 0;
      overflow:visible !important;
      height:auto !important;
      max-height:none !important;
    }

    .feedback-title{
      background:#000;
      color:#fff;
      padding:13px 14px;
      font-weight:700;
      font-size:15px;
      border-radius:10px 10px 0 0;
    }

    .feedback-score-summary{
      display:flex;
      flex-wrap:wrap;
      gap:10px;
      padding:12px;
      background:#fff;
      border-bottom:1px solid #ddd;
      font-size:14px;
    }

    .feedback-score-summary span{
      display:inline-block;
      background:#f3f3f3;
      border:1px solid #ddd;
      border-radius:6px;
      padding:7px 10px;
      font-weight:700;
    }

    .feedback-note{
      padding:8px 12px 12px;
      font-size:13px;
      color:#333;
      border-bottom:1px solid #ddd;
    }

    .feedback-table-wrap{
      width:100%;
      overflow-x:auto !important;
      overflow-y:visible !important;
      height:auto !important;
      max-height:none !important;
      background:#fff;
    }

    .feedback-table{
      width:100%;
      border-collapse:collapse;
      table-layout:fixed;
      background:#fff;
      height:auto !important;
    }

    .feedback-table thead{
      display:table-header-group !important;
    }

    .feedback-table tbody{
      display:table-row-group !important;
      height:auto !important;
      max-height:none !important;
      overflow:visible !important;
    }

    .feedback-table tr{
      display:table-row !important;
    }

    .feedback-table th,
    .feedback-table td{
      border:1px solid #d8d8d8;
      padding:12px 10px;
      vertical-align:middle;
      font-size:14px;
      line-height:1.45;
      word-break:break-word;
      background:#fff;
    }

    .feedback-table th{
      background:#efefef;
      text-align:center;
      font-weight:700;
    }

    .feedback-table th span,
    .feedback-table td span{
      font-size:11px;
      color:#000;
      font-weight:600;
    }

    .feedback-no-cell{
      width:6%;
      text-align:center;
      font-weight:700;
    }

    .feedback-section-cell{
      text-align:center;
      font-weight:700;
      width:13%;
    }

    .feedback-category-cell{
      width:21%;
    }

    .feedback-result-cell{
      text-align:center;
      width:8%;
      font-size:22px !important;
      font-weight:700;
    }

    .feedback-selected-cell{
      width:26%;
    }

    .feedback-correct-cell{
      width:26%;
    }

    .correct-mark{ color:green; }
    .wrong-mark{ color:blue; }

    .feedback-answer-img{
      width:100px;
      max-height:90px;
      object-fit:contain;
      display:block;
      margin:0 auto;
    }

    .feedback-unanswered{
      font-weight:700;
    }

    @media(max-width:768px){
      .feedback-box{ width:96%; margin:10px auto 25px; }
      .feedback-table{ min-width:900px; }
      .feedback-table th, .feedback-table td{ padding:10px 8px; font-size:13px; }
      .feedback-answer-img{ width:80px; }
    }
  `;
  document.head.appendChild(style);
}

function getFeedbackSectionLabel(index){
  if(index < 12){
    return "文字<br>と<br>語彙<br><span>Script<br>and<br>Vocabulary</span>";
  }
  if(index < 24){
    return "会話<br>と<br>表現<br><span>Conversation<br>and<br>Expression</span>";
  }
  if(index < 33){
    return "聴解<br><span>Listening<br>Comprehension</span>";
  }
  return "読解<br><span>Reading<br>Comprehension</span>";
}

function getFeedbackCategoryLabel(q, index, partIndex){
  if(index < 4){
    return "語の意味<br><span>Word Meaning</span>";
  }
  if(index < 7){
    return "語の用法<br><span>Word Usage</span>";
  }
  if(index < 11){
    return "漢字の読み<br><span>Kanji Reading</span>";
  }
  if(index < 12){
    return "漢字の意味と用法<br><span>Kanji Meaning and Usage</span>";
  }
  if(index < 24){
    if(q.section === "Grammar"){
      return "文法<br><span>Grammar</span>";
    }
    return "表現<br><span>Expression</span>";
  }
  if(index < 33){
    if(partIndex !== undefined && partIndex !== null){
      return "内容理解<br><span>Comprehending Content</span>";
    }
    return "内容理解<br><span>Comprehending Content</span>";
  }
  return "内容理解<br><span>Reading Comprehension</span>";
}

function getFeedbackAnswerHtml(options, index){
  if(index === undefined || index === null || index === ""){
    return `<span class="feedback-unanswered">未解答</span><br><span>Unanswered</span>`;
  }

  if(!options || !options[index]){
    return `<span class="feedback-unanswered">未解答</span><br><span>Unanswered</span>`;
  }

  const item = options[index];

  if(typeof item === "string"){
    return item;
  }

  let html = "";

  if(item.image){
    html += `<img src="${item.image}" class="feedback-answer-img" alt="">`;
  }

  if(item.text){
    html += `<div style="text-align:center;">${item.text}</div>`;
  }

  return html || "";
}

function getFeedbackRowsData(){
  const rows = [];
  let displayNo = 1;

  questions.forEach((q, index) => {
    if(q.type === "double" && q.parts){
      q.parts.forEach((part, partIndex) => {
        const selected = userAnswers[index] ? userAnswers[index][partIndex] : undefined;
        const isCorrect = selected === part.answer;
        rows.push({
          no: displayNo,
          section: getFeedbackSectionLabel(index),
          category: getFeedbackCategoryLabel(q, index, partIndex),
          result: isCorrect,
          selected: getFeedbackAnswerHtml(part.options, selected),
          correct: getFeedbackAnswerHtml(part.options, part.answer)
        });
        displayNo++;
      });
    }else{
      const selected = userAnswers[index];
      const isCorrect = selected === q.answer;
      rows.push({
        no: displayNo,
        section: getFeedbackSectionLabel(index),
        category: getFeedbackCategoryLabel(q, index, null),
        result: isCorrect,
        selected: getFeedbackAnswerHtml(q.options, selected),
        correct: getFeedbackAnswerHtml(q.options, q.answer)
      });
      displayNo++;
    }
  });

  return rows;
}

function getFeedbackRows(){
  const rows = getFeedbackRowsData();

  const sectionCounts = {};
  rows.forEach(row => {
    sectionCounts[row.section] = (sectionCounts[row.section] || 0) + 1;
  });

  const printedSections = {};
  let html = "";

  rows.forEach(row => {
    const showSection = !printedSections[row.section];
    printedSections[row.section] = true;

    html += `
      <tr>
        <td class="feedback-no-cell">${row.no}</td>
        ${showSection ? `<td class="feedback-section-cell" rowspan="${sectionCounts[row.section]}">${row.section}</td>` : ""}
        <td class="feedback-category-cell">${row.category}</td>
        <td class="feedback-result-cell ${row.result ? "correct-mark" : "wrong-mark"}">${row.result ? "○" : "×"}</td>
        <td class="feedback-selected-cell">${row.selected}</td>
        <td class="feedback-correct-cell">${row.correct}</td>
      </tr>
    `;
  });

  return html;
}

function getFeedbackScoreSummaryHtml(){
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;
  let total = 0;

  questions.forEach((q, index) => {
    if(q.type === "double" && q.parts){
      q.parts.forEach((part, partIndex) => {
        total++;
        const selected = userAnswers[index] ? userAnswers[index][partIndex] : undefined;
        if(selected === undefined){
          unanswered++;
        }else if(selected === part.answer){
          correct++;
        }else{
          wrong++;
        }
      });
    }else{
      total++;
      const selected = userAnswers[index];
      if(selected === undefined){
        unanswered++;
      }else if(selected === q.answer){
        correct++;
      }else{
        wrong++;
      }
    }
  });

  const score = total > 0 ? Math.round((correct / total) * 250) : 0;
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
  const status = score >= 200 ? "PASS" : "FAIL";

  return `
    <span>Total Score: ${score} / 250</span>
    <span>Total Questions: ${total}</span>
    <span>Correct: ${correct} / ${total}</span>
    <span>Wrong: ${wrong}</span>
    <span>Unanswered: ${unanswered}</span>
    <span>Percentage: ${percent}%</span>
    <span style="color:${status === "PASS" ? "green" : "red"};">Result: ${status}</span>
  `;
}

function showTestFeedbackPage(){
  ensureFeedbackStyle();

  const totalFeedbackRows = getFeedbackRowsData().length;

  // Full body replace gareko: yesle previous page ko fixed height/overflow problem hataucha.
  document.body.innerHTML = `
    <div id="feedbackPage">
      <div class="feedback-top">
        <h2>Test Feedback</h2>
        <button type="button" class="exit-test-btn" onclick="exitTest()">Exit Test</button>
      </div>

      <div class="feedback-green-line"></div>

      <div class="feedback-box">
        <div class="feedback-title">Test Result</div>
        <div class="feedback-score-summary">
          ${getFeedbackScoreSummaryHtml()}
        </div>
        <div class="feedback-note">
          Showing all ${totalFeedbackRows} question items. Double questions are shown separately as (a) and (b).
        </div>

        <div class="feedback-table-wrap">
          <table class="feedback-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>セクション<br><span>Section</span></th>
                <th>カテゴリー<br><span>Category</span></th>
                <th>正誤<br><span>Result</span></th>
                <th>あなたが選んだ答え<br><span>Selected Answer(s)</span></th>
                <th>正答<br><span>Correct Answer(s)</span></th>
              </tr>
            </thead>
            <tbody>
              ${getFeedbackRows()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  document.documentElement.style.overflowY = "auto";
  document.body.style.overflowY = "auto";
  window.scrollTo(0, 0);
}

function exitTest(){
  location.reload();
}

loadQuestion();
updateTimer();
setInterval(updateTimer, 1000);