import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
import databaseService from "../supabase/database";
import { getTeamId, saveTeamId } from "../utils/Helper";

const groupedByLevel = (questions) =>
  questions.reduce((acc, question) => {
    const { level } = question;
    if (!acc[level]) {
      acc[level] = [];
    }
    acc[level].push(question);
    return acc;
  }, {});

const shuffleQuestions = (groupedQuestions) => {
  let questionsArr = [];
  for (const level of Object.keys(groupedQuestions)) {
    questionsArr.push(groupedQuestions[level][Math.random() * (groupedQuestions[level].length - 1)].id);
  }
  return questionsArr;
};

function Register() {
  const navigate = useNavigate();
  const teamId = getTeamId();

  useEffect(() => {
    if (teamId) {
      navigate(`/team`);
    }
  });

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
      email1: "",
      email2: "",
      email3: "",
      email4: "",
      teamName: "",
    },
  });

  const onSubmit = async (data) => {
    const questions = await databaseService.getAllQuestions();

    if (questions.status != 200) return null;

    let questionsDataByLevel = groupedByLevel(questions.data);
    let generatedPath = shuffleQuestions(questionsDataByLevel);

    let teamData = {
      name: data.teamName,
      members: [data.email1, data.email2, data.email3, data.email4],
    };

    const res = await databaseService.register(teamData);
    if (!res.error) {
      const updateRes = await databaseService.generatePath(generatedPath, res.data);
      console.log(updateRes, generatedPath, res.data);
      saveTeamId(res.data);
      navigate(`/team`);
    } else {
      console.log(res.error);
    }
  };

  return (
    <div className="space-y-4 lg:max-w-[60%]">
      <Card isBlurred>
        <CardHeader className="p-6">
          <p className="font-bold text-xl">Register Your Team</p>
        </CardHeader>
      </Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card isBlurred>
          <CardBody className="flex gap-3">
            <Controller
              name="teamName"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  classNames=""
                  style={{ margin: "0.5em" }}
                  placeholder="Enter your team name"
                  variant="bordered"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  onClear={() => setValue("teamName", "")}
                  errorMessage={errors.teamName && "Name is required"}
                  validationState={errors.teamName ? "invalid" : "valid"}
                />
              )}
            />

            <Controller
              name="email1"
              control={control}
              rules={{
                required: true,
                validate: {
                  iiserb: (value) => value.includes("iiserb.ac.in"),
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Enter email of team leader"
                  variant="bordered"
                  type="email"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  onClear={() => setValue("email1", "")}
                  errorMessage={errors.email1 && "Email is required"}
                  validationState={errors.email1 ? "invalid" : "valid"}
                />
              )}
            />

            <Controller
              name="email2"
              control={control}
              rules={{
                required: true,
                validate: {
                  iiserb: (value) => value.includes("iiserb.ac.in"),
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Enter email of member 1"
                  variant="bordered"
                  type="email"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  onClear={() => setValue("email2", "")}
                  errorMessage={errors.email2 && "Email is required"}
                  validationState={errors.email2 ? "invalid" : "valid"}
                />
              )}
            />

            <Controller
              name="email3"
              control={control}
              rules={{
                required: true,
                validate: {
                  iiserb: (value) => value.includes("iiserb.ac.in"),
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Enter email of member 2"
                  variant="bordered"
                  type="email"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  onClear={() => setValue("email3", "")}
                  errorMessage={errors.email3 && "Email is required"}
                  validationState={errors.email2 ? "invalid" : "valid"}
                />
              )}
            />

            <Controller
              name="email4"
              control={control}
              rules={{
                required: true,
                validate: {
                  iiserb: (value) => value.includes("iiserb.ac.in"),
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Enter email of member 3"
                  variant="bordered"
                  type="email"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  onClear={() => setValue("email4", "")}
                  errorMessage={errors.email3 && "Email is required"}
                  validationState={errors.email2 ? "invalid" : "valid"}
                />
              )}
            />
          </CardBody>
          <CardFooter>
            <Button type="submit" size="lg" color="primary" className="w-full">
              <p className="text-lg">Register</p>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default Register;
