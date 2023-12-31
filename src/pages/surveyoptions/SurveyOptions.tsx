import { TabView, TabPanel } from "primereact/tabview";
import MultiSelect from "../../components/types/MultiSelect";
import RadioType from "../../components/types/RadioType";
const SurveyOptions = () => {
  return (
    <div className="p-3">
      <TabView>
        <TabPanel header="MultiSelect">
          <MultiSelect />
        </TabPanel>
        <TabPanel header="Yes/No">
          <RadioType />
        </TabPanel>
        <TabPanel header="Description">Desc</TabPanel>
        <TabPanel header="File Upload">File Upload</TabPanel>
      </TabView>
    </div>
  );
};

export default SurveyOptions;
