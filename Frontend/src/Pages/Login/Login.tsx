import { useForm } from "react-hook-form";
import { Button, Card, Input, Typography, Divider } from "antd";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";

const { Title, Text, Link } = Typography;

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="flex items-center justify-center w-full max-w-md">
        <Card className="w-full p-6 shadow-lg text-center">
          <Title level={3}>Connexion</Title>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="exemple@gmail.com"
                {...register("email", { required: "L'email est requis" })}
                className="mt-1 w-full"
              />
              {errors.email && (
                <Text type="danger" className="text-xs">
                  {errors.email.message}
                </Text>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Mot de passe</label>
              <Input.Password
                placeholder="Au moin 8 caractères"
                {...register("password", {
                  required: "Le mot de passe est requis",
                  maxLength: {
                    value: 8,
                    message:
                      "Le mot de passe ne doit pas dépasser 8 caractères",
                  },
                })}
                className="mt-1 w-full"
              />
              {errors.password && (
                <Text type="danger" className="text-xs">
                  {errors.password.message}
                </Text>
              )}
            </div>

            <div className="text-right">
              <Link href="#">Mot de passe oublié ?</Link>
            </div>

            <Button type="primary" htmlType="submit" className="w-full">
              Se connecter
            </Button>
          </form>

          <Divider>Ou</Divider>

          <Button icon={<GoogleOutlined />} className="w-full mb-2">
            Se connecter avec Google
          </Button>
          <Button
            icon={<FacebookOutlined />}
            className="w-full"
            style={{ backgroundColor: "#3b5998", color: "#fff" }}
          >
            Se connecter avec Facebook
          </Button>

          <Divider />
          <Text>
            Vous n'avez pas de compte ? <Link href="#">S'inscrire</Link>
          </Text>
        </Card>
      </div>
    </div>
  );
}
