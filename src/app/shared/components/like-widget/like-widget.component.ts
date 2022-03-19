import { Component, Input, Output } from "@angular/core";
import { EventEmitter } from "protractor";

@Component({
    selector: 'app-like-widget',
    templateUrl: './like-widget.component.html',
    styleUrls: ['like-widget.component.scss']
})
export class LikeWidgetComponent {
    @Output() public liked = new EventEmitter();
    @Input() public likes = 0;
    @Input() public id = null;

}