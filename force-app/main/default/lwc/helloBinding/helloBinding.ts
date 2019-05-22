import { LightningElement, track } from 'lwc';
import { test } from './library';
export default class HelloBinding extends LightningElement {
    @track greeting: string = 'World ' + test();

    handleChange(event: Event) {
        this.greeting = (event.target as HTMLInputElement).value;
    }
}
