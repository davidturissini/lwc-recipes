import { LightningElement, track } from 'lwc';

export default class HelloBinding extends LightningElement {
    @track greeting: string = 'World';

    handleChange(event: Event) {
        this.greeting = (event.target as HTMLInputElement).value;
    }
}
