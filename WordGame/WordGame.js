const wordlist=[ "consider", "minute", "accord", "evident", "practice", "intend", "concern", "commit", "issue", "approach",
    "establish", "utter", "conduct", "engage", "obtain", "scarce", "policy", "straight", "stock", "apparent",
    "property", "fancy", "concept", "court", "appoint", "passage", "vain", "instance", "coast", "project",
    "commission", "constant", "circumstances", "constitute", "level", "affect", "institute", "render", "appeal", "generate",
    "theory", "range", "campaign", "league", "labor", "confer", "grant", "dwell", "entertain", "contract",
    "earnest", "yield", "wander", "insist", "knight", "convince", "inspire", "convention", "skill", "harry",
    "financial", "reflect", "novel", "furnish", "compel", "venture", "territory", "temper", "bent", "intimate",
    "undertake", "majority", "assert", "crew", "chamber", "humble", "scheme", "keen", "liberal", "despair",
    "tide", "attitude", "justify", "flag", "merit", "manifest", "notion", "scale", "formal", "resource",
    "persist", "contempt", "tour", "plead", "weigh", "mode", "distinction", "inclined", "attribute", "exert",
    "oppress", "contend", "stake", "toil", "perish", "disposition", "rail", "cardinal", "boast", "advocate",
    "bestow", "allege", "notwithstanding", "lofty", "multitude", "steep", "heed", "modest", "partial", "apt",
    "esteem", "credible", "provoke", "tread", "ascertain", "fare", "cede", "perpetual", "decree", "contrive",  "consider","minute","accord","evident","practice","intend","concern","commit","issue","approach","establish","utter","conduct","engage","obtain","scarce","policy","straight","stock","apparent","property","fancy","concept","court","appoint","passage","vain","instance","coast","project","commission","constant","circumstances","constitute","level","affect","institute","render","appeal","generate","theory","range","campaign","league","labor","confer","grant","dwell","entertain","contract","earnest","yield","wander","insist","knight","convince","inspire","convention","skill","harry","financial","reflect","novel","furnish","compel","venture","territory","temper","bent","intimate","undertake","majority","assert","crew","chamber","humble","scheme"];
let seen=[];
const rowsPerPage = 10;
let attempt=3;
let points=0;
let scores=[];
function output(){
    document.getElementById("title").textContent="Go";
    document.getElementById("wordBox").textContent="Press Seen/New";
    document.getElementById("pts").textContent=points;
}
function seenNext(){
    if(gameOver()){
        document.getElementById("title").textContent="Gameover Press Restart/Start";
    }
    if(!gameOver()){
        const index=getRandomInt(0,wordlist.length-1);
        const word=wordlist[index];
        document.getElementById("wordBox").textContent=word;
        if(!isSeen(word)){
            points=points+1;
            document.getElementById("pts").textContent=points;
        }
        if(!isSeen(word)){
            seen.push(word);
            attempt=attempt-1;
        }
    }
}
function next(){
    if(gameOver()){
        document.getElementById("title").textContent="Gameover Press Restart/Start";
    }
    if(!gameOver()){
        const index=getRandomInt(0,wordlist.length-1);
        const word=wordlist[index];
        document.getElementById("wordBox").textContent=word;
        if(isSeen(word)){
            attempt=attempt-1;
            document.getElementById("title").textContent="Lives:"+attempt;
        }
        if(!isSeen(word)){
            document.getElementById("title").textContent="Lives:"+attempt;
            seen.push(word);
            points=points+1;
            document.getElementById("pts").textContent="Points:"+points;
        }
    }
    
}
function getRandomInt(min, max) {
    min = Math.ceil(min);   // inclusive lower bound
    max = Math.floor(max);  // inclusive upper bound
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isSeen(word){
    return seen.indexOf(word)!=-1;
}
function gameOver(){
    return attempt==0;
}
function restart(){
    scores.push(points);
    seen=[];
    attempt=3;
    points=0;
    displayPage(1);
    createPaginationButtons();
    output();
}
function displayPage(page) {
    const tbody = document.getElementById("scoreTally");
    tbody.innerHTML = "";

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    scores.sort((a, b) => b - a);
    const pageScores = scores.slice(start, end);

    pageScores.forEach((score, index) => {
        const row = document.createElement("tr");

        const indexCell = document.createElement("td");
        indexCell.textContent = start + index + 1;

        const valueCell = document.createElement("td");
        valueCell.textContent = score;

        row.appendChild(indexCell);
        row.appendChild(valueCell);
        tbody.appendChild(row);
    });
    
}
function createPaginationButtons() {
    let totalPages=Math.ceil(scores.length/rowsPerPage);
    const container = document.getElementById("pagesButtons");
    container.innerHTML = ""; // Clear existing buttons

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = "btn btn-secondary";
        btn.addEventListener("click", () => displayPage(i));
        container.appendChild(btn);
    }
}


