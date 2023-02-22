
let i = 0;
let lastIndex = -1;

function clearHighlighting() {
    const highlightedWords = document.querySelectorAll(".highlighted-word");
    highlightedWords.forEach((word) => {
        word.classList.remove("highlighted-word--active");
    });
}

function reset() {
    clearHighlighting();
    lastIndex = -1;
    i = 0;
}

function isAlphaNumeric(str) {
    let code, i, len;
    for (i = 0, len = str.length; i < len; i++) {
        code = str.charCodeAt(i);
        if (!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123)) { // lower alpha (a-z)
            return false;
        }
    }
    return true;
}

function isWord(str) {
    let code, i, len;
    for (i = 0, len = str.length; i < len; i++) {
        code = str[i];
        if (isAlphaNumeric(code))
        {
            return true;
        }
    }
    return false;
}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function PlaySpeech() {
// Get all the text content of the webpage
    let content_element = document.getElementById("blog-content");
    // console.log(content_element);
    if (content_element === null) return;
    console.log('read-aloud (just for fun) enabled v1');
    const allText = content_element.innerText;
    const allHTML = content_element.innerHTML;
    let fonts = [
        ["helvetica,sans-serif",0],
        ["arial",0],
        ["arial black,sans-serif",0],
        ["verdana,sans-serif",0],
        ["tahoma,sans-serif",0],
        ["trebuchet ms,sans-serif",0],
        ["impact,sans-serif",0],
        ["gill sans,sans-serif",0],
        ["times new roman,serif",0],
        ["georgia,serif",0],
        ["palatino,serif",0],
        ["baskerville,serif",0],
        ["andale mono,monospace",0],
        ["courier,monospace",25],
        ["lucida,monospace",0],
        ["monaco,monospace",0],
        ["bradley hand,cursive",0],
        ["brush script mt,cursive",75],
        ["luminari,fantasy",0],
        ["comic sans ms,cursive",0]
    ];

    // console.log(typeof allHTML);
    let stringStart = "";
    let stringEnd = "";
    let stringCopyHTML = allHTML;
    let stringPos = 0;
    let colour_a_r = 67;
    let colour_b_r = 3;
    let colour_a_g = 83;
    let colour_b_g = 26;
    let colour_a_b = 130;
    let colour_b_b = 120;




// Create an array of all the words in the text
    const words = allText.split(/\s+/);
    // console.log(words.length);
    

// Loop through each word and add it to the highlighted text element with a class for styling
    words.forEach((word) => {
        if (!isWord(word))
        {
            return;
        }
        const wordElement = document.createElement("span");
        wordElement.textContent = `${word}`;
        wordElement.classList.add("highlighted-word");
        wordElement.id = 'read-word-' + i;
        let font = fonts[Math.floor(Math.random()*fonts.length)];
        wordElement.style.fontFamily = font[0];
        wordElement.style.fontSize = (100 + font[1]) + '%';
        wordElement.style.color = "#" + (randomIntFromInterval(colour_a_r, colour_b_r)).toString(16)
            + (randomIntFromInterval(colour_a_g, colour_b_g)).toString(16)
            + (randomIntFromInterval(colour_a_b, colour_b_b)).toString(16);
        stringCopyHTML = allHTML.substring(stringPos);
        let wordIndex = 0;

        let isElement = false;
        let endPosition = 0;
        for (let j = 0; j < stringCopyHTML.length; j++) {
            let char = stringCopyHTML[j];
            if (char === '>')
            {
                wordIndex = 0;
                isElement = false;
                continue;
            }
            if (char === '<')
            {
                wordIndex = 0;
                isElement = true;
                continue;
            }
            if (isElement)
            {
                wordIndex = 0;
                continue;
            }
            
            if (char === word[wordIndex])
            {
                wordIndex++;
                if (wordIndex === word.length)
                {
                    stringStart += allHTML.substring(stringPos, stringPos + j - word.length + 1) + wordElement.outerHTML;
                    endPosition = stringPos + j + 1;
                    break;
                }
            } else {
                wordIndex = 0;
            }
        }
        if (endPosition !== 0 )
        {
            stringPos = endPosition;
        }
        if (endPosition >= allHTML.length)
        {
            stringEnd = "";
        }
        else
        {
            stringEnd = allHTML.substring(stringPos);
        }
        i++;
    });

// Append the highlighted text element to the page
// content_element.appendChild(highlightedText);
    content_element.innerHTML = stringStart + stringEnd;


// Create a new instance of the Web Speech API SpeechSynthesis object
    const synth = window.speechSynthesis;

    const newText = content_element.innerText;
    // Create a new instance of the SpeechSynthesisUtterance object with the text to be read
    const utterance = new SpeechSynthesisUtterance(newText);

    i = 0;
// Highlight each word as it's read by the speech synthesis engine
    utterance.onboundary = (event) => {

        console.log("/////////////////////////////////////////////////////////////////");
        console.log(event.charIndex);
        if (lastIndex === event.charIndex || i >= words.length)
        {
            return;
        }
        lastIndex = event.charIndex;
        console.log(i);
        if (i > 0)
        {
            document.getElementById('read-word-' + (i - 1)).classList.remove("highlighted-word--active");
        }
        document.getElementById('read-word-' + i).classList.add("highlighted-word--active");
        i++;
    };



// Remove active highlighting from all words when speech ends
    utterance.onend = () => {
        clearHighlighting();
    };
    // Create a button element to trigger the script
    const play_button = document.getElementById("read-aloud-button-play");

// Add a click event listener to the button to start speaking the text
    play_button.addEventListener("click", () => {
        reset();
        synth.speak(utterance);
    });

// Create a button element to trigger the script
    const stop_button = document.getElementById("read-aloud-button-stop");

// Add a click event listener to the button to start speaking the text
    stop_button.addEventListener("click", () => {
        reset();
        synth.cancel();
    });

// Create a button element to trigger the script
    const pause_button = document.getElementById("read-aloud-button-pause");

// Add a click event listener to the button to start speaking the text
    pause_button.addEventListener("click", () => {
        synth.pause();
    });

// Create a button element to trigger the script
    const resume_button = document.getElementById("read-aloud-button-resume");

// Add a click event listener to the button to start speaking the text
    resume_button.addEventListener("click", () => {
        synth.resume();
    });

}

PlaySpeech();

