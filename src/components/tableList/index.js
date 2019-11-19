import React, { useMemo, useState, useCallback } from 'react';
import { Form, Row, Button, Icon } from 'antd';
import useForm from 'rc-form-hooks';
import styled from 'styled-components';
import BaseTable from '../baseTable';
import LinkButton from '../linkButton';
import SearchItem, { MyCol } from './SearchItem';

  // columns必填，他里面对象的类型除了antd的columns的属性外还有
    // search?: true | React.ReactElement;          显示对应字段的过滤组件
    // colProps?: ColProps;                         antd col组件的属性
    // formItemProps?: FormItemProps;               每项formItem的属性
    // searchIndex?: keyof P | (keyof P)[];         额外的字段，将其与search组合使用
    // searchOptions?: GetFieldDecoratorOptions<P>; getFieldDecorator的配置
export default function({
  columns = [],
  getList,    // 必填，一个返回promise的方法，一般为axios请求的方法({params, pagination, filters, sorter, extra}) => Promise<{ list: D[]; total?: number }>
  form = useForm(),  // control filter form
  extra,      // 表格上额外的东西
  action,     // 表格上的额外的按钮
  reloadList,  // 重新加载表格的回调
  resetFilter,  // 清空筛选项的回调
  filterShowLine, // 筛选项显示几行，默认不隐藏
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
          align={'middle'}
        >
          <Button
            type={'primary'}
            onClick={() => {
              setListParams(form.values);
            }}>
            查询
          </Button>
          <MarginButton
            onClick={() => {
              form.resetFields();
              console.log(resetFilter)
              resetFilter && resetFilter();
              setListParams({});
            }}>
            重置
          </MarginButton>
          {searchColumns.length >= 3 && !!filterShowLine && (
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
  console.log(filterShowLine)

  const showFilterItem = (index) => {
    filterShowLine = filterShowLine === true ? 1 : filterShowLine
    if (filterShowLine) {
      if (expand) {
        return true
      } else {
        return index < filterShowLine * 3 - 1
      }
    } else {
      return true
    }
  }

  return (
    <>
      {!!searchColumns.length && (
        <Form
          layout={'inline'}
          onSubmit={e => {
            e.preventDefault();
            setListParams(form.values);
          }}>
          <Row
            type={'flex'}
            alignContent={'flex-start'}
          >
            {searchColumns.map(
              (
                {...props},
                index
              ) =>
              (
                showFilterItem(index) &&
                <SearchItem
                    key={props.dataIndex || props.searchIndex}
                    form={form}
                    {...props}
                  />
                )
            )}
            {ExpandBtns}
          </Row>
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
        scroll={{ x: 780 }}
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
