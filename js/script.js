const form = document.querySelector('.form')
const tableBody = document.getElementById('eventsTableBody')
const statistics = document.getElementById('statistics')
const counts = document.getElementsByClassName('eventTypeCount')
const clearBtn = document.getElementById('clearBtn')

form.addEventListener('submit', e => {
    e.preventDefault()
    addEvent()
})

clearBtn.addEventListener('click', () => {
    localStorage.clear()
    render()
})

render()

function render() {
    const events = JSON.parse(localStorage.getItem('events')) || []

    tableBody.innerHTML = ''
    statistics.textContent = `Всього івентів: ${events.length}`

    const clickCount = events.filter(e => e.eventType === 'click').length
    const leadCount  = events.filter(e => e.eventType === 'lead').length
    const saleCount  = events.filter(e => e.eventType === 'sale').length

    counts[0].textContent = `Івенти статусу click: ${clickCount}`
    counts[1].textContent = `Івенти статусу lead: ${leadCount}`
    counts[2].textContent = `Івенти статусу sale: ${saleCount}`

    events.forEach(({ eventName, eventType, eventDate }) => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${eventName}</td>
            <td>${eventType}</td>
            <td>${eventDate}</td>
        `
        tableBody.append(tr)
    })
}

function addEvent() {
    const eventName = form.elements.eventName.value.trim()
    const eventType = form.elements.eventType.value

    if (!eventName) return

    const eventDate = formatDate()
    const events = JSON.parse(localStorage.getItem('events')) || []

    events.push({ eventName, eventType, eventDate })
    localStorage.setItem('events', JSON.stringify(events))

    form.reset()
    render()
    alert(`Успішно додано подію "${eventName}"`)
}

function formatDate(date = new Date()) {
    const pad = n => String(n).padStart(2, '0')
    return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}
            ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}
