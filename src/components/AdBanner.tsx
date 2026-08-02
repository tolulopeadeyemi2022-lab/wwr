export default function AdBanner() {
  return (
    <div className="my-8 flex justify-center">
      <iframe
        src="/ads/banner-300x250.html"
        width="300"
        height="250"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
      />
    </div>
  );
}