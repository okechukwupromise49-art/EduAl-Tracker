import { useState, useEffect, useContext} from "react";
import { Camera, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {ThemeContext} from "../../App.jsx"

export function EditProfile() {
  const {theme} = useContext(ThemeContext)

    const navigate = useNavigate()
  // You can later connect these to real user data (e.g. from context or API)
  const [name, setName] = useState(""); // example default
  const [email, setEmail] = useState("okechukwu@example.com");
  const [profilePic, setProfilePic] = useState(null); // for future image upload preview
  const [data, setData] = useState({})
  const [preview, setPreview] = useState(null);
  const inputStyle = " w-full px-4 py-3  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400transition-all"

  const handleSubmit = (e) => {
    e.preventDefault();
    
   const apiUpdate = async () => {
  
 

  const formData = new FormData();
  formData.append("name", name.trim() || "Test Name");

  if (profilePic) {
    formData.append("profilePic", profilePic);
  }

  console.log("Sending FormData...");
  console.log("Has file:", !!profilePic);

  try {
    const res = await fetch("http://localhost:5000/api/auth/update", {
      method: "post",
       credentials: "include",
      body: formData,
    });

    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);

    if (res.ok) {
      alert("Success!");
      window.location.reload();
    } else {
      alert(`Error ${res.status}: ${text}`);
    }
  } catch (err) {
    console.error("Fetch failed:", err);
    alert("Fetch error: " + err.message);
  }
};

    apiUpdate()
  };

   useEffect(() => {
      async function fetchData() {
    
        const res = await fetch(`{import.meta.env.VITE_API_URL}/api/auth/details`, {
           credentials: "include"
        });
    
        const data = await res.json();
        console.log(data);
        setName(data.name)
        setData(data)
      }
    
      fetchData();
    }, []);

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  console.log(file)

  if (file) {
    setProfilePic(file); // ✅ real file (goes to backend)
    setPreview(URL.createObjectURL(file)); // ✅ preview (for UI)
  }
};

  return (
    <div className={`min-h-screen  flex items-center justify-center p-4 
    ${theme === 'dark' ? 'bg-gray-900' : ' bg-gray-50 '}`}>
      <div className={` shadow-xl rounded-2xl p-8 w-full max-w-md
         ${theme === 'dark' ? "bg-gray-800" : "bg-white"}`}>
        <h1 className="text-2xl font-bold text-gray-500 text-center mb-8">
          Edit Profile
        </h1>

        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8 relative group">
          <div className="relative">
            {preview ? (
              <img
                src={preview}
                className="w-28 h-28 rounded-full object-cover border-1 border-white shadow-lg"
              />
            ) : data.profilePic ? (
              <img
                src={data.profilePic}
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {name?.charAt(0)?.toUpperCase() || "O"}
              </div>
            )}

            {/* Camera overlay on hover */}
            <label
              htmlFor="profile-pic"
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition"
            >
              <Camera size={20} className="text-gray-700" />
              <input
                type="file"
                id="profile-pic"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <p className="text-sm text-gray-400 mt-2">Tap camera to change photo</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-500 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className={` ${inputStyle} 
                ${theme === "dark" ? "bg-gray-700 border border-gray-900" : "border border-gray-300 bg-gray-50 "}`}
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-500 mb-1"
            >
              Email Address(cannot be change)
            </label>
            <input
              type="email"
              id="email"
              value={data.email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className={` ${inputStyle}
                ${theme === "dark" ? "bg-gray-700 border border-gray-900" : "border border-gray-300 bg-gray-50 "}`}
              disabled // ← usually email is not changeable — remove disabled if you allow it
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              className="
                flex-1 flex items-center justify-center gap-2
                bg-blue-600 hover:bg-blue-700 
                text-white font-medium py-3 rounded-lg
                transition-all shadow-md
              "
            >
              <Save size={18} />
              Save Changes
            </button>

            <button
              type="button"
              className={` flex-1 flex items-center justify-center gap-2
                 font-medium py-3 rounded-lg
                transition-all 
                ${theme === "dark" ? "bg-gray-500":"bg-gray-200 text-gray-800 hover:bg-gray-300 "}
              `}
               
              onClick={() => navigate('/dashboard')}
            >
              <X size={18} />
              Cancel
            </button>
          </div>
         
        </form>
      </div>
    </div>
  );
}