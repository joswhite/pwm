import { Component } from '../component';
import { IScope } from 'angular';
import PeopleSearchService from './peoplesearch.service';
import Person from '../models/person.model';

var stylesheetUrl = require('peoplesearch/peoplesearch-cards.component.scss');
var templateUrl = require('peoplesearch/peoplesearch-cards.component.html');

@Component({
    stylesheetUrl: stylesheetUrl,
    templateUrl: templateUrl
})
export default class PeopleSearchCardsComponent {
    private deregistrationCallback: () => void;
    people: Person[];

    static $inject = [ '$scope', 'PeopleSearchService' ];
    constructor(
        private $scope: IScope,
        private peopleSearchService: PeopleSearchService) {
    }

    $onInit() {
        this.getPeople();

        var self = this;
        this.deregistrationCallback = this.$scope.$on('people-updated', () => {
            self.getPeople();
        });
    }

    $onDestroy() {
        this.deregistrationCallback();
    }

    getPeople() {
        this.people = this.peopleSearchService.people;
    }
}
