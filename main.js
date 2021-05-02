window.onload = () => {
	var readNowBtn = document.getElementById('readNowBtn');
	var displayingWord = document.getElementById('displayingWord');
	var readerContainer = document.getElementById('readerContainer');
	var textToReadTextarea = document.getElementById('textToReadTextarea');
	var secondPerWord = document.getElementById('secondPerWord');
	var secondPerWordValue = document.getElementById('secondPerWordValue');
    var interval = null;

    secondPerWordValue.innerText = secondPerWord.value + "ms/word";

    secondPerWord.addEventListener("mousemove", ()=>{
        secondPerWordValue.innerText = secondPerWord.value + "ms/word";
    });

	readNowBtn.addEventListener('click', () => {
		textToRead = textToReadTextarea.value.replaceAll("\n", " ").split(' ');
		lastReadIndex = 0;

		if (interval) {
            clearInterval(interval);
            interval = null;
        }

        readerContainer.requestFullscreen();
        readerContainer.style.display = "block";
		if (textToRead.length > 0) {
			scrollToReadingBox();
			countDownBeforeStart(displayingWord).then((done) => {
				interval = play(textToRead, displayingWord, lastReadIndex);

				readerContainer.addEventListener('click', () => {
					if (interval) {
						clearInterval(interval);
						interval = null;
					} else {
						interval = play(textToRead, displayingWord, lastReadIndex);
					}
				});
			});
		}
	});

	function play(textToRead, displayingWord, lastReadIndex) {
		let interval = setInterval(() => {
			if (lastReadIndex == textToRead.length) {
				clearInterval(interval);
                displayingWord.innerHTML = "<blink class='text-success'>The end!</blink>";
                // readerContainer.style.display = "none";
                setTimeout(() => {
                    document.documentElement.scroll({
                        top: 0,
                        behavior: 'smooth'
                    });
                    document.documentElement.scroll({
                        top: 0,
                        behavior: 'smooth'
                    });
                }, 5000);
			} else {
				displayingWord.innerText = textToRead[lastReadIndex++];
			}
		}, secondPerWord.value);

		return interval;
	}

	function scrollToReadingBox() {
		document.documentElement.scroll({
			top: document.documentElement.offsetHeight + 100,
			behavior: 'smooth'
		});
		document.documentElement.scroll({
			top: document.body.offsetHeight + 100,
			behavior: 'smooth'
		});
	}

	function countDownBeforeStart(displayingWord) {
		return new Promise((resolve, reject) => {
			let counter = 2;
			let interval = setInterval(() => {
				if (counter === 0) {
					displayingWord.innerText = 'Go';
					clearInterval(interval);
					setTimeout(() => {
						resolve(1);
					}, 2000);
				} else {
					displayingWord.innerHTML = "<span class='text-danger'>"+ counter-- +"</span>";
				}
			}, 1000);
		});
	}
};
