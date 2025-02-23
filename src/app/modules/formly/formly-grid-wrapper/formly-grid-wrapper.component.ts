import { Component, OnInit } from '@angular/core';
// panel-wrapper.component.ts
// import {
//   CdkDrag,
//   CdkDragDrop,
//   CdkDragPlaceholder,
//   CdkDropList,
//   CdkDropListGroup,
// } from '@angular/cdk/drag-drop';
import { FieldType, FormlyModule } from '@ngx-formly/core';
import {
  IEditorFormlyField,
  IFieldType,
} from '@src/app/shared/models/editor.model';
import { WidgetEditorService } from '@app/modules/workbench/lowcode/page/widget/widget-editor.service';

@Component({
  selector: 'formly-grid-wrapper',
  templateUrl: './formly-grid-wrapper.component.html',
  styleUrls: ['./formly-grid-wrapper.component.less'],
  imports: [
    // CdkDragPlaceholder,
    // CdkDropList, CdkDrag,
    FormlyModule,
  ],
})
export class FormlyGridWrapperComponent extends FieldType<IEditorFormlyField> {
  IFieldType = IFieldType;

  constructor(public widgetEditorService: WidgetEditorService) {
    super();
  }
}
