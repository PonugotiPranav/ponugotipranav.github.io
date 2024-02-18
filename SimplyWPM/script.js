const quotes = [
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
    "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
    "Many of life's failures are people who did not realize how close they were to success when they gave up. - Thomas A. Edison",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "In the end, it's not the years in your life that count. It's the life in your years. - Abraham Lincoln",
    "Life is what happens when you're busy making other plans. - John Lennon",
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    "The best way to predict your future is to create it. - Abraham Lincoln",
    "It's not whether you get knocked down, it's whether you get up. - Vince Lombardi",
    "The purpose of our lives is to be happy. - Dalai Lama",
    "Life is either a daring adventure or nothing at all. - Helen Keller",
    "You miss 100% of the shots you don't take. - Wayne Gretzky",
    "The only person you should try to be better than is the person you were yesterday. - Anonymous",
    "Success is walking from failure to failure with no loss of enthusiasm. - Winston Churchill",
    "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
    "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. - Mark Twain",
    "The mind is everything. What you think you become. - Buddha",
    "Strive not to be a success, but rather to be of value. - Albert Einstein",
    "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it. - Jordan Belfort",
    "The best revenge is massive success. - Frank Sinatra",
    "Too many of us are not living our dreams because we are living our fears. - Les Brown",
    "It always seems impossible until it's done. - Nelson Mandela",
    "The only place where success comes before work is in the dictionary. - Vidal Sassoon",
    "The two most important days in your life are the day you are born and the day you find out why. - Mark Twain",
    "Nothing is impossible, the word itself says 'I'm possible'! - Audrey Hepburn",
    "The only way to achieve the impossible is to believe it is possible. - Charles Kingsleigh",
    "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. - Albert Schweitzer",
    "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose. - Dr. Seuss",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston S. Churchill",
    "Every strike brings me closer to the next home run. - Babe Ruth",
    "The best time to plant a tree was 20 years ago. The second best time is now. - Chinese Proverb",
    "What you get by achieving your goals is not as important as what you become by achieving your goals. - Zig Ziglar",
    "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. - Steve Jobs",
    "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
    "The journey of a thousand miles begins with one step. - Lao Tzu",
    "A person who never made a mistake never tried anything new. - Albert Einstein",
    "Do not go where the path may lead, go instead where there is no path and leave a trail. - Ralph Waldo Emerson",
    "If you want to lift yourself up, lift up someone else. - Booker T. Washington",
    "If you want to achieve greatness stop asking for permission. - Anonymous",
    "I have learned over the years that when one's mind is made up, this diminishes fear. - Rosa Parks",
]

let countdownTimer;
let testTimer;
let startTime;
let quote;
let isTestRunning = false;

document.getElementById("startButton").addEventListener("click", startTest);

function startTest() {
    resetTest();
    isTestRunning = true;
    const promptIndex = Math.floor(Math.random() * quotes.length);
    quote = quotes[promptIndex];
    const quoteParts = quote.split("-");
    const prompt = quoteParts[0].trim(); // Extracting the quote without the author
    document.getElementById("promptDisplay").innerText = prompt;
    document.getElementById("startButton").setAttribute("disabled", true);
    startCountdown();
}

function startCountdown() {
    let count = 3;
    const countdownDisplay = document.getElementById("countdown");
    countdownDisplay.innerText = count;
    countdownTimer = setInterval(() => {
        count--;
        if (count === 0) {
            countdownDisplay.innerText = "Go!";
            document.getElementById("startButton").removeAttribute("disabled");
            document.getElementById("typedText").removeAttribute("disabled");
            document.getElementById("typedText").focus();
            document.getElementById("startButton").innerText = "New Test";
            startTime = new Date().getTime();
            // liveWPM();
        } else if (count < 0) {
            clearInterval(countdownTimer);
            countdownDisplay.innerText = "";
        } else {
            countdownDisplay.innerText = count;
        }
    }, 1000);
}

/*
function liveWPM() {
    timer = setInterval(() => {
        const elapsedTime = (new Date().getTime() - startTime) / 1000;
        const typedText = document.getElementById("typedText").value.trim();
        const typedWords = typedText.split(/\s+/).filter(word => word !== "").length;
        const wpm = Math.round((typedWords / elapsedTime) * 60);
        document.getElementById("testResult").innerText = `WPM: ${wpm}`;
    }, 1000);
}
*/

/*
function updateWPM() {
    const typedText = document.getElementById("typedText").value;
    const prompt = document.getElementById("promptDisplay").innerText;
    const typedWords = typedText.split(/\s+/).filter(word => word !== "").length; // Count non-empty words
    const endTime = new Date().getTime();
    const totalTimeInSeconds = (endTime - startTime) / 1000;
    let wpm = 0;
    if (totalTimeInSeconds !== 0 && typedWords !== 0) {
        wpm = Math.round((typedWords / totalTimeInSeconds) * 60);
    }
    document.getElementById("testResult").innerText = `WPM: ${wpm}`;
}
*/

function updateAccuracy() {
    const typedText = document.getElementById("typedText").value;
    const prompt = document.getElementById("promptDisplay").innerText;
    let accuracy = 100;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] !== prompt[i]) {
            accuracy -= 100 / prompt.length;
        }
    }
    accuracy = Math.max(accuracy, 0); // Ensure accuracy is not negative
    document.getElementById("testResult").innerText = `Accuracy: ${accuracy.toFixed(2)}%`;
}

function endTest() {
    isTestRunning = false;
    clearInterval(testTimer);
    const endTime = new Date().getTime();
    const totalTimeInSeconds = (endTime - startTime) / 1000;
    const typedText = document.getElementById("typedText").value.trim();
    const typedWords = typedText.split(/\s+/).filter(word => word !== "").length; // Count non-empty words
    let wpm = 0;
    if (totalTimeInSeconds !== 0 && typedWords !== 0) {
        wpm = Math.round((typedWords / totalTimeInSeconds) * 60);
    }
    const accuracy = parseFloat(document.getElementById("testResult").innerText.split(":")[1]);
    document.getElementById("testResult").innerText = `WPM: ${wpm}`;

    const promptIndex = quotes.findIndex(q => q === quote);
    const author = promptIndex !== -1 ? quotes[promptIndex].split("-")[1].trim() : "Unknown";

    document.getElementById("countdown").innerText = `Well Done! Quote by: ${author}`;
}

function resetTest() {
    clearInterval(countdownTimer);
    clearInterval(testTimer);
    document.getElementById("countdown").innerText = "";
    document.getElementById("testResult").innerText = "";
    document.getElementById("promptDisplay").innerText = "";
    document.getElementById("typedText").value = "";
    document.getElementById("typedText").setAttribute("disabled", true);
}

// Event listener for detecting when the user finishes typing
document.getElementById("typedText").addEventListener("input", function() {
    const typedText = this.value.trim();
    const prompt = document.getElementById("promptDisplay").innerText;
    if (isTestRunning && typedText === prompt) {
        endTest();
    } else if (!isTestRunning) {
        document.getElementById("countdown").innerText = "";
    } else {
        updateAccuracy();
    }
});

// Event listener for starting a new test
document.getElementById("startButton").addEventListener("click", function() {
    if (!isTestRunning) {
        startTest();
    } else {
        resetTest();
        startTest();
    }
});
