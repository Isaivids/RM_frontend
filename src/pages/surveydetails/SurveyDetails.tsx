import { Button } from "primereact/button";
import { FaPlus } from "react-icons/fa";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getSurveyDetails } from "../../store/slice/SurveyDetails";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/Store";
import SurveyDetailsGrid from "../../components/grids/SurveyDetailsgrid";

const SurveyDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getSurveyDetails());
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      <div className="p-3">
        <Link to={`/surveyDetails/${params.surveyid}/surveyOptions`}>
          <Button
            severity="secondary"
            className="font-bold gap-3 align-items-center"
          >
            Add Questions
            <FaPlus />
          </Button>
        </Link>
      </div>
      <SurveyDetailsGrid />
    </>
  );
};

export default SurveyDetails;
