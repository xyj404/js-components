import { Col, Form, Input } from 'antd';
import React from 'react';
import styled from 'styled-components';

export default function({
  form: { getFieldDecorator },
  search,
  dataIndex,
  title,
  colProps,
  formItemProps,
  options
}) {
  return (
    <MyCol sm={{ span: 24 }} md={{ span: 8 }} {...colProps}>
      <FormItem label={title} {...formItemProps}>
        {search &&
          dataIndex &&
          getFieldDecorator(dataIndex, options)(
            search === true ? <Input placeholder={`请输入${title}`} /> : search
          )}
      </FormItem>
    </MyCol>
  );
}

export const MyCol = styled(Col)`
    @media (max-width: 575px) {
        & {
          flex-grow: 1
        }
    }
`;
const FormItem = styled(Form.Item)`
  &&& {
    display: flex;
    margin: 0 24px 24px 0;
    .ant-form-item-control-wrapper {
      flex: 1;
    }
    .ant-form-item-label,
    .ant-form-item-control {
      line-height: 32px;
    }
    .ant-form-item-label {
      width: auto;
      padding-right: 8px;
    }
    .ant-form-item-children > * {
      width: 100%;
    }
  }
`;
