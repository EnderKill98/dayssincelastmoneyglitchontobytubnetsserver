document.addEventListener("DOMContentLoaded", render);

async function render() {
    let events = await (await fetch("events.json")).json();
    events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    console.log(events);

    document.getElementById("events").innerHTML = "";
    let mostRecentDate = null;
    for(event of events) {
        if(mostRecentDate == null) mostRecentDate = new Date(event.timestamp);
        addEvent(event);
    }
    let daysSince = mostRecentDate == null ? "ERR" : Math.floor((new Date().getTime() - mostRecentDate.getTime()) / (1000*60*60*24));
    document.getElementById("days-since").innerText = daysSince + (daysSince == 1 ? " Day" : " Days");
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
}

function addEvent(event) {
    document.getElementById("events").innerHTML += `
    <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-up">
        <div class="flex justify-between items-start">
            <div class="flex-1">
                <h3 class="text-xl font-semibold text-gray-800 mb-2">${event.title}</h3>
                <div class="flex items-center text-gray-600 mb-3">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    </svg>
                    <span>${formatDate(event.timestamp)}</span>
                </div>
                <div class="">
                    ${event.description}
                </div>
            </div>
        </div>
    </div>
    `;
}
