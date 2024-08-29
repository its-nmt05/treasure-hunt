import { Button, Card, CardHeader, Divider, Input } from "@nextui-org/react";
import React from "react";
import { numFormat } from "../utils/Helper";
import { useForm, Controller } from "react-hook-form";

function QuizCard({ question: { title, options, points, media, media_type, answerType }, index, className = "", teamId, hintsLeft, skipsLeft }) {
  const Media = () => {
    if (media_type == "image") {
      return <img src={media} className="aspect-video object-cover rounded-lg max-w-[600px]" alt="image" />;
    } else if (media_type == "video") {
      return <video autoPlay controls className="aspect-video object-cover rounded-lg max-w-[600px]" src={media} />;
    } else if (media_type == "audio") {
      return (
        <div>
          <audio controls autoPlay src={media} />
        </div>
      );
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      answer: "",
    },
  });

  const onSubmit = (data) => {
    let teamData = { name: data.name, emailIDs: [data.email1, data.email2, data.email3, data.email4] };
    alert(JSON.stringify(data));
  };

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
      <form onSubmit={handleSubmit(onSubmit)}>
        {answerType != "choices" ? (
          <div className="flex flex-col justify-center gap-2">
            <Controller
              name="answer"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  classNames=""
                  style={{ margin: "0.5em" }}
                  placeholder="Enter your answer"
                  variant="bordered"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  onClear={() => setValue("answer", "")}
                  errorMessage={errors.answer && "Incorrect Answer"}
                />
              )}
            />
            <Button size="lg" color="primary" className="w-200 mx-auto" type="submit">
              <p className="text-lg">Submit</p>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <Card isHoverable isPressable key={index} className="p-4">
                <p className="text-lg">
                  <strong>{numFormat(index + 1)}</strong> {option}
                </p>
              </Card>
            ))}
          </div>
        )}
        <Divider className="my-4" />
        <div className="flex gap-2 justify-center mt-2">
          <Button size="lg" color="secondary" className="w-200" disabled={hintsLeft == 0}>
            <p className="text-lg">Use a hint ({hintsLeft})</p>
          </Button>
          <Button size="lg" color="secondary" className="w-200" disabled={skipsLeft == 0}>
            <p className="text-lg">Skip Question ({skipsLeft})</p>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default QuizCard;
