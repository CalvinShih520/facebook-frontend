import React, { useState } from "react";
import userService from "../services/user.service";
import TokenService from "../services/token.service";
import { useNavigate } from "react-router-dom";
import "./About.css"; // 引入CSS文件

const UpdateAbout = () => {
  const navigate = useNavigate();
  const currentUser = TokenService.getUser();
  const [username, setUsername] = useState(currentUser.user.username);
  const [email, setEmail] = useState(currentUser.user.email);
  const [gender, setGender] = useState(currentUser.user.gender);
  // 检查 birthdate 是否有效
  const birthdate = currentUser.user.birthdate ? new Date(currentUser.user.birthdate) : null;
  const [birthdateValue, setBirthdate] = useState(birthdate ? birthdate.toISOString().substr(0, 10) : "");
  const [phone, setPhone] = useState(currentUser.user.phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { username, email, gender, birthdate: birthdateValue, phone };
      console.log("Submitting data:", data); // 调试信息
      const response = await userService.updateUserProfile(currentUser.user._id, data);
      console.log("Response data:", response.data); // 调试信息
      TokenService.setUser({
        ...currentUser,
        user: response.data,
      }); // 更新本地存储的用户资料
      alert("Profile updated successfully!");
      navigate('/about'); // 更新完成后跳转回个人信息页面
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };
  

  return (
    <div className="profile-container">
      <h2>Update Profile Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Birthdate</label>
          <input
            type="date"
            value={birthdateValue}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateAbout;
