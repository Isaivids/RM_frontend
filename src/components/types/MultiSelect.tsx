import React, { useState, useRef, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { MdRemoveCircle } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/Store";
import {
  getMultiSelectQuestionWithId,
  getQuestionDetails,
  updateMultiSelectQuestionAndOptions,
} from "../../store/slice/AddQuestion";
import { useSelector } from "react-redux";
import Spinner from "../spinner/Spinner";
const MultiSelect = () => {
  const dummyPlaceholder = [
    { key: uuidv4(), value: "", state: true },
    { key: uuidv4(), value: "", state: true },
    { key: uuidv4(), value: "", state: true },
  ];
  const Messages = {
    success : 'Added Successfully',
    error : 'Unable to add data',
    successUpdate : 'Updated Successfully',
    errorUpdate : 'Unable to Update',
    identical : 'Options with same value exists',
  }
  const params = useParams();
  const questionDetails = useSelector((state: any) => state.addedQuestion);
  const [question, setQuestion] = useState<{ key: string; value: string }>({
    key: "",
    value: "",
  });
  const [options, setOptions] =
    useState<{ value: string; key: any; state: boolean }[]>(dummyPlaceholder);
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const dispatch = useDispatch<AppDispatch>();
  const load = async () => {
    const body = {
      questionid: question.key,
      surevyid: params.surveyid,
      questiontype: 1,
      question: question.value,
      parentquestionid: "",
      statusind: true,
      insertdt: new Date().toLocaleString(),
      updatedt: new Date().toLocaleString(),
      insertid: uuidv4(), //replace with a proper user id once login is ready
      updateid: uuidv4(), //replace with a proper user id once login is ready
      optionid: options,
    };
    await dispatch(getQuestionDetails(body));
    if (!questionDetails?.details?.error) {
      navigateToList();
      //uncomment if navigation not needed
      // setOptions(dummyPlaceholder);
      // setQuestion({ key: "", value: "" });
    } else {
      show(0,Messages.error);
    }
  };

  const checkIfSimilarOptionExists = async () => {
    const optionsMap:any = {};
    const selectedOptions = options.filter((opt) => opt.state === true);
  
    for (const obj of selectedOptions) {
      const { key, value } = obj;
      if (optionsMap[value]) {
        show(0, Messages.identical);
      } else {
        optionsMap[value] = value;
      }
    }
  
    if (Object.keys(optionsMap).length === selectedOptions.length) {
      update();
    }
  }

  const update = async () => {
    const body = {
      questionid: question.key,
      question: question.value,
      parentquestionid: "",
      updatedt: new Date().toLocaleString(),
      updateid: uuidv4(), //replace with a proper user id once login is ready,
      options: options,
    };
    await dispatch(updateMultiSelectQuestionAndOptions(body));
    if (!questionDetails?.updateError) {
      navigateToList();
    } else {
      show(0,Messages.errorUpdate);
    }
  };

  const loadQuestion = async () => {
    const body = {
      questionid: params.questionid,
    };
    const response = await dispatch(getMultiSelectQuestionWithId(body));

    if (response && response.payload && !response.payload.error) {
      const { question, questionid } = response.payload.result[0];
      const { result } = response.payload;
      setQuestion({
        key: questionid,
        value: question,
      });

      const optionData = result.map((item: any) => ({
        key: item.optionid,
        value: item.optionvalue,
        state: true,
      }));

      setOptions(optionData);
    }
  };

  const handleAdd = () => {
    const abc = [
      ...options,
      {
        value: "",
        key: uuidv4(),
        state: true,
      },
    ];
    setOptions(abc);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>,key: string) => {
    const inputdata = [...options];
    const index = inputdata.findIndex((item) => item.key === key);
    if (index !== -1) {
      inputdata[index].value = e.target.value;
      setOptions(inputdata);
    }
  };

  const handleDelete = (key: string) => {
    const newArray = options.map((obj) => {
      if (obj.key === key) {
        return { ...obj, state: false };
      }
      return obj;
    });
    setOptions(newArray);
  };

  const navigateToList = () => {
    navigate(`/surveyDetails/${params.surveyid}`);
  };

  const show = (type: number,message:string) => {
    toast.current?.show({
      severity: type === 1 ? "success" : "error",
      summary: type === 1 ? "Success" : "Error",
      detail: message
    });
  };

  const questionChange = (e: any) => {
    setQuestion({
      key: params.questionid ? params.questionid : uuidv4(),
      value: e.target.value,
    });
  };

  useEffect(() => {
    if (params.questionid) {
      loadQuestion();
    }
  }, [params.questionid]);

  return (
    <div className="mx-2">
      {questionDetails.loading ||
      questionDetails.questionLoading ||
      questionDetails.updateLoading ? (
        <Spinner />
      ) : (
        <div className="card">
          <div className="question">
            <p>Type your question here...</p>
            <InputTextarea
              autoResize
              value={question.value}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                questionChange(e)
              }
              rows={1}
              style={{ width: "100%" }}
            />
            <Button label="Add Options" className="mt-3" onClick={handleAdd} />
            <div className="flex flex-column my-3">
              {options
                .filter((item) => item.state) // Filter out options with state set to false
                .map((item: any) => (
                    <div key={item.key} className="flex py-1">
                      {item.state && (
                        <>
                          <InputText
                            value={item.value}
                            onChange={(e: any) => handleChange(e, item.key)}
                            className="md:col-6 sm:col-11"
                          />
                          <Button
                            onClick={() => handleDelete(item.key)}
                            severity="danger"
                            disabled={options.filter((item) => item.state).length < 4}
                            rounded
                          >
                            <MdRemoveCircle />
                          </Button>
                        </>
                      )}
                    </div>
              ))}
            </div>
            <div className="flex gap-3 justify-content-end">
              <Button
                label={params.questionid ? "Update" : "Submit"}
                onClick={params.questionid ? checkIfSimilarOptionExists : load}
                severity="success"
                disabled={options.filter((item) => item.state).length < 4}
              />
              <Button
                label="Cancel"
                onClick={navigateToList}
                severity="secondary"
                text
              />
              <Toast ref={toast} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
