import axios from './axios';

const userService = {
  getUserData: async () => {
    try {
      const response = await axios.get('/users'); // Gọi đến API lấy danh sách users
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const response = await axios.post('/api/users', userData); // Gọi API để tạo người dùng mới
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await axios.put(`/api/users/${userId}`, userData); // Gọi API để cập nhật thông tin người dùng
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`/api/users/${userId}`); // Gọi API để xóa người dùng
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
};

export default userService;
