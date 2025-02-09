import Image from 'next/image'

const PulsingLoadingScreen = ({ addClass }: { addClass: string }) => {
  return (
    <div className={ addClass + " flex items-center justify-center bg-gradient-to-b from-background to-secondary"}>
      <div className="relative w-40 h-40 rounded-full overflow-hidden ">
        <Image
          src="/resources/LABIANCO_LOGO.webp"
          alt="Loading"
          fill
          className="object-cover"
          priority
          loading="eager"
        />
      </div>
    </div>
  )
}

export default PulsingLoadingScreen