import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
import databaseService from "../supabase/database";
import { getTeamId, saveTeamId } from "../utils/Helper";
import { PATHS } from "../data/questionPaths";

const question0s = [
  {
    id: 0,
    title: `Dr. Surma Bhopali, in his wild experimentation, has left clues all around. His first identity was obsessed with time and capturing moments, a curious link between a ticking object and something that rhymes with a famous photography brand. Can you uncover it?`,
    media_link: null,
    media_type: null,
    answers: ["rikon", "Rikon"],
  },
  {
    id: 1,
    title: `In his quest for connectivity, Bhopali’s second self kept the network running smooth and well. In the heart of his domain, a name you’ll find that routes the global tech spell. It’s a term that, with a little rhythm, echoes a festive vibe, a subtle hint that dances with a party’s jive. Can you uncover this vital piece of his network?"`,
    media_link: null,
    media_type: null,
    answers: ["cisco", "Cisco"],
  },
  {
    id: 2,
    title: `You might be cool, but Bhopali’s cooler! His third identity left a curious name at the very heart of this building. A strange blend of letters, both familiar and foreign, awaits in the atrium waiting to give you a new spark. Can you discover the name that sits at the core of it all?`,
    media_link: null,
    media_type: null,
    answers: ["nuspak", "Nuspak"],
  },
];

function Register() {
  const navigate = useNavigate();
  const teamId = getTeamId();
  const question0 = question0s[Math.floor(Math.random() * 3)];

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
      path: "",
    },
  });

  const onSubmit = async (data) => {
    // const questions = await databaseService.getAllQuestions();

    // if (questions.status != 200) return null;

    // let questionsDataByLevel = groupedByLevel(questions.data);
    // let generatedPath = shuffleQuestions(questionsDataByLevel);

    let teamData = {
      name: data.teamName,
      members: [
        { email: data.email1, mobile: data.mobile1, name: data.name1 },
        { email: data.email2, name: data.name2 },
        { email: data.email3, name: data.name3 },
        { email: data.email4, name: data.name4 },
        { email: data.email5, name: data.name5 },
        { email: data.email6, name: data.name6 },
      ],
    };

    const res = await databaseService.register(teamData);
    if (!res.error) {
      const updateRes = await databaseService.generatePath(PATHS[data.path.toLowerCase().replace(/\s+/g, "")], res.data);
      saveTeamId(res.data);
      navigate(`/team`);
    } else {
      console.log(res.error);
    }
  };

  return (
    <div className="space-y-4 w-full lg:max-w-[60%]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="p-2 mb-4">
          <CardHeader>
            <div className="flex flex-col space-y-5">
              <div>
                <p className="font-bold text-2xl">Q0.</p>
                <p className="text-lg">{question0.title}</p>
                {/* <p className="text-default-600">Pts: {points}</p> */}
              </div>
              {/* <Media /> */}
            </div>
          </CardHeader>
          <CardBody>
            <Controller
              name="path"
              control={control}
              rules={{
                required: true,
                validate: {
                  answer: (value) => question0.answers.includes(value.toLowerCase().replace(/\s+/g, "")),
                },
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
                  onClear={() => setValue("path", "")}
                  errorMessage={errors.path && "Incorrect Answer"}
                  validationState={errors.path ? "invalid" : "valid"}
                />
              )}
            />
          </CardBody>
        </Card>
        <Card className="mb-4">
          <CardHeader className="p-6">
            <p className="font-bold text-xl">Register Your Team</p>
          </CardHeader>
        </Card>
        <Card>
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
            {/* <Controller
              name="path"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                  variant="bordered"
                  placeholder="Select a Path"
                  aria-label="Path"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  onClear={() => setValue("path", "")}
                  errorMessage={errors.path && "Path is required"}
                  validationState={errors.path ? "invalid" : "valid"}
                >
                  {pathOptions.map((option) => (
                    <SelectItem key={option.key}>{option.label}</SelectItem>
                  ))}
                </Select>
              )}
            /> */}
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
                  placeholder="Enter mobile number"
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
