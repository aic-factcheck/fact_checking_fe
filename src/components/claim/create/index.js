import React from 'react';
import {
  Button, Form, Input,
} from 'antd';
import PropTypes from 'prop-types';

export default function CreateClaim({ articleSubmited }) {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      // initialValues={{ remember: true }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="text"
        label="Claim - A sentence from the article to be fact-checked."
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0, span: 22 }}>
        <Button type="primary" htmlType="submit" disabled={!articleSubmited}>
          Add claim
        </Button>
      </Form.Item>
    </Form>
  );
}

CreateClaim.propTypes = {
  articleSubmited: PropTypes.bool.isRequired,
};
