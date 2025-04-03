import React from "react";
import { Button, Card, Flex, Input, Typography } from "antd";
import type { GetProps } from "antd";

type OTPProps = GetProps<typeof Input.OTP>;

const { Title, Paragraph } = Typography;

const Verify: React.FC = () => {
  const onChange: OTPProps["onChange"] = (text) => {
    console.log("onChange:", text);
  };

  const onInput: OTPProps["onInput"] = (value) => {
    console.log("onInput:", value);
  };

  const sharedProps: OTPProps = {
    onChange,
    onInput,
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card
        style={{
          width: 450,
          textAlign: "center",
          borderRadius: 11,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          font: "Roboto",
        }}
      >
        <Flex gap="middle" align="flex-start" vertical>
          <h2></h2>
          <Title style={{ fontSize: 32, fontWeight: "700" }}>
            Enter Verification Code
          </Title>
          <Paragraph style={{ fontSize: 16, fontWeight: "400" }}>
            Check your email we’ve sent you verification code
          </Paragraph>
          <Input.OTP
            formatter={(str) => str.toUpperCase()}
            {...sharedProps}
            style={{ height: 45, width: 380, marginBottom: 25 }}
          />
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              backgroundColor: "#FBBC04",
              borderColor: "#FFD700",
              color: "#F8F7F5FF",
              height: 45,
              width: 380,
            }}
          >
            Send Code
          </Button>
        </Flex>
        <Paragraph style={{ marginTop: 200, fontSize: 16, color: "gray" }}>
          © 2025 ALL RIGHTS RESERVED
        </Paragraph>
      </Card>
    </div>
  );
};

export default Verify;
