window.addEventListener('load', function load() {
    window.removeEventListener('load', load, false);


    const header = document.querySelector('section.header h1');
    const headerWord = header.querySelector('span');

    let {words} = header.dataset;
    if (!words) return;
    words = JSON.parse(words).map(w => ` ${w}.`);
    let index = 0;
    let write = true;

    update(words[0]);
    function rand(min, max) { return Math.floor(Math.random() * min) + max; }

    function update(chars) {
        headerWord.classList.remove('blink');
        if (write) {
            if (chars.length) {
                headerWord.innerHTML += chars[0];
                setTimeout(update, rand(50, 125), chars.slice(1))
            } else {
                write = false;
                headerWord.classList.add('blink');
                setTimeout(update, 3000, words[index])
            }
        } else {
            const current = headerWord.innerHTML;
            if (current.length) {
                headerWord.innerHTML = current.slice(0, -1);
                setTimeout(update, rand(50, 125));
            } else {
                index++;
                if (index == words.length) index = 0;
                write = true;
                headerWord.classList.add('blink');
                setTimeout(update, 500, words[index])
            }
        }
    }
})
