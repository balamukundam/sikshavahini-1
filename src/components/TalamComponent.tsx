interface Props {
  image: string;
  note: string;
  stopPlaying: () => void;
}

const styles = {
  fixedBox: {
    position: "fixed" as const,
    top: "62%",
    height: "60%",
    width: "14%",
    right: "12px",
    transform: "translateY(-50%)",
    background: "#007bff",
    color: "white",
    padding: "10px 20px",
    borderRadius: "10px",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
    overflowY: "auto" as const, // Explicitly typed as const
    maxHeight: "100vh",
  },
};

const TalamComponent = ({ image, note, stopPlaying }: Props) => {
  return (
    <div className="no-print" style={styles.fixedBox}>
      <div style={{ textAlign: "center" }}>
        <p>🕉 Talam 🕉</p>
        <img
          src={image}
          alt={`Talam`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 8,
            border: "2px solid #ccc",
            textAlign: "center",
          }}
        />
        <h1>{note}</h1>
        <button
          onClick={stopPlaying}
          style={{
            padding: "10px 20px",
            margin: "5px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default TalamComponent;
