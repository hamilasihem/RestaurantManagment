import React from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

type FormValues = {
  email: string;
};

const ResetPassWord: React.FC = () => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Email submitted:", data.email);
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
        <Title style={{ fontSize: 36, fontWeight: 700 }}>Reset Password</Title>
        <Paragraph style={{ fontSize: 20, fontWeight: 400 }}>
          Now you can update your password , but make sure to remember it 👋
        </Paragraph>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <label
            style={{
              display: "block",
              textAlign: "left",
              marginBottom: 5,
              fontWeight: 500,
              fontSize: 16,
            }}
          >
            New Password
          </label>
          <Input
            {...register("email")}
            placeholder="At least 8 characters"
            style={{
              marginBottom: 15,
              backgroundColor: "#F1F2F5FF",
              color: "#8897AD",
              height: 45,
              width: 380,
            }}
          />
          <label
            style={{
              display: "block",
              textAlign: "left",
              marginBottom: 5,
              fontWeight: 500,
              fontSize: 16,
            }}
          >
            Confirm Password
          </label>
          <Input
            {...register("email")}
            placeholder="At least 8 characters"
            style={{
              marginBottom: 15,
              backgroundColor: "#F1F2F5FF",
              color: "#8897AD",
              height: 45,
              width: 380,
            }}
          />
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              backgroundColor: "#FBBC04",
              borderColor: "#FFD700",
              color: "#F8F7F5FF",
              fontSize: 16,
              height: 45,
              width: 380,
              marginTop: 10,
            }}
          >
            Reset Password
          </Button>
        </form>
        <Paragraph style={{ marginTop: 200, fontSize: 16, color: "gray" }}>
          © 2025 ALL RIGHTS RESERVED
        </Paragraph>
      </Card>
    </div>
  );
};

export default ResetPassWord;
