export default function AdSlot({ id }: { id: string }) {
  return (
    <div className="ad-slot" data-ad-slot={id}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6600381860016497"
        data-ad-slot={id}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
