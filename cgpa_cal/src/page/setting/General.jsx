import { useContext, useState } from "react";
import { Eye, EyeOff, LockKeyhole, LogOut } from "lucide-react";
import { EditProfile } from "./EditProfile";
import { ThemeContext } from "../../App";

export function General() {
  const {theme} = useContext(ThemeContext)
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
  e.preventDefault();

  setError("");
  setMessage("");

  if (!oldPassword || !newPassword) {
    setError("Please fill in both password fields");
    return;
  }

  if (newPassword.length < 6) {
    setError("Password must be at least 6 characters");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/api/auth/change-password", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ oldPassword, newPassword })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Something went wrong");
      setLoading(false);
      return;
    }

    setMessage(data.message);
    setOldPassword("");
    setNewPassword("");

  } catch (err) {
    setError(err);
  }

  setLoading(false);
};

  const handleLogout = async () => {
  if (window.confirm("Are you sure you want to logout?")) {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });

      window.location.href = "/apply"; // or navigate("/apply")
    } catch (err) {
      console.log("Logout failed");
    }
  }
};

  return (
    <div className={`min-h-screen 
    ${theme === "dark" ? "bg-gray-900 text-white" 
    :"bg-gray-50 text-black"} pb-12`}>
      {/* Edit Profile Section */}
      <EditProfile />

      {/* Reset Password Section */}
      <div className="max-w-lg mx-auto px-4 ">
        <div className={` rounded-2xl shadow-sm p-8 
          ${theme === "dark" ? "bg-gray-800" :"bg-gray-50 "}`}>
          <h2 className={`text-2xl font-bold
             ${theme === "dark" ? "text-gray-300" 
             :"text-gray-800"} mb-6`}>Reset Password</h2>

          <form onSubmit={handleResetPassword} className="space-y-6">
            {/* Old Password */}
            <div>
              <label className={`block text-sm font-medium 
                ${theme === "dark" ? "text-gray-400"
                 :"text-gray-700"} mb-1`}>
                Old Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <LockKeyhole size={20} />
                </div>
                <input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Enter old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className={`w-full pl-11 pr-12 py-3  ${theme === "dark" ? "bg-gray-700 border border-gray-900" 
                    :"border border-gray-300 "} 
                    rounded-xl focus:outline-none focus:ring-2
                     focus:ring-blue-500`}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className={`block text-sm font-medium 
                ${theme === "dark" ? "text-gray-400" 
                :"text-gray-700"} mb-1`}>
                New Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <LockKeyhole size={20} />
                </div>
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full pl-11 pr-12 py-3  ${theme === "dark" ? "bg-gray-700 border border-gray-900" 
                    :"border border-gray-300 "} 
                    rounded-xl focus:outline-none focus:ring-2
                     focus:ring-blue-500`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3.5 rounded-xl transition-all"
            >
              {loading ? "Updating Password..." : "Reset Password"}
            </button>
            {error && <p className="text-red-700 text-sm">{error}</p>}
            {message && <p className="text-green-700 text-sm">{message}</p>}
          </form>
        </div>

        {/* Logout Section */}
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-3  
              ${theme === "dark" 
                ? "bg-gray-600 hover:bg-red-400 text-red-500  hover:text-white"
                 :"bg-red-50 hover:bg-red-100 text-red-600 "} font-medium py-3.5 rounded-xl transition-all`}
          >
            <LogOut size={20} />
            Logout from Account
          </button>
        </div>
      </div>
    </div>
  );
}