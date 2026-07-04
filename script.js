/* =========================================================
   TCS IT 40-Day Prep Dashboard — Application Logic
   Vanilla JS. LocalStorage persistence. Chart.js for charts.
   ========================================================= */

(() => {
"use strict";

/* ---------------------------------------------------------
   0. STATIC DATA
--------------------------------------------------------- */
const STORAGE_KEY = "tcsDashboardState_v1";
const TOTAL_DAYS = 40;

const DSA_TOPIC_POOL = ["Arrays & Hashing","Two Pointers","Binary Search","Sliding Window","Strings","Linked List","Stacks & Queues","Recursion & Backtracking","Bit Manipulation","Trees (Traversals)","Binary Search Trees","Heaps & Priority Queue","Tries","Graphs (BFS/DFS)","Graph Shortest Paths","Greedy Algorithms","1D Dynamic Programming","2D Dynamic Programming","DP on Trees","Advanced Graphs","Union-Find (DSU)","Segment Trees","Math & Number Theory","Matrix Problems","Sorting Algorithms","Divide & Conquer","String Matching (KMP)","Sliding Window Advanced","Two Heaps Technique","Interval Problems"];
const APTITUDE_POOL = ["Number System","Percentages","Profit & Loss","Simple & Compound Interest","Ratio & Proportion","Time & Work","Time, Speed & Distance","Averages","Mixtures & Alligations","Permutations & Combinations","Probability","Data Interpretation (Tables)","Data Interpretation (Graphs)","Simplification","Ages Problems","Boats & Streams","Pipes & Cisterns","Mensuration (2D)","Mensuration (3D)","Algebra Basics"];
const REASONING_POOL = ["Series Completion","Coding-Decoding","Blood Relations","Direction Sense","Syllogisms","Seating Arrangement (Linear)","Seating Arrangement (Circular)","Puzzles","Statement & Conclusion","Data Sufficiency","Non-Verbal Reasoning","Analogy","Classification","Clock & Calendar","Cubes & Dice","Venn Diagrams","Logical Deduction","Input-Output","Ranking & Order","Symbols & Notations"];
const ENGLISH_POOL = ["Reading Comprehension","Sentence Correction","Para Jumbles","Synonyms & Antonyms","One-Word Substitution","Fill in the Blanks","Error Spotting","Idioms & Phrases","Cloze Test","Vocabulary Building"];
const CS_POOL = ["OOPs Concepts","DBMS: ER Model","DBMS: Normalization","SQL Queries","OS: Process Management","OS: Memory Management","Networks: OSI Model","Networks: TCP/IP","Software Engineering Basics","System Design Basics","Data Structures Recap","Compiler Design Basics","Version Control (Git)","Cloud Computing Basics","Cyber Security Basics"];

const QUOTES = [
  "Small daily wins compound into big offers.",
  "Discipline is choosing between what you want now and what you want most.",
  "Every question you solve today is one less surprise on interview day.",
  "You don't need motivation, you need a checklist. Here's yours.",
  "40 days from now, this will have been worth it.",
  "Consistency beats intensity. Show up today.",
  "The pattern you skip today is the question you'll miss tomorrow.",
  "Progress, not perfection. Tick the boxes.",
  "Revision is where knowledge becomes memory.",
  "Your future self is counting on today's two hours."
];

function buildRoadmap(){
  const days = [];
  for(let d=1; d<=TOTAL_DAYS; d++){
    const i = d-1;
    const isBigRevision = d % 5 === 0;
    days.push({
      day:d,
      dsaTopic: DSA_TOPIC_POOL[i % DSA_TOPIC_POOL.length],
      coding: `Solve 2 problems — ${DSA_TOPIC_POOL[i % DSA_TOPIC_POOL.length]}`,
      aptitude: APTITUDE_POOL[i % APTITUDE_POOL.length],
      reasoning: REASONING_POOL[i % REASONING_POOL.length],
      english: ENGLISH_POOL[i % ENGLISH_POOL.length],
      cs: CS_POOL[i % CS_POOL.length],
      revision: isBigRevision ? "Full Week Revision + Self Mock Analysis" : `Revise Day ${d-1} concepts`
    });
  }
  return days;
}
const ROADMAP = buildRoadmap();
const TASK_KEYS = ["dsaTopic","coding","aptitude","reasoning","english","cs","revision"];
const TASK_LABELS = {dsaTopic:"DSA Topic", coding:"Coding Questions", aptitude:"Aptitude", reasoning:"Reasoning", english:"English", cs:"CS Fundamentals", revision:"Revision"};

function dsaHelperLinks(topic){
  const clean = topic.replace(/^Solve \d+ problems? — /,"");
  const lc = `https://leetcode.com/problemset/?search=${encodeURIComponent(clean)}`;
  const gfg = `https://www.geeksforgeeks.org/?s=${encodeURIComponent(clean)}`;
  return `<span class="dsa-links">
    <a href="${lc}" target="_blank" rel="noopener" class="mini-link">LeetCode ↗</a>
    <a href="${gfg}" target="_blank" rel="noopener" class="mini-link">GfG ↗</a>
  </span>`;
}

const DSA_QUESTIONS = [
  {id:"q1",name:"Two Sum",topic:"Arrays",diff:"Easy",link:"https://leetcode.com/problems/two-sum/"},
  {id:"q2",name:"Best Time to Buy and Sell Stock",topic:"Arrays",diff:"Easy",link:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"},
  {id:"q3",name:"Contains Duplicate",topic:"Arrays",diff:"Easy",link:"https://leetcode.com/problems/contains-duplicate/"},
  {id:"q4",name:"Move Zeroes",topic:"Arrays",diff:"Easy",link:"https://leetcode.com/problems/move-zeroes/"},
  {id:"q5",name:"Maximum Subarray",topic:"Arrays",diff:"Medium",link:"https://leetcode.com/problems/maximum-subarray/"},
  {id:"q6",name:"Rotate Array",topic:"Arrays",diff:"Medium",link:"https://leetcode.com/problems/rotate-array/"},
  {id:"q7",name:"Binary Search",topic:"Arrays",diff:"Easy",link:"https://leetcode.com/problems/binary-search/"},
  {id:"q8",name:"Search Insert Position",topic:"Arrays",diff:"Easy",link:"https://leetcode.com/problems/search-insert-position/"},
  {id:"q9",name:"Valid Anagram",topic:"Strings",diff:"Easy",link:"https://leetcode.com/problems/valid-anagram/"},
  {id:"q10",name:"Reverse String",topic:"Strings",diff:"Easy",link:"https://leetcode.com/problems/reverse-string/"},
  {id:"q11",name:"Longest Common Prefix",topic:"Strings",diff:"Easy",link:"https://leetcode.com/problems/longest-common-prefix/"},
  {id:"q12",name:"Roman to Integer",topic:"Strings",diff:"Easy",link:"https://leetcode.com/problems/roman-to-integer/"},
  {id:"q13",name:"Group Anagrams",topic:"Strings",diff:"Medium",link:"https://leetcode.com/problems/group-anagrams/"},
  {id:"q14",name:"Longest Substring Without Repeating Characters",topic:"Strings",diff:"Medium",link:"https://leetcode.com/problems/longest-substring-without-repeating-characters/"},
  {id:"q15",name:"Valid Parentheses",topic:"Strings",diff:"Easy",link:"https://leetcode.com/problems/valid-parentheses/"},
  {id:"q16",name:"Reverse Linked List",topic:"Linked List",diff:"Easy",link:"https://leetcode.com/problems/reverse-linked-list/"},
  {id:"q17",name:"Merge Two Sorted Lists",topic:"Linked List",diff:"Easy",link:"https://leetcode.com/problems/merge-two-sorted-lists/"},
  {id:"q18",name:"Linked List Cycle",topic:"Linked List",diff:"Easy",link:"https://leetcode.com/problems/linked-list-cycle/"},
  {id:"q19",name:"Remove Nth Node From End",topic:"Linked List",diff:"Medium",link:"https://leetcode.com/problems/remove-nth-node-from-end-of-list/"},
  {id:"q20",name:"Maximum Depth of Binary Tree",topic:"Trees",diff:"Easy",link:"https://leetcode.com/problems/maximum-depth-of-binary-tree/"},
  {id:"q21",name:"Binary Tree Inorder Traversal",topic:"Trees",diff:"Easy",link:"https://leetcode.com/problems/binary-tree-inorder-traversal/"},
  {id:"q22",name:"Same Tree",topic:"Trees",diff:"Easy",link:"https://leetcode.com/problems/same-tree/"},
  {id:"q23",name:"Balanced Binary Tree",topic:"Trees",diff:"Easy",link:"https://leetcode.com/problems/balanced-binary-tree/"},
  {id:"q24",name:"Validate BST",topic:"Trees",diff:"Medium",link:"https://leetcode.com/problems/validate-binary-search-tree/"},
  {id:"q25",name:"Climbing Stairs",topic:"DP",diff:"Easy",link:"https://leetcode.com/problems/climbing-stairs/"},
  {id:"q26",name:"House Robber",topic:"DP",diff:"Medium",link:"https://leetcode.com/problems/house-robber/"},
  {id:"q27",name:"Coin Change",topic:"DP",diff:"Medium",link:"https://leetcode.com/problems/coin-change/"},
  {id:"q28",name:"Unique Paths",topic:"DP",diff:"Medium",link:"https://leetcode.com/problems/unique-paths/"},
  {id:"q29",name:"Subsets",topic:"Backtracking",diff:"Medium",link:"https://leetcode.com/problems/subsets/"},
  {id:"q30",name:"Permutations",topic:"Backtracking",diff:"Medium",link:"https://leetcode.com/problems/permutations/"},
  {id:"q31",name:"Combination Sum",topic:"Backtracking",diff:"Medium",link:"https://leetcode.com/problems/combination-sum/"},
  {id:"q32",name:"Generate Parentheses",topic:"Backtracking",diff:"Medium",link:"https://leetcode.com/problems/generate-parentheses/"},
  {id:"q33",name:"Word Search",topic:"Backtracking",diff:"Medium",link:"https://leetcode.com/problems/word-search/"},
  {id:"q34",name:"N Queens",topic:"Backtracking",diff:"Hard",link:"https://leetcode.com/problems/n-queens/"}
];

const RESOURCES = [
  {name:"LeetCode", url:"https://leetcode.com", desc:"Practice DSA questions & contests", tag:"LC"},
  {name:"GeeksforGeeks", url:"https://www.geeksforgeeks.org", desc:"Concepts, CS fundamentals, articles", tag:"GfG"},
  {name:"PrepInsta", url:"https://prepinsta.com", desc:"Company-wise placement prep", tag:"PI"},
  {name:"TCS iON", url:"https://www.tcsion.com", desc:"Official TCS assessment platform", tag:"TCS"},
  {name:"IndiaBIX", url:"https://www.indiabix.com", desc:"Aptitude & reasoning practice", tag:"IB"},
  {name:"TakeUForward", url:"https://takeuforward.org", desc:"Striver's DSA strategy & sheets", tag:"TUF"},
  {name:"Striver A2Z Sheet", url:"https://takeuforward.org/strivers-a2z-dsa-course-sheet-2/strivers-a2z-dsa-course-sheet-2/", desc:"Structured DSA roadmap", tag:"A2Z"},
  {name:"NeetCode", url:"https://neetcode.io", desc:"Pattern-based DSA video solutions", tag:"NC"}
];

const ACCENTS = {
  indigo:["#6366f1","#a855f7"], teal:["#14b8a6","#22d3ee"], amber:["#f59e0b","#fb923c"],
  rose:["#f43f5e","#fb7185"], blue:["#3b82f6","#60a5fa"], emerald:["#10b981","#34d399"]
};

const BADGES = [
  {id:"first_day", emoji:"🌱", label:"First Step", cond:s => Object.values(s.roadmap).some(d=>dayIsComplete(d))},
  {id:"streak3", emoji:"🔥", label:"3-Day Streak", cond:s => computeStreak(s) >= 3},
  {id:"streak7", emoji:"⚡", label:"7-Day Streak", cond:s => computeStreak(s) >= 7},
  {id:"ten_q", emoji:"🧩", label:"10 Questions Solved", cond:s => countSolved(s) >= 10},
  {id:"all_q", emoji:"🏆", label:"All 34 Solved", cond:s => countSolved(s) >= 34},
  {id:"halfway", emoji:"🚀", label:"Halfway There", cond:s => countDaysComplete(s) >= 20},
  {id:"finisher", emoji:"🎓", label:"40-Day Finisher", cond:s => countDaysComplete(s) >= 40},
  {id:"note_taker", emoji:"📝", label:"Note Taker", cond:s => s.notes.length >= 3},
  {id:"mock_starter", emoji:"📊", label:"First Mock Logged", cond:s => s.mocks.length >= 1}
];

/* ---------------------------------------------------------
   1. STATE
--------------------------------------------------------- */
function defaultState(){
  const roadmap = {};
  for(let d=1; d<=TOTAL_DAYS; d++){
    roadmap[d] = {tasks:{}, completedDate:null};
    TASK_KEYS.forEach(k => roadmap[d].tasks[k] = false);
  }
  const dsa = {};
  DSA_QUESTIONS.forEach(q => dsa[q.id] = {status:false, revision:false, dateSolved:null});
  return {
    theme:"dark",
    accent:"indigo",
    roadmap,
    dsa,
    activityDates: [],
    timer:{sessions:[], totalMinutes:0, currentMode:25},
    notes:[],
    mocks:[],
    goals:{questionsPerDay:3, studyHours:4, mockTestsPerWeek:1, revisionPerDay:2},
    earnedBadges:[],
    quoteIndex: new Date().getDate() % QUOTES.length,
    alarms:{soundEnabled:true, notifyEnabled:false, dailyTime:null, dailyEnabled:false, lastFiredDate:null}
  };
}

let state = loadState();

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const base = defaultState();
    // shallow-merge safeguard so new fields are never missing
    return Object.assign(base, parsed, {
      roadmap: Object.assign(base.roadmap, parsed.roadmap || {}),
      dsa: Object.assign(base.dsa, parsed.dsa || {}),
      timer: Object.assign(base.timer, parsed.timer || {}),
      goals: Object.assign(base.goals, parsed.goals || {}),
      alarms: Object.assign(base.alarms, parsed.alarms || {})
    });
  }catch(e){ return defaultState(); }
}
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function todayStr(){ return new Date().toISOString().slice(0,10); }
function markActivityToday(){
  const t = todayStr();
  if(!state.activityDates.includes(t)) state.activityDates.push(t);
}

/* ---------------------------------------------------------
   2. DERIVED HELPERS
--------------------------------------------------------- */
function dayIsComplete(dayState){ return TASK_KEYS.every(k => dayState.tasks[k]); }
function countDaysComplete(s){ return Object.values(s.roadmap).filter(dayIsComplete).length; }
function countSolved(s){ return Object.values(s.dsa).filter(q=>q.status).length; }
function totalTasksCompleted(s){
  let n=0; Object.values(s.roadmap).forEach(d => TASK_KEYS.forEach(k => { if(d.tasks[k]) n++; }));
  return n;
}
function getCurrentDayNum(s){
  for(let d=1; d<=TOTAL_DAYS; d++){ if(!dayIsComplete(s.roadmap[d])) return d; }
  return TOTAL_DAYS;
}
function computeStreak(s){
  const set = new Set(s.activityDates);
  let streak = 0;
  let cursor = new Date();
  while(true){
    const key = cursor.toISOString().slice(0,10);
    if(set.has(key)){ streak++; cursor.setDate(cursor.getDate()-1); }
    else break;
  }
  return streak;
}
function computeLongestStreak(s){
  const dates = [...new Set(s.activityDates)].sort();
  if(!dates.length) return 0;
  let longest=1, run=1;
  for(let i=1;i<dates.length;i++){
    const prev = new Date(dates[i-1]); const cur = new Date(dates[i]);
    const diff = (cur-prev)/86400000;
    if(diff===1){ run++; longest=Math.max(longest,run); } else run=1;
  }
  return longest;
}
function minutesToday(s){
  const t = todayStr();
  return s.timer.sessions.filter(sess=>sess.date===t).reduce((a,b)=>a+b.minutes,0);
}
function weekBounds(){
  // 40 days -> 6 weeks: 7,7,7,7,7,5
  const bounds = [];
  let start=1;
  const sizes=[7,7,7,7,7,5];
  sizes.forEach(sz=>{ bounds.push([start, Math.min(start+sz-1, TOTAL_DAYS)]); start+=sz; });
  return bounds;
}
function weekCompletionPct(s, weekIdx){
  const [a,b] = weekBounds()[weekIdx];
  let total=0, done=0;
  for(let d=a; d<=b; d++){ TASK_KEYS.forEach(k=>{ total++; if(s.roadmap[d].tasks[k]) done++; }); }
  return total? Math.round(done/total*100) : 0;
}

/* ---------------------------------------------------------
   3. DOM READY / NAVIGATION
--------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", init);

let chartRefs = {};

function init(){
  applyTheme(); applyAccent();
  setupNav();
  setupMobileMenu();
  setupTimer();
  setupNotes();
  setupSettings();
  setupMocksUI();
  setupKeyboardShortcuts();
  setupAlarms();
  populateDsaFilter();
  renderAll();
  document.getElementById("quoteText").textContent = "\u201C" + QUOTES[state.quoteIndex] + "\u201D";
}

function setupNav(){
  document.querySelectorAll(".nav-item").forEach(btn=>{
    btn.addEventListener("click", ()=> goToPage(btn.dataset.page));
  });
  document.querySelectorAll("[data-nav]").forEach(btn=>{
    btn.addEventListener("click", ()=> goToPage(btn.dataset.nav));
  });
}
function goToPage(page){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById("page-"+page).classList.add("active");
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active", b.dataset.page===page));
  closeMobileMenu();
  if(page==="performance") renderPerformanceCharts();
  if(page==="weekly") renderWeeklyCharts();
  if(page==="mocks") renderMockChart();
}
function setupMobileMenu(){
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");
  document.getElementById("menuToggle").addEventListener("click", ()=>{
    sidebar.classList.add("open"); overlay.classList.add("show");
  });
  overlay.addEventListener("click", closeMobileMenu);
}
function closeMobileMenu(){
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebarOverlay").classList.remove("show");
}

/* ---------------------------------------------------------
   4. RENDER: DASHBOARD
--------------------------------------------------------- */
function renderAll(){
  renderDashboard();
  renderRoadmap();
  renderDSA();
  renderNotesList();
  renderRevision();
  renderMocksTable();
  renderGoals();
  renderResources();
  updateSidebarChips();
}

function updateSidebarChips(){
  document.getElementById("daysRemaining").textContent = TOTAL_DAYS - countDaysComplete(state);
  document.getElementById("mobileStreak").textContent = computeStreak(state);
}

function renderDashboard(){
  const daysComplete = countDaysComplete(state);
  const solved = countSolved(state);
  const totalTasks = TOTAL_DAYS * TASK_KEYS.length;
  const doneTasks = totalTasksCompleted(state);
  const completion = Math.round(doneTasks/totalTasks*100);
  const curDay = getCurrentDayNum(state);
  const dayMeta = ROADMAP[curDay-1];

  document.getElementById("statDaysCompleted").innerHTML = `${daysComplete}<small>/40</small>`;
  document.getElementById("statDaysBar").style.width = (daysComplete/40*100)+"%";
  document.getElementById("statCurrentDay").textContent = "Day "+curDay;
  document.getElementById("statCurrentDayTopic").textContent = dayMeta.dsaTopic;
  document.getElementById("statQuestionsSolved").innerHTML = `${solved}<small>/34</small>`;
  document.getElementById("statQBar").style.width = (solved/34*100)+"%";
  document.getElementById("statCompletion").textContent = completion+"%";
  document.getElementById("statCompletionBar").style.width = completion+"%";
  document.getElementById("statStreak").innerHTML = `${computeStreak(state)}<small> days</small>`;
  const hrsToday = (minutesToday(state)/60).toFixed(1);
  document.getElementById("statHoursToday").innerHTML = `${hrsToday}<small>h</small>`;
  document.getElementById("statTotalHours").textContent = (state.timer.totalMinutes/60).toFixed(1)+"h total";

  document.getElementById("todayDayLabel").textContent = "Day "+curDay;
  const list = document.getElementById("todayTaskList");
  list.innerHTML = "";
  TASK_KEYS.forEach(k=>{
    const li = document.createElement("li");
    const done = state.roadmap[curDay].tasks[k];
    if(done) li.classList.add("done");
    li.innerHTML = `<input type="checkbox" ${done?"checked":""} data-day="${curDay}" data-key="${k}">
      <label>${TASK_LABELS[k]}: ${dayMeta[k]}</label>${(k==="dsaTopic"||k==="coding") ? dsaHelperLinks(dayMeta[k]) : ""}`;
    list.appendChild(li);
  });
  list.querySelectorAll("input").forEach(cb=>cb.addEventListener("change", onTaskToggle));

  // weekly progress bars
  const wrap = document.getElementById("weekProgressBars");
  wrap.innerHTML = "";
  weekBounds().forEach((b,i)=>{
    const pct = weekCompletionPct(state, i);
    const row = document.createElement("div");
    row.className = "week-progress-row";
    row.innerHTML = `<span>Week ${i+1}</span><div class="mini-bar"><div class="mini-bar-fill" style="width:${pct}%"></div></div><span class="pct">${pct}%</span>`;
    wrap.appendChild(row);
  });

  // badges
  const badgeRow = document.getElementById("badgeRow");
  badgeRow.innerHTML = "";
  BADGES.forEach(b=>{
    const earned = b.cond(state);
    if(earned && !state.earnedBadges.includes(b.id)){
      state.earnedBadges.push(b.id);
      toast(`Achievement unlocked: ${b.label}`);
    }
    const div = document.createElement("div");
    div.className = "badge" + (earned? "" : " locked");
    div.innerHTML = `<span class="emoji">${b.emoji}</span>${b.label}`;
    badgeRow.appendChild(div);
  });

  // overdue revisions preview
  const overdue = getRevisionQueue().overdue;
  const ol = document.getElementById("overdueRevisionList");
  ol.innerHTML = "";
  if(!overdue.length){ ol.innerHTML = `<li class="empty">Nothing overdue. Nice work.</li>`; }
  else overdue.slice(0,5).forEach(r=>{
    const li = document.createElement("li");
    li.innerHTML = `<span>${r.label}</span><span class="tag">${r.daysOverdue}d overdue</span>`;
    ol.appendChild(li);
  });

  saveState();
}

function onTaskToggle(e){
  const day = e.target.dataset.day, key = e.target.dataset.key;
  state.roadmap[day].tasks[key] = e.target.checked;
  if(e.target.checked) markActivityToday();
  if(dayIsComplete(state.roadmap[day]) && !state.roadmap[day].completedDate){
    state.roadmap[day].completedDate = todayStr();
    fireConfetti();
    toast(`Day ${day} complete! 🎉`);
  }
  if(!dayIsComplete(state.roadmap[day])) state.roadmap[day].completedDate = null;
  saveState();
  renderAll();
}

/* ---------------------------------------------------------
   5. RENDER: ROADMAP
--------------------------------------------------------- */
function renderRoadmap(){
  const tabsWrap = document.getElementById("weekTabs");
  tabsWrap.innerHTML = "";
  const bounds = weekBounds();
  bounds.forEach((b,i)=>{
    const btn = document.createElement("button");
    btn.className = "week-tab" + (i===0? " active":"");
    btn.textContent = `Week ${i+1} (Day ${b[0]}-${b[1]})`;
    btn.addEventListener("click", ()=>{
      tabsWrap.querySelectorAll(".week-tab").forEach(t=>t.classList.remove("active"));
      btn.classList.add("active");
      drawDayGrid(b[0], b[1]);
    });
    tabsWrap.appendChild(btn);
  });
  drawDayGrid(bounds[0][0], bounds[0][1]);

  document.getElementById("roadmapFilter").oninput = (e)=>{
    const n = parseInt(e.target.value);
    if(n>=1 && n<=40){
      const b = bounds.find(bb=> n>=bb[0] && n<=bb[1]);
      const idx = bounds.indexOf(b);
      tabsWrap.querySelectorAll(".week-tab").forEach((t,i)=>t.classList.toggle("active", i===idx));
      drawDayGrid(b[0], b[1]);
      setTimeout(()=>{
        const card = document.getElementById("day-card-"+n);
        if(card) card.scrollIntoView({behavior:"smooth", block:"center"});
      }, 60);
    }
  };
}

function drawDayGrid(start, end){
  const grid = document.getElementById("dayGrid");
  grid.innerHTML = "";
  for(let d=start; d<=end; d++){
    const meta = ROADMAP[d-1];
    const ds = state.roadmap[d];
    const doneCount = TASK_KEYS.filter(k=>ds.tasks[k]).length;
    const pct = Math.round(doneCount/TASK_KEYS.length*100);
    const card = document.createElement("div");
    card.className = "glass day-card";
    card.id = "day-card-"+d;
    card.innerHTML = `
      <div class="day-card-head">
        <h4>Day ${d}</h4>
        <span class="day-status ${pct===100?"complete":""}">${pct===100?"Complete":pct+"%"}</span>
      </div>
      <div class="day-progress"><div class="day-progress-fill" style="width:${pct}%"></div></div>
      <ul class="day-tasks">
        ${TASK_KEYS.map(k=>`
          <li class="${ds.tasks[k]?"done":""}">
            <input type="checkbox" ${ds.tasks[k]?"checked":""} data-day="${d}" data-key="${k}">
            <span><span class="cat">${TASK_LABELS[k]}</span><span class="label">${meta[k]}</span>${(k==="dsaTopic"||k==="coding") ? dsaHelperLinks(meta[k]) : ""}</span>
          </li>`).join("")}
      </ul>`;
    grid.appendChild(card);
  }
  grid.querySelectorAll("input[type=checkbox]").forEach(cb=>cb.addEventListener("change", onTaskToggle));
}

/* ---------------------------------------------------------
   6. RENDER: DSA TRACKER
--------------------------------------------------------- */
function populateDsaFilter(){
  const sel = document.getElementById("dsaTopicFilter");
  const topics = [...new Set(DSA_QUESTIONS.map(q=>q.topic))];
  topics.forEach(t=>{
    const o = document.createElement("option"); o.value=t; o.textContent=t; sel.appendChild(o);
  });
  sel.addEventListener("change", renderDSA);
}
function renderDSA(){
  const filter = document.getElementById("dsaTopicFilter").value;
  const body = document.getElementById("dsaTableBody");
  body.innerHTML = "";
  DSA_QUESTIONS.filter(q=> filter==="all" || q.topic===filter).forEach(q=>{
    const rec = state.dsa[q.id];
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input type="checkbox" class="check" data-q="${q.id}" data-field="status" ${rec.status?"checked":""}></td>
      <td>${q.name}</td>
      <td>${q.topic}</td>
      <td><span class="diff-badge diff-${q.diff}">${q.diff}</span></td>
      <td>${rec.dateSolved || "—"}</td>
      <td><input type="checkbox" class="check" data-q="${q.id}" data-field="revision" ${rec.revision?"checked":""}></td>
      <td><a class="link-btn" href="${q.link}" target="_blank" rel="noopener">Open ↗</a></td>`;
    body.appendChild(tr);
  });
  body.querySelectorAll("input").forEach(cb=>cb.addEventListener("change", onDsaToggle));
}
function onDsaToggle(e){
  const id = e.target.dataset.q, field = e.target.dataset.field;
  state.dsa[id][field] = e.target.checked;
  if(field==="status"){
    state.dsa[id].dateSolved = e.target.checked ? todayStr() : null;
    if(e.target.checked) markActivityToday();
  }
  saveState();
  renderDSA();
  renderDashboard();
}

/* ---------------------------------------------------------
   7. TIMER (POMODORO)
--------------------------------------------------------- */
let timerState = { totalSeconds:25*60, remaining:25*60, mode:"study", interval:null, running:false };
const RING_CIRCUMFERENCE = 2*Math.PI*100;

function setupTimer(){
  document.getElementById("ringFg").style.strokeDasharray = RING_CIRCUMFERENCE;
  document.querySelectorAll(".mode-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      document.querySelectorAll(".mode-btn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      const customRow = document.getElementById("customRow");
      if(btn.dataset.mins === "custom"){ customRow.style.display="flex"; return; }
      customRow.style.display="none";
      setTimerMinutes(parseInt(btn.dataset.mins));
    });
  });
  document.getElementById("applyCustom").addEventListener("click", ()=>{
    const v = parseInt(document.getElementById("customMinutes").value);
    if(v>0) setTimerMinutes(v);
  });
  document.getElementById("timerStart").addEventListener("click", startTimer);
  document.getElementById("timerPause").addEventListener("click", pauseTimer);
  document.getElementById("timerReset").addEventListener("click", ()=> setTimerMinutes(timerState.totalSeconds/60));
  document.getElementById("timerSkip").addEventListener("click", ()=>{ pauseTimer(); setTimerMinutes(5); });
  setTimerMinutes(25);
  renderSessionLog();
}
function setTimerMinutes(mins){
  pauseTimer();
  timerState.totalSeconds = mins*60;
  timerState.remaining = mins*60;
  updateTimerDisplay();
}
function startTimer(){
  if(timerState.running) return;
  timerState.running = true;
  timerState.interval = setInterval(()=>{
    timerState.remaining--;
    updateTimerDisplay();
    if(timerState.remaining<=0){
      clearInterval(timerState.interval);
      timerState.running = false;
      completeSession();
    }
  },1000);
}
function pauseTimer(){
  timerState.running = false;
  clearInterval(timerState.interval);
}
function updateTimerDisplay(){
  const m = Math.floor(timerState.remaining/60).toString().padStart(2,"0");
  const s = (timerState.remaining%60).toString().padStart(2,"0");
  document.getElementById("timerDisplay").textContent = `${m}:${s}`;
  const frac = timerState.remaining/timerState.totalSeconds;
  document.getElementById("ringFg").style.strokeDashoffset = RING_CIRCUMFERENCE*(1-frac);
}
function completeSession(){
  const minutes = Math.round(timerState.totalSeconds/60);
  state.timer.sessions.push({date:todayStr(), minutes, time:new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})});
  state.timer.totalMinutes += minutes;
  markActivityToday();
  saveState();
  fireConfetti();
  playAlarmSound();
  showBrowserNotification("Session complete", `${minutes} min logged. Time for a break or the next round.`);
  toast(`🔔 Session complete — ${minutes} min logged!`);
  renderSessionLog();
  renderDashboard();
}
function renderSessionLog(){
  const today = todayStr();
  const todays = state.timer.sessions.filter(s=>s.date===today);
  document.getElementById("sessionsCompleted").textContent = todays.length;
  document.getElementById("hoursTotalTimer").textContent = (state.timer.totalMinutes/60).toFixed(1)+"h";
  const log = document.getElementById("sessionLog");
  log.innerHTML = "";
  if(!state.timer.sessions.length){ log.innerHTML = `<li class="empty">No sessions yet. Hit Start.</li>`; return; }
  [...state.timer.sessions].slice(-15).reverse().forEach(s=>{
    const li = document.createElement("li");
    li.innerHTML = `<span>${s.date} · ${s.time}</span><span class="tag">${s.minutes} min</span>`;
    log.appendChild(li);
  });
}

/* ---------------------------------------------------------
   7b. ALARMS (session alarm + daily study reminder)
--------------------------------------------------------- */
let audioCtx = null;
function playAlarmSound(){
  if(!state.alarms.soundEnabled) return;
  try{
    if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioCtx.currentTime;
    // three quick beeps
    [0, 0.35, 0.7].forEach(offset=>{
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now+offset);
      gain.gain.setValueAtTime(0.0001, now+offset);
      gain.gain.exponentialRampToValueAtTime(0.25, now+offset+0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now+offset+0.28);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(now+offset); osc.stop(now+offset+0.3);
    });
  }catch(e){ /* audio not available — fail silently */ }
}
function showBrowserNotification(title, body){
  if(!state.alarms.notifyEnabled) return;
  if(!("Notification" in window)) return;
  if(Notification.permission === "granted"){
    new Notification(title, {body, icon:""});
  }
}
function setupAlarms(){
  const soundToggle = document.getElementById("soundEnabledToggle");
  const notifyToggle = document.getElementById("notifyEnabledToggle");
  const permHint = document.getElementById("notifyPermHint");
  const dailyToggle = document.getElementById("dailyAlarmToggle");
  const dailyTimeInput = document.getElementById("dailyAlarmTime");
  const dailyStatus = document.getElementById("dailyAlarmStatus");

  soundToggle.checked = state.alarms.soundEnabled;
  notifyToggle.checked = state.alarms.notifyEnabled;
  dailyToggle.checked = state.alarms.dailyEnabled;
  if(state.alarms.dailyTime) dailyTimeInput.value = state.alarms.dailyTime;

  function refreshPermHint(){
    if(!("Notification" in window)){ permHint.textContent = "Browser notifications aren't supported here."; permHint.className="alarm-hint warn"; return; }
    if(Notification.permission === "granted"){ permHint.textContent = "Notifications allowed."; permHint.className="alarm-hint ok"; }
    else if(Notification.permission === "denied"){ permHint.textContent = "Notifications blocked in browser settings."; permHint.className="alarm-hint warn"; }
    else { permHint.textContent = "You'll be asked to allow notifications."; permHint.className="alarm-hint"; }
  }
  refreshPermHint();

  soundToggle.addEventListener("change", ()=>{
    state.alarms.soundEnabled = soundToggle.checked;
    saveState();
    if(soundToggle.checked) playAlarmSound();
  });

  notifyToggle.addEventListener("change", ()=>{
    if(notifyToggle.checked && "Notification" in window && Notification.permission==="default"){
      Notification.requestPermission().then(()=>{ refreshPermHint(); });
    }
    state.alarms.notifyEnabled = notifyToggle.checked;
    saveState();
    refreshPermHint();
  });

  document.getElementById("testAlarmBtn").addEventListener("click", ()=>{
    playAlarmSound();
    showBrowserNotification("Test alarm", "This is what your session alarm sounds like.");
    toast("🔔 Test alarm played");
  });

  document.getElementById("saveDailyAlarmBtn").addEventListener("click", ()=>{
    state.alarms.dailyEnabled = dailyToggle.checked;
    state.alarms.dailyTime = dailyTimeInput.value || "18:00";
    saveState();
    updateDailyAlarmStatus();
    if(dailyToggle.checked && "Notification" in window && Notification.permission==="default"){
      Notification.requestPermission().then(refreshPermHint);
    }
    toast(dailyToggle.checked ? `Daily reminder set for ${state.alarms.dailyTime}` : "Daily reminder turned off");
  });

  function updateDailyAlarmStatus(){
    if(state.alarms.dailyEnabled && state.alarms.dailyTime){
      dailyStatus.textContent = `Reminder active — every day at ${state.alarms.dailyTime}.`;
      dailyStatus.className = "alarm-hint ok";
    } else {
      dailyStatus.textContent = "No daily reminder set.";
      dailyStatus.className = "alarm-hint";
    }
  }
  updateDailyAlarmStatus();

  // check every 20s whether the daily reminder time has arrived
  setInterval(()=>{
    if(!state.alarms.dailyEnabled || !state.alarms.dailyTime) return;
    const now = new Date();
    const hh = String(now.getHours()).padStart(2,"0");
    const mm = String(now.getMinutes()).padStart(2,"0");
    const current = `${hh}:${mm}`;
    const today = todayStr();
    if(current === state.alarms.dailyTime && state.alarms.lastFiredDate !== today){
      state.alarms.lastFiredDate = today;
      saveState();
      playAlarmSound();
      showBrowserNotification("Time to study 📚", "Your daily TCS prep reminder — let's go.");
      toast("⏰ It's your study time — let's go!");
    }
  }, 20000);
}

/* ---------------------------------------------------------
   8. PERFORMANCE CHARTS
--------------------------------------------------------- */
function chartColors(){
  const styles = getComputedStyle(document.documentElement);
  return {
    accent: styles.getPropertyValue("--accent").trim(),
    accent2: styles.getPropertyValue("--accent-2").trim(),
    text: styles.getPropertyValue("--text-muted").trim(),
    grid: styles.getPropertyValue("--border").trim(),
    teal: styles.getPropertyValue("--teal").trim(),
    amber: styles.getPropertyValue("--amber").trim(),
    rose: styles.getPropertyValue("--rose").trim()
  };
}
function destroyChart(key){ if(chartRefs[key]){ chartRefs[key].destroy(); delete chartRefs[key]; } }

function renderPerformanceCharts(){
  const c = chartColors();
  // Questions solved per day (last 14 days incl today) based on dateSolved
  const days = [];
  for(let i=13;i>=0;i--){ const d=new Date(); d.setDate(d.getDate()-i); days.push(d.toISOString().slice(0,10)); }
  const qPerDay = days.map(d => Object.values(state.dsa).filter(q=>q.dateSolved===d).length);
  destroyChart("qPerDay");
  chartRefs.qPerDay = new Chart(document.getElementById("chartQPerDay"), {
    type:"bar",
    data:{labels:days.map(d=>d.slice(5)), datasets:[{label:"Questions", data:qPerDay, backgroundColor:c.accent, borderRadius:6}]},
    options: baseChartOpts(c)
  });

  const hoursPerDay = days.map(d => Math.round(state.timer.sessions.filter(s=>s.date===d).reduce((a,b)=>a+b.minutes,0)/6)/10);
  destroyChart("hours");
  chartRefs.hours = new Chart(document.getElementById("chartHours"), {
    type:"line",
    data:{labels:days.map(d=>d.slice(5)), datasets:[{label:"Hours", data:hoursPerDay, borderColor:c.accent2, backgroundColor:"transparent", tension:.35, pointRadius:2}]},
    options: baseChartOpts(c)
  });

  const cats = ["dsaTopic","coding","aptitude","reasoning","english","cs"];
  const catLabels = {dsaTopic:"DSA", coding:"Coding", aptitude:"Aptitude", reasoning:"Reasoning", english:"English", cs:"CS Fund."};
  const catData = cats.map(k => Math.round(Object.values(state.roadmap).filter(d=>d.tasks[k]).length / TOTAL_DAYS * 100));
  destroyChart("topicCompletion");
  chartRefs.topicCompletion = new Chart(document.getElementById("chartTopicCompletion"), {
    type:"bar",
    data:{labels:cats.map(k=>catLabels[k]), datasets:[{label:"% complete", data:catData, backgroundColor:[c.accent,c.accent2,c.teal,c.amber,c.rose,c.accent], borderRadius:6}]},
    options: {...baseChartOpts(c), indexAxis:"y"}
  });

  const diffCounts = {Easy:0, Medium:0, Hard:0};
  DSA_QUESTIONS.forEach(q=>{ if(state.dsa[q.id].status) diffCounts[q.diff]++; });
  destroyChart("difficulty");
  chartRefs.difficulty = new Chart(document.getElementById("chartDifficulty"), {
    type:"doughnut",
    data:{labels:["Easy","Medium","Hard"], datasets:[{data:[diffCounts.Easy,diffCounts.Medium,diffCounts.Hard], backgroundColor:[c.teal,c.amber,c.rose], borderWidth:0}]},
    options:{plugins:{legend:{position:"bottom", labels:{color:c.text, boxWidth:10, font:{size:11}}}}, maintainAspectRatio:false}
  });

  document.getElementById("perfStreak").textContent = computeStreak(state);
  document.getElementById("perfLongestStreak").textContent = computeLongestStreak(state);
  const attempted = DSA_QUESTIONS.length;
  const solved = countSolved(state);
  document.getElementById("perfSuccessRate").textContent = attempted? Math.round(solved/attempted*100)+"%" : "0%";
  const revisionPending = Object.values(state.dsa).filter(q=>q.revision && q.status).length;
  document.getElementById("perfRevisionPending").textContent = revisionPending;

  const weak = cats.map((k,i)=>({k, pct:catData[i]})).filter(x=>x.pct<50).map(x=>catLabels[x.k]);
  const weakList = document.getElementById("weakTopicsList");
  weakList.innerHTML = weak.length ? weak.map(w=>`<div class="badge">⚠ ${w}</div>`).join("") : `<div class="badge">🎯 No weak areas — solid work!</div>`;
}
function baseChartOpts(c){
  return {
    maintainAspectRatio:false,
    plugins:{legend:{display:false}},
    scales:{
      x:{ticks:{color:c.text, font:{size:10}}, grid:{color:c.grid}},
      y:{ticks:{color:c.text, font:{size:10}}, grid:{color:c.grid}, beginAtZero:true}
    }
  };
}

/* ---------------------------------------------------------
   9. WEEKLY ANALYTICS
--------------------------------------------------------- */
function renderWeeklyCharts(){
  const c = chartColors();
  const bounds = weekBounds();
  const weeklyPct = bounds.map((b,i)=>weekCompletionPct(state,i));
  destroyChart("weeklyBar");
  chartRefs.weeklyBar = new Chart(document.getElementById("chartWeeklyBar"), {
    type:"bar",
    data:{labels:bounds.map((b,i)=>`W${i+1}`), datasets:[{label:"% complete", data:weeklyPct, backgroundColor:c.accent, borderRadius:8}]},
    options: baseChartOpts(c)
  });

  const curDay = getCurrentDayNum(state);
  const curWeekIdx = bounds.findIndex(b=> curDay>=b[0] && curDay<=b[1]);
  const [ws,we] = bounds[curWeekIdx] || bounds[bounds.length-1];
  const cats = ["dsaTopic","coding","aptitude","reasoning","english","cs"];
  const catLabels = ["DSA","Coding","Aptitude","Reasoning","English","CS Fund."];
  const radarData = cats.map(k=>{
    let done=0,total=0;
    for(let d=ws; d<=we; d++){ total++; if(state.roadmap[d].tasks[k]) done++; }
    return total? Math.round(done/total*100) : 0;
  });
  destroyChart("radar");
  chartRefs.radar = new Chart(document.getElementById("chartRadar"), {
    type:"radar",
    data:{labels:catLabels, datasets:[{label:"This Week", data:radarData, backgroundColor:c.accent+"33", borderColor:c.accent, pointBackgroundColor:c.accent2}]},
    options:{maintainAspectRatio:false, scales:{r:{angleLines:{color:c.grid}, grid:{color:c.grid}, pointLabels:{color:c.text, font:{size:10}}, ticks:{display:false, backdropColor:"transparent"}, suggestedMin:0, suggestedMax:100}}, plugins:{legend:{labels:{color:c.text}}}}
  });

  const cardsWrap = document.getElementById("weekCards");
  cardsWrap.innerHTML = "";
  bounds.forEach((b,i)=>{
    const pct = weeklyPct[i];
    const card = document.createElement("div");
    card.className = "glass week-card";
    card.innerHTML = `<h4>Week ${i+1} · Day ${b[0]}-${b[1]}</h4><div class="pct-big">${pct}%</div><div class="mini-bar"><div class="mini-bar-fill" style="width:${pct}%"></div></div>`;
    cardsWrap.appendChild(card);
  });
}

/* ---------------------------------------------------------
   10. NOTES
--------------------------------------------------------- */
let activeNoteId = null;
function setupNotes(){
  document.getElementById("newNoteBtn").addEventListener("click", ()=>{
    const note = {id:"n"+Date.now(), title:"Untitled note", body:"", pinned:false, updated:Date.now()};
    state.notes.unshift(note);
    activeNoteId = note.id;
    saveState(); renderNotesList(); loadNoteIntoEditor(note);
  });
  document.getElementById("noteTitleInput").addEventListener("input", saveActiveNote);
  document.getElementById("noteBody").addEventListener("input", saveActiveNote);
  document.getElementById("pinNoteBtn").addEventListener("click", ()=>{
    const n = state.notes.find(x=>x.id===activeNoteId); if(!n) return;
    n.pinned = !n.pinned; saveState(); renderNotesList();
  });
  document.getElementById("deleteNoteBtn").addEventListener("click", ()=>{
    if(!activeNoteId) return;
    state.notes = state.notes.filter(n=>n.id!==activeNoteId);
    activeNoteId = null;
    saveState(); renderNotesList();
    document.getElementById("noteTitleInput").value = "";
    document.getElementById("noteBody").innerHTML = "";
  });
  document.querySelectorAll(".note-toolbar [data-cmd]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      document.execCommand(btn.dataset.cmd, false, btn.dataset.val || null);
      document.getElementById("noteBody").focus();
    });
  });
  document.getElementById("notesSearch").addEventListener("input", renderNotesList);
}
function saveActiveNote(){
  const n = state.notes.find(x=>x.id===activeNoteId); if(!n) return;
  n.title = document.getElementById("noteTitleInput").value || "Untitled note";
  n.body = document.getElementById("noteBody").innerHTML;
  n.updated = Date.now();
  markActivityToday();
  saveState(); renderNotesList(true);
}
function loadNoteIntoEditor(n){
  document.getElementById("noteTitleInput").value = n.title;
  document.getElementById("noteBody").innerHTML = n.body;
}
function renderNotesList(skipReorder){
  const q = (document.getElementById("notesSearch").value || "").toLowerCase();
  const wrap = document.getElementById("notesList");
  wrap.innerHTML = "";
  const sorted = [...state.notes].sort((a,b)=> (b.pinned-a.pinned) || (b.updated-a.updated));
  const filtered = sorted.filter(n => n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q));
  if(!filtered.length){ wrap.innerHTML = `<div class="note-item empty">No notes yet. Click "+ New Note".</div>`; return; }
  filtered.forEach(n=>{
    const div = document.createElement("div");
    div.className = "note-item" + (n.id===activeNoteId ? " active":"");
    const preview = n.body.replace(/<[^>]+>/g," ").trim().slice(0,60);
    div.innerHTML = `<div class="n-title"><span>${n.pinned?"📌 ":""}${n.title}</span></div><div class="n-preview">${preview||"Empty note"}</div>`;
    div.addEventListener("click", ()=>{ activeNoteId = n.id; loadNoteIntoEditor(n); renderNotesList(true); });
    wrap.appendChild(div);
  });
}

/* ---------------------------------------------------------
   11. REVISION SCHEDULER
--------------------------------------------------------- */
function getRevisionQueue(){
  // For each completed day task, schedule revisions at +1, +3, +7, +15 days
  const intervals = [1,3,7,15];
  const now = new Date(); now.setHours(0,0,0,0);
  const overdue=[], today=[], upcoming=[];
  Object.entries(state.roadmap).forEach(([d, ds])=>{
    if(!ds.completedDate) return;
    const base = new Date(ds.completedDate);
    intervals.forEach(iv=>{
      const due = new Date(base); due.setDate(due.getDate()+iv);
      const diffDays = Math.round((now-due)/86400000);
      const item = {label:`Day ${d} — revise after ${iv} day${iv>1?"s":""}`, due:due.toISOString().slice(0,10), daysOverdue:diffDays};
      if(diffDays>0) overdue.push(item);
      else if(diffDays===0) today.push(item);
      else upcoming.push(item);
    });
  });
  overdue.sort((a,b)=>b.daysOverdue-a.daysOverdue);
  upcoming.sort((a,b)=> a.due.localeCompare(b.due));
  return {overdue, today, upcoming};
}
function renderRevision(){
  const {overdue, today, upcoming} = getRevisionQueue();
  fillList("revisionOverdue", overdue, r=>`<span>${r.label}</span><span class="tag">${r.daysOverdue}d overdue</span>`, "All caught up — nothing overdue.");
  fillList("revisionToday", today, r=>`<span>${r.label}</span><span class="tag">Today</span>`, "Nothing scheduled for today.");
  fillList("revisionUpcoming", upcoming.slice(0,20), r=>`<span>${r.label}</span><span class="tag">${r.due}</span>`, "No upcoming revisions yet — complete a day to start the cycle.");
}
function fillList(id, arr, tpl, emptyMsg){
  const el = document.getElementById(id);
  el.innerHTML = arr.length ? arr.map(x=>`<li>${tpl(x)}</li>`).join("") : `<li class="empty">${emptyMsg}</li>`;
}

/* ---------------------------------------------------------
   12. MOCK TESTS
--------------------------------------------------------- */
function setupMocksUI(){
  document.getElementById("addMockBtn").addEventListener("click", ()=>{
    const body = document.getElementById("mockTableBody");
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input type="date" id="newMockDate" class="input-inline" value="${todayStr()}"></td>
      <td><input type="text" id="newMockPlatform" class="input-inline" placeholder="TCS iON" style="width:100px"></td>
      <td><input type="number" id="newMockScore" class="input-inline" placeholder="Score" style="width:70px"></td>
      <td><input type="number" id="newMockAccuracy" class="input-inline" placeholder="%" style="width:60px"></td>
      <td><input type="text" id="newMockTime" class="input-inline" placeholder="45 min" style="width:70px"></td>
      <td><input type="text" id="newMockRank" class="input-inline" placeholder="Rank" style="width:60px"></td>
      <td><input type="text" id="newMockRemarks" class="input-inline" placeholder="Remarks" style="width:100px"></td>
      <td><button class="btn small primary" id="saveMockRow">Save</button></td>`;
    body.prepend(tr);
    document.getElementById("saveMockRow").addEventListener("click", ()=>{
      const m = {
        id:"m"+Date.now(),
        date:document.getElementById("newMockDate").value || todayStr(),
        platform:document.getElementById("newMockPlatform").value || "—",
        score:document.getElementById("newMockScore").value || "0",
        accuracy:document.getElementById("newMockAccuracy").value || "0",
        time:document.getElementById("newMockTime").value || "—",
        rank:document.getElementById("newMockRank").value || "—",
        remarks:document.getElementById("newMockRemarks").value || ""
      };
      state.mocks.push(m);
      markActivityToday();
      saveState();
      renderMocksTable();
      toast("Mock test logged");
    });
  });
}
function renderMocksTable(){
  const body = document.getElementById("mockTableBody");
  body.innerHTML = "";
  if(!state.mocks.length){ body.innerHTML = `<tr><td colspan="8" style="text-align:center; color:var(--text-faint)">No mock tests logged yet.</td></tr>`; return; }
  [...state.mocks].sort((a,b)=>b.date.localeCompare(a.date)).forEach(m=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${m.date}</td><td>${m.platform}</td><td>${m.score}</td><td>${m.accuracy}%</td><td>${m.time}</td><td>${m.rank}</td><td>${m.remarks}</td>
      <td><button class="btn small ghost" data-del="${m.id}">✕</button></td>`;
    body.appendChild(tr);
  });
  body.querySelectorAll("[data-del]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      state.mocks = state.mocks.filter(m=>m.id!==btn.dataset.del);
      saveState(); renderMocksTable(); renderMockChart();
    });
  });
}
function renderMockChart(){
  const c = chartColors();
  const sorted = [...state.mocks].sort((a,b)=>a.date.localeCompare(b.date));
  destroyChart("mocks");
  chartRefs.mocks = new Chart(document.getElementById("chartMocks"), {
    type:"line",
    data:{labels:sorted.map(m=>m.date), datasets:[
      {label:"Score", data:sorted.map(m=>Number(m.score)), borderColor:c.accent, backgroundColor:"transparent", tension:.3},
      {label:"Accuracy %", data:sorted.map(m=>Number(m.accuracy)), borderColor:c.teal, backgroundColor:"transparent", tension:.3}
    ]},
    options:{maintainAspectRatio:false, plugins:{legend:{labels:{color:c.text}}}, scales:{x:{ticks:{color:c.text}}, y:{ticks:{color:c.text}, grid:{color:c.grid}}}}
  });
}

/* ---------------------------------------------------------
   13. GOALS
--------------------------------------------------------- */
function renderGoals(){
  const grid = document.getElementById("goalsGrid");
  const solvedToday = DSA_QUESTIONS.filter(q=>state.dsa[q.id].dateSolved===todayStr()).length;
  const hoursToday = minutesToday(state)/60;
  const bounds = weekBounds();
  const curDay = getCurrentDayNum(state);
  const curWeek = bounds.find(b=>curDay>=b[0] && curDay<=b[1]) || bounds[0];
  const mocksThisWeek = state.mocks.filter(m=> m.date >= new Date(Date.now()-7*86400000).toISOString().slice(0,10)).length;
  const revisionDueToday = getRevisionQueue().today.length + getRevisionQueue().overdue.length;

  const goalDefs = [
    {key:"questionsPerDay", label:"Questions / Day", value:solvedToday, unit:""},
    {key:"studyHours", label:"Study Hours / Day", value:Math.round(hoursToday*10)/10, unit:"h"},
    {key:"mockTestsPerWeek", label:"Mock Tests / Week", value:mocksThisWeek, unit:""},
    {key:"revisionPerDay", label:"Revisions Cleared", value:Math.max(0, state.goals.revisionPerDay-revisionDueToday), unit:""}
  ];
  grid.innerHTML = "";
  goalDefs.forEach(g=>{
    const target = state.goals[g.key] || 1;
    const pct = Math.min(100, Math.round(g.value/target*100));
    const r = 52, circ = 2*Math.PI*r;
    const card = document.createElement("div");
    card.className = "glass goal-card";
    card.innerHTML = `
      <h4>${g.label}</h4>
      <div class="goal-ring">
        <svg viewBox="0 0 120 120" width="120" height="120">
          <circle class="goal-ring-bg" cx="60" cy="60" r="${r}"></circle>
          <circle class="goal-ring-fg" cx="60" cy="60" r="${r}" stroke-dasharray="${circ}" stroke-dashoffset="${circ*(1-pct/100)}"></circle>
        </svg>
        <div class="goal-ring-label">${g.value}${g.unit}/${target}${g.unit}</div>
      </div>
      <div class="goal-input">
        <span style="font-size:12px;color:var(--text-muted)">Target:</span>
        <input type="number" min="1" value="${target}" data-goal="${g.key}">
      </div>`;
    grid.appendChild(card);
  });
  grid.querySelectorAll("[data-goal]").forEach(inp=>{
    inp.addEventListener("change", ()=>{
      state.goals[inp.dataset.goal] = Math.max(1, parseInt(inp.value)||1);
      saveState(); renderGoals();
    });
  });
}

/* ---------------------------------------------------------
   14. RESOURCES
--------------------------------------------------------- */
function renderResources(){
  const grid = document.getElementById("resourceGrid");
  grid.innerHTML = "";
  RESOURCES.forEach(r=>{
    const a = document.createElement("a");
    a.className = "glass resource-card";
    a.href = r.url; a.target = "_blank"; a.rel = "noopener";
    a.innerHTML = `<div class="r-icon">${r.tag}</div><h4>${r.name}</h4><p>${r.desc}</p>`;
    grid.appendChild(a);
  });
}

/* ---------------------------------------------------------
   15. SETTINGS
--------------------------------------------------------- */
function applyTheme(){ document.documentElement.setAttribute("data-theme", state.theme); }
function applyAccent(){
  const [a1,a2] = ACCENTS[state.accent] || ACCENTS.indigo;
  document.documentElement.style.setProperty("--accent", a1);
  document.documentElement.style.setProperty("--accent-2", a2);
}
function setupSettings(){
  document.getElementById("themeDark").addEventListener("click", ()=>{ state.theme="dark"; applyTheme(); saveState(); });
  document.getElementById("themeLight").addEventListener("click", ()=>{ state.theme="light"; applyTheme(); saveState(); });

  const accentRow = document.getElementById("accentRow");
  Object.entries(ACCENTS).forEach(([name, colors])=>{
    const dot = document.createElement("div");
    dot.className = "accent-dot" + (state.accent===name ? " active":"");
    dot.style.background = `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
    dot.addEventListener("click", ()=>{
      state.accent = name; applyAccent(); saveState();
      accentRow.querySelectorAll(".accent-dot").forEach(d=>d.classList.remove("active"));
      dot.classList.add("active");
    });
    accentRow.appendChild(dot);
  });

  document.getElementById("exportBtn").addEventListener("click", exportData);
  document.getElementById("exportQuickBtn").addEventListener("click", exportData);
  document.getElementById("importInput").addEventListener("change", importData);
  document.getElementById("resetBtn").addEventListener("click", ()=>{
    if(confirm("This will permanently erase all saved progress. Continue?")){
      state = defaultState();
      saveState();
      location.reload();
    }
  });
}
function exportData(){
  const blob = new Blob([JSON.stringify(state, null, 2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "tcs-dashboard-backup.json"; a.click();
  URL.revokeObjectURL(url);
  toast("Data exported");
}
function importData(e){
  const file = e.target.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = ()=>{
    try{
      const parsed = JSON.parse(reader.result);
      state = Object.assign(defaultState(), parsed);
      saveState();
      toast("Data imported");
      location.reload();
    }catch(err){ toast("Import failed — invalid file"); }
  };
  reader.readAsText(file);
}

/* ---------------------------------------------------------
   16. KEYBOARD SHORTCUTS
--------------------------------------------------------- */
function setupKeyboardShortcuts(){
  let gPressed = false;
  document.addEventListener("keydown", (e)=>{
    const tag = (e.target.tagName||"").toLowerCase();
    const typing = tag==="input" || tag==="textarea" || e.target.isContentEditable;
    if(e.key.toLowerCase()==="/" && !typing){ e.preventDefault(); document.getElementById("globalSearch").focus(); return; }
    if(typing) return;
    if(e.key.toLowerCase()==="g"){ gPressed = true; setTimeout(()=>gPressed=false, 800); return; }
    if(gPressed){
      const map = {d:"dashboard", r:"roadmap", t:"timer"};
      const page = map[e.key.toLowerCase()];
      if(page){ goToPage(page); gPressed=false; }
      return;
    }
    if(e.key===" " && document.getElementById("page-timer").classList.contains("active")){
      e.preventDefault();
      timerState.running ? pauseTimer() : startTimer();
    }
  });
}

/* ---------------------------------------------------------
   17. TOAST + CONFETTI
--------------------------------------------------------- */
let toastTimeout;
function toast(msg){
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(()=>el.classList.remove("show"), 2600);
}

function fireConfetti(){
  const canvas = document.getElementById("confettiCanvas");
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  const colors = Object.values(ACCENTS[state.accent]||ACCENTS.indigo).concat(["#14b8a6","#f59e0b"]);
  const particles = Array.from({length:80}, ()=>({
    x: Math.random()*canvas.width, y:-20, r: 4+Math.random()*5,
    vy: 2+Math.random()*3, vx: -2+Math.random()*4,
    color: colors[Math.floor(Math.random()*colors.length)],
    rot: Math.random()*360, vr: -6+Math.random()*12
  }));
  let frame=0;
  function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    particles.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy; p.rot+=p.vr;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot*Math.PI/180);
      ctx.fillStyle = p.color; ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*0.6);
      ctx.restore();
    });
    frame++;
    if(frame<110) requestAnimationFrame(draw); else ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  draw();
}

/* ---------------------------------------------------------
   18. GLOBAL SEARCH (lightweight jump)
--------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", ()=>{
  const search = document.getElementById("globalSearch");
  search.addEventListener("keydown", (e)=>{
    if(e.key !== "Enter") return;
    const q = search.value.toLowerCase().trim();
    if(!q) return;
    const dayMatch = ROADMAP.find(d => d.dsaTopic.toLowerCase().includes(q) || d.aptitude.toLowerCase().includes(q) || d.cs.toLowerCase().includes(q));
    const qMatch = DSA_QUESTIONS.find(x => x.name.toLowerCase().includes(q));
    if(qMatch){ goToPage("dsa"); }
    else if(dayMatch){ goToPage("roadmap"); document.getElementById("roadmapFilter").value = dayMatch.day; document.getElementById("roadmapFilter").dispatchEvent(new Event("input")); }
    else { toast("No match found for \u201C"+search.value+"\u201D"); }
  });
});

})();
