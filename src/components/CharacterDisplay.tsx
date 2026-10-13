interface CharacterDisplayProps {
  src: string;
  alt: string;
  badge?: string;
  size?: 'md' | 'lg';
  isRound?: boolean;
}

export const CharacterDisplay = ({
  src,
  alt,
  badge,
  size = 'md',
  isRound = false,
}: CharacterDisplayProps) => {
  const frameClass = [
    'character-frame',
    isRound ? 'is-round' : '',
    size === 'lg' ? 'size-lg' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className="character-wrap">
      <div className={frameClass}>
        <img
          className="character-image"
          src={src}
          alt={alt}
          draggable={false}
          decoding="async"
        />
        {badge && <span className="character-badge">{badge}</span>}
      </div>
    </div>
  );
};

export default CharacterDisplay;
