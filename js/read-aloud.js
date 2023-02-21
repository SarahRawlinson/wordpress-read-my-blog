
let i = 0;
let lastIndex = 0;

function clearHighlighting() {
    const highlightedWords = document.querySelectorAll(".highlighted-word");
    highlightedWords.forEach((word) => {
        word.classList.remove("highlighted-word--active");
    });
}

function reset() {
    clearHighlighting();
    lastIndex = 0;
    i = 0;
}

function PlaySpeech() {
// Get all the text content of the webpage
    let content_element = document.getElementById("blog-content");
    console.log(content_element);
    if (content_element === null) return;
    console.log('read-aloud enabled v1');
    const allText = content_element.innerText;
    const allHTML = content_element.innerHTML;
    console.log(typeof allHTML);
    let stringStart = "";
    let stringEnd = "";
    let stringCopyHTML = allHTML;
    let stringPos = 0;

// Create an array of all the words in the text
    const words = allText.split(/\s+/);
    console.log(words.length);

// Create a new HTML element to hold the highlighted text
    const highlightedText = document.createElement("span");
    
// Loop through each word and add it to the highlighted text element with a class for styling
    words.forEach((word) => {
        const wordElement = document.createElement("span");
        wordElement.textContent = `${word} `;
        wordElement.classList.add("highlighted-word");
        wordElement.id = 'read-word-' + i;

        stringCopyHTML = allHTML.substring(stringPos);
        console.log("word: " + word);
        console.log(stringStart + stringCopyHTML);
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
            if (isElement || char === ' ')
            {
                wordIndex = 0;
                continue;
            }
            if (char === '<')
            {
                wordIndex = 0;
                isElement = true;
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

