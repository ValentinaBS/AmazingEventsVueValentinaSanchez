const { createApp } = Vue;

const options = {
    data(){
        return {
            allEvents: [],
            eventId: 1,
            chosenEvent: {},
            urlParams: {},
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then(res => res.json())
            .then(data => {
                this.allEvents = data.events;
                this.chosenEvent = this.allEvents.find(event => event._id == this.eventId);
            })
            .catch(error => console.error(error))
        
        this.urlParams = new URLSearchParams(location.search);
        this.eventId = this.urlParams.get("eventId");
    }
}

const app = createApp(options)

app.mount("#app")