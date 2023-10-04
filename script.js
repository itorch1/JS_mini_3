const text = document.querySelector('textarea');
const choicesContainer = document.querySelector('#choices');

text.focus();

text.addEventListener('keyup', editChoices);
document.addEventListener('keypress', selectChoice)

function editChoices(e) {
    if (e.key === 'Enter') return;
    const choices = text.value.split(',').filter(choice => choice.trim() !== '').map(choice => choice.trim());

    choicesContainer.innerHTML = '';
    choices.forEach(choice => {
        const newChoice = document.createElement('span');
        newChoice.appendChild(document.createTextNode(choice));
        newChoice.className = 'choice';
        choicesContainer.appendChild(newChoice);
        // to be fixed for efficiency
    });
}

function selectChoice(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        text.value = '';
        const choices = choicesContainer.querySelectorAll('span');
        let loops = 0;
        const timer = setInterval(() => {
            loops++;
            const index = Math.floor(Math.random() * choices.length);
            const selectedChoice = choices[index];

            choices.forEach(choice => {
                if (choice.classList.contains('picked'))
                    choice.classList.remove('picked');
            });
            selectedChoice.classList.add('picked');
            if (loops == 30)
                clearInterval(timer);
        }, 100);
    }
}