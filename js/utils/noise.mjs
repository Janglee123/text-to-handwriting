const paperContentEl = document.querySelector('.page-a .paper-content');


function isAlphaNumeric(str) {
    var code, i, len;

    for (i = 0, len = str.length; i < len; i++) {
        code = str.charCodeAt(i);
        if (!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123)) { // lower alpha (a-z)
            return false;
        }
    }
    return true;
};

function map(value, in_start, in_end, out_start, out_end) {
    let c = (value - in_start) / (in_end - in_start);

    return out_start + c * (out_end - out_start);
}


function randomRange(start = 0, end = 1) {
    return map(Math.random(), 0, 1, start, end);
}


function randomRangeInt(start, end) {
    return Math.floor(map(Math.random(), 0, 1, start, end));
}

function applyStyleRandomly(ele, style, value, prob) {
    if (randomRange() <= prob) {
        ele.style[style] = value;
    }
}

function applyNoiseToElement(ele, text) {
    console.log(ele);

    ele.innerHTML = ''
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let span = document.createElement('div');
        ele.appendChild(span);

        span.innerHTML = char;

        if (isAlphaNumeric(char) && randomRange() <= 0.7) {
            applyStyleRandomly(span, 'translate', `${randomRange(-0.3, 0.3)}px ${randomRange(-0.2, 0.2)}px`, 0.4);
            applyStyleRandomly(span, 'rotate', `${randomRange(-0.3, 0.3)}px ${randomRange(-0.2, 0.2)}px`, 0.6);
            applyStyleRandomly(span, 'scale', `${randomRange(0.9, 1.1)} ${randomRange(0.9, 1.1)}`, 0.7);
            applyStyleRandomly(span, 'fontWeight', randomRangeInt(4, 6) * 100, 0.3);
            applyStyleRandomly(span, 'transform', `skew(${randomRange(-0.3, 0.3)}deg, ${randomRange(-0.3, 0.3)}deg)`, 0.5);
        }
    }
}

function applyNoise() {
    let text = paperContentEl.textContent;
    paperContentEl.innerHTML = '';
    text = text.split(' ');

    text.forEach(word => {
        let span = document.createElement('div');
        span.classList.add('word-container');
        paperContentEl.appendChild(span);
        applyNoiseToElement(span, word);
        span.innerHTML += '&nbsp&nbsp';
    });
}

export { applyNoise }