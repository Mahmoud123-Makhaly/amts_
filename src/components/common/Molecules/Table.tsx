import React from 'react';
import { DataTable, DataTableHeaderTemplateType, DataTableProps, DataTablePropsSingle, DataTableValueArray } from 'primereact/datatable';
import { Column } from 'primereact/column';
interface ITable {
  data: Array<Object>;
  header: DataTableHeaderTemplateType<DataTableValueArray> | undefined;
}
const Table = (props:ITable) => {
  return (
    <DataTable>
      <Column></Column>
    </DataTable>
  );
};

export default Table;
