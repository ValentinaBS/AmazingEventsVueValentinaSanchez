const { createApp } = Vue;

const options = {
    data(){
        return {
            allEvents: [],
            currentDate: "",
            pastEvents: [],
            uniqueEventCategories: [],
            searchValueSubmit: "",
            checkedCheckboxes: [],
            filteredEvents: [],
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then(res => res.json())
            .then(data => {
                this.allEvents = data.events;
                this.currentDate = data.currentDate;
                this.pastEvents = this.allEvents.filter(event => event.date < this.currentDate);
                this.filteredEvents = this.pastEvents;
                this.uniqueEventCategories = Array.from(new Set(this.allEvents.map(event => event.category)))
            })
            .catch(error => console.error(error))
    },
    methods:{
        filterByAll(){
            this.filteredEvents = this.pastEvents.filter(event => {
                return event.name.toLowerCase().includes(this.searchValueSubmit.toLowerCase()) 
                && (this.checkedCheckboxes.includes(event.category) || this.checkedCheckboxes.length === 0)
            }) 
        },
        clearElement() {
            this.filteredEvents = this.pastEvents;
            this.checkedCheckboxes = [];
            this.searchValueSubmit = "";
        },
    },
}

const app = createApp(options)

app.mount("#app")