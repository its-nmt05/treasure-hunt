import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from "@nextui-org/react";
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
      name1: "",
      name2: "",
      name3: "",
      name4: "",
      name5: "",
      name6: "",
      email1: "",
      email2: "",
      email3: "",
      email4: "",
      email5: null,
      email6: null,
      mobile1: "",
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
            <Divider />
            <Controller
              name="name1"
              control={control}
              rules={{
                required: true,
                validate: {
                  duplicateEmails: (value, formValues) => value !== formValues.name2 || value !== formValues.name3 || value !== formValues.name4,
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Enter name of team leader"
                  variant="bordered"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  onClear={() => setValue("name1", "")}
                  errorMessage={errors.name1 && "Name is required"}
                  validationState={errors.name1 ? "invalid" : "valid"}
                />
              )}
            />
            <Controller
              name="email1"
              control={control}
              rules={{
                required: true,
                validate: {
                  iiserb: (value) => value.includes("24@iiserb.ac.in"),
                  duplicateEmails: (value, formValues) => value !== formValues.email2 || value !== formValues.email3 || value !== formValues.email4,
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
              name="mobile1"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Enter email of team leader"
                  variant="bordered"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  onClear={() => setValue("mobile1", "")}
                  errorMessage={errors.mobile1 && "Mobile is required"}
                  validationState={errors.mobile1 ? "invalid" : "valid"}
                />
              )}
            />
            <Divider />

            <Controller
              name="name2"
              control={control}
              rules={{
                required: true,
                validate: {
                  duplicateEmails: (value, formValues) => value !== formValues.name1 || value !== formValues.name3 || value !== formValues.name4,
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Enter name of member 1"
                  variant="bordered"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  onClear={() => setValue("name2", "")}
                  errorMessage={errors.name2 && "Name is required"}
                  validationState={errors.name2 ? "invalid" : "valid"}
                />
              )}
            />
            <Controller
              name="email2"
              control={control}
              rules={{
                required: true,
                validate: {
                  iiserb: (value) => value.includes("24@iiserb.ac.in"),
                  duplicateEmails: (value, formValues) => value !== formValues.email1 || value !== formValues.email3 || value !== formValues.email4,
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
            <Divider />

            <Controller
              name="name3"
              control={control}
              rules={{
                required: true,
                validate: {
                  duplicateEmails: (value, formValues) => value !== formValues.name1 || value !== formValues.name2 || value !== formValues.name4,
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Enter name of member 2"
                  variant="bordered"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  onClear={() => setValue("name3", "")}
                  errorMessage={errors.name3 && "Name is required"}
                  validationState={errors.name3 ? "invalid" : "valid"}
                />
              )}
            />
            <Controller
              name="email3"
              control={control}
              rules={{
                required: true,
                validate: {
                  iiserb: (value) => value.includes("24@iiserb.ac.in"),
                  duplicateEmails: (value, formValues) => value !== formValues.email2 || value !== formValues.email1 || value !== formValues.email4,
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
                  validationState={errors.email3 ? "invalid" : "valid"}
                />
              )}
            />
            <Divider />

            <Controller
              name="name4"
              control={control}
              rules={{
                required: true,
                validate: {
                  duplicateEmails: (value, formValues) => value !== formValues.name1 || value !== formValues.name2 || value !== formValues.name3,
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Enter name of member 3"
                  variant="bordered"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  onClear={() => setValue("name4", "")}
                  errorMessage={errors.name4 && "Name is required"}
                  validationState={errors.name4 ? "invalid" : "valid"}
                />
              )}
            />
            <Controller
              name="email4"
              control={control}
              rules={{
                required: true,
                validate: {
                  iiserb: (value) => value.includes("24@iiserb.ac.in"),
                  duplicateEmails: (value, formValues) => value !== formValues.email2 || value !== formValues.email3 || value !== formValues.email1,
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
                  errorMessage={errors.email4 && "Email is required"}
                  validationState={errors.email4 ? "invalid" : "valid"}
                />
              )}
            />
            <Divider />

            <Controller
              name="name5"
              control={control}
              rules={{
                validate: {
                  duplicateEmails: (value, formValues) => value !== formValues.name1 || value !== formValues.name2 || value !== formValues.name3,
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Enter name of member 4"
                  variant="bordered"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  onClear={() => setValue("name5", "")}
                  errorMessage={errors.name5 && "Name is required"}
                  validationState={errors.name5 ? "invalid" : "valid"}
                />
              )}
            />
            <Controller
              name="email5"
              control={control}
              rules={{
                validate: {
                  iiserb: (value) => value.includes("24@iiserb.ac.in"),
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Enter email of member 4"
                  variant="bordered"
                  type="email"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  onClear={() => setValue("email5", "")}
                  errorMessage={errors.email5 && "Email is required"}
                  validationState={errors.email5 ? "invalid" : "valid"}
                />
              )}
            />
            <Divider />

            <Controller
              name="name6"
              control={control}
              rules={{
                validate: {
                  duplicateEmails: (value, formValues) => value !== formValues.name1 || value !== formValues.name2 || value !== formValues.name3,
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Enter name of member 5"
                  variant="bordered"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  onClear={() => setValue("name6", "")}
                  errorMessage={errors.name6 && "Name is required"}
                  validationState={errors.name6 ? "invalid" : "valid"}
                />
              )}
            />
            <Controller
              name="email6"
              control={control}
              rules={{
                validate: {
                  iiserb: (value) => value.includes("24@iiserb.ac.in"),
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Enter email of member 5"
                  variant="bordered"
                  type="email"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  onClear={() => setValue("email6", "")}
                  errorMessage={errors.email6 && "Email is required"}
                  validationState={errors.email6 ? "invalid" : "valid"}
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
