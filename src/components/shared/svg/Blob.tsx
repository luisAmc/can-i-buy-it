export function BlobSVG({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 200 200'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      width={300}
      height={300}
    >
      <path
        d='M51,-54.8C67,-47.4,81.3,-32.1,82.1,-16.2C82.9,-0.2,70.2,16.5,58,29.7C45.8,42.9,34.3,52.6,21,57.1C7.8,61.7,-7.1,61,-24.5,58.4C-41.9,55.9,-61.8,51.5,-69.7,39.4C-77.7,27.3,-73.7,7.5,-69.3,-11.3C-64.9,-30.1,-60.1,-48,-48.4,-56.1C-36.8,-64.3,-18.4,-62.7,-0.4,-62.2C17.5,-61.7,35.1,-62.2,51,-54.8Z'
        transform='translate(100 100)'
      />
    </svg>
  );
}

export function BigBlobSVG({ className = '' }: { className?: string }) {
  return (
    <svg viewBox='0 0 200 200' width={800} className={className}>
      <path
        d='M53.8,-44.4C66.3,-41.3,70.6,-20.6,67.7,-2.9C64.8,14.8,54.6,29.6,42.1,41.8C29.6,53.9,14.8,63.4,2.2,61.2C-10.5,59,-20.9,45.2,-36,33C-51.1,20.9,-70.8,10.5,-68.5,2.3C-66.1,-5.8,-41.7,-11.6,-26.7,-14.7C-11.6,-17.8,-5.8,-18.2,7.4,-25.6C20.6,-33.1,41.3,-47.5,53.8,-44.4Z'
        transform='translate(100 100)'
      />
    </svg>
  );
}