import { Modal, Form, Input, Select, Button, Row, Col, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import supabase from "../../../supabaseClient";





interface Props {
  open: boolean;
  onCancel: () => void;
}

const roles = ["cuisinier", "employé", "rh", "admin"] as const;

type RoleType = (typeof roles)[number];

interface CreateUserFormData {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  role: RoleType;
}

const CreateUserModal = ({ open, onCancel }: Props) => {
  const { handleSubmit, control, reset } = useForm<CreateUserFormData>();

  const onSubmit = async (data: CreateUserFormData) => {
    const { email, password, name, phone, role } = data;

    const { data: createdUser, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        name,
        phone,
        role,
      },
    });

    if (error || !createdUser?.user) {
      message.error("Failed to create user: " + error?.message);
      return;
    }

    // Insertion dans la table profiles
    const { error: profileError } = await supabase.from("profiles").insert([
      {// le même id que auth.users
        name,
        email,
        phone,
        role,
      },
    ]);

    if (profileError) {
      message.error("Failed to create profile: " + profileError.message);
    } else {
      message.success("User and profile created successfully!");
      reset();
      onCancel();
    }
  };

  return (
    <Modal
      title="Créer un utilisateur"
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Nom">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Entrer le nom d'utilisateur" />
                )}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Email">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="email" placeholder="Entrer l'email" />
                )}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Téléphone">
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Entrer le numéro de téléphone"
                  />
                )}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Mot de passe">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    placeholder="Entrer le mot de passe"
                  />
                )}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Confirmer le mot de passe">
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    placeholder="Confirmer le mot de passe"
                  />
                )}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Rôle">
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select {...field} placeholder="Sélectionner un rôle">
                    {roles.map((role) => (
                      <Select.Option key={role} value={role}>
                        {role}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <div style={{ textAlign: "right" }}>
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            Annuler
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#FBBC04", borderColor: "#FBBC04" }}
          >
            Créer
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;
