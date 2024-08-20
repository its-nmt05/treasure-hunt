import { Card, CardHeader } from "@nextui-org/react"
import React from "react"
import { numFormat } from "../utils/Helper"

function QuizCard({
  question: { title, options, points, media, media_type },
  index,
  className = "",
}) {
  const Media = () => {
    if (media_type == "image") {
      return (
        <img
          src={media}
          className="aspect-video object-cover rounded-lg max-w-[600px]"
          alt="image"
        />
      )
    } else if (media_type == "video") {
      return (
        <video
          autoPlay
          controls
          className="aspect-video object-cover rounded-lg max-w-[600px]"
          src={media}
        />
      )
    } else if (media_type == "audio") {
      return (
        <div>
          <audio controls autoPlay src={media} />
        </div>
      )
    }
  }

  return (
    <div className={`space-y-5 ${className}`}>
      <Card className="p-2">
        <CardHeader>
          <div className="flex flex-col space-y-5">
            <div>
              <p className="font-bold text-2xl">
                Q{index + 1}. {title}
              </p>
              <p className="text-default-600">Pts: {points}</p>
            </div>
            <Media />
          </div>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <Card isHoverable isPressable key={index} className="p-4">
            <p className="text-lg">
              <strong>{numFormat(index + 1)}</strong> {option}
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default QuizCard
