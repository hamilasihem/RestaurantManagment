import React from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

type FormValues = {
  email: string;
};

const VerificationCode: React.FC = () => {
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
        <Title style={{ fontSize: 32, fontWeight: "700" }}>
          Send Verification Code
        </Title>
        <Paragraph style={{ fontSize: 16 }}>
          Enter your email to get your verification code
        </Paragraph>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <label
            style={{
              display: "block",
              textAlign: "left",
              marginBottom: 5,
              fontWeight: 500,
            }}
          >
            Email
          </label>
          <Input
            {...register("email")}
            placeholder="exemple@email.com"
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
              height: 45,
              width: 380,
            }}
          >
            Send Code
          </Button>
        </form>
        <Paragraph style={{ marginTop: 200, fontSize: 16, color: "gray" }}>
          © 2025 ALL RIGHTS RESERVED
        </Paragraph>
      </Card>
    </div>
  );
};

export default VerificationCode;
