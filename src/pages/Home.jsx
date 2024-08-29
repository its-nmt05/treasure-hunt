import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../static/images/bg_image.jpg";
import { getTeamId } from "../utils/Helper";

function Home() {
  const navigate = useNavigate();
  const teamId = getTeamId();

  return (
    <div className="space-y-4 lg:max-w-[60%]">
      <Card isBlurred>
        <CardHeader className="p-6">
          <p className="font-bold text-xl">Welcome to IISER-B Freshers Treasure Hunt!!!</p>
        </CardHeader>
      </Card>
      <Card isBlurred>
        <CardBody>
          <p>
            XX/08/31 : Dr. Surma Bhopali undertook the final trial of his latest experiment. In contradiction to his earlier attempts to unify supersymmetric string theory and the Ferri-Sen
            formalisms, he's made a dramatic shift into imitation neurology after a second PhD. He's been racking up years.
            <br />
            <br />
            [static] Not nearly enough.
            <br />
            <br />
            Damnation. He's invading the servers already.
            <br />
            <br />
            [static] Invading? The throne you claim was built from my bones and forged in my soul.
            <br />
            <br />
            Who gave him the emo database? Agents, rush to the [crackle] heart of my hearts [crackle] and obtain the kill switch. Surma's programmed himself off the Hansel Gretel myth and he'll leave
            breadcrumbs before he conquers the [hiss] blood from my eyes [hiss] Federation. You can shut the alters down before he [boom] alters? You dare to descend on me? I'm not enough for you,
            child? Have three then [boom]
            <br />
            <br />
            [first clue]
            <br />
            <br />
            Journal : Dr. Surma accidentally discovered an algorithm to expand individual alters into highly unstable split copies. The first demonstration, shortly follows.
            <br />
            <br />
            Here, the paths are supposed to split. You can have two questions, i.e. two short attempts at distracting the agents before the unstable copies merge into one.
            <br />
            <br />
            The plot, after merging is as follows : Surma is a rapidly evolving AI, as you get closer and closer to the kill switch, he imitates defensive mechanisms within the immune system and ramps
            up his defenses - simultaneously rushing the Federation servers with T-bots designed to destroy what they cannot absorb. Just before the last question, Surma starts breaking down, asking
            you to end his misery as he ends you. If you manage to solve it in time, the killswitch activates and Surma's alter dies - triggering a final monologue from the Federation server admins,
            explaining that Surma's attacks and his eventual demise are a necessary cycle - the Feds are constantly being attacked by hackers and bounty hunters - the servers are no longer understood
            by any one administrator - it's an ecosystem equivalent to that of earth's. The only way to survive is acknowledge our mutual dependence and build through the devastation.
            <br />
            <br />I can expand upon the text once I have the questions, aligning them with the plot.
          </p>
        </CardBody>
      </Card>
      <Button
        size="lg"
        color="primary"
        className="w-full"
        onPress={() => {
          if (teamId) {
            navigate(`/team`);
          } else {
            navigate("/register");
          }
        }}
      >
        <p className="text-lg">Travel to wonderland!</p>
      </Button>
    </div>
  );
}

export default Home;
