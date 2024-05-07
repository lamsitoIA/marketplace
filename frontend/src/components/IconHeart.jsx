

const IconHeart = ({ filled }) => {

  return (
    <div className="icon-heart-container">
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black" // Color del borde
      strokeWidth={2} // Ancho del borde
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ overflow: "visible" }}
    >
      <path
        fill={filled ? "red" : "none"} // Relleno de color rojo si está lleno, sin relleno si no
        d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
      />
    </svg>
    </div>
  );
};

export default IconHeart;
