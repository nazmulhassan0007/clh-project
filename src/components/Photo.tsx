type Props = { src: string; alt: string; overlay: 'purple' | 'blue' | 'natural'; className?: string; ratio?: string; priority?: boolean }

/** Brand imagery rule: purple overlay at 70% or deep-blue overlay at 60%. */
export default function Photo({ src, alt, overlay, className = '', ratio, priority }: Props) {
  return (
    <div className={`photo photo-${overlay} ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" width={1170} height={780} />
    </div>
  )
}
