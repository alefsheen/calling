import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchEvaluations,
  updateEvaluations,
} from "../connection/fetchContacts";
import { socket } from "../connection/socket";
import { getCurrentUser } from "../utils/auth";
import { unix2date } from "../utils/dateConversion";
import ProgressBar from "../components/ProgressBar";
import toast from "react-hot-toast";

const evaluationParameters = [
  {
    param: "حضور در برنامه بین هفته",
    color: "bg-[linear-gradient(90deg,#730202_0%,#F00_100%)]", // red
    score: { type: "const", pos: 1 },
    messageRequire: false,
  },
  {
    color: "bg-[linear-gradient(90deg,#024873_0%,#00F_100%)]", // Blue
    param: "حضور در پنجشنبه",
    score: { type: "var", steps: [3, -2] },
    messageRequire: false,
  },
  {
    color: "bg-[linear-gradient(90deg,#027302_0%,#0F0_100%)]", // Green
    param: "تاخیر از زمان شروع برنامه",
    score: { type: "var", steps: [-0.5, -1, -1.5, -2, -2.5, -3] },
    messageRequire: false,
  },
  {
    color: "bg-[linear-gradient(90deg,#735102_0%,#FF0_100%)]", // Yellow
    param: "یادداشت برداری در کلاس",
    score: { type: "const", pos: 1 },
    messageRequire: false,
  },
  {
    color: "bg-[linear-gradient(90deg,#73025A_0%,#F0F_100%)]", // Pink
    param: "انجام تکالیف سپرده شده",
    score: { type: "var", steps: [1, -1, -2, -3] },
    messageRequire: true,
  },
  {
    color: "bg-[linear-gradient(90deg,#027373_0%,#0FF_100%)]", // Cyan
    param: "شرکت در اردو",
    score: { type: "const", pos: 10 },
    messageRequire: true,
  },
  {
    color: "bg-[linear-gradient(90deg,#4B0273_0%,#A00FDF_100%)]", // Purple
    param: "توانا سازی",
    score: { type: "const", pos: 25 },
    messageRequire: true,
  },
  {
    color: "bg-[linear-gradient(90deg,#733902_0%,#FA8128_100%)]", // Orange
    param: "انجام ماموریت ها",
    score: { type: "var", steps: [1, 2, 3] },
    messageRequire: true,
  },
  {
    color: "bg-[linear-gradient(90deg,#026573_0%,#38B6FF_100%)]", // Sky Blue
    param: "برنده شدن در مسابقات",
    score: { type: "var", steps: [1, 2, 3] },
    messageRequire: true,
  },
  {
    color: "bg-[linear-gradient(90deg,#02734B_0%,#00FA9A_100%)]", // Mint Green
    param: "حضور همه اعضای تیم",
    score: { type: "const", pos: 5 },
    messageRequire: true,
  },
  {
    param: "غیبت همه اعضای تیم",
    color: "bg-[linear-gradient(90deg,#730202_0%,#F00_100%)]", // red
    score: { type: "const", pos: -7 },
    messageRequire: true,
  },
];

//[background:linear-gradient(90deg,#730202_0%,#F00_100%)]
function EvaluationBtn({ param, color, handleClick }) {
  return (
    <button
      onClick={handleClick}
      className={`${color} shadow-xl p-2 text-sm text-center content-center font-semibold rounded-xl text-gray-100 border-2 border-gray-200 border-dashed `}
    >
      {param}{" "}
    </button>
  );
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function Evaluation({
  contacts,
  users,
  lastEvent,
  activeTab,
  setActiveTab,
  setContacts,
}) {
  const navigate = useNavigate();

  if (activeTab !== "tab4") {
    navigate(`/`);
  }
  const { id } = useParams();
  const [evaluations, setEvaluations] = useState([]);
  const [selectedBtn, setSelectedBtn] = useState("");
  // console.log(evaluations);
  const contact = users?.find((c) => c._id === id);

  const currentUser = getCurrentUser()?.lastName;
  // console.log(evaluations);
  const currentEvaluation = (selectedBtn) =>
    evaluations?.find(
      (c) => c.date === lastEvent?.date && c.param === selectedBtn.param
    );
  const info = {
    currentUser,
    currentEvaluation,
  };

  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchEvaluations(setEvaluations, id);

    socket.on(
      "updateEvaluation",
      ({ _contactID, _currentUser, _Evaluations }) => {
        // console.log("on updateEvaluation");
        if (_contactID === id && _currentUser !== currentUser)
          setEvaluations(_Evaluations);
      }
    );
  }, []);

  return (
    <div className=" bg-gray-100 min-h-screen bg-gray-800">
      <Header contact={contact} />
      <EvaluationBtns
        setSelectedBtn={setSelectedBtn}
        currentEvaluation={currentEvaluation}
        setResult={setResult}
        setScore={setScore}
      />
      {selectedBtn && (
        <SetEvaluation
          selectedBtn={selectedBtn}
          setSelectedBtn={setSelectedBtn}
          contact={contact}
          setEvaluations={setEvaluations}
          lastEvent={lastEvent}
          info={info}
          result={result}
          setResult={setResult}
          score={score}
          setScore={setScore}
        />
      )}
      <Timeline evaluations={evaluations} />
    </div>
  );
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Header({ contact }) {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 shadow py-3 px-5 flex items-center justify-start gap-24 text-right">
      <button onClick={() => navigate(-1)} className="text-gray-700">
        <FaArrowRight size={16} className="text-gray-300" />
      </button>
      <h1 className=" font-bold text-gray-300">{contact?.lastName}</h1>
    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function EvaluationBtns({
  setSelectedBtn,
  currentEvaluation,
  setResult,
  setScore,
}) {
  return (
    <div className=" bg-gray-600  p-3">
      <div className="bg-gray-800 rounded-xl p-3">
        <h1 className="text-center text-white mb-3">معیار های امتیازدهی</h1>
        <div className="grid grid-cols-4 gap-1  ">
          {evaluationParameters.map((_param, index) => (
            <EvaluationBtn
              key={index}
              handleClick={() => {
                setSelectedBtn(_param);
                setResult(
                  currentEvaluation({ param: _param.param })?.message
                    ? currentEvaluation({ param: _param.param })?.message
                    : ""
                );
                setScore(
                  currentEvaluation({ param: _param.param })?.star
                    ? currentEvaluation({ param: _param.param })?.star
                    : _param.score.type === "const"
                    ? _param.score.pos
                    : _param.score.steps[0]
                );
              }}
              param={_param.param}
              color={_param.color}
            />
          ))}
          <button
            // onClick={handleClick}
            className={` bg-black shadow-xl p-2 text-sm text-center content-center font-semibold rounded-xl text-gray-100 border-2 border-gray-200 border-dashed `}
            onClick={() => {
              setSelectedBtn({
                param: "_",
                color: "bg-[linear-gradient(90deg,#000000_0%,#434343_100%)]",
              });
              setResult(currentEvaluation({ param: "_" }).message);
            }}
          >
            ثبت نظر آزاد
          </button>
        </div>
      </div>
    </div>
  );
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SetEvaluation({
  selectedBtn,
  setSelectedBtn,
  contact,
  setEvaluations,
  lastEvent,
  info,
  setResult,
  result,
  score,
  setScore,
}) {
  const { currentUser, currentEvaluation } = info;
  const isFreeNote = selectedBtn.param === "_";
  function handleSetScore() {
    if (score === 0 && !isFreeNote) {
      toast("ثبت نمره ضروری است!");
      return;
    }

    if ((isFreeNote || selectedBtn.messageRequire) && result?.length === 0) {
      toast("ثبت توضیحات ضروری است!");
      return;
    } // console.log(hasAnotherFollower);

    updateEvaluations({
      contactID: contact._id,
      date: lastEvent?.date,
      param: selectedBtn.param,
      recorder: currentUser,
      message: result,
      star: score,
    });

    setEvaluations((evaluations) => {
      if (currentEvaluation(selectedBtn))
        return evaluations.map((c) =>
          c.date === lastEvent?.date && c.param === selectedBtn.param
            ? {
                ...c,
                recorder: currentUser,
                message: result,
                star: score,
              }
            : c
        );
      else {
        return [
          ...evaluations,
          {
            contactID: contact._id,
            date: lastEvent?.date,
            param: selectedBtn.param,
            recorder: currentUser,
            message: result,
            star: score,
          },
        ];
      }
    });

    setScore(0);
    setResult("");
    setSelectedBtn("");
  }

  return (
    <div className="bg-gray-900 pt-5 px-10 pb-4 flex-col items-center justify-center text-center">
      <div className="grid grid-cols-[60px_2fr] gap-x-2 gap-y-2">
        {!isFreeNote && (
          <>
            <p
              className={` col-span-2  text-center content-center font-semibold  text-gray-100  `}
            >
              {selectedBtn.param}
            </p>
            {selectedBtn.score.type === "var" && (
              <>
                <p
                  className={`  text-sm text-center content-center font-semibold  text-gray-100  `}
                >
                  ثبت نمره{" "}
                </p>
                <ProgressBar
                  score={score}
                  setScore={setScore}
                  steps={selectedBtn.score.steps}
                />
              </>
            )}
          </>
        )}
        {selectedBtn.messageRequire && !isFreeNote && (
          <p
            className={`  text-sm text-center content-center font-semibold  text-gray-100  `}
          >
            توضیحات{" "}
          </p>
        )}
        {(isFreeNote || selectedBtn.messageRequire) && (
          <div
            className={`h-24 ${
              isFreeNote ? "col-span-2" : ""
            } relative border-2 border-gray-600 border-dashed rounded-xl p-1 bg-white`}
          >
            <textarea
              className=" h-full w-full rounded-xl p-1 text-sm"
              value={result}
              onChange={(e) => setResult(e.target.value)}
            ></textarea>
          </div>
        )}
      </div>
      <button
        className={` mt-3 mx-auto text-sm font-bold px-5 text-white  ${selectedBtn.color} p-2 rounded-lg`}
        onClick={handleSetScore}
      >
        {isFreeNote ? "ثبت نظر" : "ثبت "}
        {!isFreeNote && (
          <span>
            <span
              className="text-yellow-500 font-black bg-gray-200 px-2 rounded-full"
              style={{ direction: "ltr", unicodeBidi: "plaintext" }}
            >
              {/* {selectedBtn.score.pos} */}
              {score}
            </span>
            {" امتیاز "}
          </span>
        )}
      </button>
    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Timeline({ evaluations }) {
  return (
    <div className="p-3 bg-gray-800 text-white">
      <h1 className="mb-4 text-center font-bold">وضعیت حضور برنامه های اخیر</h1>
      <div className="relative ">
        {/* <div className="absolute h-full border-8 left-10 rounded-full border-gray-700"></div> */}
        {evaluations?.map((evaluation) => {
          const messageExist = evaluation?.param.length > 0 || evaluation?.star;
          const isFreeNote = evaluation?.param === "_";
          // console.log(evaluation);
          return (
            messageExist && (
              <div key={evaluation?._id} className="mb-5 relative">
                {/* Circle */}
                <div
                  className={`absolute left-0 top-0 w-24 p-2 ${
                    isFreeNote
                      ? "bg-black"
                      : evaluationParameters.find(
                          (p) => p.param === evaluation?.param
                        )?.color
                  } rounded-2xl shadow-lg flex flex-col gap-1 items-center justify-center`}
                >
                  <span className="text-white text-xs font-bold">
                    {evaluation?.recorder}
                  </span>
                  <span className="text-white text-xs font-bold">
                    {unix2date(evaluation?.date)}
                  </span>
                </div>

                {/* Event Details */}
                <div
                  className={`bg-white p-3 rounded-bl-lg rounded-br-3xl rounded-tl-3xl rounded-tr-lg shadow-md w-60 overflow-auto`}
                >
                  <div className="mb-2">
                    {!isFreeNote && (
                      <p className="text-yellow-700 text-center  text-xs">
                        {evaluation?.param}
                        {"  "}
                        <span className="bg-yellow-900 px-2 py-1 text-gray-200 rounded-full">
                          <span
                            className="  "
                            style={{
                              direction: "ltr",
                              unicodeBidi: "plaintext",
                            }}
                          >
                            {evaluation?.star}
                          </span>
                          {" امتیاز "}
                        </span>
                      </p>
                    )}
                    {!isFreeNote && evaluation?.message.length > 0 && (
                      <div className="border-b mt-2 mx-5 border-b-yellow-900"></div>
                    )}
                    <p className="text-center text-gray-700 text-xs mt-1">
                      {evaluation?.message}
                    </p>
                  </div>
                </div>
                {/* )} */}
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
