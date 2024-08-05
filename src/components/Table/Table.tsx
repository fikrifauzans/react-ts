import React, { useState } from 'react';
import {
  TableHead,
  Table as TableMui,
  TableContainer,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
  Typography,
  Divider,
  TableSortLabel
} from '@mui/material';

interface ColumnGeneralInterface {
  id: number;
  name: string;
  query: string;
  align: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  type: 'select' | undefined;
  label: string;
  component?: any;
}

interface DefaultColumnProps {
  c: ColumnGeneralInterface;
  onSelectAll: (checked: boolean) => void;
  isChecked: boolean;
  sortOrder: 'asc' | 'desc';
  orderBy: string;
  onSort: (column: string) => void;

}

function DefaultColumn({ c, onSelectAll, isChecked, sortOrder, orderBy, onSort  }: DefaultColumnProps) {
  return (
    <>
      {c.type === 'select' ? (
        <TableCell align={c.align} padding="checkbox">
          <Checkbox
            color="primary"
            checked={isChecked}
            onChange={(e) => onSelectAll(e.target.checked)}
          />
        </TableCell>
      ) : (
        <TableCell align={c.align}>
          <TableSortLabel
            active={orderBy === c.name}
            direction={orderBy === c.name ? sortOrder : 'asc'}
            onClick={() => onSort(c.name)}
          >
            {c.label}
          </TableSortLabel>
        </TableCell>
      )}
    </>
  );
}

interface TableGeneralProps {
  column: ColumnGeneralInterface[];
  data: Array<any>;
  orderBy: string;
  sortOrder: "asc" | "desc";
  handleSort: (string) => void
}

export default function TableGeneral({ column, data, orderBy, sortOrder, handleSort }: TableGeneralProps) {
  const [selected, setSelected] = useState<number[]>([]);
  

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelected(data.map((d) => d.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelectOne = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((selectedId) => selectedId !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  

  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => {
      if (orderBy) {
        if (sortOrder === 'asc') {
          return a[orderBy] < b[orderBy] ? -1 : 1;
        } else {
          return a[orderBy] > b[orderBy] ? -1 : 1;
        }
      }
      return 0;
    });
  }, [data, orderBy, sortOrder]);

  const isCheckedAll = selected.length === data.length;
  const isChecked = (id: number) => selected.includes(id);
  console.log(selected);

  return (
    <>
      <Divider />

      <TableContainer>
        <TableMui>
          <TableHead>
            <TableRow>
              {column.map((c, index) => (
                <DefaultColumn
                  key={index}
                  c={c}
                  onSelectAll={handleSelectAll}
                  isChecked={isCheckedAll}
                  sortOrder={sortOrder}
                  orderBy={orderBy}
                  onSort={handleSort}
                />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((data) => (
              <TableRow hover key={data.id}>
                {column.map((c, colIndex) => {
                  return (
                    <React.Fragment key={colIndex}>
                      {c.type === 'select' ? (
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isChecked(data.id)}
                            onChange={() => handleSelectOne(data.id)}
                          />
                        </TableCell>
                      ) : (
                        <TableCell align={c.align}>
                          {c.component ? (
                            c?.component(data)
                          ) : (
                            <Typography
                              variant="body1"
                              fontWeight="bold"
                              color="text.primary"
                              gutterBottom
                              noWrap
                            >
                              {data[c.name as keyof typeof data]}
                            </Typography>
                          )}
                        </TableCell>
                      )}
                    </React.Fragment>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </TableMui>
      </TableContainer>
    </>
  );
}
