const { createApp } = Vue;

const options = {
    data(){
        return {
            allEvents: [],
            currentDate: "",
            pastEvents: [],
            upcomingEvents: [],
            unifiedPastEvents: [],
            unifiedUpcomingEvents: [],
            lowestAssistancePercentage: 100,
            lowestAssistanceEvent: "",
            highestAssistancePercentage: 0,
            highestAssistanceEvent: "",
            largestCapacityPercentage: 0,
            largestCapacityEvent: ""
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then(res => res.json())
            .then(data => {
                this.allEvents = data.events;
                this.currentDate = data.currentDate;

                this.pastEvents = this.allEvents.filter(event => event.date < this.currentDate).sort((a, b) => a.category.localeCompare(b.category));
                this.upcomingEvents = this.allEvents.filter(event => event.date > this.currentDate).sort((a, b) => a.category.localeCompare(b.category));
            
                // Table 1
                for (let event of this.pastEvents) {
                    let percentage = event.assistance / event.capacity * 100;
            
                    if (percentage > this.highestAssistancePercentage) {
                        this.highestAssistancePercentage = percentage;
                        this.highestAssistanceEvent = event.name;
                    }
                    if (percentage < this.lowestAssistancePercentage) {
                        this.lowestAssistancePercentage = percentage;
                        this.lowestAssistanceEvent = event.name;
                    }
                }

                let orderByCapacity = this.allEvents.sort((a, b) => b.capacity - a.capacity)
                this.largestCapacityEvent = orderByCapacity[0].name;
                this.largestCapacityPercentage = orderByCapacity[0].capacity;
            
                // Table 2 & 3
                this.unifiedPastEvents = this.pastEvents.reduce((result, event) => {
                        const existingEvent = result.find(item => item.category === event.category);
                
                        if (existingEvent) {
                            existingEvent.price += event.price;
                            existingEvent.assistance += event.assistance || event.estimate;
                            existingEvent.capacity += event.capacity;
                        } else {
                            result.push({
                                category: event.category,
                                price: event.price,
                                assistance: event.assistance || event.estimate,
                                capacity: event.capacity
                            });
                        }
                
                        return result;
                    }, []);
                
                this.unifiedUpcomingEvents = this.upcomingEvents.reduce((result, event) => {
                    const existingEvent = result.find(item => item.category === event.category);
                
                    if (existingEvent) {
                        existingEvent.price += event.price;
                        existingEvent.assistance += event.assistance || event.estimate;
                        existingEvent.capacity += event.capacity;
                    } else {
                        result.push({
                            category: event.category,
                            price: event.price,
                            assistance: event.assistance || event.estimate,
                            capacity: event.capacity
                        });
                    }
                
                    return result;
                }, []);
            })
            .catch(error => console.error(error))
    },
}

const app = createApp(options)

app.mount("#app")