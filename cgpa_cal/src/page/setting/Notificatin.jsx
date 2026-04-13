import { useState, useEffect, useContext } from "react"
import { ArrowLeft, Inbox, XIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { ThemeContext } from "../../App"
import API_URL from "../../Api"

export function Notification() {
  const {theme} = useContext(ThemeContext)
  const navigate = useNavigate()

  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNotifications() {
      try {
        

        const res = await fetch(`${API_URL}/api/notification/getNotification`, {
          credentials: "include"
        })

        const data = await res.json()
        setNotifications(data)

      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

 async function handleDelete(id, index) {
  try {
    

    const res = await fetch(`${API_URL}/api/notification/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to delete");
    }

    const updated = notifications.filter((_, i) => i !== index);
    setNotifications(updated);

  } catch (err) {
    console.error(err);
    alert("Failed to delete notification");
  }
}



useEffect(() => {
   async  function fetchData(){

    
    await fetch(`${API_URL}/api/notification/markAsRead`, {
      method: "PATCH",
      credentials: "include"
});
   }
   fetchData()
},[])


  if (loading) {
    return <p className="text-center mt-40">Loading...</p>
  }

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-40 text-gray-400">
        <Inbox size={50} />
        <p className="mt-3 text-lg">No Notification Found</p>
      </div>
    )
  }



  return (
    <div className="m-2">
      <ArrowLeft 
        className="cursor-pointer mb-4" 
        onClick={() => navigate('/dashboard')} 
      />

      <div className="space-y-3">
        {notifications.map((note, index) => (

          <div 
            key={note._id} 
            className={`p-3 rounded-xl shadow ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : note.read
                ? "bg-gray-100"
                : "bg-white border-l-4 border-blue-500"
            }`}
          >
            

              <div className="flex justify-between ">
                 <p>{note.message}</p>
            <button className="text-gray-300 hover:text-red-500"
              onClick={() => handleDelete(note._id, index)} >
              <XIcon/>
            </button>
              </div>
           
            <small className="text-gray-400">
              {new Date(note.createdAt).toLocaleString()}
            </small>

            
          </div>
        ))}
      </div>
    </div>
  )
}