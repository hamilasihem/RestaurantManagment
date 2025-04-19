import { Controller, useForm } from "react-hook-form";
import { Button, Card, Input, Typography, Divider, message } from "antd";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import supabase from "../../../supabaseClient";
import { useNavigate } from "react-router-dom";



const { Title, Text, Link, Paragraph } = Typography;

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { 
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    const { email, password } = data;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });




    if (error) {
      message.error("Échec de la connexion : " + error.message);
    } else {
      message.success("Connexion réussie !");
      navigate("/"); 
    }
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
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          font: "Roboto",
        }}
      >
        <div>
          <Title style={{ fontSize: 29, fontWeight: "700" }}>
            Welcome Back 👋
          </Title>
          <Paragraph style={{ fontSize: 17 }}>
            Today is a new day. It's your day. You shape it. Sign in to start
            managing your projects.
          </Paragraph>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          style={{ width: "100%" }}
        >
          <div>
            <label
              style={{
                display: "block",
                textAlign: "left",
                marginBottom: 5,
                fontSize: 16,
                fontWeight: 400,
              }}
            >
              Email
            </label>
            <Controller
              name="email"
              control={control}
              rules={{ required: "L'email est requis" }}
              render={({ field }) => (
                <Input
                  type="email"
                  placeholder="exemple@gmail.com"
                  {...field}
                  style={{
                    backgroundColor: "#F6F6F7FF",
                    borderRadius: 5,
                    border: "1px solid #d9d9d9",
                    color: "#8897AD",
                    fontWeight: 500,
                    height: 45,
                    width: 380,
                  }}
                />
              )}
            />
            {errors.email && (
              <Text type="danger" className="text-xs">
                {errors.email.message}
              </Text>
            )}
          </div>

          <div>
            <label
              style={{
                display: "block",
                textAlign: "left",
                marginBottom: 5,
                fontSize: 16,
                fontWeight: 400,
              }}
            >
              Password
            </label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Le mot de passe est requis",
                maxLength: {
                  value: 11,
                  message: "Le mot de passe ne doit pas dépasser 11 caractères",
                },
              }}
              render={({ field }) => (
                <Input.Password
                  placeholder="At least 8 characters"
                  {...field}
                  style={{
                    backgroundColor: "#F6F6F7FF",
                    borderRadius: 5,
                    border: "1px solid #d9d9d9",
                    color: "#8897AD",
                    fontWeight: 500,
                    height: 45,
                    width: 380,
                  }}
                />
              )}
            />
            {errors.password && (
              <Text type="danger" className="text-xs">
                {errors.password.message}
              </Text>
            )}
          </div>

          <div
            style={{ display: "block", textAlign: "right", marginBottom: 20 }}
          >
            <Link href="#">Forgot Password ?</Link>
          </div>

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
            Sign in
          </Button>
        </form>

        <Divider>Or</Divider>

        <Button
          icon={<GoogleOutlined />}
          type="primary"
          htmlType="submit"
          block
          style={{
            backgroundColor: "#F6F6F7FF",
            color: "black",
            fontSize: 16,
            height: 45,
            width: 380,
          }}
        >
          Sign in with Google
        </Button>
        <Button
          icon={<FacebookOutlined />}
          type="primary"
          htmlType="submit"
          block
          style={{
            backgroundColor: "#F6F6F7FF",
            marginTop: 15,
            color: "black",
            fontSize: 16,
            height: 45,
            width: 380,
          }}
        >
          Sign in with Facebook
        </Button>

        <Divider />
        <Text style={{ fontSize: 18 }}>
          Don't you have an account? <Link href="#">Sign up</Link>
        </Text>

        <Paragraph style={{ marginTop: 50, fontSize: 16, color: "gray" }}>
          © 2025 ALL RIGHTS RESERVED
        </Paragraph>
      </Card>
    </div>
  );
}
