import {
  FC,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CodePage } from "../components/CodePage";

const Input = forwardRef<
  HTMLInputElement,
  {
    addAnswer: (n: number) => void;
    answer?: { at: number; val: number };
    disabled: boolean;
  }
>(({ addAnswer, answer, disabled }, ref) => {
  return (
    <input
      ref={ref}
      type={"text"}
      disabled={disabled}
      value={answer ? answer.val : ""}
      onChange={(e) => {
        const number = parseInt(e.target.value);
        if (number) {
          addAnswer(number);
        }
      }}
      maxLength={1}
      className="w-[40px] disabled:pointer-events-none disabled:border-opacity-50 h-[60px] border border-black text-center"
    ></input>
  );
});

export const SmartPinField: FC = () => {
  const CORRECT_PIN = "3451";
  const LENGTH = 4;
  const MAX_INTERVAL = 400;
  const MAX_ATTEMPTS = 3;
  const [answers, setAnswers] = useState<{
    [key: number]: { val: number; at: number } | undefined;
  }>({});

  const [activeInput, setActiveInput] = useState(0);
  const [done, setDone] = useState<"success" | "error">();

  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [attempts, setAttempts] = useState(MAX_ATTEMPTS);

  useEffect(() => {
    const el = inputs.current[activeInput];
    if (el) {
      el.focus();
    }
  }, [activeInput]);

  const reset = () => {
    setDone(undefined);
    setActiveInput(0);
    setAnswers({});
    Array.from(Array(LENGTH)).forEach((_, i) => {
      setAnswers((oa) => ({ ...oa, [i]: undefined }));
    });
  };

  const checkAnswer = useCallback(() => {
    if (answers[LENGTH - 1]) {
      setAttempts((ct) => ct - 1);

      for (let i = 1; i < LENGTH; i++) {
        const currentAnswer = answers[i];
        const prevAnswer = answers[i - 1];

        if (currentAnswer && prevAnswer) {
          if (currentAnswer.at - prevAnswer.at > MAX_INTERVAL) {
            setDone("error");
            return;
          }
        }
      }
      let totalAnswer = ``;
      Object.values(answers).forEach((a) => {
        if (a) {
          totalAnswer = totalAnswer.concat(a.val.toString());
        }
      });

      if (totalAnswer === CORRECT_PIN) {
        setDone("success");
      } else {
        setDone("error");
      }
    }
  }, [answers]);

  useEffect(() => {
    checkAnswer();
  }, [checkAnswer]);

  return (
    <CodePage
      code={`
import {
    FC,
    forwardRef,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

const Input = forwardRef<
  HTMLInputElement,
  {
    addAnswer: (n: number) => void;
    answer?: { at: number; val: number };
    disabled: boolean;
  }
>(({ addAnswer, answer, disabled }, ref) => {
  return (
    <input
      ref={ref}
      type={"text"}
      disabled={disabled}
      value={answer ? answer.val : ""}
      onChange={(e) => {
        const number = parseInt(e.target.value);
        if (number) {
          addAnswer(number);
        }
      }}
      maxLength={1}
      className="w-[40px] disabled:pointer-events-none disabled:border-opacity-50 h-[60px] border border-black text-center"
    ></input>
  );
});

const SmartPinField:FC = ()=>{
    const CORRECT_PIN = "3451";
    const LENGTH = 4;
    const MAX_INTERVAL = 400;
    const MAX_ATTEMPTS = 3;
    const [answers, setAnswers] = useState<{
      [key: number]: { val: number; at: number } | undefined;
    }>({});
  
    const [activeInput, setActiveInput] = useState(0);
    const [done, setDone] = useState<"success" | "error">();
  
    const inputs = useRef<(HTMLInputElement | null)[]>([]);
    const [attempts, setAttempts] = useState(MAX_ATTEMPTS);
  
    useEffect(() => {
      const el = inputs.current[activeInput];
      if (el) {
        el.focus();
      }
    }, [activeInput]);
  
    const reset = () => {
      setDone(undefined);
      setActiveInput(0);
      setAnswers({});
      Array.from(Array(LENGTH)).forEach((_, i) => {
        setAnswers((oa) => ({ ...oa, [i]: undefined }));
      });
    };
  
    const checkAnswer = useCallback(() => {
      if (answers[LENGTH - 1]) {
        setAttempts((ct) => ct - 1);
  
        for (let i = 1; i < LENGTH; i++) {
          const currentAnswer = answers[i];
          const prevAnswer = answers[i - 1];
  
          if (currentAnswer && prevAnswer) {
            if (currentAnswer.at - prevAnswer.at > MAX_INTERVAL) {
              setDone("error");
              return;
            }
          }
        }
        let totalAnswer = "";
        Object.values(answers).forEach((a) => {
          if (a) {
            totalAnswer = totalAnswer.concat(a.val.toString());
          }
        });
  
        if (totalAnswer === CORRECT_PIN) {
          setDone("success");
        } else {
          setDone("error");
        }
      }
    }, [answers]);
  
    useEffect(() => {
      checkAnswer();
    }, [checkAnswer]);
  
    return(
        <div className="p-[20px]">
            {done === "success" || (done === "error" && attempts < 1) ? (
                ""
            ) : (
                <div className="flex space-x-[20px]">
                    {Array.from(Array(LENGTH)).map((_, i) => (
                    <Input
                        ref={(ref) => {
                            inputs.current[i] = ref;
                        }}
                        disabled={activeInput !== i}
                        key={i}
                        addAnswer={(val) => {
                            setAnswers({ ...answers, [i]: { val, at: Date.now() } });
                            setActiveInput((ac) => ac + 1);
                        }}
                        answer={answers[i]}
                    />
                    ))}
                </div>
            )}
            {done ? (
                <p className="font-medium mt-[20px]">
                    {done === "success"
                    ? "✅ Success!!! Perfect timing."
                    : attempts > 0
                    ? "⚠️ Oops! Try again!!!"
                    : "⚠️ Try later!!!"}
                </p>
            ) : (
                ""
            )}

            {done === "error" && attempts > 0 ? (
                <button
                    onClick={() => {
                    reset();
                    }}
                    className="mt-[20px] bg-black text-white px-[13px] py-[4px] rounded-[4px]"
                >
                    Retry ({attempts} attempt{attempts === 1 ? "" : "s"} left)
                </button>
            ) : (
                ""
            )}
        </div>
    )
}

export default SmartPinField;
       `}
      githubLink="https://github.com/Theshawa/code-lab/tree/main/src/SmartPinField"
      technologies={["React", "TypeScript"]}
      title="React Smart Pin Input Field"
    >
      <div className="p-[20px]">
        {done === "success" || (done === "error" && attempts < 1) ? (
          ""
        ) : (
          <div className="flex space-x-[20px]">
            {Array.from(Array(LENGTH)).map((_, i) => (
              <Input
                ref={(ref) => {
                  inputs.current[i] = ref;
                }}
                disabled={activeInput !== i}
                key={i}
                addAnswer={(val) => {
                  setAnswers({ ...answers, [i]: { val, at: Date.now() } });
                  setActiveInput((ac) => ac + 1);
                }}
                answer={answers[i]}
              />
            ))}
          </div>
        )}
        {done ? (
          <p className="font-medium mt-[20px]">
            {done === "success"
              ? "✅ Success!!! Perfect timing."
              : attempts > 0
              ? "⚠️ Oops! Try again!!!"
              : "⚠️ Try later!!!"}
          </p>
        ) : (
          ""
        )}

        {done === "error" && attempts > 0 ? (
          <button
            onClick={() => {
              reset();
            }}
            className="mt-[20px] bg-black text-white px-[13px] py-[4px] rounded-[4px]"
          >
            Retry ({attempts} attempt{attempts === 1 ? "" : "s"} left)
          </button>
        ) : (
          ""
        )}
        <p></p>
      </div>
    </CodePage>
  );
};
