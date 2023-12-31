import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import NewSurvey from "./pages/newSurvey/NewSurvey";
import SurveyDetails from "./pages/surveydetails/SurveyDetails";
import SurveyOptions from "./pages/surveyoptions/SurveyOptions";
import Error from "./pages/error/Error";
import MultiSelect from "./components/types/MultiSelect";
import RadioType from "./components/types/RadioType";
import ShareLink from "./pages/shareLink/ShareLink";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<NewSurvey />} />
        <Route path="/surveyDetails/:surveyid" element={<SurveyDetails />} />
        <Route path="/surveyDetails/:surveyid/surveyOptions" element={<SurveyOptions />} />
        <Route path="/surveyDetails/:surveyid/multiselect/:questionid" element={<MultiSelect />} />
        <Route path="/surveyDetails/:surveyid/radio/:questionid" element={<RadioType />} />
        <Route path="/survey/shareable/:surveyid" element={<ShareLink />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
