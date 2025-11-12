"use client";
export default function Page() {
  return (
    <div className="scanlines bg-blue-100 h-screen">
      <button
        className="cursor-pointer border border-black border-2"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        back
      </button>
    </div>
  );
}
