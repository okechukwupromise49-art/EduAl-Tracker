import { useEffect } from "react";

const BottomAd = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      width: "100%",
      height: "60px",
      background: "#fff",
      textAlign: "center",
      zIndex: 9999
    }}>
      

      <ins className="adsbygoogle"
     style={{display:'block'}}
     data-ad-client="ca-pub-6692275181062955"
     data-ad-slot="6111228373"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>


      {/* Close button */}
      <button
        onClick={(e) => {
          e.target.parentElement.style.display = "none";
        }}
        style={{
          position: "absolute",
          right: 5,
          top: 5,
          background: "red",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        ❌
      </button>
    </div>
  );
};


export default BottomAd;