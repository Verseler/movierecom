export default function BottomShadowOverlay() {
  return (
    <div
      className="absolute bottom-0 left-0 w-full h-1/3"
      style={{
        background: "linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.7))",
      }}
    />
  );
}
