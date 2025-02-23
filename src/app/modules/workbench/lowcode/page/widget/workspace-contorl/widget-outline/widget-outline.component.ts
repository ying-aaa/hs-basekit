import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ArrayDataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NOOP_TREE_KEY_MANAGER_FACTORY_PROVIDER } from '@angular/cdk/a11y';
import { MatTreeModule } from '@angular/material/tree';
import { WidgetEditorService } from '../../widget-editor.service';
import { IEditorFormlyField } from '@src/app/shared/models/editor.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  field: IEditorFormlyField;
}

@Component({
  selector: 'hs-widget-outline',
  templateUrl: './widget-outline.component.html',
  styleUrls: ['./widget-outline.component.less'],
  imports: [CommonModule, MatTreeModule, MatButtonModule, MatIconModule],
  providers: [NOOP_TREE_KEY_MANAGER_FACTORY_PROVIDER],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetOutlineComponent implements OnInit {
  dataSource$ = this.widgetEditorService.flatField$ as Observable<
    ExampleFlatNode[]
  >;

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable,
  );

  constructor(public widgetEditorService: WidgetEditorService) {}

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit() {}
}
