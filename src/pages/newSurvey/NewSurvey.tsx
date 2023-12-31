import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../store/Store";
import { clearSurveyDetails } from "../../store/slice/SurveyDetails";
import { useDispatch } from "react-redux";

const NewSurvey = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    return () => {
      dispatch(clearSurveyDetails());
    };
  }, [dispatch]);

  return (
    <div className="w-100 p-4 flex justify-content-center">
      <Link to={`/surveyDetails/${"0651893d-7bd6-431e-8a05-529d516826b4"}`}>
        <Button
          severity="secondary"
          className="font-bold gap-3 align-items-center"
        >
          Add Your Survey
          <FaPlus />
        </Button>
      </Link>
    </div>
  );
};

export default NewSurvey;
