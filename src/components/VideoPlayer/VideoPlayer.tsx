type VideoPlayerProps = {
  url: string;
};

export default function VideoPlayer({ url }: VideoPlayerProps) {
  return (
    <iframe
      className="w-screen md:h-96 md:w-auto aspect-video"
      src={url}
      title="trailer"
      allowFullScreen
    />
  );
}
