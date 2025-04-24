export type LoginResponse = {
  status: string;
  data: {
    user: {
      id: string;
      email: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      name: string;
    };
    token: string;
  };
};

export type RegisterResponse = {
  status: string;
  data: {
    user: {
      id: string;
      email: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      name: string;
    };
    message: string;
  };
};
