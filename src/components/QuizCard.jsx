import { Button, Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { numFormat } from "../utils/Helper";
import { useForm, Controller } from "react-hook-form";
import databaseService from "../supabase/database";
import { useNavigate } from "react-router-dom";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str
    // .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
  return str;
}

function QuizCard({ question: { id, title, media_link, media_type }, index, className = "", teamId, hintsLeft, skipsLeft, hintUsed }) {
  const navigate = useNavigate();
  const [hint, setHint] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const Media = () => {
    if (media_type == "image") {
      return <img src={media_link} className="aspect-video object-contain rounded-lg w-full" alt="image" />;
    } else if (media_type == "video") {
      return <video autoPlay controls className="aspect-video object-cover rounded-lg w-full" src={media_link} />;
    } else if (media_type == "audio") {
      return (
        <div>
          <audio controls autoPlay src={media_link} />
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
    databaseService
      .submit_question({
        question_id: id,
        team_id: teamId,
        answer: slugify(data.answer.toLowerCase()),
      })
      .then(({ data, error }) => {
        if (data) {
          navigate(0);
        }
      });
  };

  const getHint = () => {
    databaseService.get_hint({ question_id: id, team_id: teamId }).then(({ data, error }) => {
      setHint(data);
      onOpen();
    });
  };

  const skipQuestion = () => {
    databaseService.skip_question({ question_id: id, team_id: teamId }).then(({ data, error }) => {
      console.log(data, error);
      navigate(0);
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Hint</ModalHeader>
              <ModalBody>
                <p>{hint}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className={`space-y-5 ${className}`}>
        <Card className="p-2">
          <CardHeader>
            <div className="flex flex-col space-y-5">
              <div>
                <p className="font-bold text-2xl">Q{index + 1}.</p>
                <p className="text-lg">{title}</p>
                {/* <p className="text-default-600">Pts: {points}</p> */}
              </div>
              <Media />
            </div>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              {"answerType" != "choices" ? (
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
                  {/* {options.map((option, index) => (
              <Card isHoverable isPressable key={index} className="p-4">
                <p className="text-lg">
                  <strong>{numFormat(index + 1)}</strong> {option}
                </p>
              </Card>
            ))} */}
                </div>
              )}
              <Divider className="my-4" />
              <div className="flex gap-2 justify-center mt-2">
                <Button size="lg" color="secondary" className="w-200" disabled={hintsLeft == 0} onPress={getHint}>
                  <p className="text-lg">{hintUsed || hint ? "Show Hint" : `Use a hint (${hintsLeft})`}</p>
                </Button>
                {(skipsLeft != 0 && true && id != 19) && (
                  <Button size="lg" color="secondary" className="w-200" disabled={skipsLeft == 0} onPress={skipQuestion}>
                    <p className="text-lg">Skip Question ({skipsLeft})</p>
                  </Button>
                )}
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default QuizCard;
