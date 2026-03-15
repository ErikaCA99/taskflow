export default function ProjectLoading() {
  return (
    <div className="fade-in">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            height: 14,
            width: 70,
            background: "var(--bg-3)",
            borderRadius: 4,
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div
          style={{
            height: 14,
            width: 10,
            background: "var(--bg-3)",
            borderRadius: 4,
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div
          style={{
            height: 14,
            width: 120,
            background: "var(--bg-3)",
            borderRadius: 4,
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      </div>

      <div
        className="card"
        style={{
          padding: "1.25rem 1.5rem",
          marginBottom: "1.75rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "var(--bg-3)",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
          >
            <div
              style={{
                height: 18,
                width: 180,
                background: "var(--bg-3)",
                borderRadius: 4,
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
            <div
              style={{
                height: 13,
                width: 240,
                background: "var(--bg-3)",
                borderRadius: 4,
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[60, 70, 80].map((w, i) => (
            <div
              key={i}
              style={{
                height: 24,
                width: w,
                background: "var(--bg-3)",
                borderRadius: 99,
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.25rem",
        }}
      >
        <div style={{ display: "flex", gap: "0.25rem" }}>
          {[50, 80, 90, 80].map((w, i) => (
            <div
              key={i}
              style={{
                height: 28,
                width: w,
                background: "var(--bg-3)",
                borderRadius: 99,
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          ))}
        </div>
        <div
          style={{
            height: 34,
            width: 110,
            background: "var(--bg-3)",
            borderRadius: 8,
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="card"
            style={{
              height: 56,
              animation: "pulse 1.5s ease-in-out infinite",
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
