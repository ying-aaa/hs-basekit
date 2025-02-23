import {
  ChangeDetectionStrategy,
  Component,
  effect,
  Inject,
  OnInit,
  Optional,
} from '@angular/core';
import { WorkspaceToobarComponent } from './workspace-toobar/workspace-toobar.component';
import { MatDividerModule } from '@angular/material/divider';
import { ConfigOption, FORMLY_CONFIG, FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetEditorService } from '../widget-editor.service';

@Component({
  selector: 'hs-workspace-viewport',
  templateUrl: './workspace-viewport.component.html',
  styleUrls: ['./workspace-viewport.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    WorkspaceToobarComponent,
    MatDividerModule,
    FormlyModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class WorkspaceViewportComponent implements OnInit {
  constructor(
    public widgetEditorService: WidgetEditorService,
    @Optional() @Inject(FORMLY_CONFIG) configs: ConfigOption[] = [],
  ) {
    console.log(configs);
    effect(() => {
      console.log(
        '%c Line:28 🥝',
        'color:#fca650',
        this.widgetEditorService.fields(),
      );
    });
  }

  ngOnInit() {}
}
