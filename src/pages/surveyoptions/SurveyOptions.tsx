import { TabView, TabPanel } from "primereact/tabview";
import MultiSelect from "../../components/types/MultiSelect";
const SurveyOptions = () => {
  return (
    <div className="p-3">
      <TabView>
        <TabPanel header="MultiSelect">
          <MultiSelect />
        </TabPanel>
        <TabPanel header="Yes/No">Yes/No</TabPanel>
        <TabPanel header="Description">Desc</TabPanel>
        <TabPanel header="File Upload">File Upload</TabPanel>
      </TabView>
    </div>
  );
};

export default SurveyOptions;
