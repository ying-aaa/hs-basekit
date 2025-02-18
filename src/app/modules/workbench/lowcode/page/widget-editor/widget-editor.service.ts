import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { generateUUID } from '@src/app/core/utils';
import {
  IEditorFormlyField,
  IFieldType,
} from '@src/app/shared/models/editor.model';
import { presetResource } from '../../../components/preset-components/preset-resource';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WidgetEditorService {
  HS_DEFAULT_ID = 'workspace';

  isEditMode = false;

  connectedTo = [];

  private activeField?: IEditorFormlyField;
  private fieldsChange$ = new Subject<IEditorFormlyField[]>();
  private _fieldSelected$ = new Subject<IEditorFormlyField>();

  get fieldSelected$(): Observable<IEditorFormlyField> {
    return this._fieldSelected$.asObservable();
  }

  fields: IEditorFormlyField[] = [
    {
      key: 'col21',
      type: 'col',
      fieldId: generateUUID(`${IFieldType.COL}_key_`),
      wrappers: ['col'], // 使用 col 包装器
      props: {},
      _design: true,
      fieldGroup: [
        {
          key: 'group',
          type: 'group',
          fieldId: generateUUID(`${IFieldType.GROUP}_key_`),
          wrappers: ['group'], // 使用 group 包装器
          props: {
            label: '身份信息',
          },
          fieldGroup: [
            {
              key: 'col1',
              type: 'col',
              fieldId: generateUUID(`${IFieldType.COL}_key_`),
              wrappers: ['col'], // 使用 col 包装器
              fieldGroup: [
                {
                  key: 'input1',
                  type: 'input',
                  fieldId: generateUUID(`input_key_`),
                  templateOptions: { label: 'Input 1' },
                },
                {
                  key: 'input2',
                  type: 'input',
                  fieldId: generateUUID(`input_key_`),
                  templateOptions: { label: 'Input 2' },
                },
              ],
              props: {},
            },
            {
              key: 'group',
              type: 'group',
              fieldId: generateUUID(`${IFieldType.GROUP}_key_`),
              wrappers: ['group'], // 使用 group 包装器
              props: {
                label: '身份信息',
              },
              fieldGroup: [
                {
                  key: 'col1',
                  type: 'col',
                  fieldId: generateUUID(`${IFieldType.COL}_key_`),
                  wrappers: ['col'], // 使用 col 包装器
                  fieldGroup: [
                    {
                      key: 'input1',
                      type: 'input',
                      fieldId: generateUUID(`input_key_`),
                      templateOptions: { label: 'Input 1' },
                    },
                  ],
                  props: {},
                },
                {
                  key: 'col2',
                  type: 'col',
                  fieldId: generateUUID(`${IFieldType.COL}_key_`),
                  wrappers: ['col'], // 使用 col 包装器
                  fieldGroup: [
                    {
                      key: 'input3',
                      type: 'input',
                      fieldId: generateUUID(`input_key_`),
                      templateOptions: { label: 'Input 3' },
                    },
                  ],
                  props: {},
                },
              ],
            },
            {
              key: 'col2',
              type: 'col',
              fieldId: generateUUID(`${IFieldType.COL}_key_`),
              wrappers: ['col'], // 使用 col 包装器
              fieldGroup: [
                {
                  key: 'input3',
                  type: 'input',
                  templateOptions: { label: 'Input 3' },
                  fieldId: generateUUID(`input_key_`),
                },
                {
                  key: 'input4',
                  type: 'input',
                  templateOptions: { label: 'Input 4' },
                  fieldId: generateUUID(`input_key_`),
                },
              ],
              props: {},
            },
          ],
        },
      ],
    },
  ];

  model = [];
  options = [];

  constructor() {}

  getConnectedTo(type: IFieldType) {
    const options = {
      group: [],
      col: [],
      row: [],
    };

    return findSameField(this.fields, options)[type];
  }

  isActiveField(fieldId: string) {
    return this.activeField?.fieldId === fieldId;
  }

  selectField(field: IEditorFormlyField): void {
    // const field = this.fieldMap.get(fieldId)!;
    this.activeField = field;
    this._fieldSelected$.next(field);
  }

  moveField(siblings: any, fromIndex: number, toIndex: number) {
    moveItemInArray(siblings, fromIndex, toIndex);
  }

  transferField(
    currentParent: any,
    targetParent: any,
    formIndex: number,
    toIndex: number,
  ) {
    transferArrayItem(currentParent, targetParent, formIndex, toIndex);
  }
}

function findSameField(
  fields: IEditorFormlyField[],
  options: { [key in IFieldType]: string[] },
): { [key in IFieldType]: string[] } {
  for (let i = 0; i < fields.length; i++) {
    const type = fields[i].type as IFieldType;
    if (type && options[type]) {
      options[type].unshift(fields[i].fieldId as string);
    }
    if (fields[i].fieldGroup) {
      options = findSameField(
        fields[i].fieldGroup as IEditorFormlyField[],
        options,
      );
    }
  }
  return options;
}
