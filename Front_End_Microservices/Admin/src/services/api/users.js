import axios from '../axios';


const getUsers = async () => {
    try {
      const response = await axios.get('/users');
      return response.data;  // Trả về dữ liệu users
    } catch (error) {
      throw new Error(error.message);  // Ném lỗi để component bắt lỗi
    }
};

export default { getUsers };
