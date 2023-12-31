import { Button } from "primereact/button";
import { FaPlus } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSurveyDetails } from "../../store/slice/SurveyDetails";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/Store";
import SurveyDetailsGrid from "../../components/grids/SurveyDetailsgrid";
import { MdPublish,MdContentCopy  } from "react-icons/md";
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputText } from "primereact/inputtext";
const SurveyDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getSurveyDetails());
    };
    fetchData();
  }, [dispatch]);
  const op:any = useRef(null);
  const inputText:any = useRef(null);
  const [url, setUrl] = useState<string>('');
  const handleGenerateURL = (e:any) =>{
    op.current.toggle(e);
    const url = new URL(window.location.href);
    setUrl(`${url.origin}/survey/shareable/${params.surveyid}`)
  }

  const handleShareableLink = () =>{
    inputText.current.select();
    navigator.clipboard.writeText(url)
  }

  return (
    <>
      <div className="flex justify-content-between p-3">
        <Link to={`/surveyDetails/${params.surveyid}/surveyOptions`}>
          <Button
            severity="secondary"
            className="font-bold gap-3 align-items-center"
          >
            Add Questions
            <FaPlus />
          </Button>
        </Link>
        {/* <Link to={`/survey/shareable/${params.surveyid}`}> */}
          <Button
            severity="success"
            className="font-bold gap-3 align-items-center"
            onClick={(e:any) => handleGenerateURL(e)} 
          >
            Generate Form
            <MdPublish />        
          </Button>          
          <OverlayPanel ref={op} className="flex gap-3 align-items-center	">
            <InputText 
              ref = {inputText}
              value={url} 
              readOnly={true}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)} 
            />
            <Button severity="info" onClick={handleShareableLink}><MdContentCopy/></Button>
          </OverlayPanel>
        {/* </Link> */}
      </div>
      <SurveyDetailsGrid />
    </>
  );
};

export default SurveyDetails;
