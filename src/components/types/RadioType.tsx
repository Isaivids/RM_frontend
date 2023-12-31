import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useRef, useState } from "react";
import { MdRemoveCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getMultiSelectQuestionWithId, getQuestionDetails } from "../../store/slice/AddQuestion";
import { Toast } from "primereact/toast";
import { Dispatch } from "redux";
import { AppDispatch } from "../../store/Store";
import Spinner from "../spinner/Spinner";

const RadioType = () => {
  const [question, setQuestion] = useState<{ key: string; value: string }>({
    key: "",
    value: "",
  });
  const Messages = {
    success : 'Added Successfully',
    error : 'Unable to add data',
    successUpdate : 'Updated Successfully',
    errorUpdate : 'Unable to Update',
    identical : 'Options with same value exists',
  }
  const toast = useRef<Toast>(null);
  const dummyPlaceholder = [
    { key: uuidv4(), value: "", state: true },
    { key: uuidv4(), value: "", state: true },
  ];
  const params = useParams();
  //Add another option
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
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [options, setOptions] = useState<{ value: string; key: any; state: boolean }[]>(dummyPlaceholder);
  const navigateToList = () => {
    navigate(`/surveyDetails/${params.surveyid}`);
  };
  const questionDetails = useSelector((state: any) => state.addedQuestion);

  const addQuestion = async () => {
    const body = {
      questionid: question.key,
      surevyid: params.surveyid,
      questiontype: 2,
      question: question.value,
      parentquestionid: "",
      statusind: true,
      insertdt: new Date().toLocaleString(),
      updatedt: new Date().toLocaleString(),
      insertid: uuidv4(), //replace with a proper user id once login is ready
      updateid: uuidv4(), //replace with a proper user id once login is ready
      optionid: options,
    };
    console.log(body)
    await dispatch(getQuestionDetails(body));
    if (!questionDetails?.details?.error) {
      navigateToList();
    } else {
      show(0,Messages.error);
    }
  };

  const show = (type: number,message:string) => {
    toast.current?.show({
      severity: type === 1 ? "success" : "error",
      summary: type === 1 ? "Success" : "Error",
      detail: message
    });
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

  const questionChange = (e: any) => {
    setQuestion({
      key: params.questionid ? params.questionid : uuidv4(),
      value: e.target.value,
    });
  };

  const loadUpdateDetails = async() =>{
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
  }

  useEffect(() => {
    if (params.questionid) {
      loadUpdateDetails();
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
            rows={1} 
            style={{ width: "100%" }} 
            value={question.value}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              questionChange(e)
            }
          />
          <Button 
              label="Add Options" 
              className="mt-3" 
              onClick={handleAdd}
              disabled={options.filter((item) => item.state).length >= 4 }
          />
          <div className="flex flex-column my-3">
            {options
              .filter((item) => item.state)
              .map((item: any) => (
                <div key={item.key} className="flex py-1">
                  {item.state && (
                    <>
                      <InputText
                        value={item.value}
                        className="md:col-6 sm:col-11"
                        onChange={(e: any) => handleChange(e, item.key)}
                      />
                      <Button
                        severity="danger"
                        disabled={options.filter((item: any) => item.state).length <= 1}
                        rounded
                        onClick={() => handleDelete(item.key)}
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
            label="Submit"
            severity="success"
            onClick={params.questionid ? addQuestion : addQuestion}
            disabled={options.filter((item) => item.state).length <=1 }
          />
          <Button
            label="Cancel"
            onClick={navigateToList}
            severity="secondary"
            text
          />
        </div>
        </div>
      </div>
      )
    }
    </div>
  );
};

export default RadioType;
