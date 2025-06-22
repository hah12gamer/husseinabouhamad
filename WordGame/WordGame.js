const wordlist=["AAA","AAB","ABA","ABB","BAB","BBB",];
let seen=[];
let attempt=3;
let points=0;
let scores=[];
function output(){
    document.getElementById("title").textContent="Word";
    document.getElementById("wordBox").textContent="Word";
    document.getElementById("pts").textContent=points;
}
function seenNext(){
    if(gameOver()){
        document.getElementById("title").textContent="Gameover";
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
        document.getElementById("title").textContent="Gameover";
    }
    if(!gameOver()){
        const index=getRandomInt(0,wordlist.length-1);
        const word=wordlist[index];
        document.getElementById("wordBox").textContent=word;
        if(isSeen(word)){
            attempt=attempt-1;
            document.getElementById("title").textContent=attempt;
        }
        if(!isSeen(word)){
            document.getElementById("title").textContent=attempt;
            seen.push(word);
            points=points+1;
            document.getElementById("pts").textContent=points;
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
    displayScoreBoard()
    output();
}
function displayScoreBoard(){
    scores.sort((a, b) => b - a);
    document.getElementById("scoreTally").innerHTML="";
    const tbody = document.getElementById("scoreTally");
    scores.forEach((num, index) => {
        const row = document.createElement("tr");
        const indexCell = document.createElement("td");
        indexCell.textContent = index + 1;
        const valueCell = document.createElement("td");
        valueCell.textContent = num;
        row.appendChild(indexCell);
        row.appendChild(valueCell);
        tbody.appendChild(row);
    });
}
