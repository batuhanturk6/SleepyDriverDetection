const API_URL = "http://192.168.1.102:7248/api";

// Kullanıcı giriş işlemi
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("Login response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const responseData = await response.json();
    console.log("Login successful:", responseData);
    return responseData;
  } catch (error) {
    console.error("Network error during login:", error);
    throw error;
  }
};

// Kullanıcı kayıt işlemi
export const registerUser = async (userData) => {
  console.log("Attempting to register with data:", userData);

  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    console.log("Register response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const responseData = await response.json();
    console.log("Registration successful:", responseData);
    return responseData;
  } catch (error) {
    console.error("Network error during registration:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await fetch(`${API_URL}/users/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Logout response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Logout failed");
    }

    console.log("Logout successful");
    return { message: "Logout successful" };
  } catch (error) {
    console.error("Network error during logout:", error);
    throw error;
  }
};


export const getUserDetails = async (Id) => {
  try {
    const response = await fetch(`${API_URL}/users/${Id}`);
    console.log("Get user details response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch user details");
    }

    const responseData = await response.json();
    console.log("User details fetched successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Network error while fetching user details:", error);
    throw error;
  }
};

// Kullanıcı bilgilerini güncelle
export const updateUserDetails = async (Id, userData) => {
  try {
    const response = await fetch(`${API_URL}/users/${Id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    console.log("Update user details response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update user details");
    }

    const responseData = await response.json();
    console.log("User details updated successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Network error during update:", error);
    throw error;
  }
};
