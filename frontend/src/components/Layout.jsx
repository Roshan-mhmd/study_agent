import { useState } from "react";

function Layout({
  currentPage,
  setCurrentPage,
  children,
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Bar */}
{/* Top Bar */}

<div
  style={{
    height: "72px",
    background: "linear-gradient(90deg,#1E3A8A,#2563EB)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 25px",
    boxShadow: "0 3px 12px rgba(0,0,0,.15)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  }}
>
  {/* Left */}

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "18px",
    }}
  >
    <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      style={{
        background: "transparent",
        border: "none",
        color: "white",
        fontSize: "28px",
        cursor: "pointer",
      }}
    >
      ☰
    </button>

    <div>
      <h2
        style={{
          margin: 0,
          fontSize: "24px",
          fontWeight: "700",
        }}
      >
        🎓 LBS Campus AI Assistant
      </h2>

      <p
        style={{
          margin: 0,
          fontSize: "13px",
          opacity: 0.9,
        }}
      >
        Intelligent Campus Knowledge Portal
      </p>
    </div>
  </div>

  {/* Right */}

  <div
    style={{
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      background: "white",
      color: "#2563EB",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "20px",
      fontWeight: "bold",
    }}
  >
    👤
  </div>
</div>
      {/* Sidebar */}
      
      {sidebarOpen && (
        <div
         style={{
    position: "fixed",

    top: "72px",

    left: sidebarOpen ? 0 : "-280px",

    width: "260px",

    height: "calc(100vh - 72px)",

    background: "#1E293B",

    color: "white",

    padding: "22px",

    transition: "left .3s ease",

    zIndex: 1000,

    boxShadow: "4px 0 15px rgba(0,0,0,.15)",
}}
        >
          <div
    style={{
        marginBottom: "25px",
        paddingBottom: "15px",
        borderBottom: "1px solid rgba(255,255,255,.15)",
    }}
>
    <h3
        style={{
            margin: 0,
            fontSize: "20px",
        }}
    >
        🎓 LBS Campus AI
    </h3>

    <p
        style={{
            marginTop: "6px",
            opacity: 0.8,
            fontSize: "13px",
        }}
    >
        University Knowledge Portal
    </p>
</div>
          <button
    onClick={() => {
        setCurrentPage("chat");
        setSidebarOpen(false);
    }}
    style={buttonStyle}
>
    💬 Chat
</button>

<button
    onClick={() => {
        setCurrentPage("upload");
        setSidebarOpen(false);
    }}
    style={buttonStyle}
>
    📤 Upload Knowledge
</button>

<button
    disabled
    style={{
        ...buttonStyle,
        opacity: 0.5,
        cursor: "not-allowed",
    }}
>
    🕘 History
</button>

<button
    disabled
    style={{
        ...buttonStyle,
        opacity: 0.5,
        cursor: "not-allowed",
    }}
>
    ⭐ Bookmarks
</button>

<button
    style={buttonStyle}
>
    ⚙ Settings
</button>

<div
    style={{
        position: "absolute",
        bottom: "20px",
        left: "20px",
        opacity: 0.6,
        fontSize: "13px",
    }}
>
    Version 1.0
</div>
        </div>
      )}
{sidebarOpen && (

<div

onClick={() => setSidebarOpen(false)}

style={{

position:"fixed",

top:"72px",

left:0,

right:0,

bottom:0,

background:"rgba(0,0,0,.35)",

zIndex:999,

}}

>

</div>

)}
      {/* Main Content */}

      <div
        style={{
          flex: 1,
          overflow: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}

const buttonStyle = {
  width: "100%",
  padding: "14px 16px",
  marginBottom: "10px",

  border: "none",

  borderRadius: "10px",

  background: "#334155",

  color: "white",

  textAlign: "left",

  fontSize: "15px",

  cursor: "pointer",

  transition: ".2s",
};

export default Layout;