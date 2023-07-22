const { createApp } = Vue;

const options = {
    data(){
        return {
            allEvents: [],
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
            this.filteredEvents = this.allEvents;
            this.uniqueEventCategories = Array.from(new Set(this.allEvents.map(event => event.category)))
        })
        .catch(error => console.error(error))
    },
    methods:{
        filterByAll(){
            this.filteredEvents = this.allEvents.filter(event => {
                return event.name.toLowerCase().includes(this.searchValueSubmit.toLowerCase()) 
                && (this.checkedCheckboxes.includes(event.category) || this.checkedCheckboxes.length === 0)
            }) 
        },
        clearElement() {
            this.filteredEvents = this.allEvents;
            this.checkedCheckboxes = [];
            this.searchValueSubmit = "";
        },
    },
    computed:{
    }
}

const app = createApp(options)

app.mount("#app")