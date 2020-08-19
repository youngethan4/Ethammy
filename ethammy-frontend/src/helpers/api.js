export const APIRegister = async (registrationDetails) => {
  return await fetch("http://173.22.77.190:3000/api/register", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(registrationDetails),
  });
};

export const APIAuth = async (credentials) => {
  return await fetch("http://173.22.77.190:3000/api/auth", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
};
