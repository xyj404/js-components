import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Table } from 'antd';

const BaseTable = function({
  getList,
  params: params2,
  pagination,
  reloadState,
  columns = [],
  ...props
}) {
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    pagination: {},
    filters: {},
    sorter: {
      column: {},
      order: 'descend',
      field: '',
      columnKey: ''
    },
    extra: {
      currentDataSource: []
    }
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const wrappedGetList = useCallback(params => getList(params), []);
  const preParams2 = useRef(params2);
  useEffect(() => {
    setLoading(true);
    if (JSON.stringify(preParams2.current) !== JSON.stringify(params2)) {
      preParams2.current = params2;
      return setParams({
        ...params,
        pagination: { ...params.pagination, current: 1 }
      });
    }
    wrappedGetList({ ...params, params: { ...(params2 || {}) } })
      .then(({ list, total = list.length }) => {
        setDataSource(list);
        setTotal(total);
      })
      .finally(() => setLoading(false));
  }, [params, params2, wrappedGetList, reloadState]);
  return (
    <Table
      className={'baseTable'}
      rowKey={(record) =>
        record[Object.keys(record).find(key => !!key.match(/id/i)) || '']
      }
      loading={loading}
      dataSource={dataSource}
      pagination={
        pagination !== false
          ? {
              ...params.pagination,
              total,
              ...pagination
            }
          : false
      }
      onChange={(pagination, filters, sorter, extra) =>
        setParams({ pagination, filters, sorter, extra })
      }
      columns={columns.map(option => ({
        ...option,
        render: (...arg) =>
          option.render ? (option.render)(...arg) : arg[0] || '-'
      }))}
      {...props}
    />
  );
};

export default BaseTable;
