import heroVideo from "../../../my_assets/hero.mp4";

type HeroPortraitProps = {
  className?: string;
  alt?: string;
};

export function HeroPortrait({
  className = "",
  alt = "Janusz Kowalski",
}: HeroPortraitProps) {
  return (
    <div className={`hero-portrait ${className}`.trim()}>
      <div className="hero-portrait-frame">
        <div className="hero-portrait-stage">
          <video
            aria-label={alt}
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            controls={false}
            controlsList="nodownload noplaybackrate noremoteplayback"
            className="hero-portrait-media"
            draggable={false}
            preload="auto"
            width={480}
            height={480}
            onContextMenu={(event) => event.preventDefault()}
            onPause={(event) => {
              event.currentTarget.play().catch(() => undefined);
            }}
          >
            <source src={heroVideo} type="video/mp4" />
            Hero
          </video>
        </div>
        <div aria-hidden="true" className="hero-portrait-vignette" />
      </div>
    </div>
  );
}
