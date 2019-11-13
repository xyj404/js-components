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
  && {
    .ant-form-item {
      margin-bottom: 24px;
    }
    &:nth-child(1) {
      .ant-form-item {
        margin-right: 24px;
      }
    }
    &:nth-child(2) {
      .ant-form-item {
        margin-left: 24px;
        margin-right: 24px;
      }
    }
    &:nth-child(3) {
      .ant-form-item {
        margin-left: 24px;
        margin-right: 0;
      }
    }
    .expand.ant-form-item {
      margin-right: 0;
    }
    @media (max-width: 1200px) {
      &:nth-child(2) {
        .ant-form-item {
          margin-left: 12px;
        }
      }
      &:nth-child(3) {
        .ant-form-item {
          margin-left: 12px;
        }
      }
    }
    @media (max-width: 1000px) {
      &:nth-child(2) {
        .ant-form-item {
          margin-left: 4px;
        }
      }
      &:nth-child(3) {
        .ant-form-item {
          margin-left: 4px;
        }
      }
    }
    @media (max-width: 768px) {
      .ant-form-item {
        margin-right: 8px !important;
        margin-left: 0 !important;
      }
    }
  }
`;
const FormItem = styled(Form.Item)`
  &&& {
    display: flex;
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
