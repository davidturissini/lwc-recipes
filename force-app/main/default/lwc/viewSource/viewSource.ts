import { LightningElement, api } from 'lwc';

export default class ViewSource extends LightningElement {
    baseURL =
        'https://github.com/trailheadapps/lwc-recipes/tree/master/force-app/main/default/';

    @api source: string;

    get sourceURL(): string {
        return this.baseURL + this.source;
    }
}
