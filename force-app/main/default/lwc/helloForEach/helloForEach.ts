import { LightningElement } from 'lwc';

interface Contact {
    Id: string;
    Name: string;
    Title: string;
}

export default class HelloForEach extends LightningElement {
    contacts: Contact[] = [
        {
            Id: '003171931112854375',
            Name: 'Amy Taylor',
            Title: 'VP of Engineering'
        },
        {
            Id: '003192301009134555',
            Name: 'Michael Jones',
            Title: 'VP of Sales'
        },
        {
            Id: '003848991274589432',
            Name: 'Jennifer Wu',
            Title: 'CEO'
        }
    ];
}
