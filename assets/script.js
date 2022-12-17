const jsonLink = "./assets/data.json"

const request = new XMLHttpRequest();
request.open('GET', jsonLink);
request.responseType = 'json';
request.send();
request.onload = () => {
    const data = request.response;
    contentsOfContainers(data)
}

// function where it takes the .json content and uses it to create the content of the containers on the page
const contentsOfContainers = (data) => {
    const title = document.getElementsByClassName('title')
    const hoursCurrent = document.getElementsByClassName('hours-current')
    const hoursPrevious = document.getElementsByClassName('hours-previous')

    const classes = [title, hoursCurrent, hoursPrevious]

    for (let i = 0; i < data.length; i++) {
        classes[0][i].textContent = data[i].title
        classes[1][i].textContent = `${data[i].timeframes.weekly.current}hrs`
        classes[2][i].textContent = `Last Week - ${data[i].timeframes.weekly.previous}hrs`
    }

    listenConteiners(data, classes)
    colorSections()
}

// function where it takes the id of the referenced container and adds an event listener for the containers
const listenConteiners = (data, classes) => {
    const dayly = document.getElementById('dayly')
    const weekly = document.getElementById('weekly')
    const monthly = document.getElementById('monthly')

    const listenersContainers = [dayly, weekly, monthly]

    for (let container of listenersContainers) {
        container.addEventListener('click', () => {
            changeHours(data, container, classes, listenersContainers)
        })
    }
}

// function where to change the content of the container according to the container that was clicked
const changeHours = (data, container, classes, listenersContainers) => {
    const dailyContainer = container.textContent == 'Daily'
    const weeklyContainer = container.textContent == 'Weekly'
    const monthlyContainer = container.textContent == 'Monthly'

    if (dailyContainer) {
        for (let i = 0; i < data.length; i++) {
            classes[0][i].textContent = data[i].title
            classes[1][i].textContent = `${data[i].timeframes.daily.current}hrs`
            classes[2][i].textContent = `Last Week - ${data[i].timeframes.daily.previous}hrs`
        }
    } else if (weeklyContainer) {
        for (let i = 0; i < data.length; i++) {
            classes[0][i].textContent = data[i].title
            classes[1][i].textContent = `${data[i].timeframes.weekly.current}hrs`
            classes[2][i].textContent = `Last Week - ${data[i].timeframes.weekly.previous}hrs`
        }
    } else if (monthlyContainer) {
        for (let i = 0; i < data.length; i++) {
            classes[0][i].textContent = data[i].title
            classes[1][i].textContent = `${data[i].timeframes.monthly.current}hrs`
            classes[2][i].textContent = `Last Week - ${data[i].timeframes.monthly.previous}hrs`
        }
    }

    if (container.className == 'li-color-blue') {
        container.className = 'li-color-white'

        for (let i = 0; i < listenersContainers.length; i++) {
            if (container.textContent != listenersContainers[i].textContent) {
                listenersContainers[i].className = 'li-color-blue'
            }
        }
    }
}

const colorSections = () => {
    const section = document.getElementsByClassName('section-container');
    const titles = document.getElementsByClassName('title');


    for(let i = 0; i < titles.length; i++) {
        switch (titles[i].textContent) {
            case 'Work':
                section[i].className = 'section-container work-section'
                break;
            case 'Play':
                section[i].className = 'section-container play-section'
                break;
            case 'Study':
                section[i].className = 'section-container study-section'
                break;
            case 'Exercise':
                section[i].className = 'section-container exercise-section'
                break;
            case 'Social':
                section[i].className = 'section-container social-section'
                break;
            case 'Self Care':
                section[i].className = 'section-container self-care-section'
                break;
            default:
                break;
        }
    }
}