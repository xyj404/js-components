import React, { useMemo, useState, useCallback } from 'react';
import { Form, Row, Button, Icon } from 'antd';
import useForm from 'rc-form-hooks';
import styled from 'styled-components';
import BaseTable from '../baseTable';
import LinkButton from '../linkButton';
import SearchItem, { MyCol } from './SearchItem';

export default function({
  columns = [],
  getList,
  blankLayoutProps,
  form = useForm(),
  extra,
  action,
  reloadList,
  ...tableProps
}) {
  const [expand, setExpand] = useState(false);

  const [reloadState, setReloadState] = useState(false);
  const reload = useCallback(() => {
    setReloadState(!reloadState);
  }, [reloadState]);
  if (reloadList) {
    reloadList(reload);
  }

  const [listParams, setListParams] = useState(
    form.values
  );
  const baseTableParams = useMemo(
    () => ({ ...listParams, ...tableProps.params }),
    [listParams, tableProps.params]
  );

  const searchColumns = [];
  columns.forEach(({ search, dataIndex, searchIndex }, index) => {
    if (search) {
      searchColumns.push({
        ...columns[index],
        dataIndex: (searchIndex) || dataIndex
      });
    }
  });

  const ExpandBtns = (
    <MyCol sm={{ span: 24 }} md={{ span: 8 }}>
      <FormItem className={'expand'}>
        <Row
          type={'flex'}
          justify={expand ? 'end' : 'start'}
          align={'middle'}
          style={{
            lineHeight: '32px',
            whiteSpace: 'nowrap'
          }}>
          <Button
            type={'primary'}
            onClick={() => {
              setListParams(form.values);
              // reloadList();
            }}>
            查询
          </Button>
          <MarginButton
            onClick={() => {
              form.resetFields();
              setListParams({});
            }}>
            重置
          </MarginButton>
          {searchColumns.length >= 3 && (
            <LinkButton
              onClick={e => {
                e.preventDefault();
                setExpand(!expand);
              }}>
              {expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} />
            </LinkButton>
          )}
        </Row>
      </FormItem>
    </MyCol>
  );

  return (
    <>
      {!!searchColumns.length && (
        <Form
          layout={'inline'}
          onSubmit={e => {
            e.preventDefault();
            setListParams(form.values);
            // reloadList();
          }}>
          <Row>
            {searchColumns.map(
              (
                {
                  colProps,
                  title,
                  search,
                  dataIndex,
                  formItemProps,
                  searchOptions
                },
                index
              ) =>
                index < 2 && (
                  <SearchItem
                    key={dataIndex}
                    search={search}
                    colProps={colProps}
                    title={title}
                    dataIndex={dataIndex}
                    form={form}
                    formItemProps={formItemProps}
                    options={searchOptions}
                  />
                )
            )}
            {expand
              ? searchColumns[2] && (
                  <SearchItem
                    key={searchColumns[2].dataIndex}
                    search={searchColumns[2].search}
                    colProps={searchColumns[2].colProps}
                    title={searchColumns[2].title}
                    dataIndex={searchColumns[2].dataIndex}
                    formItemProps={searchColumns[2].formItemProps}
                    form={form}
                    options={searchColumns[2].searchOptions}
                  />
                )
              : ExpandBtns}
          </Row>
          {expand &&
            searchColumns.map(
              (_, index) =>
                !(index % 3) &&
                index > 2 && (
                  <Row key={index}>
                    {[...searchColumns]
                      .splice(index, 3)
                      .map(
                        ({
                          colProps,
                          title,
                          search,
                          dataIndex,
                          formItemProps,
                          searchOptions
                        }) => (
                          <SearchItem
                            key={dataIndex}
                            search={search}
                            colProps={colProps}
                            title={title}
                            dataIndex={dataIndex}
                            form={form}
                            formItemProps={formItemProps}
                            options={searchOptions}
                          />
                        )
                      )}
                  </Row>
                )
            )}
          {expand && (
            <Row type={'flex'} justify={'end'}>
              {ExpandBtns}
            </Row>
          )}
        </Form>
      )}
      {action && <ListActions type={'flex'}>{action}</ListActions>}
      {extra && (
        <>
          {extra}
          <br />
          <br />
        </>
      )}
      <BaseTable
        scroll={{ x: 1280 }}
        {...tableProps}
        columns={columns.filter(
          ({ searchIndex, title }) => !searchIndex && title
        )}
        reloadState={reloadState}
        getList={getList}
        params={baseTableParams}
      />
    </>
  );
}

const FormItem = styled(Form.Item)`
  &&& {
    display: flex;
    margin-bottom: 24px;
    .ant-form-item-control-wrapper {
      flex: 1;
    }
  }
`;
const MarginButton = styled(Button)`
  margin: 0 8px;
`;
const ListActions = styled(Row)`
  > * {
    margin-bottom: 16px;
    margin-right: 8px;
  }
`;

export * from '../baseTable';
